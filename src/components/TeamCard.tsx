// components/TeamCard.tsx
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Mail, Phone, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react'

interface Props {
  name: string
  role: string
  img: string
  description: string
  profileUrl: string
  email?: string
  phone?: string
}

export default function TeamCard({
  name,
  role,
  img,
  description,
  profileUrl,
  email,
  phone,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const hasFunFact = description && description !== 'None.' && description.trim() !== ''

  return (
    <div
      ref={cardRef}
      className="group relative w-full h-105 sm:h-115 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow Effect - Desktop only */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 211, 153, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* ===== THOUGHT BUBBLE - Desktop Only ===== */}
      {hasFunFact && (
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 pointer-events-none hidden sm:block ${
            isHovered
              ? 'opacity-100 -translate-y-full scale-100'
              : 'opacity-0 -translate-y-3/4 scale-90'
          }`}
        >
          <div className="relative max-w-64 sm:max-w-72">
            <div className="relative bg-white rounded-3xl px-5 py-4 shadow-2xl shadow-black/20">
              <div className="absolute -top-3 left-6 w-8 h-8 bg-white rounded-full" />
              <div className="absolute -top-4 left-12 w-10 h-10 bg-white rounded-full" />
              <div className="absolute -top-3 left-20 w-9 h-9 bg-white rounded-full" />
              <div className="absolute -top-2 right-8 w-7 h-7 bg-white rounded-full" />
              <div className="absolute -top-3 right-14 w-8 h-8 bg-white rounded-full" />
              <div className="absolute top-2 -left-2 w-6 h-6 bg-white rounded-full" />
              <div className="absolute top-8 -left-3 w-7 h-7 bg-white rounded-full" />
              <div className="absolute top-2 -right-2 w-6 h-6 bg-white rounded-full" />
              <div className="absolute top-8 -right-3 w-7 h-7 bg-white rounded-full" />

              <p className="relative z-10 text-slate-800 text-sm font-medium leading-relaxed text-center">
                {description}
              </p>

              <div className="absolute -top-1 -right-1 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-white rounded-full shadow-lg shadow-black/10" />
            </div>
            <div className="absolute -bottom-8 left-1/2 translate-x-1">
              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-lg shadow-black/10" />
            </div>
            <div className="absolute -bottom-11 left-1/2 translate-x-3">
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg shadow-black/10" />
            </div>
          </div>
        </div>
      )}

      {/* ===== FLIP CARD CONTAINER ===== */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ===== FRONT OF CARD ===== */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative w-full h-full bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 overflow-hidden sm:group-hover:scale-105 sm:group-hover:rotate-1">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12" />

            <div className="relative p-6 sm:p-8 h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6 group/avatar">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-blue-400 animate-spin sm:group-hover:animate-none transition-all duration-500" />
                    <div className="absolute inset-0.5 rounded-full bg-black" />

                    <div className="absolute inset-1 rounded-full overflow-hidden">
                      <Image
                        src={img}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 sm:group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce hidden sm:flex">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>

                  {hasFunFact && (
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-white/90 rounded-full items-center justify-center opacity-60 group-hover:opacity-0 transition-all duration-300 shadow-md hidden sm:flex">
                      <span className="text-xs">💭</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
                  {name}
                </h3>
                <p className="text-sm sm:text-base text-emerald-400 font-medium mb-4 px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                  {role}
                </p>

                <div className="h-8 sm:h-12 hidden sm:block" />

                {hasFunFact && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsFlipped(true)
                    }}
                    className="sm:hidden flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-400 to-teal-400 text-slate-900 font-semibold rounded-full shadow-lg shadow-emerald-400/20 active:scale-95 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Fun Fact</span>
                  </button>
                )}
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex justify-center space-x-4">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="p-3 rounded-full bg-white/5 hover:bg-emerald-400/20 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group/icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-5 h-5 text-gray-400 group-hover/icon:text-emerald-400 transition-colors" />
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="p-3 rounded-full bg-white/5 hover:bg-teal-400/20 border border-white/10 hover:border-teal-400/30 transition-all duration-300 group/icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-5 h-5 text-gray-400 group-hover/icon:text-teal-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-emerald-400/20 to-transparent rounded-bl-3xl" />
          </div>

          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <div className="absolute top-1/4 left-4 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
            <div className="absolute top-1/3 right-6 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-300" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500 transition-opacity duration-300" />
          </div>
        </div>

        {/* ===== BACK OF CARD - Mobile Only ===== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 sm:hidden">
          <div className="relative w-full h-full bg-linear-to-br from-emerald-900/90 via-teal-900/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-emerald-400/30 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="thought-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="2" fill="currentColor" className="text-emerald-400" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#thought-pattern)" />
              </svg>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl" />

            <div className="relative p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/30">
                    <MessageCircle className="w-8 h-8 text-slate-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/80 rounded-full animate-bounce" />
                  <div className="absolute -top-4 right-2 w-3 h-3 bg-white/60 rounded-full animate-bounce delay-100" />
                  <div className="absolute -top-3 right-6 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-200" />
                </div>
              </div>

              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">
                Fun Fact
              </p>

              <div className="relative mb-8 px-2">
                <span className="absolute -top-4 -left-2 text-4xl text-emerald-400/30 font-serif">&ldquo;</span>
                <p className="text-white text-lg font-medium leading-relaxed">
                  {description}
                </p>
                <span className="absolute -bottom-6 -right-2 text-4xl text-emerald-400/30 font-serif">&rdquo;</span>
              </div>

              <p className="text-gray-400 text-sm mb-6">— {name}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-full transition-all duration-300 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>

            <div className="absolute top-0 left-0 w-16 h-16 bg-linear-to-br from-emerald-400/20 to-transparent rounded-br-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-linear-to-tl from-teal-400/20 to-transparent rounded-tl-3xl" />
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D transforms */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}