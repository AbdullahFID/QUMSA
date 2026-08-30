'use client'

import { useState } from 'react'
import { Home, Plus, X } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, Btn, GlassCard, ListControls, arrayMove,
  SaveBar, LoadingPane, ErrorPane, inputClass,
} from './ui'

type SiteContent = {
  impactStats: { count: string; label: string }[]
  rotatingWords: string[]
}

export default function SiteEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<SiteContent>('site')
  const [newWord, setNewWord] = useState('')

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load homepage settings'} />

  const addWord = () => {
    const word = newWord.trim()
    if (!word) return
    update((c) => ({ ...c, rotatingWords: [...c.rotatingWords, word] }))
    setNewWord('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Home className="w-5 h-5 text-amber-400" /> Homepage
        </h2>
        <p className="text-sm text-gray-400 mt-1">The impact numbers and the rotating words in the hero.</p>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Our Impact stats</h3>
          <Btn onClick={() => update((c) => ({ ...c, impactStats: [...c.impactStats, { count: '', label: '' }] }))}>
            <Plus className="w-4 h-4" /> Add stat
          </Btn>
        </div>
        <div className="space-y-4">
          {content.impactStats.map((stat, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[8rem_1fr_auto] gap-3 items-end">
              <Field label="Number"><TextInput value={stat.count} onChange={(e) => update((c) => ({ ...c, impactStats: c.impactStats.map((s, j) => (j === i ? { ...s, count: e.target.value } : s)) }))} placeholder="500+" /></Field>
              <Field label="Label"><TextInput value={stat.label} onChange={(e) => update((c) => ({ ...c, impactStats: c.impactStats.map((s, j) => (j === i ? { ...s, label: e.target.value } : s)) }))} placeholder="Active Members" /></Field>
              <div className="pb-0.5">
                <ListControls
                  onUp={i > 0 ? () => update((c) => ({ ...c, impactStats: arrayMove(c.impactStats, i, i - 1) })) : undefined}
                  onDown={i < content.impactStats.length - 1 ? () => update((c) => ({ ...c, impactStats: arrayMove(c.impactStats, i, i + 1) })) : undefined}
                  onDelete={() => update((c) => ({ ...c, impactStats: c.impactStats.filter((_, j) => j !== i) }))}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-white mb-2">Rotating hero words</h3>
        <p className="text-xs text-gray-500 mb-5">
          &quot;Building ___ and community&quot; — the words cycle every few seconds. Arabic welcome.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {content.rotatingWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 bg-white/5 border border-white/15 rounded-full text-sm text-gray-200">
              {word}
              <button
                type="button"
                onClick={() => update((c) => ({ ...c, rotatingWords: c.rotatingWords.filter((_, j) => j !== i) }))}
                className="p-1 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-300 transition"
                title={`Remove "${word}"`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 max-w-sm">
          <input
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addWord() } }}
            placeholder="Add a word…"
            className={inputClass}
          />
          <Btn onClick={addWord}><Plus className="w-4 h-4" /></Btn>
        </div>
      </GlassCard>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
