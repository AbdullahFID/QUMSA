// functions/api/admin/_lib.js
// Shared helpers for the QUMSA Admin API: sessions, password hashing, GitHub commits.
// No secrets live in code — everything comes from Cloudflare Pages env bindings:
//   ADMIN_USERNAME, ADMIN_PASSWORD_HASH (pbkdf2$iters$salt$hash), SESSION_SECRET,
//   GITHUB_TOKEN, and optionally GITHUB_REPO / GITHUB_BRANCH.

const enc = new TextEncoder()

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  })
}

/* ---------- encoding ---------- */

function b64url(buf) {
  let s = ''
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return atob(s)
}

export function decodeBase64Utf8(b64) {
  const bin = atob(b64.replace(/\s/g, ''))
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeBase64Utf8(str) {
  const bytes = enc.encode(str)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return out
}

function bytesToHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

export function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const len = Math.max(a.length, b.length)
  let out = a.length === b.length ? 0 : 1
  for (let i = 0; i < len; i++) out |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  return out === 0
}

/* ---------- passwords (PBKDF2-SHA256) ---------- */

export async function pbkdf2Hash(password, saltHex, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: hexToBytes(saltHex), iterations },
    key,
    256
  )
  return bytesToHex(new Uint8Array(bits))
}

// stored format: pbkdf2$<iterations>$<salthex>$<hashhex>
export async function verifyPassword(password, stored) {
  const parts = String(stored || '').split('$')
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false
  const iterations = parseInt(parts[1], 10)
  if (!Number.isFinite(iterations) || iterations < 1000 || iterations > 100000) return false
  const computed = await pbkdf2Hash(password, parts[2], iterations)
  return timingSafeEqual(computed, parts[3])
}

/* ---------- sessions (HMAC-signed, HttpOnly cookie) ---------- */

const COOKIE_NAME = 'qumsa_admin'

async function hmacSign(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return b64url(sig)
}

export async function createSession(username, secret, maxAgeSeconds) {
  const payload = b64url(enc.encode(JSON.stringify({ u: username, exp: Date.now() + maxAgeSeconds * 1000 })))
  const sig = await hmacSign(payload, secret)
  return `${payload}.${sig}`
}

export async function verifySession(token, secret) {
  if (!token || !secret) return null
  const dot = token.indexOf('.')
  if (dot < 1) return null
  const payload = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = await hmacSign(payload, secret)
  if (!timingSafeEqual(sig, expected)) return null
  try {
    const data = JSON.parse(b64urlDecode(payload))
    if (typeof data.exp !== 'number' || Date.now() > data.exp) return null
    return data
  } catch {
    return null
  }
}

export function getSessionCookie(request) {
  const cookie = request.headers.get('Cookie') || ''
  for (const part of cookie.split(';')) {
    const [name, ...rest] = part.trim().split('=')
    if (name === COOKIE_NAME) return rest.join('=')
  }
  return null
}

export function sessionSetCookie(token, maxAgeSeconds) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAgeSeconds}`
}

export function sessionClearCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
}

/* ---------- GitHub content API ---------- */

export function ghRepo(env) {
  return env.GITHUB_REPO || 'AbdullahFID/QUMSA'
}

export function ghBranch(env) {
  return env.GITHUB_BRANCH || 'main'
}

export async function ghRequest(env, path, options = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'qumsa-admin',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  })
}

// Fetch a repo file's current sha (undefined if it doesn't exist yet)
export async function ghFileSha(env, path) {
  const res = await ghRequest(
    env,
    `/repos/${ghRepo(env)}/contents/${path}?ref=${ghBranch(env)}&t=${Date.now()}`
  )
  if (!res.ok) return undefined
  const data = await res.json()
  return data.sha
}

// Create or update a repo file (content is raw base64); returns commit sha
export async function ghPutFile(env, path, contentBase64, message) {
  const sha = await ghFileSha(env, path)
  const res = await ghRequest(env, `/repos/${ghRepo(env)}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: ghBranch(env),
      ...(sha ? { sha } : {}),
    }),
  })
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300)
    throw new Error(`GitHub write failed (${res.status}): ${detail}`)
  }
  const out = await res.json()
  return out.commit && out.commit.sha
}
