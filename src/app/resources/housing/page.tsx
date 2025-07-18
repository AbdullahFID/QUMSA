// app/resources/housing/page.tsx
import { Home } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Housing Support – QUMSA',
  description:
    'Find Muslim‑friendly off‑campus housing, sublets, and roommate connections in Kingston.',
}

export default function Housing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-500 via-islamic-navy to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <Home className="w-8 h-8" />
            </div>
            <span className="text-islamic-gold font-bold text-lg">Off‑Campus Housing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Find&nbsp;<span className="gradient-text">Home</span> in Kingston
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-slide-up">
            Tips, listings, and QUMSA community sublets — launching soon.
          </p>
        </div>
      </section>

      {/* Placeholder content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We’re curating reliable landlords, halal‑friendly roommates, and budget calculators. Check
            back shortly or join our <span className="gradient-text font-semibold">Telegram group</span>{' '}
            for live postings.
          </p>
        </div>
      </section>
    </div>
  )
}
