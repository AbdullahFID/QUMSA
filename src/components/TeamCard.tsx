// components/TeamCard.tsx
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Mail, Phone, Sparkles } from 'lucide-react'

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      className="group relative w-full h-[420px] sm:h-[460px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 211, 153, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Main Card */}
      <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 overflow-hidden group-hover:scale-105 group-hover:rotate-1">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

        {/* Content */}
        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          {/* Profile Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Avatar Container */}
            <div className="relative mb-6 group/avatar">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 animate-spin group-hover:animate-none transition-all duration-500" />
                <div className="absolute inset-0.5 rounded-full bg-black" />
                
                {/* Profile Image */}
                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              {/* Floating Icon */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
            </div>

            {/* Name and Role */}
            <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {name}
            </h3>
            <p className="text-sm sm:text-base text-emerald-400 font-medium mb-4 px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">
              {role}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xs">
              {description}
            </p>
          </div>

          {/* Action Section */}
          <div className="mt-6 space-y-4">
            {/* Contact Icons */}
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

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-bl-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-4 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
        <div className="absolute top-1/3 right-6 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-300" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500 transition-opacity duration-300" />
      </div>
    </div>
  )
}