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

export type EventCategory = 'Social' | 'Religious' | 'Educational' | 'General' | 'Academic'

export interface EventCardProps {
  date: string
  title: string
  desc: string
  location?: string
  time?: string
  attendees?: number
  category?: EventCategory
  featured?: boolean
  url?: string
}

export default function EventCard({
  date,
  title,
  desc,
  location,
  time,
  attendees,
  category = 'Social',
  featured = false,
  url,
}: EventCardProps) {
  const bgChip: Record<EventCategory, string> = {
    Social: 'bg-amber-400/10 border-amber-400/20',
    Religious: 'bg-amber-400/10 border-amber-400/20',
    Educational: 'bg-amber-400/10 border-amber-400/20',
    General: 'bg-gray-500/10 border-gray-500/20',
    Academic: 'bg-indigo-400/10 border-indigo-400/20'
  }

  const ButtonElement = url ? 'a' : 'button'
  const buttonProps = url 
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button' as const }

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-800/80 via-blue-900/60 to-slate-700/80 backdrop-blur-xl shadow-xl hover:shadow-2xl w-full transform transition-all duration-300 hover:-translate-y-2 ${
        featured ? 'ring-2 ring-amber-400/40 shadow-amber-400/20' : ''
      }`}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-400/5 via-transparent to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6 sm:p-8">
        {/* Header: Date + Badges */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-linear-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
                Event Date
              </span>
              <span className="block text-lg sm:text-xl font-bold text-white">{date}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 sm:gap-3">
            {featured && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Featured
              </div>
            )}

            {attendees !== undefined && attendees > 0 && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-semibold text-gray-300">
                  {attendees}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Category chip */}
        <div className="mb-4 sm:mb-6">
          <span
            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-white backdrop-blur-sm border ${bgChip[category]}`}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 group-hover:text-amber-400 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg line-clamp-3">
          {desc}
        </p>

        {/* Time & Location */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {time && (
            <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
              <div className="p-2 sm:p-3 bg-amber-400/10 rounded-xl border border-amber-400/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <span className="font-medium text-sm sm:text-base">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
              <div className="p-2 sm:p-3 bg-amber-400/10 rounded-xl border border-amber-400/20">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <span className="font-medium text-sm sm:text-base">{location}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <ButtonElement 
          {...buttonProps}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-linear-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="text-base sm:text-lg">Learn&nbsp;More</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </ButtonElement>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </article>
  )
}