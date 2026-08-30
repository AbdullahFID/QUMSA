'use client'

import { useState } from 'react'
import {
  Link2, FolderPlus, Plus, ChevronDown, ChevronRight,
  HeartHandshake, Calendar, AlertTriangle, MessageSquareText, Mic, HeartPulse,
  Scale, HandHeart, HeartPlus, MessageCircle, MessagesSquare, MessageSquare,
  MapPin, Zap, Locate, Gavel, CircleEqual, Heart, Star, Pin, Sparkles, ExternalLink,
} from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Select, Toggle, Btn, GlassCard,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type ResourceItem = { title: string; url: string; icon: string; description: string; featured: boolean }
type Category = { name: string; items: ResourceItem[] }
type ResourcesContent = { categories: Category[] }

// Must stay in sync with resourceIcons in src/components/ResourcePanel.tsx
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartHandshake, Calendar, AlertTriangle, MessageSquareText, Mic, HeartPulse,
  Scale, HandHeart, HeartPlus, MessageCircle, MessagesSquare, MessageSquare,
  MapPin, Zap, Locate, Gavel, CircleEqual, Heart, Star, Pin, Sparkles, ExternalLink,
}

export default function ResourcesEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<ResourcesContent>('resources')
  const [open, setOpen] = useState<Record<number, boolean>>({})

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load resources'} />

  const setCategory = (i: number, patch: Partial<Category>) =>
    update((c) => ({ ...c, categories: c.categories.map((cat, j) => (j === i ? { ...cat, ...patch } : cat)) }))

  const setItem = (ci: number, ii: number, patch: Partial<ResourceItem>) =>
    update((c) => ({
      ...c,
      categories: c.categories.map((cat, j) =>
        j === ci ? { ...cat, items: cat.items.map((it, k) => (k === ii ? { ...it, ...patch } : it)) } : cat
      ),
    }))

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-amber-400" /> Community Resources
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            The link hub at /resources/links. Featured items also appear in the &quot;Most Essential Links&quot; row.
          </p>
        </div>
        <Btn onClick={() => update((c) => ({ ...c, categories: [...c.categories, { name: 'New Category', items: [] }] }))}>
          <FolderPlus className="w-4 h-4" /> Add category
        </Btn>
      </div>

      <div className="space-y-4">
        {content.categories.map((cat, ci) => {
          const isOpen = open[ci] ?? false
          return (
            <GlassCard key={ci}>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [ci]: !isOpen }))}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  )}
                  <span className="font-semibold text-white truncate">{cat.name || 'Untitled category'}</span>
                  <span className="text-xs text-gray-500 shrink-0">{cat.items.length} links</span>
                </button>
                <ListControls
                  onUp={ci > 0 ? () => update((c) => ({ ...c, categories: arrayMove(c.categories, ci, ci - 1) })) : undefined}
                  onDown={ci < content.categories.length - 1 ? () => update((c) => ({ ...c, categories: arrayMove(c.categories, ci, ci + 1) })) : undefined}
                  onDelete={() => {
                    if (cat.items.length > 0 && !window.confirm(`Delete "${cat.name}" and its ${cat.items.length} link(s)?`)) return
                    update((c) => ({ ...c, categories: c.categories.filter((_, j) => j !== ci) }))
                  }}
                />
              </div>

              {isOpen && (
                <div className="mt-5 space-y-5">
                  <Field label="Category name">
                    <TextInput value={cat.name} onChange={(e) => setCategory(ci, { name: e.target.value })} />
                  </Field>

                  <div className="space-y-4">
                    {cat.items.map((item, ii) => {
                      const Icon = ICONS[item.icon] ?? Sparkles
                      return (
                        <div key={ii} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 truncate">
                              <Icon className="w-4 h-4 shrink-0" />
                              {item.title || 'New link'}
                            </span>
                            <ListControls
                              onUp={ii > 0 ? () => setCategory(ci, { items: arrayMove(cat.items, ii, ii - 1) }) : undefined}
                              onDown={ii < cat.items.length - 1 ? () => setCategory(ci, { items: arrayMove(cat.items, ii, ii + 1) }) : undefined}
                              onDelete={() => setCategory(ci, { items: cat.items.filter((_, k) => k !== ii) })}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Title"><TextInput value={item.title} onChange={(e) => setItem(ci, ii, { title: e.target.value })} /></Field>
                            <Field label="Icon">
                              <Select value={item.icon} onChange={(e) => setItem(ci, ii, { icon: e.target.value })}>
                                {Object.keys(ICONS).map((name) => <option key={name} value={name}>{name}</option>)}
                              </Select>
                            </Field>
                            <div className="sm:col-span-2">
                              <Field label="URL"><TextInput value={item.url} onChange={(e) => setItem(ci, ii, { url: e.target.value })} placeholder="https://…" /></Field>
                            </div>
                            <div className="sm:col-span-2">
                              <Field label="Description"><TextArea value={item.description} onChange={(e) => setItem(ci, ii, { description: e.target.value })} /></Field>
                            </div>
                            <Toggle checked={item.featured} onChange={(v) => setItem(ci, ii, { featured: v })} label="Featured (Most Essential Links)" />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Btn onClick={() => setCategory(ci, { items: [...cat.items, { title: '', url: '', icon: 'Sparkles', description: '', featured: false }] })}>
                    <Plus className="w-4 h-4" /> Add link to {cat.name || 'category'}
                  </Btn>
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
