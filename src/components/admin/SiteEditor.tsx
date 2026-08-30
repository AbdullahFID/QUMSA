'use client'

import { useState } from 'react'
import { Home, Plus, X } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Btn, GlassCard, ListControls, arrayMove,
  SaveBar, LoadingPane, ErrorPane, inputClass,
} from './ui'

type SiteContent = {
  impactStats: { count: string; label: string }[]
  rotatingWords: string[]
  contact: { email: string; roomLine1: string; roomLine2: string; address: string }
  socials: { instagram: string; whatsapp: string; facebook: string; twitter: string }
  ramadanCampaign: { title: string; goal: number; current: number; launchGoodUrl: string; description: string }
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
          <Home className="w-5 h-5 text-amber-400" /> Homepage & Site-wide
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Impact numbers, hero words, contact info, social links, and the donation campaign.
        </p>
      </div>

      <GlassCard>
        <h3 className="font-semibold text-white mb-5">Contact info <span className="text-xs font-normal text-gray-500">(shown in the footer on every page)</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email"><TextInput type="email" value={content.contact.email} onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, email: e.target.value } }))} /></Field>
          <Field label="Room"><TextInput value={content.contact.roomLine1} onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, roomLine1: e.target.value } }))} placeholder="JDUC Room 329, 331" /></Field>
          <Field label="Building"><TextInput value={content.contact.roomLine2} onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, roomLine2: e.target.value } }))} /></Field>
          <Field label="Street address"><TextInput value={content.contact.address} onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, address: e.target.value } }))} /></Field>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-white mb-5">Social links <span className="text-xs font-normal text-gray-500">(footer icons + follow buttons across the site)</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Instagram"><TextInput value={content.socials.instagram} onChange={(e) => update((c) => ({ ...c, socials: { ...c.socials, instagram: e.target.value } }))} placeholder="https://instagram.com/…" /></Field>
          <Field label="WhatsApp channel"><TextInput value={content.socials.whatsapp} onChange={(e) => update((c) => ({ ...c, socials: { ...c.socials, whatsapp: e.target.value } }))} /></Field>
          <Field label="Facebook"><TextInput value={content.socials.facebook} onChange={(e) => update((c) => ({ ...c, socials: { ...c.socials, facebook: e.target.value } }))} /></Field>
          <Field label="Twitter / X"><TextInput value={content.socials.twitter} onChange={(e) => update((c) => ({ ...c, socials: { ...c.socials, twitter: e.target.value } }))} /></Field>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-white mb-5">Donation campaign <span className="text-xs font-normal text-gray-500">(the progress bar on the Donate page)</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Campaign title"><TextInput value={content.ramadanCampaign.title} onChange={(e) => update((c) => ({ ...c, ramadanCampaign: { ...c.ramadanCampaign, title: e.target.value } }))} /></Field>
          </div>
          <Field label="Goal ($ CAD)"><TextInput type="number" min={0} value={content.ramadanCampaign.goal} onChange={(e) => update((c) => ({ ...c, ramadanCampaign: { ...c.ramadanCampaign, goal: Math.max(0, parseInt(e.target.value, 10) || 0) } }))} /></Field>
          <Field label="Raised so far ($ CAD)" help="Update this as donations come in — the progress bar on the Donate page fills up automatically.">
            <TextInput type="number" min={0} value={content.ramadanCampaign.current} onChange={(e) => update((c) => ({ ...c, ramadanCampaign: { ...c.ramadanCampaign, current: Math.max(0, parseInt(e.target.value, 10) || 0) } }))} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="LaunchGood URL"><TextInput value={content.ramadanCampaign.launchGoodUrl} onChange={(e) => update((c) => ({ ...c, ramadanCampaign: { ...c.ramadanCampaign, launchGoodUrl: e.target.value } }))} /></Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description"><TextArea value={content.ramadanCampaign.description} onChange={(e) => update((c) => ({ ...c, ramadanCampaign: { ...c.ramadanCampaign, description: e.target.value } }))} /></Field>
          </div>
        </div>
      </GlassCard>

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
