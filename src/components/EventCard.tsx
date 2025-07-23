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

export type EventCategory = 'Social' | 'Religious' | 'Educational' | 'General'

export interface EventCardProps {
  date: string
  title: string
  desc: string
  location?: string
  time?: string
  attendees?: number
  category?: EventCategory
  featured?: boolean
  url?: string  // 🎉 NEW: Add URL prop
}

export default function EventCard({
  date = "Mar 15",
  title = "Community Gathering",
  desc = "Join us for an evening of fellowship and connection with community members. Share stories, enjoy refreshments, and build lasting relationships.",
  location = "Community Center, Main Hall",
  time = "6:00 PM - 8:00 PM",
  attendees = 45,
  category = 'Social',
  featured = true,
  url,  // 🎉 NEW: Destructure URL prop
}: EventCardProps) {
  const bgChip: Record<EventCategory, string> = {
    Social: 'bg-amber-400/10 border-amber-400/20',
    Religious: 'bg-amber-400/10 border-amber-400/20',
    Educational: 'bg-amber-400/10 border-amber-400/20',
    General: 'bg-gray-500/10 border-gray-500/20',
  }

  // 🎉 NEW: Create button element based on whether URL exists
  const ButtonElement = url ? 'a' : 'button'
  const buttonProps = url 
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button' as const }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <article
        className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 via-blue-900/60 to-slate-700/80 backdrop-blur-xl shadow-xl hover:shadow-2xl max-w-md w-full transform transition-all duration-400 hover:-translate-y-2 hover:scale-105 ${
              featured ? 'ring-2 ring-amber-400/40 shadow-amber-400/20' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-lg">
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
                <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  <Star className="w-4 h-4" />
                  Featured
                </div>
              )}

              {attendees && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-300">
                    {attendees}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border ${bgChip[category]}`}
            >
              {category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-300 mb-8 leading-relaxed text-lg line-clamp-3">
            {desc}
          </p>

          <div className="space-y-4 mb-8">
            {time && (
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-amber-400/10 rounded-xl border border-amber-400/20">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-medium">{time}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-amber-400/10 rounded-xl border border-amber-400/20">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-medium">{location}</span>
              </div>
            )}
          </div>

          {/* 🎉 UPDATED: Dynamic button/link element */}
          <ButtonElement 
            {...buttonProps}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-900 font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-lg">Learn&nbsp;More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </ButtonElement>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </article>
    </div>
  )
}