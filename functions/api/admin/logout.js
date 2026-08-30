// functions/api/admin/logout.js
import { json, sessionClearCookie } from './_lib.js'

export async function onRequestPost() {
  return json({ ok: true }, 200, { 'Set-Cookie': sessionClearCookie() })
}
