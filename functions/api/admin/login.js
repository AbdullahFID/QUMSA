// functions/api/admin/login.js
import {
  json,
  verifyPassword,
  createSession,
  sessionSetCookie,
  timingSafeEqual,
} from './_lib.js'

const SESSION_MAX_AGE = 60 * 60 * 24 * 3 // 3 days

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }

  const username = String(body?.username || '')
  const password = String(body?.password || '')

  const userOk = timingSafeEqual(username.toLowerCase(), String(env.ADMIN_USERNAME || '').toLowerCase())
  const passOk = await verifyPassword(password, env.ADMIN_PASSWORD_HASH)

  if (!userOk || !passOk) {
    // slow down brute-force attempts
    await new Promise((r) => setTimeout(r, 1000))
    return json({ error: 'Invalid username or password' }, 401)
  }

  const token = await createSession(username, env.SESSION_SECRET, SESSION_MAX_AGE)
  return json({ ok: true, username }, 200, { 'Set-Cookie': sessionSetCookie(token, SESSION_MAX_AGE) })
}
