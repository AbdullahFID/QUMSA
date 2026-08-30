'use client'

import { Landmark, CalendarDays, MapPin, Plus } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Btn, GlassCard, ImagePicker,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type PrayerContent = {
  jummah: { location: string; time: string; note: string; posterImage: string; locationImage: string }
  monthlyCalendar: { image: string; room: string; iqamaNote: string; footnote: string }
  weeklySchedule: { title: string; desc: string; time: string }[]
  prayerSpaces: { name: string; location: string; hours: string }[]
}

export default function PrayerEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<PrayerContent>('prayer')

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load prayer info'} />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Prayer Page</h2>
        <p className="text-sm text-gray-400 mt-1">
          Daily prayer times come automatically from the Aladhan API — everything else on the prayer page is edited here.
        </p>
      </div>

      <GlassCard>
        <h3 className="font-semibold text-white flex items-center gap-2 mb-5">
          <Landmark className="w-4 h-4 text-amber-400" /> Jummah Prayer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Location"><TextInput value={content.jummah.location} onChange={(e) => update((c) => ({ ...c, jummah: { ...c.jummah, location: e.target.value } }))} /></Field>
          <Field label="Time"><TextInput value={content.jummah.time} onChange={(e) => update((c) => ({ ...c, jummah: { ...c.jummah, time: e.target.value } }))} /></Field>
          <div className="sm:col-span-2">
            <Field label="Note"><TextArea value={content.jummah.note} onChange={(e) => update((c) => ({ ...c, jummah: { ...c.jummah, note: e.target.value } }))} /></Field>
          </div>
          <ImagePicker label="Jummah poster" value={content.jummah.posterImage} folder="juma" onChange={(path) => update((c) => ({ ...c, jummah: { ...c.jummah, posterImage: path } }))} />
          <ImagePicker label="Location map image" value={content.jummah.locationImage} folder="juma" onChange={(path) => update((c) => ({ ...c, jummah: { ...c.jummah, locationImage: path } }))} />
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-white flex items-center gap-2 mb-2">
          <CalendarDays className="w-4 h-4 text-amber-400" /> Monthly congregational calendar
        </h3>
        <p className="text-xs text-gray-500 mb-5">Upload the new calendar image at the start of each month.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <ImagePicker label="Calendar image" help="The monthly prayer timetable graphic. Upload the new month's image here — JPG or PNG." value={content.monthlyCalendar.image} folder="juma" onChange={(path) => update((c) => ({ ...c, monthlyCalendar: { ...c.monthlyCalendar, image: path } }))} />
          </div>
          <Field label="Room"><TextInput value={content.monthlyCalendar.room} onChange={(e) => update((c) => ({ ...c, monthlyCalendar: { ...c.monthlyCalendar, room: e.target.value } }))} /></Field>
          <Field label="Iqama note"><TextInput value={content.monthlyCalendar.iqamaNote} onChange={(e) => update((c) => ({ ...c, monthlyCalendar: { ...c.monthlyCalendar, iqamaNote: e.target.value } }))} /></Field>
          <div className="sm:col-span-2">
            <Field label="Footnote"><TextArea value={content.monthlyCalendar.footnote} onChange={(e) => update((c) => ({ ...c, monthlyCalendar: { ...c.monthlyCalendar, footnote: e.target.value } }))} /></Field>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Regular weekly schedule</h3>
          <Btn onClick={() => update((c) => ({ ...c, weeklySchedule: [...c.weeklySchedule, { title: '', desc: '', time: '' }] }))}>
            <Plus className="w-4 h-4" /> Add
          </Btn>
        </div>
        <div className="space-y-4">
          {content.weeklySchedule.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_10rem_auto] gap-3 items-end">
              <Field label="Title"><TextInput value={row.title} onChange={(e) => update((c) => ({ ...c, weeklySchedule: c.weeklySchedule.map((r, j) => (j === i ? { ...r, title: e.target.value } : r)) }))} /></Field>
              <Field label="Description"><TextInput value={row.desc} onChange={(e) => update((c) => ({ ...c, weeklySchedule: c.weeklySchedule.map((r, j) => (j === i ? { ...r, desc: e.target.value } : r)) }))} /></Field>
              <Field label="Time"><TextInput value={row.time} onChange={(e) => update((c) => ({ ...c, weeklySchedule: c.weeklySchedule.map((r, j) => (j === i ? { ...r, time: e.target.value } : r)) }))} placeholder="Thu 8 PM" /></Field>
              <div className="pb-0.5">
                <ListControls
                  onUp={i > 0 ? () => update((c) => ({ ...c, weeklySchedule: arrayMove(c.weeklySchedule, i, i - 1) })) : undefined}
                  onDown={i < content.weeklySchedule.length - 1 ? () => update((c) => ({ ...c, weeklySchedule: arrayMove(c.weeklySchedule, i, i + 1) })) : undefined}
                  onDelete={() => update((c) => ({ ...c, weeklySchedule: c.weeklySchedule.filter((_, j) => j !== i) }))}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" /> Campus prayer spaces
          </h3>
          <Btn onClick={() => update((c) => ({ ...c, prayerSpaces: [...c.prayerSpaces, { name: '', location: '', hours: '' }] }))}>
            <Plus className="w-4 h-4" /> Add
          </Btn>
        </div>
        <div className="space-y-4">
          {content.prayerSpaces.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_1fr_auto] gap-3 items-end">
              <Field label="Name"><TextInput value={row.name} onChange={(e) => update((c) => ({ ...c, prayerSpaces: c.prayerSpaces.map((r, j) => (j === i ? { ...r, name: e.target.value } : r)) }))} /></Field>
              <Field label="Location"><TextInput value={row.location} onChange={(e) => update((c) => ({ ...c, prayerSpaces: c.prayerSpaces.map((r, j) => (j === i ? { ...r, location: e.target.value } : r)) }))} /></Field>
              <Field label="Hours"><TextInput value={row.hours} onChange={(e) => update((c) => ({ ...c, prayerSpaces: c.prayerSpaces.map((r, j) => (j === i ? { ...r, hours: e.target.value } : r)) }))} /></Field>
              <div className="pb-0.5">
                <ListControls
                  onUp={i > 0 ? () => update((c) => ({ ...c, prayerSpaces: arrayMove(c.prayerSpaces, i, i - 1) })) : undefined}
                  onDown={i < content.prayerSpaces.length - 1 ? () => update((c) => ({ ...c, prayerSpaces: arrayMove(c.prayerSpaces, i, i + 1) })) : undefined}
                  onDelete={() => update((c) => ({ ...c, prayerSpaces: c.prayerSpaces.filter((_, j) => j !== i) }))}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
