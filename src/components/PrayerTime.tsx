'use client'
import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Star,
  Sparkles,
  ArrowRight,
  Users,
  Zap,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Camera,
  Heart,
  Trophy,
  Utensils,
  Mountain,
  Flame,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ───────────────────────────────── Types ──────────────────────────────────
export type EventCategory = 'Social' | 'Religious' | 'Educational' | 'General'

/** A single calendar item */
export interface Event {
  date: string
  title: string
  desc: string
  location: string
  time: string
  attendees: number
  category: EventCategory        // ← required, no “?”
  featured: boolean              // keeps existing flag
}

/** Props for <EventCard /> are identical to an Event  */
export type EventCardProps = Event


interface AnnualEvent {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface Slide {
  id: number
  title: string
  description: string
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const upcomingEvents: Event[] = [
  {
    date: 'Aug 30 2025',
    title: 'Welcome BBQ & Orientation',
    desc: 'Kick‑off the academic year with delicious halal food, games, and meet fellow Muslim students. Perfect opportunity to learn about QUMSA and get involved!',
    location: "Queen's Park",
    time: '12:00 PM – 4:00 PM',
    attendees: 150,
    category: 'Social',
    featured: true,
  },
  {
    date: 'Sep 13 2025',
    title: 'First Jummah Prayer on Campus',
    desc: 'Join us for our first congregational Friday prayer of the semester in Mitchell Hall. Experience the spiritual unity of our campus Muslim community.',
    location: 'Mitchell Hall Room 228',
    time: '1:00 PM – 2:00 PM',
    attendees: 200,
    category: 'Religious',
    featured: false,
  },
  {
    date: 'Oct 7‑11 2025',
    title: 'Islam Awareness Week',
    desc: 'A week‑long celebration featuring educational booths, guest speakers, cultural displays, and open‑mosque tours. Learn about Islam and connect with the community.',
    location: 'Various Campus Locations',
    time: 'All Week',
    attendees: 500,
    category: 'Educational',
    featured: true,
  },
]

const annualEvents: AnnualEvent[] = [
  {
    title: 'End of Year Dinner',
    description:
      'Our most prestigious annual event celebrating achievements, community, and fellowship with a formal dinner and awards ceremony.',
    icon: <Trophy className="w-8 h-8" />,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    title: 'Ramadan Iftar Program',
    description:
      'Daily community iftars during the holy month of Ramadan, bringing together students to break fast and strengthen bonds.',
    icon: <Star className="w-8 h-8" />,
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'QUMSA Annual Hike',
    description:
      'Adventure and brotherhood combined in our yearly hiking expedition, exploring nature while building lasting friendships.',
    icon: <Mountain className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Annual BBQ',
    description:
      'Summer community gathering featuring halal BBQ, games, sports, and celebration of our diverse QUMSA family.',
    icon: <Flame className="w-8 h-8" />,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    title: 'Sports Events',
    description:
      'Regular tournaments and friendly matches in basketball, soccer, volleyball, and other sports throughout the year.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
  },
]

/* ------------------------------------------------------------------ */
/*  Components                                                        */
/* ------------------------------------------------------------------ */
function EventCard({
  date,
  title,
  desc,
  location,
  time,
  attendees,
  category = 'General',
  featured = false,
}: EventCardProps) {
  const categoryBg: Record<EventCategory, string> = {
    Social: 'bg-blue-500/10 border-blue-500/20',
    Religious: 'bg-emerald-500/10 border-emerald-500/20',
    Educational: 'bg-purple-500/10 border-purple-500/20',
    General: 'bg-slate-500/10 border-slate-500/20',
  }

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl ${
        featured ? 'ring-2 ring-yellow-400/40 shadow-yellow-400/20' : ''
      }`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative p-6 sm:p-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-400">Event Date</span>
              <span className="block text-lg sm:text-xl font-bold text-white">{date}</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3">
            {featured && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Featured
              </motion.div>
            )}

            {attendees > 0 && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-gray-300">{attendees}</span>
              </div>
            )}
          </div>
        </div>

        {/* Category chip */}
        <div className="mb-4 sm:mb-6">
          <span
            className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-white backdrop-blur-sm border ${categoryBg[category]}`}
          >
            {category}
          </span>
        </div>

        {/* Title & description */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 line-clamp-2 leading-tight group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors">
          {title}
        </h3>

        <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg line-clamp-3">{desc}</p>

        {/* Meta */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {time && (
            <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
              <div className="p-2 sm:p-3 bg-emerald-400/10 rounded-xl border border-emerald-400/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
              <span className="font-medium text-sm sm:text-base">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
              <div className="p-2 sm:p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
              <span className="font-medium text-sm sm:text-base">{location}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:shadow-xl text-sm sm:text-base transition"
        >
          <span className="sm:text-lg">Learn&nbsp;More</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
    </motion.article>
  )
}

function PhotoSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides: Slide[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Community Event ${i + 1}`,
    description: `Beautiful moments from our QUMSA family gatherings`,
  }))

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      4000,
    )
    return () => clearInterval(id)
  }, [isPlaying, slides.length])

  const next = () => setCurrentSlide((p) => (p + 1) % slides.length)
  const prev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
      {/* Slides */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400/20 via-emerald-400/20 to-blue-400/20"
          >
            {/* Logo */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-2 sm:p-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xs sm:text-sm">QUMSA</span>
                </div>
              </div>
            </div>

            {/* Placeholder text */}
            <div className="text-center text-white p-6 sm:p-8">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-white/70" />
              <h3 className="text-lg sm:text-2xl font-bold mb-2">{slides[currentSlide].title}</h3>
              <p className="text-white/80 text-sm sm:text-base">{slides[currentSlide].description}</p>
              <p className="text-xs sm:text-sm text-white/60 mt-3 sm:mt-4">
                Photo {currentSlide + 1} of {slides.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-2 sm:p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition"
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-yellow-400 w-6 sm:w-8' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Info bar */}
      <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-white font-medium text-sm sm:text-base">Community Memories</span>
          </div>
          <span className="text-white/70 text-xs sm:text-sm">70+ Photos Available</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function Events() {
  const featuredEvents = upcomingEvents.filter((e) => e.featured)
  const regularEvents = upcomingEvents.filter((e) => !e.featured)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-teal-900/20" />
        <div className="absolute top-0 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero */}
      <section className="relative pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 overflow-hidden px-4 sm:px-6">
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              style={{ left: `${10 + i * 8}%`, top: `${15 + i * 6}%` }}
              animate={{ y: [-30, 30, -30], opacity: [0.2, 0.8, 0.2], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
                <span className="text-yellow-400 font-medium text-xs sm:text-sm lg:text-base">Events & Activities</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 animate-gradient">
                QUMSA
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500 animate-gradient">
                Events
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto px-4">
              Join us for meaningful events that strengthen our community, celebrate our faith, and create lasting
              memories together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo memories */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Community Memories
              </h2>
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Take a look at the beautiful moments from our past events and celebrations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <PhotoSlideshow />
          </motion.div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Signature Annual Events
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
              Our traditional events that bring the QUMSA community together year after year
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {annualEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-6 ${event.bgColor} border backdrop-blur-sm`}
                >
                  <div className={`text-transparent bg-gradient-to-r ${event.color} bg-clip-text`}>{event.icon}</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">{event.description}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events */}
      {featuredEvents.length > 0 && (
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Featured Upcoming Events
                </h2>
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              </div>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Don't miss these special events that are highlights of our community calendar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Upcoming Events */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
              Stay updated with all upcoming QUMSA events and activities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {regularEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <EventCard {...event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-emerald-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden group-hover:border-white/30 transition">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-6">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Stay{' '}
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      Connected
                    </span>
                  </h2>
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>

                <p className="text-base sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Never miss an event! Follow us on social media and join our mailing list for updates.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <button className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl blur group-hover:blur-md group-hover:scale-110 transition" />
                    <div className="relative inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-yellow-400/50 text-yellow-400 font-semibold rounded-2xl hover:border-yellow-400 hover:bg-yellow-400/10 transition group-hover:scale-105 active:scale-95 backdrop-blur-sm">
                      <Users className="w-5 h-5" />
                      Join Mailing List
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur group-hover:blur-md group-hover:scale-110 transition" />
                    <div className="relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-2xl hover:from-yellow-300 hover:to-amber-400 transition shadow-lg hover:shadow-xl group-hover:scale-105 active:scale-95">
                      <Sparkles className="w-5 h-5" />
                      Follow Us
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-emerald-400" />
    </div>
  )
}
