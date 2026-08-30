// functions/api/admin/_middleware.js
// Auth gate for every /api/admin/* endpoint except login.
import { json, verifySession, getSessionCookie } from './_lib.js'

export async function onRequest(context) {
  const { request, env, next } = context
  const url = new URL(request.url)

  if (url.pathname.endsWith('/login')) return next()

  const session = await verifySession(getSessionCookie(request), env.SESSION_SECRET)
  if (!session) return json({ error: 'Unauthorized' }, 401)

  context.data.session = session
  return next()
}
