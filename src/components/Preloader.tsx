// components/Preloader.tsx
'use client'

import { useState, useEffect } from 'react'

interface PreloaderProps {
  isExiting?: boolean
}

interface QuranQuote {
  quranQuote: string
  reference: string
}

type Particle = {
  left: string
  top: string
  delay: string
  duration: string
}

// Shown instantly (and whenever the edge API is unreachable, e.g. local dev)
const FALLBACK_QUOTES: QuranQuote[] = [
  { quranQuote: 'And He found you lost and guided you.', reference: 'Quran 93:7' },
  { quranQuote: 'Indeed, with hardship comes ease.', reference: 'Quran 94:6' },
  { quranQuote: 'And whoever puts their trust in Allah, He will be sufficient for them.', reference: 'Quran 65:3' },
  { quranQuote: 'So remember Me; I will remember you.', reference: 'Quran 2:152' },
  { quranQuote: 'Allah does not burden a soul beyond that it can bear.', reference: 'Quran 2:286' },
  { quranQuote: 'And My mercy encompasses all things.', reference: 'Quran 7:156' },
]

export default function Preloader({ isExiting = false }: PreloaderProps) {
  const [quote, setQuote] = useState<QuranQuote | null>(null)
  const [progress, setProgress] = useState(0)

  // Particles are generated client-side only — empty array on SSR keeps hydration safe
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3000}ms`,
        duration: `${2500 + Math.random() * 2500}ms`,
      }))
    )
  }, [])

  useEffect(() => {
    let cancelled = false

    // Show a quote immediately; upgrade to the full API pool if it responds in time
    setQuote(FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)])

    const loadQuote = async () => {
      try {
        const res = await fetch('/api/quran-quotes', { cache: 'no-store' })
        if (!res.ok) return
        const quotes: QuranQuote[] = await res.json()
        if (!cancelled && Array.isArray(quotes) && quotes.length > 0) {
          setQuote(quotes[Math.floor(Math.random() * quotes.length)])
        }
      } catch {
        // fallback quote is already on screen
      }
    }
    loadQuote()

    const progressTimer = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 2))
    }, 44)

    return () => {
      cancelled = true
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-1000 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/preloader-architecture.jpg"
          alt="Islamic Architecture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-green-900/60 via-blue-900/50 to-purple-900/60" />
      </div>

      {/* Ambient twinkling particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Main content — drifts up softly as the page beneath is revealed */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full px-6 transition-all duration-700 ease-out ${
          isExiting ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Quote card */}
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            {quote ? (
              <div className="text-center text-white">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-light leading-relaxed mb-4 italic">
                  &quot;{quote.quranQuote}&quot;
                </p>
                <p className="text-sm text-green-300 font-medium">— {quote.reference}</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-2" />
                  <div className="h-4 bg-white/20 rounded mb-2" />
                  <div className="h-3 bg-white/20 rounded w-1/2 mx-auto" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress + credits */}
        <div className="w-full max-w-md">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm font-medium">Loading...</span>
              <span className="text-white text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
              <div
                className="bg-linear-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center text-white/90 text-xs space-y-1">
            <p className="font-medium">
              Built by <span className="text-green-300">Abdullah Khan</span>
            </p>
            <p className="text-white/70">abdullah.khan@queensu.ca</p>
            <p>Second-Year CMPE at Queen&apos;s University</p>
            <p>
              In Association with <span className="text-blue-300 font-semibold">QUMSA</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
