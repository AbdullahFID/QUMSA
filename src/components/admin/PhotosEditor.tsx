'use client'

import { useRef, useState } from 'react'
import { Camera, Upload, Loader2, Trash2, ArrowLeft, ArrowRight } from 'lucide-react'
import { useContentFile } from './useContentFile'
import { apiUploadImage } from './adminApi'
import { Btn, GlassCard, arrayMove, SaveBar, LoadingPane, ErrorPane, HelpTip } from './ui'

type SlideshowContent = { slides: string[] }

export default function PhotosEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<SlideshowContent>('slideshow')
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load photos'} />

  const pickFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploadError(null)
    setUploading(files.length)
    for (const file of Array.from(files)) {
      try {
        const path = await apiUploadImage('slideshow', file)
        update((c) => ({ ...c, slides: [...c.slides, path] }))
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setUploading((n) => n - 1)
      }
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" /> Community Memories
            <HelpTip text="These photos rotate in the slideshow on the Events page. Upload photos from events, remove old ones, and reorder with the arrows." />
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {content.slides.length} photos in the Events page slideshow, shown in this order.
          </p>
        </div>
        <Btn variant="gold" onClick={() => inputRef.current?.click()} disabled={uploading > 0}>
          {uploading > 0 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading > 0 ? `Uploading ${uploading}…` : 'Upload photos'}
        </Btn>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => pickFiles(e.target.files)}
        />
      </div>

      {uploadError && (
        <p className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-2.5">
          {uploadError}
        </p>
      )}

      <GlassCard>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {content.slides.map((src, i) => (
            <div key={`${src}-${i}`} className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-1.5 left-1.5 text-[10px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded-md">
                {i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-1.5 flex items-center justify-center gap-1 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => update((c) => ({ ...c, slides: arrayMove(c.slides, i, i - 1) }))}
                  className="p-1.5 rounded-lg bg-white/15 text-white hover:bg-white/30 transition disabled:opacity-30"
                  title="Move earlier"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => update((c) => ({ ...c, slides: c.slides.filter((_, j) => j !== i) }))}
                  className="p-1.5 rounded-lg bg-red-500/40 text-white hover:bg-red-500/70 transition"
                  title="Remove from slideshow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={i === content.slides.length - 1}
                  onClick={() => update((c) => ({ ...c, slides: arrayMove(c.slides, i, i + 1) }))}
                  className="p-1.5 rounded-lg bg-white/15 text-white hover:bg-white/30 transition disabled:opacity-30"
                  title="Move later"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
