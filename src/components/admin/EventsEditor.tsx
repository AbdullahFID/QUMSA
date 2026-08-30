'use client'

import { CalendarPlus, Repeat, Star } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Select, Toggle, Btn, GlassCard,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type OneOffEvent = {
  id: string
  title: string
  date: string
  time: string
  endTime: string
  location: string
  description: string
  type: string
  featured: boolean
  attendees: number
  organizer: string
  url: string
}

type WeeklyEvent = {
  id: string
  title: string
  weekday: string
  time: string
  endTime: string
  location: string
  description: string
  type: string
}

type EventsContent = { events: OneOffEvent[]; weekly: WeeklyEvent[] }

const EVENT_TYPES = [
  { value: 'community', label: 'Community' },
  { value: 'social', label: 'Social' },
  { value: 'education', label: 'Educational' },
  { value: 'prayer', label: 'Prayer / Religious' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'meeting', label: 'Meeting' },
]

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const newId = (title: string) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'event'}-${Date.now().toString(36)}`

export default function EventsEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<EventsContent>('events')

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load events'} />

  const addEvent = () =>
    update((c) => ({
      ...c,
      events: [
        {
          id: newId('new-event'), title: '', date: new Date().toISOString().slice(0, 10),
          time: '5:00 PM', endTime: '7:00 PM', location: '', description: '',
          type: 'community', featured: false, attendees: 0, organizer: 'QUMSA', url: '',
        },
        ...c.events,
      ],
    }))

  const addWeekly = () =>
    update((c) => ({
      ...c,
      weekly: [
        ...c.weekly,
        {
          id: newId('new-weekly'), title: '', weekday: 'Friday', time: '5:00 PM',
          endTime: '7:00 PM', location: '', description: '', type: 'prayer',
        },
      ],
    }))

  const setEvent = (i: number, patch: Partial<OneOffEvent>) =>
    update((c) => ({ ...c, events: c.events.map((e, j) => (j === i ? { ...e, ...patch } : e)) }))

  const setWeekly = (i: number, patch: Partial<WeeklyEvent>) =>
    update((c) => ({ ...c, weekly: c.weekly.map((e, j) => (j === i ? { ...e, ...patch } : e)) }))

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Events</h2>
          <p className="text-sm text-gray-400 mt-1">
            Past events disappear from the Events page automatically (they stay on the calendar).
          </p>
        </div>
        <Btn variant="gold" onClick={addEvent}>
          <CalendarPlus className="w-4 h-4" /> Add event
        </Btn>
      </div>

      <div className="space-y-4">
        {content.events.map((ev, i) => (
          <GlassCard key={ev.id} className={ev.date < today ? 'opacity-60' : ''}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                {ev.featured && <Star className="w-4 h-4 text-amber-400 shrink-0" />}
                <span className="font-semibold text-white truncate">{ev.title || 'Untitled event'}</span>
                {ev.date < today && (
                  <span className="text-[10px] uppercase tracking-wider bg-white/10 text-gray-400 px-2 py-0.5 rounded-full shrink-0">Past</span>
                )}
              </div>
              <ListControls
                onUp={i > 0 ? () => update((c) => ({ ...c, events: arrayMove(c.events, i, i - 1) })) : undefined}
                onDown={i < content.events.length - 1 ? () => update((c) => ({ ...c, events: arrayMove(c.events, i, i + 1) })) : undefined}
                onDelete={() => update((c) => ({ ...c, events: c.events.filter((_, j) => j !== i) }))}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Title"><TextInput value={ev.title} onChange={(e) => setEvent(i, { title: e.target.value })} placeholder="QUMSA Skate Day" /></Field>
              <Field label="Date"><TextInput type="date" value={ev.date} onChange={(e) => setEvent(i, { date: e.target.value })} /></Field>
              <Field label="Type">
                <Select value={ev.type} onChange={(e) => setEvent(i, { type: e.target.value })}>
                  {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </Select>
              </Field>
              <Field label="Start time"><TextInput value={ev.time} onChange={(e) => setEvent(i, { time: e.target.value })} placeholder="5:00 PM" /></Field>
              <Field label="End time"><TextInput value={ev.endTime} onChange={(e) => setEvent(i, { endTime: e.target.value })} placeholder="7:00 PM" /></Field>
              <Field label="Location"><TextInput value={ev.location} onChange={(e) => setEvent(i, { location: e.target.value })} placeholder="JDUC Wallace Hall" /></Field>
              <div className="sm:col-span-2">
                <Field label="Description"><TextArea value={ev.description} onChange={(e) => setEvent(i, { description: e.target.value })} /></Field>
              </div>
              <Field label="Expected attendees"><TextInput type="number" min={0} value={ev.attendees} onChange={(e) => setEvent(i, { attendees: Math.max(0, parseInt(e.target.value, 10) || 0) })} /></Field>
              <Field label="Organizer"><TextInput value={ev.organizer} onChange={(e) => setEvent(i, { organizer: e.target.value })} placeholder="QUMSA" /></Field>
              <div className="sm:col-span-2">
                <Field label="Link (optional)" hint="Sign-up form, tickets, etc."><TextInput value={ev.url} onChange={(e) => setEvent(i, { url: e.target.value })} placeholder="https://…" /></Field>
              </div>
              <div className="flex items-end pb-1">
                <Toggle checked={ev.featured} onChange={(v) => setEvent(i, { featured: v })} label="Featured event" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex items-center justify-between mt-12 mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Repeat className="w-5 h-5 text-amber-400" /> Weekly programs
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Repeat every week automatically — Jummah, Halaqa, and friends. Set once, never re-enter.
          </p>
        </div>
        <Btn onClick={addWeekly}>
          <CalendarPlus className="w-4 h-4" /> Add weekly program
        </Btn>
      </div>

      <div className="space-y-4">
        {content.weekly.map((ev, i) => (
          <GlassCard key={ev.id}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <span className="font-semibold text-white truncate">
                {ev.title || 'Untitled program'} <span className="text-gray-500 font-normal">· every {ev.weekday}</span>
              </span>
              <ListControls
                onDelete={() => update((c) => ({ ...c, weekly: c.weekly.filter((_, j) => j !== i) }))}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Title"><TextInput value={ev.title} onChange={(e) => setWeekly(i, { title: e.target.value })} placeholder="Jummah Prayer" /></Field>
              <Field label="Day of the week">
                <Select value={ev.weekday} onChange={(e) => setWeekly(i, { weekday: e.target.value })}>
                  {WEEKDAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </Select>
              </Field>
              <Field label="Type">
                <Select value={ev.type} onChange={(e) => setWeekly(i, { type: e.target.value })}>
                  {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </Select>
              </Field>
              <Field label="Start time"><TextInput value={ev.time} onChange={(e) => setWeekly(i, { time: e.target.value })} placeholder="1:30 PM" /></Field>
              <Field label="End time"><TextInput value={ev.endTime} onChange={(e) => setWeekly(i, { endTime: e.target.value })} placeholder="2:15 PM" /></Field>
              <Field label="Location"><TextInput value={ev.location} onChange={(e) => setWeekly(i, { location: e.target.value })} placeholder="Wallace Hall, JDUC" /></Field>
              <div className="sm:col-span-2 lg:col-span-3">
                <Field label="Description"><TextArea value={ev.description} onChange={(e) => setWeekly(i, { description: e.target.value })} /></Field>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
