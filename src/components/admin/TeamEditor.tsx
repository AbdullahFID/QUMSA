'use client'

import { useState } from 'react'
import { UserPlus, Users, ChevronDown, ChevronRight, FolderPlus } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Btn, GlassCard, ImagePicker,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type Member = { name: string; role: string; img: string; description: string; email: string }
type Section = { id: string; title: string; subtitle: string; members: Member[] }
type TeamContent = { sections: Section[] }

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30) || `section-${Date.now().toString(36)}`

export default function TeamEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<TeamContent>('team')
  const [open, setOpen] = useState<Record<string, boolean>>({})

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load team'} />

  const setSection = (i: number, patch: Partial<Section>) =>
    update((c) => ({ ...c, sections: c.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) }))

  const setMember = (si: number, mi: number, patch: Partial<Member>) =>
    update((c) => ({
      ...c,
      sections: c.sections.map((s, j) =>
        j === si ? { ...s, members: s.members.map((m, k) => (k === mi ? { ...m, ...patch } : m)) } : s
      ),
    }))

  const addSection = () => {
    const title = 'New Section'
    update((c) => ({
      ...c,
      sections: [...c.sections, { id: slugify(`${title}-${Date.now().toString(36)}`), title, subtitle: '', members: [] }],
    }))
  }

  const addMember = (si: number) =>
    update((c) => ({
      ...c,
      sections: c.sections.map((s, j) =>
        j === si
          ? { ...s, members: [...s.members, { name: '', role: '', img: '', description: '', email: '' }] }
          : s
      ),
    }))

  const total = content.sections.reduce((sum, s) => sum + s.members.length, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> Executive Team
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {total} members across {content.sections.length} sections. Click a section to expand it.
          </p>
        </div>
        <Btn onClick={addSection}>
          <FolderPlus className="w-4 h-4" /> Add section
        </Btn>
      </div>

      <div className="space-y-4">
        {content.sections.map((section, si) => {
          const isOpen = open[section.id] ?? false
          return (
            <GlassCard key={section.id}>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [section.id]: !isOpen }))}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  )}
                  <span className="font-semibold text-white truncate">{section.title || 'Untitled section'}</span>
                  <span className="text-xs text-gray-500 shrink-0">
                    {section.members.length} {section.members.length === 1 ? 'member' : 'members'}
                  </span>
                </button>
                <ListControls
                  onUp={si > 0 ? () => update((c) => ({ ...c, sections: arrayMove(c.sections, si, si - 1) })) : undefined}
                  onDown={si < content.sections.length - 1 ? () => update((c) => ({ ...c, sections: arrayMove(c.sections, si, si + 1) })) : undefined}
                  onDelete={() => {
                    if (section.members.length > 0 && !window.confirm(`Delete "${section.title}" and its ${section.members.length} member(s)?`)) return
                    update((c) => ({ ...c, sections: c.sections.filter((_, j) => j !== si) }))
                  }}
                />
              </div>

              {isOpen && (
                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Section title">
                      <TextInput value={section.title} onChange={(e) => setSection(si, { title: e.target.value })} />
                    </Field>
                    <Field label="Section subtitle">
                      <TextInput value={section.subtitle} onChange={(e) => setSection(si, { subtitle: e.target.value })} />
                    </Field>
                  </div>

                  <div className="space-y-4">
                    {section.members.map((m, mi) => (
                      <div key={mi} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span className="text-sm font-semibold text-amber-300 truncate">
                            {m.name || 'New member'}
                          </span>
                          <ListControls
                            onUp={mi > 0 ? () => setSection(si, { members: arrayMove(section.members, mi, mi - 1) }) : undefined}
                            onDown={mi < section.members.length - 1 ? () => setSection(si, { members: arrayMove(section.members, mi, mi + 1) }) : undefined}
                            onDelete={() => setSection(si, { members: section.members.filter((_, k) => k !== mi) })}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Name"><TextInput value={m.name} onChange={(e) => setMember(si, mi, { name: e.target.value })} /></Field>
                          <Field label="Role"><TextInput value={m.role} onChange={(e) => setMember(si, mi, { role: e.target.value })} placeholder="Director of Events" /></Field>
                          <Field label="Email"><TextInput type="email" value={m.email} onChange={(e) => setMember(si, mi, { email: e.target.value })} placeholder="events@qumsa.ca" /></Field>
                          <ImagePicker label="Headshot" value={m.img} folder="headshots" onChange={(path) => setMember(si, mi, { img: path })} />
                          <div className="sm:col-span-2">
                            <Field label="Fun fact" hint="Shown on the flip side of their card">
                              <TextArea value={m.description} onChange={(e) => setMember(si, mi, { description: e.target.value })} />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Btn onClick={() => addMember(si)}>
                    <UserPlus className="w-4 h-4" /> Add member to {section.title || 'section'}
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
