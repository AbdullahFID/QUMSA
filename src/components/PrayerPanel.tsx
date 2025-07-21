'use client'

import PrayerTime from './PrayerTime'
import Image from 'next/image'
import {
  Navigation,
  MapPin,
  MapPinHouse,
  BrainCog,
  UserRoundPlus,
  Heart,
  AlarmClock,
  CalendarHeart,
  CalendarClock,
  Landmark,
} from 'lucide-react'

export default function PrayerPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-6 bg-amber-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-3 sm:px-4 py-2 mx-auto">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-amber-200">
              Live Prayer Times & Events
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 px-2">
            Prayer Times for{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Kingston
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-amber-100 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Accurate, real‑time Islamic prayer times and community events for Kingston, Ontario.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
            {[
              { icon: Navigation, label: 'Qibla 58° NE', sub: 'Direction to Mecca' },
              { icon: MapPinHouse, label: 'Campus MSA', sub: "Queen's University" },
              { icon: CalendarHeart, label: 'Weekly Events', sub: 'Community Programs' },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                  <span className="text-xs sm:text-sm font-medium text-white">{label}</span>
                </div>
                <p className="text-xs text-amber-200">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Rounded Top */}
      <main className="relative -mt-8 sm:-mt-12 bg-white rounded-t-3xl shadow-lg max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 space-y-8 sm:space-y-12">
        {/* Top Section - Prayer Times and Sidebar */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Prayer Times Panel */}
          <div className="lg:col-span-3 bg-gradient-to-br from-blue-900 to-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 shadow border border-slate-100 text-white">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Today's Prayer Times</h2>
            </div>
            <PrayerTime />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Juma Prayer Information */}
            <aside className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Jummah Prayer</h3>
              </div>
              
              {/* Juma Poster Image */}
              <div className="mb-4 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/Juma/JumaImage.png"
                  alt="Jummah Prayer Information"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="space-y-3">
                <div className="bg-amber-500/20 rounded-lg p-3 border border-amber-300/30">
                  <p className="text-sm font-medium mb-1">Every Friday</p>
                  <p className="text-xs text-amber-100">Wallace Hall, JDUC • 1:30 PM</p>
                </div>
                
                {/* Juma Location Image */}
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/Juma/JumaLocation.png"
                    alt="Jummah Prayer Location Map"
                    width={300}
                    height={150}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <p className="text-xs text-amber-100">
                  Join us for congregational Friday prayers at Wallace Hall in the John Deutsch University Centre
                </p>
              </div>
            </aside>

            {/* Prayer Resources */}
            <aside className="bg-white rounded-3xl p-4 sm:p-6 shadow border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <BrainCog className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Prayer Resources</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: 'Prayer Guide',
                    desc: 'Learn how to perform Islamic prayers',
                    href: 'https://www.mymasjid.ca/beginners-guide-learn-pray-salah/chapter-4/'
                  },
                  {
                    title: 'Qibla Direction',
                    desc: 'Find the direction to Mecca from Kingston',
                    href: 'https://www.quranbookk.com/qibla-finder'
                  },
                  {
                    title: "Du'a Collection",
                    desc: 'Essential prayers and supplications',
                    href: 'https://qaryah.wordpress.com/wp-content/uploads/2008/09/collection-of-duaa-and-thikr-from-the-quraan-and-authentic-sunnah-abdul-muhsin-al-abbaad.pdf'
                  }
                ].map((r) => (
                  <a
                    key={r.title}
                    href={r.href}
                    className="block p-3 bg-slate-50 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all"
                  >
                    <h4 className="font-semibold text-slate-900 text-sm">{r.title}</h4>
                    <p className="text-xs text-slate-600">{r.desc}</p>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom Section - Weekly Schedule and Campus Prayer Spaces */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Regular Weekly Schedule - Left Side */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow border border-slate-100 text-white">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <AlarmClock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Regular Weekly Schedule</h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                { 
                  title: 'Friday Prayer', 
                  desc: 'Wallace Hall, JDUC every Friday', 
                  time: '1:30 PM', 
                  bgColor: 'bg-amber-500/20',
                  borderColor: 'border-amber-300/30',
                  textColor: 'text-amber-100',
                  badgeBg: 'bg-amber-500',
                  badgeText: 'text-white'
                },
                { 
                  title: 'Halaqa Study Circle', 
                  desc: 'Weekly Islamic education', 
                  time: 'Sun 7 PM', 
                  bgColor: 'bg-white/10',
                  borderColor: 'border-white/20',
                  textColor: 'text-white',
                  badgeBg: 'bg-white/20',
                  badgeText: 'text-white'
                },
                { 
                  title: 'Social Night', 
                  desc: 'Community gathering', 
                  time: 'Thu 8 PM', 
                  bgColor: 'bg-white/10',
                  borderColor: 'border-white/20',
                  textColor: 'text-white',
                  badgeBg: 'bg-white/20',
                  badgeText: 'text-white'
                },
              ].map((e) => (
                <div
                  key={e.title}
                  className={`${e.bgColor} rounded-xl p-4 sm:p-6 border ${e.borderColor} hover:bg-amber-500/30 transition-all`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className={`font-semibold ${e.textColor} text-base sm:text-lg mb-1`}>{e.title}</h4>
                      <p className="text-sm text-slate-200">{e.desc}</p>
                    </div>
                    <span className={`${e.badgeBg} ${e.badgeText} text-sm px-3 py-1 rounded-full font-medium whitespace-nowrap`}>
                      {e.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 sm:p-6 bg-amber-500/20 rounded-xl border border-amber-300/30">
              <p className="text-sm sm:text-base text-amber-100 text-center">
                <strong>Note:</strong> Join our community for regular prayers, educational programs, and social events throughout the year.
              </p>
            </div>
          </div>

          {/* Campus Prayer Spaces - Right Side */}
          <aside className="bg-white rounded-3xl p-6 sm:p-8 shadow border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-slate-800 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Campus Prayer Spaces</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-amber-50 hover:border-amber-200 transition-all">
                <h4 className="font-semibold text-slate-900 text-base mb-2">JDUC Prayer Room</h4>
                <p className="text-sm text-slate-600 mb-3">
                  John Deutsch University Centre, Room 233
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-amber-700 font-medium">Open 24/7</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-amber-50 hover:border-amber-200 transition-all">
                <h4 className="font-semibold text-slate-900 text-base mb-2">ARC Prayer Space</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Athletics & Recreation Centre
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-700 font-medium">6 AM – 11 PM</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-amber-50 hover:border-amber-200 transition-all">
                <h4 className="font-semibold text-slate-900 text-base mb-2">
                  Interfaith Centre
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Ban Righ Hall, Ground Floor
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-700 font-medium">By appointment</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
              <p className="text-sm text-slate-600 text-center">
                <strong>Note:</strong> Prayer rooms have mats & Qibla markers. Please respect shared spaces.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}