// functions/api/admin/upload.js
// POST /api/admin/upload { folder, filename, dataBase64 }
// Commits an image into public/images/... and returns the site path to reference it.
import { json, ghPutFile } from './_lib.js'

const FOLDERS = {
  headshots: 'public/images/headshots',
  juma: 'public/images/Juma',
  slideshow: 'public/slideshow',
  general: 'public/images',
}

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif']
const MAX_BASE64_LENGTH = 11_000_000 // ~8MB of image data

export async function onRequestPost({ request, env, data }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }

  const repoDir = FOLDERS[body?.folder]
  if (!repoDir) return json({ error: 'Unknown upload folder' }, 400)

  const rawName = String(body?.filename || '')
  const dot = rawName.lastIndexOf('.')
  const ext = dot > 0 ? rawName.slice(dot + 1).toLowerCase() : ''
  if (!EXTENSIONS.includes(ext)) {
    return json({ error: `File type must be one of: ${EXTENSIONS.join(', ')}` }, 400)
  }

  // sanitize base name, then stamp it so a re-upload never fights the CDN cache
  const base = rawName
    .slice(0, dot)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'image'
  const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')
  const filename = `${base}-${stamp}.${ext}`

  const dataBase64 = String(body?.dataBase64 || '').replace(/\s/g, '')
  if (!dataBase64 || !/^[A-Za-z0-9+/=]+$/.test(dataBase64)) {
    return json({ error: 'Invalid image data' }, 400)
  }
  if (dataBase64.length > MAX_BASE64_LENGTH) {
    return json({ error: 'Image too large (max ~8MB)' }, 400)
  }

  const who = data?.session?.u || 'admin'
  try {
    await ghPutFile(
      env,
      `${repoDir}/${filename}`,
      dataBase64,
      `QUMSA Admin: upload ${body.folder}/${filename} (by ${who})`
    )
    return json({ ok: true, path: `/${repoDir.replace(/^public\//, '')}/${filename}` })
  } catch (err) {
    return json({ error: String(err.message || err) }, 502)
  }
}
