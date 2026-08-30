'use client'

// Shared UI primitives for QUMSA ADMIN — same navy/gold glass language as the site.

import React, { useRef, useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, Rocket } from 'lucide-react'
import { apiUploadImage } from './adminApi'

export const inputClass =
  'w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder-gray-500 ' +
  'focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition text-sm'

// Little "?" that reveals an explanation on hover, focus, or tap — for execs
// seeing this dashboard for the first time
export function HelpTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex group/tip align-middle">
      <button
        type="button"
        tabIndex={0}
        aria-label={`Help: ${text}`}
        className="w-4 h-4 rounded-full bg-white/10 border border-white/20 text-gray-400 text-[10px] font-bold leading-none inline-flex items-center justify-center hover:bg-amber-400 hover:border-amber-400 hover:text-slate-900 focus:bg-amber-400 focus:border-amber-400 focus:text-slate-900 focus:outline-none transition-colors cursor-help"
      >
        ?
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible group-focus-within/tip:opacity-100 group-focus-within/tip:visible transition-opacity duration-150 z-40 normal-case tracking-normal"
      >
        <span className="block bg-slate-950 border border-white/20 text-gray-200 text-xs font-normal leading-relaxed rounded-xl px-3.5 py-2.5 shadow-2xl text-left">
          {text}
        </span>
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-950" />
      </span>
    </span>
  )
}

export function Field({
  label,
  children,
  hint,
  help,
}: {
  label: string
  children: React.ReactNode
  hint?: string
  help?: string
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
        {label}
        {help && <HelpTip text={help} />}
      </span>
      {children}
      {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
    </label>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={2} {...props} className={`${inputClass} resize-y ${props.className ?? ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} [&>option]:bg-slate-900 ${props.className ?? ''}`}>
      {props.children}
    </select>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  help,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  help?: string
}) {
  return (
    <span className="inline-flex items-center gap-2">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5 select-none group"
      aria-pressed={checked}
    >
      <span
        aria-hidden
        className={`relative inline-block w-10 h-6 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-amber-400' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 block w-5 h-5 rounded-full bg-white shadow transition-[left] duration-200 ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </span>
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </button>
    {help && <HelpTip text={help} />}
    </span>
  )
}

export function Btn({
  variant = 'ghost',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'gold' | 'ghost' | 'danger' }) {
  const styles = {
    gold: 'bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-400/20',
    ghost: 'bg-white/5 text-gray-200 border border-white/15 hover:bg-white/10 hover:text-white',
    danger: 'bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20',
  }
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  )
}

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function ListControls({
  onUp,
  onDown,
  onDelete,
  deleteLabel = 'Remove',
}: {
  onUp?: () => void
  onDown?: () => void
  onDelete: () => void
  deleteLabel?: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      {onUp && (
        <button type="button" onClick={onUp} title="Move up" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30">
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
      {onDown && (
        <button type="button" onClick={onDown} title="Move down" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30">
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
      <button type="button" onClick={onDelete} title={deleteLabel} className="p-2 rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

export function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function ImagePicker({
  label,
  value,
  folder,
  onChange,
  help,
}: {
  label: string
  value: string
  folder: 'headshots' | 'juma' | 'slideshow' | 'general'
  onChange: (path: string) => void
  help?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pick = async (file: File | undefined) => {
    if (!file) return
    setError(null)
    setUploading(true)
    const local = URL.createObjectURL(file)
    setPreview(local)
    try {
      const path = await apiUploadImage(folder, file)
      onChange(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
        {label}
        {help && <HelpTip text={help} />}
      </span>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/15 shrink-0 flex items-center justify-center">
          {preview || value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview || value} alt="" className="w-full h-full object-cover" />
          ) : (
            <Upload className="w-5 h-5 text-gray-600" />
          )}
        </div>
        <div className="min-w-0">
          <Btn onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Uploading…' : 'Upload image'}
          </Btn>
          {value && !uploading && <p className="text-xs text-gray-500 mt-1.5 truncate">{value}</p>}
          {error && <p className="text-xs text-red-300 mt-1.5">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
    </div>
  )
}

// Sticky footer for each editor tab: save state + publish button
export function SaveBar({
  dirty,
  saving,
  published,
  error,
  onSave,
}: {
  dirty: boolean
  saving: boolean
  published: boolean
  error: string | null
  onSave: () => void
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-8">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-2xl px-4 sm:px-5 py-3.5 shadow-2xl flex items-center justify-between gap-4">
        <div className="min-w-0 text-sm">
          {error ? (
            <span className="inline-flex items-center gap-2 text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">{error}</span>
            </span>
          ) : published ? (
            <span className="inline-flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Published! The live site updates in ~2 minutes.
            </span>
          ) : dirty ? (
            <span className="text-amber-300">Unsaved changes</span>
          ) : (
            <span className="text-gray-500">All changes published</span>
          )}
        </div>
        <Btn variant="gold" onClick={onSave} disabled={!dirty || saving} className="shrink-0">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
          {saving ? 'Publishing…' : 'Save & Publish'}
        </Btn>
      </div>
    </div>
  )
}

export function LoadingPane() {
  return (
    <div className="flex items-center justify-center py-24 text-gray-400 gap-3">
      <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
      Loading current content…
    </div>
  )
}

export function ErrorPane({ message }: { message: string }) {
  return (
    <div className="max-w-lg mx-auto my-16 p-6 bg-red-500/10 border border-red-400/30 rounded-2xl text-center">
      <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-3" />
      <p className="text-red-200 text-sm">{message}</p>
    </div>
  )
}
