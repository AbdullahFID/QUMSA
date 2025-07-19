import PrayerTime from '../../components/PrayerTime'
import Image from 'next/image'
import {
  Star,
  Navigation,
  BookOpen,
  MapPin,
  Calendar,
  Users
} from 'lucide-react'

export const metadata = {
  title:
    "Prayer Times – QUMSA | Queen's University Muslim Students' Association",
  description:
    'Accurate, real‑time Islamic prayer times for Kingston, Ontario.',
  keywords:
    'prayer times, Kingston Ontario, QUMSA, Queens University, Islamic prayer, Fajr, Dhuhr, Asr, Maghrib, Isha',
  openGraph: {
    title: 'Prayer Times – QUMSA',
    description: 'Live prayer times for Kingston, Ontario',
    type: 'website',
  },
}

export default function Prayer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-900 to-teal-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 mb-6 bg-emerald-500/20 backdrop-blur-sm border border-emerald-300/30 rounded-full px-4 py-2 mx-auto">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-200">
              Live Prayer Times
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Prayer Times for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Kingston
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto mb-12">
            Accurate, real‑time Islamic prayer times for Kingston, Ontario.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {[
              { icon: Navigation, label: 'Qibla 58° NE', sub: 'Direction to Mecca' },
              { icon: Users, label: 'Campus MSA', sub: "Queen's University" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm font-medium text-white">{label}</span>
                </div>
                <p className="text-xs text-emerald-200">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Rounded Top */}
      <main className="relative -mt-12 bg-white rounded-t-3xl shadow-lg max-w-7xl mx-auto px-6 py-16 sm:py-24 space-y-8">
        {/* Top Section - Prayer Times and Sidebar */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Prayer Times Panel */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Today's Prayer Times</h2>
            </div>
            <PrayerTime />
          </div>

          {/* Sidebar - Shortened */}
          <div className="space-y-6">
            {/* Juma Prayer Information */}
            <aside className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Juma Prayer</h3>
              </div>
              
              {/* Juma Poster Image */}
              <div className="mb-4 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/Juma/JumaImage.png"
                  alt="Juma Prayer Information"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Every Friday</p>
                  <p className="text-xs text-emerald-100">JDUC Pub • 12:30 PM</p>
                </div>
                
                {/* Juma Location Image */}
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/Juma/JumaLocation.png"
                    alt="Juma Prayer Location Map"
                    width={300}
                    height={150}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <p className="text-xs text-emerald-100">
                  Join us for congregational Friday prayers at the John Deutsch University Centre Pub
                </p>
              </div>
            </aside>

            {/* Prayer Resources */}
            <aside className="bg-white rounded-3xl p-6 shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Prayer Resources</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: 'Prayer Guide',
                    desc: 'Learn how to perform Islamic prayers',
                    href: '#'
                  },
                  {
                    title: 'Qibla Direction',
                    desc: 'Find the direction to Mecca from Kingston',
                    href: '#'
                  },
                  {
                    title: "Du'a Collection",
                    desc: 'Essential prayers and supplications',
                    href: '#'
                  }
                ].map((r) => (
                  <a
                    key={r.title}
                    href={r.href}
                    className="block p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-900 text-sm">{r.title}</h4>
                    <p className="text-xs text-slate-600">{r.desc}</p>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom Section - Weekly Events and Campus Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Events - Now wider */}
          <div className="lg:col-span-2">
            <aside className="bg-white rounded-3xl p-8 shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Weekly Events</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Friday Prayer', desc: 'JDUC Pub every Friday', time: '12:30 PM' },
                  { title: 'Halaqa', desc: 'Weekly study circle', time: 'Sun 7 PM' },
                  { title: 'Social Night', desc: 'Community gathering', time: 'Thu 8 PM' },
                ].map((e) => (
                  <div
                    key={e.title}
                    className="bg-slate-50 rounded-xl p-4 text-center"
                  >
                    <h4 className="font-semibold text-slate-900 text-sm mb-2">{e.title}</h4>
                    <p className="text-xs text-slate-600 mb-3">{e.desc}</p>
                    <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                      {e.time}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Right Sidebar - Campus Info and Get Involved */}
          <div className="space-y-6">
            {/* Campus Prayer Spaces */}
            <aside className="bg-white rounded-3xl p-6 shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Campus Prayer Spaces</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">JDUC Prayer Room</h4>
                  <p className="text-xs text-slate-600 mb-2">
                    John Deutsch University Centre, Room 233
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700">Open 24/7</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">ARC Prayer Space</h4>
                  <p className="text-xs text-slate-600 mb-2">
                    Athletics & Recreation Centre
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-orange-700">6 AM – 11 PM</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Interfaith Centre
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    Ban Righ Hall, Ground Floor
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-blue-700">By appointment</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-600">
                <strong>Note:</strong> Prayer rooms have mats & Qibla markers. Please
                respect shared spaces.
              </p>
            </aside>

            {/* Get Involved */}
            <aside className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Get Involved</h3>
              </div>
              <p className="text-sm mb-4">
                Join our community of Muslim students at Queen's University. Connect,
                learn, and grow together.
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:msa@queensu.ca" className="hover:underline">
                  📧 msa@queensu.ca
                </a>
                <a href="#" className="hover:underline">
                  📱 @QUMSA
                </a>
                <a href="#" className="hover:underline">
                  🌐 qumsa.ca
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}