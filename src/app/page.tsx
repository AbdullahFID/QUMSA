// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ResourceTile from '../components/ResourceTile'
import {
  Utensils,
  CalendarClock,
  AlarmClock,
  Users,
  CalendarCheck,
  Calendar1,
  BadgeQuestionMark,
  Medal,
  UsersRound,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function HomePage() {
  /* ───────────────────────── rotating words ───────────────────────── */
  const first = ['faith', 'friendship', 'المجتمع', 'الإيمان']
  const second = ['Islam', 'الإسلام']
  const [i1, setI1] = useState(0)
  const [i2, setI2] = useState(0)

  useEffect(() => {
    const a = setInterval(() => setI1((i) => (i + 1) % first.length), 3000)
    const b = setInterval(() => setI2((i) => (i + 1) % second.length), 3000)
    return () => {
      clearInterval(a)
      clearInterval(b)
    }
  }, [])

  const slide = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  }

  /* ────────────────────────────────── UI ───────────────────────────────── */
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 text-slate-900 dark:text-slate-50">
      {/* ───────────── HERO ───────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://cdn.prod.website-files.com/667c59abb9df9789d17407a6/667dd742313853241f5dcc64_Story-DJI_0031.jpeg"
          alt="Queen's campus aerial"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-emerald-900/50" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }} // Faster and no delay
          className="relative z-10 mx-4 w-full max-w-4xl"
        >
          <div className="bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }} // Shorter delay, faster duration
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-2">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Welcome to Queen's
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  MSA
                </span>
              </h1>
            </motion.div>

            {/* animated sentence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }} // Adjusted timing
              className="mt-8 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-white/90"
            >
              <p className="mb-4">
                Building&nbsp;
                <span className="inline-flex px-2 h-8 sm:h-10 overflow-hidden rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={i1}
                      variants={slide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.6 }}
                      className="block text-red-300 whitespace-nowrap flex items-center"
                    >
                      {first[i1]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                &nbsp;and community
              </p>
              <p>
                at Queen's University while sharing&nbsp;
                <span className="inline-flex px-2 h-8 sm:h-10 overflow-hidden rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={i2}
                      variants={slide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.6 }}
                      className="block text-red-300 whitespace-nowrap flex items-center"
                    >
                      {second[i2]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }} // Adjusted timing
              className="mt-10"
            >
              <Link
                href="/mission"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold rounded-2xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───────────── DU'A SECTION ───────────── */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Arabic Du'a */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight" 
                  style={{ fontFamily: 'Noto Sans Arabic, serif' }}>
                <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  رَّبِّ زِدْنِي عِلْمًا
                </span>
              </h2>
            </motion.div>

            {/* English Translation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-200">
                "My Lord, increase me in knowledge"
              </p>
              <p className="text-lg sm:text-xl text-slate-400 font-medium">
                — Quran 20:114
              </p>
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center pt-4"
            >
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating light particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* ───────────── RESOURCES ───────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Campus Resources
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to thrive as a Muslim student at Queen's University
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/prayer",
                title: "Prayer Times",
                icon: AlarmClock,
                description: "Daily prayer times and prayer room locations.",
                color: "from-yellow-400 to-amber-500",
                delay: 0.1
              },
              {
                href: "/resources/halal",
                title: "Halal Food",
                icon: Utensils,
                description: "Halal dining on campus & around Kingston.",
                color: "from-emerald-400 to-green-500",
                delay: 0.2
              },
              {
                href: "/events",
                title: "Events",
                icon: CalendarClock,
                description: "See our upcoming Events",
                color: "from-blue-400 to-cyan-500",
                delay: 0.3
              },
              {
                href: "/resources/faq",
                title: "FAQ",
                icon: BadgeQuestionMark,
                description: "Answers to common questions.",
                color: "from-purple-400 to-pink-500",
                delay: 0.4
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ResourceTile {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="relative py-20 sm:py-24 pb-32 sm:pb-40 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,theme(colors.yellow.400),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,theme(colors.emerald.400),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Building a stronger Muslim community at Queen's University
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { Icon: UsersRound, count: '500+', label: 'Active Members', delay: 0.1 },
              { Icon: Calendar1, count: '50+', label: 'Events Annually', delay: 0.2 },
              { Icon: Medal, count: '65+', label: 'Years of Service', delay: 0.3 },
            ].map(({ Icon, count, label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.6 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 md:hover:bg-white/10 transition-all duration-300 md:hover:scale-105"
              >
                <Icon className="mx-auto h-12 w-12 text-yellow-400 mb-4 md:group-hover:scale-110 transition-transform" />
                <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {count}
                </p>
                <p className="text-lg text-slate-300">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced glow */}
        <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-yellow-400/20 blur-3xl rounded-full" />
      </section>

      {/* ───────────── CTA floating card ───────────── */}
      <section className="relative -mt-24 sm:-mt-32 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-20 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-emerald-400/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to join our{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  community
                </span>
                ?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect with fellow Muslims, grow in your faith, and make Queen's University feel like home.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link
                  href="/team"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-2xl hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Users className="w-5 h-5" />
                  Meet the Team
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/events"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold rounded-2xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <CalendarCheck className="w-5 h-5" />
                  View Events
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}