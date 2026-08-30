'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'

const PRELOAD_MS = 2400 // how long the du'a screen holds (progress bar completes at ~2.2s)
const REVEAL_MS = 1000  // crossfade into the page

export default function ClientApp({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin') ?? false
  const [isExiting, setIsExiting] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Reduced motion: the CSS crossfade is instant, so don't hold the
    // (invisible) overlay and scroll lock for the full reveal duration
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealMs = reducedMotion ? 100 : REVEAL_MS

    const exitTimer = setTimeout(() => setIsExiting(true), PRELOAD_MS)
    const doneTimer = setTimeout(() => setShowPreloader(false), PRELOAD_MS + revealMs)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  // Keep the page from scrolling behind the preloader
  useEffect(() => {
    document.body.style.overflow = showPreloader && !isAdmin ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showPreloader, isAdmin])

  // QUMSA ADMIN runs chrome-free: no navbar, footer, or du'a preloader
  if (isAdmin) {
    return (
      <MotionConfig reducedMotion="user">
        <main className="flex-1 relative">{children}</main>
      </MotionConfig>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
      {showPreloader && <Preloader isExiting={isExiting} />}
    </MotionConfig>
  )
}
