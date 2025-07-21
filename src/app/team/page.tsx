// app/team/page.tsx
import { UsersRound, Users, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive Team - QUMSA | Queen\'s University Muslim Students Association',
  description: 'Meet the passionate volunteers who lead Queen\'s University Muslim Students Association. Dedicated students driving faith, friendship, and community at Queen\'s University.',
  keywords: [
    'QUMSA executive team',
    'Queen\'s Muslim student leaders',
    'QUMSA board members',
    'Muslim student association executives',
    'Queen\'s Islamic leadership',
    'QUMSA volunteers',
    'Muslim community leaders Kingston',
    'Queen\'s student government',
    'Islamic student leadership',
    'QUMSA president',
    'Muslim student representatives',
    'Queen\'s Islamic community leaders',
    'QUMSA committee members',
    'Muslim student council'
  ],
  authors: [{ name: 'QUMSA' }],
  creator: 'Queen\'s University Muslim Students Association',
  publisher: 'QUMSA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Executive Team - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Meet the passionate volunteers who lead Queen\'s University Muslim Students Association. Dedicated students driving faith, friendship, and community.',
    url: 'https://qumsa.ca/team',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA Executive Team - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Team - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Meet the passionate volunteers who lead Queen\'s University Muslim Students Association.',
    images: ['/images/QUMSA_LOGO.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-navy-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-blue-800/30 to-blue-900/40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Badge */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full">
                <UsersRound className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-amber-400 font-medium text-sm sm:text-base">Meet the Team</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              Executive&nbsp;
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 animate-gradient">
                Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Dedicated students driving faith, friendship, and community at Queen's.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping delay-1000" />
        </div>
      </section>

      {/* Team Cards Section */}
      <section className="relative py-16 sm:py-24 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[40vh] sm:min-h-[50vh]">
            <div className="max-w-md w-full text-center">
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Coming Soon</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Meet our amazing executive team! Follow us on Instagram for the latest updates and team introductions.
                  This Webpage will be updated once our team is released on Instagram!
                </p>
                <div className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
                  <span className="text-sm font-medium">Follow @qumsa</span>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
    </div>
  )
}