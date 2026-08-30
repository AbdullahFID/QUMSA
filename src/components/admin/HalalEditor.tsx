'use client'

import { useState } from 'react'
import { Utensils, Plus, ChevronDown, ChevronRight, BadgeCheck } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Select, Toggle, Btn, GlassCard,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type HalalSpot = {
  id: number
  name: string
  type: string
  cuisine: string
  rating: number
  priceRange: string
  address: string
  phone: string
  hours: string
  website: string | null
  image: string
  coordinates: { lat: number; lng: number }
  verified: boolean
  description: string
}

type HalalContent = { spots: HalalSpot[] }

export default function HalalEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<HalalContent>('halal')
  const [open, setOpen] = useState<Record<number, boolean>>({})

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load halal spots'} />

  const setSpot = (i: number, patch: Partial<HalalSpot>) =>
    update((c) => ({ ...c, spots: c.spots.map((s, j) => (j === i ? { ...s, ...patch } : s)) }))

  const addSpot = () => {
    const nextId = Math.max(0, ...content.spots.map((s) => s.id)) + 1
    update((c) => ({
      ...c,
      spots: [
        {
          id: nextId, name: '', type: 'restaurant', cuisine: '', rating: 4.5, priceRange: '$$',
          address: '', phone: '', hours: '', website: '', image: '',
          coordinates: { lat: 44.2312, lng: -76.486 }, verified: false, description: '',
        },
        ...c.spots,
      ],
    }))
    setOpen((o) => ({ ...o, 0: true }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-400" /> Halal Food Spots
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            The restaurants and stores on the /resources/halal map — {content.spots.length} places listed.
          </p>
        </div>
        <Btn variant="gold" onClick={addSpot}>
          <Plus className="w-4 h-4" /> Add place
        </Btn>
      </div>

      <div className="space-y-4">
        {content.spots.map((spot, i) => {
          const isOpen = open[i] ?? false
          return (
            <GlassCard key={spot.id}>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen }))}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  )}
                  <span className="font-semibold text-white truncate">{spot.name || 'New place'}</span>
                  {spot.verified && <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                  <span className="text-xs text-gray-500 shrink-0 hidden sm:inline">{spot.cuisine}</span>
                </button>
                <ListControls
                  onUp={i > 0 ? () => update((c) => ({ ...c, spots: arrayMove(c.spots, i, i - 1) })) : undefined}
                  onDown={i < content.spots.length - 1 ? () => update((c) => ({ ...c, spots: arrayMove(c.spots, i, i + 1) })) : undefined}
                  onDelete={() => {
                    if (!window.confirm(`Remove "${spot.name}" from the halal map?`)) return
                    update((c) => ({ ...c, spots: c.spots.filter((_, j) => j !== i) }))
                  }}
                />
              </div>

              {isOpen && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Field label="Name"><TextInput value={spot.name} onChange={(e) => setSpot(i, { name: e.target.value })} /></Field>
                  <Field label="Type">
                    <Select value={spot.type} onChange={(e) => setSpot(i, { type: e.target.value })}>
                      <option value="restaurant">Restaurant</option>
                      <option value="Bakery">Bakery</option>
                      <option value="grocery">Grocery</option>
                      <option value="cafe">Café</option>
                    </Select>
                  </Field>
                  <Field label="Cuisine"><TextInput value={spot.cuisine} onChange={(e) => setSpot(i, { cuisine: e.target.value })} placeholder="Syrian, Lebanese" /></Field>
                  <Field label="Rating (0–5)"><TextInput type="number" min={0} max={5} step={0.1} value={spot.rating} onChange={(e) => setSpot(i, { rating: Math.min(5, Math.max(0, parseFloat(e.target.value) || 0)) })} /></Field>
                  <Field label="Price range">
                    <Select value={spot.priceRange} onChange={(e) => setSpot(i, { priceRange: e.target.value })}>
                      <option value="$">$ — cheap eats</option>
                      <option value="$$">$$ — moderate</option>
                      <option value="$$$">$$$ — fancy</option>
                    </Select>
                  </Field>
                  <Field label="Phone"><TextInput value={spot.phone} onChange={(e) => setSpot(i, { phone: e.target.value })} placeholder="(613) 555-0100" /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Address"><TextInput value={spot.address} onChange={(e) => setSpot(i, { address: e.target.value })} /></Field>
                  </div>
                  <Field label="Hours"><TextInput value={spot.hours} onChange={(e) => setSpot(i, { hours: e.target.value })} placeholder="11:00 A.M - 9:00 P.M" /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Website"><TextInput value={spot.website || ''} onChange={(e) => setSpot(i, { website: e.target.value || null })} placeholder="https://…" /></Field>
                  </div>
                  <Field
                    label="Photo URL"
                    help="Paste an image link — right-click a photo on the restaurant's website or Google listing and choose 'Copy image address'."
                  >
                    <TextInput value={spot.image} onChange={(e) => setSpot(i, { image: e.target.value })} placeholder="https://…" />
                  </Field>
                  <Field
                    label="Latitude"
                    help="On Google Maps, right-click the restaurant's pin and click the numbers at the top — the first number is latitude, the second is longitude."
                  >
                    <TextInput type="number" step="any" value={spot.coordinates.lat} onChange={(e) => setSpot(i, { coordinates: { ...spot.coordinates, lat: parseFloat(e.target.value) || 0 } })} />
                  </Field>
                  <Field label="Longitude">
                    <TextInput type="number" step="any" value={spot.coordinates.lng} onChange={(e) => setSpot(i, { coordinates: { ...spot.coordinates, lng: parseFloat(e.target.value) || 0 } })} />
                  </Field>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <Field label="Description"><TextArea rows={3} value={spot.description} onChange={(e) => setSpot(i, { description: e.target.value })} /></Field>
                  </div>
                  <Toggle
                    checked={spot.verified}
                    onChange={(v) => setSpot(i, { verified: v })}
                    label="Halal verified"
                    help="Turn on once someone has confirmed with the restaurant that the food is actually halal. Shows a verified badge on the map."
                  />
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
