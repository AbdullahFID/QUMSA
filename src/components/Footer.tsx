// components/Footer.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  MoonStar,               // brand mark (crescent + star)
  Instagram as InstagramIcon,  // alias the deprecated Instagram export
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Heart,
} from 'lucide-react'

export default function Footer() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <footer
      className={`
        relative
        bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600
        text-white
        
        /* pull up to overlap the section above */
        -mt-16
        /* softly round top corners */
        rounded-t-3xl
        /* add extra top padding so content isn't cut off */
        pt-20
        
        /* Fix rendering artifacts */
        transform-gpu
        will-change-transform
      `}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* subtle pattern in the background */}
      <div 
        className="absolute inset-0 islamic-pattern opacity-5 rounded-t-3xl"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section - Takes full width on mobile, 2 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-islamic-gold to-islamic-emerald w-fit hidden sm:block">
                <MoonStar className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text">QUMSA</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Queen&apos;s University Muslim Students Association
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-md text-sm sm:text-base text-center sm:text-left">
              Building faith, friendship, and community on campus. Join Kingston&apos;s premier
              Muslim student organization and be part of something meaningful.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://instagram.com/qumsa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-islamic-gold transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-islamic-gold focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Follow QUMSA on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@qumsa.ca"
                className="p-3 rounded-full bg-gray-800 hover:bg-islamic-emerald transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-islamic-emerald focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Email QUMSA"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold mb-6 text-islamic-gold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/mission', label: 'Our Mission' },
                { href: '/prayer', label: 'Prayer Times' },
                { href: '/events', label: 'Events' },
                { href: '/team', label: 'Executive Team' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-300 hover:text-islamic-gold transition-colors duration-300 flex items-center justify-center sm:justify-start group text-sm sm:text-base focus:outline-none focus:text-islamic-gold"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
              
              {/* Resources Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="text-gray-300 hover:text-islamic-gold transition-colors duration-300 flex items-center justify-center sm:justify-start group text-sm sm:text-base focus:outline-none focus:text-islamic-gold w-full"
                >
                  <ChevronDown className={`w-4 h-4 mr-2 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  Resources
                </button>
                
                {/* Dropdown Menu */}
                <div className={`mt-2 ml-6 space-y-2 transition-all duration-200 overflow-hidden ${isResourcesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {[
                    { href: '/resources/halal', label: 'Halal' },
                    { href: '/resources/faq', label: 'FAQ' },
                    { href: '/resources/housing', label: 'Housing' },
                  ].map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="text-gray-400 hover:text-islamic-emerald transition-colors duration-300 flex items-center justify-center sm:justify-start group text-xs sm:text-sm focus:outline-none focus:text-islamic-emerald"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {resource.label}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold mb-6 text-islamic-emerald">Contact</h4>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <MapPin className="w-5 h-5 text-islamic-gold mt-0.5 flex-shrink-0 mx-auto sm:mx-0" />
                <div className="text-center sm:text-left">
                  <p className="text-gray-300 text-sm sm:text-base">Queen&apos;s University</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Kingston, ON K7L 3N6</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Mail className="w-5 h-5 text-islamic-gold flex-shrink-0 mx-auto sm:mx-0" />
                <a
                  href="mailto:info@qumsa.ca"
                  className="text-gray-300 hover:text-islamic-gold transition-colors text-sm sm:text-base focus:outline-none focus:text-islamic-gold"
                >
                  info@qumsa.ca
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Phone className="w-5 h-5 text-islamic-gold flex-shrink-0 mx-auto sm:mx-0" />
                <a
                  href="tel:+1-613-555-QUMSA"
                  className="text-gray-300 hover:text-islamic-gold transition-colors text-sm sm:text-base focus:outline-none focus:text-islamic-gold"
                >
                  (613) 555‑QUMSA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} QUMSA · Queen&apos;s University Muslim Students
                Association
              </p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center lg:justify-start">
                Built with <Heart className="w-3 h-3 mx-1 text-red-500" /> by Abdullah Khan
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm order-1 lg:order-2">
              <a
                href="https://queensu.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-islamic-gold transition-colors flex items-center space-x-1 focus:outline-none focus:text-islamic-gold"
              >
                <span>Queen&apos;s University</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}