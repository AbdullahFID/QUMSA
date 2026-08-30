'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { apiGetContent, apiPutContent, type ContentFileName } from './adminApi'

// Loads one content JSON from the repo, tracks edits, and publishes on save.
export function useContentFile<T>(file: ContentFileName) {
  const [content, setContent] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [published, setPublished] = useState(false)
  const publishedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false
    apiGetContent<T>(file)
      .then((data) => {
        if (!cancelled) {
          setContent(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [file])

  // don't let an exec close the tab with unsaved changes
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const update = useCallback((updater: (current: T) => T) => {
    setContent((current) => (current === null ? current : updater(current)))
    setDirty(true)
    setPublished(false)
  }, [])

  const save = useCallback(async () => {
    if (content === null) return
    setSaving(true)
    setError(null)
    try {
      await apiPutContent(file, content)
      setDirty(false)
      setPublished(true)
      if (publishedTimer.current) clearTimeout(publishedTimer.current)
      publishedTimer.current = setTimeout(() => setPublished(false), 150_000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }, [content, file])

  return { content, update, save, loading, error, dirty, saving, published, setError }
}
