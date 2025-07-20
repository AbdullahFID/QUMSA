'use client'
import React from 'react'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'


/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
export type EventCategory = 'Social' | 'Religious' | 'Educational' | 'General'

export interface EventCardProps {
  date: string
  title: string
  desc: string
  location?: string
  time?: string
  attendees?: number
  category?: EventCategory        // optional ‑ falls back to “General”
  featured?: boolean              // optional ‑ default false
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function EventCard({
  date,
  title,
  desc,
  location,
  time,
  attendees,
  category = 'General',
  featured = false,
}: EventCardProps) {
  /* colour helpers */
  const bgChip: Record<EventCategory, string> = {
    Social: 'bg-blue-500/10 border-blue-500/20',
    Religious: 'bg-emerald-500/10 border-emerald-500/20',
    Educational: 'bg-purple-500/10 border-purple-500/20',
    General: 'bg-slate-500/10 border-slate-500/20',
  }

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl ${
        featured ? 'ring-2 ring-yellow-400/40 shadow-yellow-400/20' : ''
      }`}
    >
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* card body */}
      <div className="relative p-8">
        {/* header row */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
              <Calendar className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-400 mb-1">
                Event Date
              </span>
              <span className="block text-xl font-bold text-white">{date}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            {featured && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                <Star className="w-4 h-4" />
                Featured
              </motion.div>
            )}

            {attendees && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-gray-300">
                  {attendees}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* category chip */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border ${bgChip[category]}`}
          >
            {category}
          </span>
        </div>

        {/* title + desc */}
        <h3 className="text-2xl font-bold text-white mb-6 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-300 mb-8 leading-relaxed text-lg line-clamp-3">
          {desc}
        </p>

        {/* meta rows */}
        <div className="space-y-4 mb-8">
          {time && (
            <div className="flex items-center gap-4 text-gray-300">
              <div className="p-3 bg-emerald-400/10 rounded-xl border border-emerald-400/20">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-medium">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-4 text-gray-300">
              <div className="p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                <MapPin className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="font-medium">{location}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <span className="text-lg">Learn&nbsp;More</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
    </motion.article>
  )
}
