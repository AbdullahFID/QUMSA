'use client'

import { useState, useEffect } from 'react'
import {
  Clock,
  MapPin,
  ClockAlert,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Bell,
  Calendar,
  Navigation,
  CalendarDays,
  CloudSunRain,
  Compass,
} from 'lucide-react'

interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

interface PrayerData {
  timings: PrayerTimes
  date: {
    readable: string
    hijri: {
      date: string
      month: {
        en: string
        ar: string
      }
      year: string
    }
  }
}

const prayerConfig = {
  Fajr: {
    icon: Compass,
    arabic: 'الفجر',
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Dawn Prayer'
  },
  Sunrise: {
    icon: Sunrise,
    arabic: 'الشروق',
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Sunrise'
  },
  Dhuhr: {
    icon: Sun,
    arabic: 'الظهر',
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Midday Prayer'
  },
  Asr: {
    icon: CloudSunRain,
    arabic: 'العصر',
    gradient: 'from-orange-400 to-red-500',
    description: 'Afternoon Prayer'
  },
  Maghrib: {
    icon: Sunset,
    arabic: 'المغرب',
    gradient: 'from-red-400 to-pink-500',
    description: 'Sunset Prayer'
  },
  Isha: {
    icon: Moon,
    arabic: 'العشاء',
    gradient: 'from-blue-600 to-indigo-700',
    description: 'Night Prayer'
  }
}

export default function PrayerTime() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrayerTimes()
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true)
      setError(null)

      // Hit our edge‑cached API route (24 h TTL)
      const response = await fetch('/api/prayer-times')
      if (!response.ok) throw new Error('Failed to fetch prayer times')

      const data = await response.json()
      setPrayerData(data)
    } catch (err) {
      console.error('Error fetching prayer times:', err)
      setError(err instanceof Error ? err.message : 'Failed to load prayer times')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    } catch {
      return timeString
    }
  }

  const getNextPrayer = () => {
    if (!prayerData?.timings) return null

    const now = new Date()
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes()

    const prayers = [
      { name: 'Fajr', time: prayerData.timings.Fajr },
      { name: 'Dhuhr', time: prayerData.timings.Dhuhr },
      { name: 'Asr', time: prayerData.timings.Asr },
      { name: 'Maghrib', time: prayerData.timings.Maghrib },
      { name: 'Isha', time: prayerData.timings.Isha }
    ]

    for (const prayer of prayers) {
      try {
        const [h, m] = prayer.time.split(':')
        const minutes = parseInt(h) * 60 + parseInt(m)
        if (minutes > currentTimeMinutes) return prayer
      } catch {
        continue
      }
    }

    // If all prayers passed, next is tomorrow's Fajr
    return prayers[0]
  }

  const getTimeUntilNext = () => {
    const nextPrayer = getNextPrayer()
    if (!nextPrayer) return ''

    try {
      const now = new Date()
      const [h, m] = nextPrayer.time.split(':')
      const target = new Date()
      target.setHours(parseInt(h), parseInt(m), 0, 0)
      if (target < now) target.setDate(target.getDate() + 1)

      const diff = target.getTime() - now.getTime()
      const hrs = Math.floor(diff / 3_600_000)
      const mins = Math.floor((diff % 3_600_000) / 60_000)
      return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
    } catch {
      return ''
    }
  }

  const nextPrayer = getNextPrayer()

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Loading Header */}
        <div className="text-center animate-pulse">
          <div className="h-6 sm:h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-3 sm:mb-4 mx-auto max-w-xs"></div>
          <div className="h-3 sm:h-4 bg-slate-200 rounded mb-2 mx-auto max-w-32"></div>
          <div className="h-12 sm:h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl mx-auto max-w-sm"></div>
        </div>
        
        {/* Loading Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 sm:h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-2">Unable to Load Prayer Times</h3>
          <p className="text-red-700 text-sm mb-3 sm:mb-4">{error}</p>
          <button
            onClick={fetchPrayerTimes}
            className="bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Current Time & Next Prayer Header */}
      <div className="text-center">
        {/* Current Time */}
        <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-3 sm:mb-4 shadow-lg">
          <ClockAlert className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-semibold">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Kingston, ON</span>
          {prayerData?.date && (
            <>
              <span className="text-slate-400 hidden xs:inline">•</span>
              <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 hidden xs:inline" />
              <span className="text-xs sm:text-sm hidden xs:inline">{prayerData.date.readable}</span>
            </>
          )}
        </div>

        {/* Date on mobile (separate line) */}
        {prayerData?.date && (
          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 xs:hidden">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{prayerData.date.readable}</span>
          </div>
        )}

        {/* Next Prayer Countdown */}
        {nextPrayer && (
          <div className="bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-800 dark:to-amber-900 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 sm:p-6 max-w-sm mx-auto shadow-sm">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Next Prayer</span>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {nextPrayer.name} - {formatTime(nextPrayer.time)}
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium text-sm sm:text-base">
                in {getTimeUntilNext()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hijri Date */}
      {prayerData?.date?.hijri && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800 to-blue-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full">
            <span className="text-xs sm:text-sm">
              {prayerData.date.hijri.date} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH
            </span>
          </div>
        </div>
      )}

      {/* Prayer Times Grid - Improved Mobile Layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {prayerData?.timings && (
          ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
        ).map((prayerName) => {
          const config = prayerConfig[prayerName]
          const IconComponent = config.icon
          const isNext = nextPrayer?.name === prayerName
          const isMainPrayer = prayerName !== 'Sunrise' // Sunrise is not a main prayer
          
          return (
            <div
              key={prayerName}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 ${
                isNext 
                  ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xl ring-2 ring-amber-400' 
                  : isMainPrayer
                  ? 'bg-gradient-to-br from-slate-800 to-blue-900 text-white hover:shadow-xl border border-slate-600'
                  : 'bg-gradient-to-br from-slate-700 to-slate-800 text-white hover:shadow-md border border-slate-600'
              }`}
            >
              {/* Prayer Icon */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  isNext 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-r ${config.gradient}`
                }`}>
                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                
                {isNext && (
                  <div className="flex items-center space-x-1 text-white/80 text-xs">
                    <Bell className="w-3 h-3" />
                    <span className="hidden xs:inline">Next</span>
                  </div>
                )}
              </div>
              
              {/* Prayer Info */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {prayerName}
                  </h3>
                  {!isMainPrayer && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isNext 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/20 text-white'
                    }`}>
                      Info
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-white/70">
                  {config.arabic}
                </p>
                
                <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {formatTime(prayerData.timings[prayerName])}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Qibla Direction */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-slate-600">
        <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
          <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          <span className="font-semibold text-white text-sm sm:text-base">Qibla Direction</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          From Kingston, ON: <span className="font-semibold text-amber-400">58° NE</span>
        </p>
      </div>
    </div>
  )
}