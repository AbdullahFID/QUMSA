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

export default function Preloader({ isExiting = false }: PreloaderProps) {
  const [quote, setQuote] = useState<QuranQuote | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let retryTimer: NodeJS.Timeout | null = null
    let progressTimer: NodeJS.Timeout | null = null

    const loadQuote = async () => {
      try {
        // cache:no-store forces a fresh edge lookup each attempt
        const res = await fetch('/api/quran-quotes', { cache: 'no-store' })
        if (!res.ok) throw new Error('edge miss')
        const quotes: QuranQuote[] = await res.json()

        // pick & store random quote
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])

        // success → stop further retries
        if (retryTimer) clearInterval(retryTimer)
      } catch {
        // first edge call of the day may 502; try again later
      }
    }

    /* first attempt immediately, then keep retrying every 5 s until success */
    loadQuote()
    retryTimer = setInterval(loadQuote, 5000)

    /* progress‑bar animation (~2.2 s full) */
    progressTimer = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 2))
    }, 44)

    /* cleanup on unmount */
    return () => {
      if (retryTimer) clearInterval(retryTimer)
      if (progressTimer) clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-800 ease-in-out ${
      isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
    }`}>
      {/* ---------- Background image ---------- */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2940&auto=format&fit=crop"
          alt="Islamic Architecture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-blue-900/50 to-purple-900/60" />
      </div>

      {/* ---------- Expanding shapes ---------- */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        isExiting ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
          isExiting ? 'w-96 h-96' : 'w-0 h-0'
        } bg-white/10 rounded-full`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 delay-100 ${
          isExiting ? 'w-64 h-64' : 'w-0 h-0'
        } bg-white/20 rounded-full`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 delay-200 ${
          isExiting ? 'w-32 h-32' : 'w-0 h-0'
        } bg-white/30 rounded-full`} />
      </div>

      {/* ---------- Main content ---------- */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-6 transition-all duration-500 ${
        isExiting ? '-translate-y-8 opacity-0 scale-75' : 'translate-y-0 opacity-100 scale-100'
      }`}>

        {/* Quote card */}
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            {quote ? (
              <div className="text-center text-white">
                <div className="mb-4">
                  <svg className="w-8 h-8 mx-auto mb-4 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-light leading-relaxed mb-4 italic">
                  &quot;{quote.quranQuote}&quot;
                </p>
                <p className="text-sm text-green-300 font-medium">
                  — {quote.reference}
                </p>
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
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center text-white/90 text-xs space-y-1">
            <p className="font-medium">
              Built by <span className="text-green-300">Abdullah Khan</span>
            </p>
            <p>First‑Year CMPE at Queen’s University</p>
            <p>
              In Association with <span className="text-blue-300 font-semibold">QUMSA</span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Particles ---------- */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isExiting ? 'opacity-100' : 'opacity-0'
      }`}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full transition-all duration-700 ${
              isExiting ? 'animate-ping' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 500}ms`
            }}
          />
        ))}
      </div>
    </div>
  )
}
