/* ───────────────────────── src/app/events/page.tsx ───────────────────── */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Calendar,
  Star,
  Sparkles,
  ArrowRight,
  Users,
  Ticket,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Camera,
  Heart,
  Trophy,
  Mountain,
  Flame,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard, { EventCategory } from '@/components/EventCard'
import EventsCalendar from '../../components/Calendar'
import Image from 'next/image'


/* ───────────────────────────── Types ────────────────────────────── */
interface Event {
  date: string
  title: string
  desc: string
  location: string
  time: string
  attendees: number
  category: EventCategory
  featured: boolean
}

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

/* ───────────────────────────── Data ─────────────────────────────── */
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

/* ─────────────────────────── Enhanced Slideshow ──────────────────────────── */
function PhotoSlideshow() {
  const [idx, setIdx] = useState(0)
  const [play, setPlay] = useState(true)
  const [showThumbnails, setShowThumbnails] = useState(false)

  const excludedIds = [
    2, 3, 6, 9, 14, 15, 16, 17, 31, 36,
    13, 18, 23, 27, 28,
    34, 35, 37, 39, 40,
    44, 45, 46, 47, 49
  ];

  // 2. Generate the full set of slides:
  const allSlides: Slide[] = Array.from({ length: 70 }, (_, i) => ({
    id: i + 1,
    title: `Community Event ${i + 1}`,
    description: 'Beautiful moments from our QUMSA family gatherings',
  }));

  // 3. Filter out the excluded ones:
  const slides: Slide[] = allSlides.filter(slide => !excludedIds.includes(slide.id));

  useEffect(() => {
    if (!play) return

    const timeoutId = setTimeout(() => {
      setIdx((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearTimeout(timeoutId)
  }, [play, idx, slides.length])

  const next = () => setIdx((p) => (p + 1) % slides.length)
  const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length)
  const goToSlide = (slideIndex: number) => {
    setIdx(slideIndex)
    setShowThumbnails(false)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
      {/* Main slide display */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400/20 via-emerald-400/20 to-blue-400/20"
          >
            {/* QUMSA logo in corner */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <Image
                src="/images/QUMSA_LOGO.png"
                alt="QUMSA Logo"
                width={48}
                height={48}
                className="rounded-lg object-contain"
                priority
              />
            </div>

            {/* Main slide image */}
            <Image
              src={`/slideshow/slide-${slides[idx].id}.jpg`}
              alt={slides[idx].title}
              fill
              className="object-cover"
              priority={idx === 0}
            />

            {/* Slide counter */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs sm:text-sm font-medium z-10">
              {idx + 1} / {slides.length}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <button 
          onClick={prev} 
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        
        <button 
          onClick={next} 
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Play/Pause button */}
        <button 
          onClick={() => setPlay(!play)} 
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        >
          {play ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        {/* Thumbnail grid toggle */}
        <button 
          onClick={() => setShowThumbnails(!showThumbnails)} 
          className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        >
          <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div 
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
          initial={{ width: 0 }}
          animate={{ 
            width: play ? '100%' : `${((idx + 1) / slides.length) * 100}%` 
          }}
          transition={{ 
            duration: play ? 4 : 0.3,
            ease: play ? 'linear' : 'easeOut'
          }}
          key={`${idx}-${play}`}
        />
      </div>

      {/* Thumbnail grid overlay */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl z-30 overflow-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Choose Photo</h3>
              <button 
                onClick={() => setShowThumbnails(false)}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 p-4">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all hover:scale-105 ${
                    i === idx 
                      ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black' 
                      : 'hover:ring-1 hover:ring-white/50'
                  }`}
                >
                  <Image
                    src={`/slideshow/slide-${slide.id}.jpg`}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 12.5vw"
                  />
                  
                  {/* Slide number overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">{i + 1}</span>
                  </div>
                  
                  {/* Current slide indicator */}
                  {i === idx && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-black" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info bar */}
      <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-white font-medium text-sm sm:text-base">Community Memories</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowThumbnails(true)}
              className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-1"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              View All
            </button>
            <span className="text-white/70 text-xs sm:text-sm">{slides.length} Photos</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────── Page ─────────────────────────────── */
export default function Events() {
  const featured = upcomingEvents.filter((e) => e.featured)
  const regular  = upcomingEvents.filter((e) => !e.featured)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ── animated background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-teal-900/20" />
        <div className="absolute top-0 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* ── hero ── */}
      <section className="relative pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 overflow-hidden px-4 sm:px-6">
        {/* floating particles */}
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
            {/* badge */}
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                  <Ticket className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
                <span className="text-yellow-400 font-medium text-xs sm:text-sm lg:text-base">Events & Activities</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* heading */}
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

      {/* ── events calendar section ── */}
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
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Events Calendar
              </h2>
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Stay up to date with all upcoming QUMSA events and activities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <EventsCalendar />
          </motion.div>
        </div>
      </section>

      {/* ── slideshow ── */}
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

      {/* ── annual events grid ── */}
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
            {annualEvents.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition"
              >
                 <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-6 ${ev.bgColor} border backdrop-blur-sm`}>
                  <div className={`${ev.color.includes('yellow') ? 'text-yellow-400' : ev.color.includes('emerald') ? 'text-emerald-400' : ev.color.includes('blue') ? 'text-blue-400' : ev.color.includes('orange') ? 'text-orange-400' : 'text-purple-400'}`}>
                    {ev.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition">
                  {ev.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">{ev.description}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── featured upcoming events ── */}
      {featured.length > 0 && (
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
              {featured.map((ev, i) => (
                <motion.div
                  key={ev.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <EventCard {...ev} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── all upcoming events ── */}
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
            {regular.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <EventCard {...ev} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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

          </motion.div>
        </div>
      </section>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-emerald-400" />
    </div>
  )
}
