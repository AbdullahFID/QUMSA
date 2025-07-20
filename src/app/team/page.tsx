// app/team/page.tsx
import { UsersRound, Users, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive Team – QUMSA',
  description:
    'Meet the passionate volunteers who lead Queen\'s University Muslim Students Association.',
}


export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-900/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Badge */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full">
                <UsersRound className="w-4 h-4 text-black" />
              </div>
              <span className="text-emerald-400 font-medium text-sm sm:text-base">Meet the Team</span>
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              Executive&nbsp;
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 animate-gradient">
                Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Dedicated students driving faith, friendship, and community at Queen's.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-8 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-500" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-1000" />
        </div>
      </section>

      {/* Team Cards Section */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="max-w-md text-center">
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Coming Soon</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Meet our amazing executive team! Follow us on Instagram for the latest updates and team introductions.
                  This Webpage will be updated once our team is released on Instagram!
                </p>
                <div className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                  <span className="text-sm font-medium">Follow @qumsa</span>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400" />
    </div>
  )
}