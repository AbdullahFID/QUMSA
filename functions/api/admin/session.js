// functions/api/admin/session.js
// Reached only through _middleware.js, so a 200 here means the cookie is valid.
import { json } from './_lib.js'

export async function onRequestGet({ data }) {
  return json({ ok: true, username: data.session?.u || 'admin' })
}
