'use client'
import React from 'react'
import EventCard from '../../components/EventCard'
import { Calendar, Star, Sparkles, ArrowRight, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data
const events = [
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
    desc: 'A week‑long celebration featuring educational booths, guest speakers, cultural displays, and open mosque tours. Learn about Islam and connect with the community.',
    location: 'Various Campus Locations',
    time: 'All Week',
    attendees: 500,
    category: 'Educational',
    featured: true,
  },
  {
    date: 'Nov 15 2025',
    title: 'Interfaith Dialogue Panel',
    desc: 'Join students from different faith backgrounds for meaningful discussions about religion, spirituality, and building bridges in our diverse community.',
    location: 'John Deutsch University Centre',
    time: '7:00 PM – 9:00 PM',
    attendees: 80,
    category: 'Educational',
    featured: false,
  },
  {
    date: 'Dec 8 2025',
    title: 'End of Semester Celebration',
    desc: 'Celebrate the end of the semester with food, games, and awards ceremony. Reflect on our achievements and prepare for the winter break.',
    location: 'QUMSA Prayer Room',
    time: '6:00 PM – 10:00 PM',
    attendees: 120,
    category: 'Social',
    featured: false,
  },
]

export default function Events() {
  const featuredEvents = events.filter(e => e.featured)
  const regularEvents = events.filter(e => !e.featured)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-teal-900/20" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-20 sm:pb-32 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              style={{
                left: `${10 + i * 8}%`,
                top: `${15 + i * 6}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Header Badge */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                  <Calendar className="w-4 h-4 text-black" />
                </div>
                <span className="text-yellow-400 font-medium text-sm sm:text-base">Events & Activities</span>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 animate-gradient">
                Upcoming
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500 animate-gradient">
                Events
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join us for meaningful events that strengthen our community, celebrate our faith, and create lasting memories together.
            </p>

            {/* Floating Accents */}
            <div className="absolute top-1/4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-500" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping delay-1000" />
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Featured Events
                </h2>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Don\'t miss these special events that are highlights of our community calendar
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="relative py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              All Events
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover all upcoming events and activities organized by QUMSA
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <EventCard {...event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-emerald-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden group-hover:border-white/30 transition-all duration-500">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 mb-6">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Stay{' '}
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      Connected
                    </span>
                  </h2>
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Never miss an event! Follow us on social media and join our mailing list for updates.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <button className="group/btn relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl blur transition-all duration-300 group-hover/btn:blur-md group-hover/btn:scale-110" />
                    <div className="relative inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-yellow-400/50 text-yellow-400 font-semibold rounded-2xl hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm">
                      <Users className="w-5 h-5" />
                      Join Mailing List
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </button>
                  
                  <button className="group/btn relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur transition-all duration-300 group-hover/btn:blur-md group-hover/btn:scale-110" />
                    <div className="relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-2xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                      <Sparkles className="w-5 h-5" />
                      Follow Us
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-emerald-400" />
    </div>
  )
}