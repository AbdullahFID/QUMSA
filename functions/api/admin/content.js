// functions/api/admin/content.js
// GET  /api/admin/content?file=events   → current JSON from the repo (always fresh)
// PUT  /api/admin/content {file, content} → commits the JSON to GitHub, which
//                                            triggers the Cloudflare Pages rebuild
import {
  json,
  ghRequest,
  ghRepo,
  ghBranch,
  ghPutFile,
  decodeBase64Utf8,
  encodeBase64Utf8,
} from './_lib.js'

const FILES = {
  events: 'src/content/events.json',
  team: 'src/content/team.json',
  resources: 'src/content/resources.json',
  prayer: 'src/content/prayer.json',
  site: 'src/content/site.json',
}

export async function onRequestGet({ request, env }) {
  const file = new URL(request.url).searchParams.get('file')
  const path = FILES[file]
  if (!path) return json({ error: 'Unknown content file' }, 400)

  const res = await ghRequest(
    env,
    `/repos/${ghRepo(env)}/contents/${path}?ref=${ghBranch(env)}&t=${Date.now()}`
  )
  if (!res.ok) return json({ error: `GitHub read failed (${res.status})` }, 502)

  const data = await res.json()
  let content
  try {
    content = JSON.parse(decodeBase64Utf8(data.content))
  } catch {
    return json({ error: 'Stored content is not valid JSON' }, 502)
  }
  return json({ file, sha: data.sha, content })
}

export async function onRequestPut({ request, env, data }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }

  const path = FILES[body?.file]
  if (!path) return json({ error: 'Unknown content file' }, 400)
  if (typeof body.content !== 'object' || body.content === null || Array.isArray(body.content)) {
    return json({ error: 'Invalid content' }, 400)
  }

  const text = JSON.stringify(body.content, null, 2) + '\n'
  if (text.length > 900_000) return json({ error: 'Content too large' }, 400)

  const who = data?.session?.u || 'admin'
  try {
    const commit = await ghPutFile(
      env,
      path,
      encodeBase64Utf8(text),
      `QUMSA Admin: update ${body.file} (by ${who})`
    )
    return json({ ok: true, commit })
  } catch (err) {
    return json({ error: String(err.message || err) }, 502)
  }
}
