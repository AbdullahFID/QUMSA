'use client'
import React from 'react'
import { Calendar, MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  date: string
  title: string
  desc: string
  location?: string
  time?: string
  attendees?: number
  category?: string
  featured?: boolean
}

export default function EventCard({
  date,
  title,
  desc,
  location,
  time,
  attendees,
  category = 'General',
  featured = false,
}: Props) {
  const categoryColors = {
    Social: 'from-blue-500 to-cyan-500',
    Religious: 'from-emerald-500 to-green-500',
    Educational: 'from-purple-500 to-pink-500',
    General: 'from-slate-500 to-slate-600',
  }

  const categoryBgColors = {
    Social: 'bg-blue-500/10 border-blue-500/20',
    Religious: 'bg-emerald-500/10 border-emerald-500/20',
    Educational: 'bg-purple-500/10 border-purple-500/20',
    General: 'bg-slate-500/10 border-slate-500/20',
  }

  return (
    <motion.article 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 ${featured ? 'ring-2 ring-yellow-400/40 shadow-yellow-400/20' : ''}`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured badge - more elegant */}
      {featured && (
        <div className="absolute top-6 right-6 z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Featured</span>
          </motion.div>
        </div>
      )}

      <div className="relative p-8">
        {/* Header - More spacious */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
              <Calendar className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <span className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Event Date</span>
              <span className="block text-xl font-bold text-slate-900 dark:text-white">{date}</span>
            </div>
          </div>
          
          {attendees && (
            <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/40 dark:border-slate-700/40">
              <Users className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{attendees}</span>
            </div>
          )}
        </div>

        {/* Category - More refined */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryBgColors[category as keyof typeof categoryBgColors]} text-slate-700 dark:text-slate-300 backdrop-blur-sm border`}>
            {category}
          </span>
        </div>

        {/* Title - Better spacing */}
        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-500 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description - More breathing room */}
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg line-clamp-3">
          {desc}
        </p>

        {/* Details - Cleaner layout */}
        <div className="space-y-4 mb-8">
          {time && (
            <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-emerald-400/10 backdrop-blur-sm rounded-xl border border-emerald-400/20">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="font-medium">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-yellow-400/10 backdrop-blur-sm rounded-xl border border-yellow-400/20">
                <MapPin className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="font-medium">{location}</span>
            </div>
          )}
        </div>

        {/* Action Button - More premium */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full group/btn flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
        >
          <span className="text-lg">Learn More</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </motion.button>
      </div>

      {/* Animated accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.article>
  )
}