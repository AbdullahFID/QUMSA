// Client for the QUMSA Admin API (functions/api/admin/*)

export type ContentFileName = 'events' | 'team' | 'resources' | 'prayer' | 'site'

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json()
    return data.error || `Request failed (${res.status})`
  } catch {
    return `Request failed (${res.status})`
  }
}

export async function apiLogin(username: string, password: string): Promise<void> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error(await parseError(res))
}

export async function apiLogout(): Promise<void> {
  await fetch('/api/admin/logout', { method: 'POST' })
}

export async function apiSession(): Promise<{ username: string } | null> {
  try {
    const res = await fetch('/api/admin/session')
    if (!res.ok) return null
    const data = await res.json()
    return { username: data.username }
  } catch {
    return null
  }
}

export async function apiGetContent<T>(file: ContentFileName): Promise<T> {
  const res = await fetch(`/api/admin/content?file=${file}`)
  if (!res.ok) throw new Error(await parseError(res))
  const data = await res.json()
  return data.content as T
}

export async function apiPutContent<T>(file: ContentFileName, content: T): Promise<void> {
  const res = await fetch('/api/admin/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, content }),
  })
  if (!res.ok) throw new Error(await parseError(res))
}

export async function apiUploadImage(
  folder: 'headshots' | 'juma' | 'general',
  file: File
): Promise<string> {
  const dataBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      resolve(result.slice(result.indexOf(',') + 1)) // strip data: prefix
    }
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder, filename: file.name, dataBase64 }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  const data = await res.json()
  return data.path as string
}
