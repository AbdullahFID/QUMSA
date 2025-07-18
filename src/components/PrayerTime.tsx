// components/PrayerTime.tsx
'use client'
import { useState, useEffect } from 'react'
import { Clock, MapPin, Sunrise, Sun, Sunset, Moon, Star, Bell, Calendar, Navigation } from 'lucide-react'

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
    icon: Star, 
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
    icon: Sun, 
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
      
      const today = new Date().toISOString().split('T')[0]
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${today}?city=Kingston&country=Canada&method=2`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch prayer times')
      }
      
      const data = await response.json()
      
      if (data.data?.timings) {
        setPrayerData(data.data)
      } else {
        throw new Error('Invalid response format')
      }
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
        const [hours, minutes] = prayer.time.split(':')
        const prayerTimeMinutes = parseInt(hours) * 60 + parseInt(minutes)
        
        if (prayerTimeMinutes > currentTimeMinutes) {
          return prayer
        }
      } catch {
        continue
      }
    }
    
    // If no prayer found for today, next is Fajr tomorrow
    return prayers[0]
  }

  const getTimeUntilNext = () => {
    const nextPrayer = getNextPrayer()
    if (!nextPrayer) return ''
    
    try {
      const now = new Date()
      const [hours, minutes] = nextPrayer.time.split(':')
      const prayerTime = new Date()
      prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      
      // If prayer time has passed today, it's tomorrow
      if (prayerTime < now) {
        prayerTime.setDate(prayerTime.getDate() + 1)
      }
      
      const diff = prayerTime.getTime() - now.getTime()
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      if (hoursLeft > 0) {
        return `${hoursLeft}h ${minutesLeft}m`
      }
      return `${minutesLeft}m`
    } catch {
      return ''
    }
  }

  const nextPrayer = getNextPrayer()

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading Header */}
        <div className="text-center animate-pulse">
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-4 mx-auto max-w-xs"></div>
          <div className="h-4 bg-slate-200 rounded mb-2 mx-auto max-w-32"></div>
          <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl mx-auto max-w-sm"></div>
        </div>
        
        {/* Loading Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Prayer Times</h3>
          <p className="text-red-700 text-sm mb-4">{error}</p>
          <button
            onClick={fetchPrayerTimes}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Current Time & Next Prayer Header */}
      <div className="text-center">
        {/* Current Time */}
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
          <Clock className="w-5 h-5" />
          <span className="text-lg font-semibold">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 mb-6">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Kingston, ON</span>
          {prayerData?.date && (
            <>
              <span className="text-slate-400">•</span>
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{prayerData.date.readable}</span>
            </>
          )}
        </div>

        {/* Next Prayer Countdown */}
        {nextPrayer && (
          <div className="bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-emerald-900 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 max-w-md mx-auto shadow-sm">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Bell className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Next Prayer</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {nextPrayer.name} - {formatTime(nextPrayer.time)}
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                in {getTimeUntilNext()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hijri Date */}
      {prayerData?.date?.hijri && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {prayerData.date.hijri.date} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH
            </span>
          </div>
        </div>
      )}

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                isNext 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl ring-2 ring-emerald-400' 
                  : isMainPrayer
                  ? 'bg-white dark:bg-slate-800 hover:shadow-xl border border-slate-200 dark:border-slate-700'
                  : 'bg-slate-50 dark:bg-slate-800/50 hover:shadow-md border border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Prayer Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isNext 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-r ${config.gradient}`
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {isNext && (
                  <div className="flex items-center space-x-1 text-white/80 text-xs">
                    <Bell className="w-3 h-3" />
                    <span>Next</span>
                  </div>
                )}
              </div>
              
              {/* Prayer Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${
                    isNext ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}>
                    {prayerName}
                  </h3>
                  {!isMainPrayer && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isNext 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      Info
                    </span>
                  )}
                </div>
                
                <p className={`text-sm ${
                  isNext ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {config.arabic}
                </p>
                
                <p className={`text-2xl font-bold font-mono ${
                  isNext ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}>
                  {formatTime(prayerData.timings[prayerName])}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Qibla Direction */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-900 dark:text-white">Qibla Direction</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          From Kingston, ON: <span className="font-semibold">58° NE</span>
        </p>
      </div>
    </div>
  )
}