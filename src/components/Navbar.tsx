'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu,
  ChevronDown,
  HeartHandshake,
  Home,
  Target,
  Clock,
  Users,
  Calendar,
  BookOpen,
} from 'lucide-react'



const primaryLinks = [
  { href: '/',        label: 'Home',    icon: Home     },
  { href: '/mission', label: 'Mission', icon: Target   },
  { href: '/prayer',  label: 'Prayer',  icon: Clock    },
  { href: '/team',    label: 'Team',    icon: Users    },
  { href: '/events',  label: 'Events',  icon: Calendar },
]

const resourceLinks = [
  { href: '/resources/halal', label: 'Halal Food Guide' },
  { href: '/resources/links', label: 'Important Links' },
  { href: '/resources/faq',   label: 'FAQ and More' },
  { href: '/resources/merch', label: 'Merch Coming Soon' },
]

function SmoothLink({
  href,
  children,
  className = '',
  onClick
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClick) onClick()
    if (window.location.pathname === href) return
    setIsNavigating(true)
    await new Promise(resolve => setTimeout(resolve, 150))
    router.push(href)
    setIsNavigating(false)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${isNavigating ? 'opacity-75 transform scale-95' : ''} transition-all duration-150`}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const [scroll,           setScroll]           = useState(false)
  const [mobileOpen,      setMobileOpen]      = useState(false)
  const [deskDrop,        setDeskDrop]        = useState(false)
  const [showMobileNav,   setShowMobileNav]   = useState(true)
  const [showFloatingBtn, setShowFloatingBtn] = useState(false)
  const pathname = usePathname()

  const isActiveLink = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const isResourcesActive = () =>
    resourceLinks.some(link => pathname.startsWith(link.href))

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScroll(y > 10)
      if (y > 50) {
        setShowMobileNav(false)
        setShowFloatingBtn(true)
        setMobileOpen(false)
      } else {
        setShowMobileNav(true)
        setShowFloatingBtn(false)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!(deskDrop || mobileOpen)) return
    const onClickOutside = () => {
      setDeskDrop(false)
      setMobileOpen(false)
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [deskDrop, mobileOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`
          hidden md:block fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scroll
            ? 'bg-[#131C65] shadow-xl backdrop-blur-md'
            : 'bg-transparent'
          }
        `}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <SmoothLink href="/" className="flex items-center gap-3 group">
            <div className="relative group-hover:shadow-lg transition">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-400 to-green-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white"></div>
              </div>
              <div className="relative p-2 rounded-full bg-white">
                <img
                  src="/images/QUMSA_LOGO.png"
                  alt="QUMSA Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">
              QUMSA
            </span>
          </SmoothLink>

          {/* Links */}
          <div className="flex items-center gap-8">
            {primaryLinks.map(({ href, label, icon: Icon }) => {
              const isActive = isActiveLink(href)
              return (
                <SmoothLink
                  key={href}
                  href={href}
                  className={`
                    relative font-medium transition-all duration-300 group flex items-center gap-2
                    ${isActive
                      ? 'text-yellow-400'
                      : 'text-white hover:text-yellow-400'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  <span className={`
                    absolute left-0 -bottom-1 h-0.5 bg-yellow-400 transition-all duration-300 ease-out
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}/>
                </SmoothLink>
              )
            })}

            {/* Resources Dropdown */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setDeskDrop(!deskDrop)}
                className={`
                  flex items-center gap-2 font-medium transition-all duration-300 group relative
                  ${isResourcesActive()
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-400'
                  }
                `}
              >
                <BookOpen className="w-4 h-4" />
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${deskDrop ? 'rotate-180' : ''}`} />
                <span className={`
                  absolute left-0 -bottom-1 h-0.5 bg-yellow-400 transition-all duration-300 ease-out
                  ${isResourcesActive() ? 'w-full' : 'w-0 group-hover:w-full'}
                `}/>
              </button>
              <div className={`
                absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200
                overflow-hidden transition-all duration-200 origin-top-right max-h-64
                ${deskDrop ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
              `}>
                {resourceLinks.map(({ href, label }) => {
                  const isActive = isActiveLink(href)
                  return (
                    <SmoothLink
                      key={href}
                      href={href}
                      className={`
                        block px-4 py-3 transition-all duration-200
                        ${
                          isActive
                            ? 'bg-yellow-600/10 text-yellow-700 border-r-2 border-yellow-600'
                            : 'text-gray-700 hover:bg-yellow-600/10 hover:text-yellow-700'
                        }
                      `}
                      onClick={() => setDeskDrop(false)}
                    >
                      {label}
                    </SmoothLink>
                  )
                })}
              </div>
            </div>

            {/* Donate Button */}
           <SmoothLink
            href="/donate"
            className="
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold
              text-white bg-transparent backdrop-blur-sm
              shadow-[0_2px_6px_rgba(255,255,255,0.1),0_0_1px_rgba(255,255,255,0.25)]
              hover:shadow-[0_4px_12px_rgba(255,255,255,0.2),0_0_2px_rgba(255,255,255,0.4)]
              ring-1 ring-inset ring-white/10 hover:ring-white/20
              transition-all duration-300 transform hover:-translate-y-0.5
            "
          >
            <HeartHandshake className="w-4 h-4 text-white/90" />
            Donate
          </SmoothLink>

          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <button
          onClick={() => {
            setShowMobileNav(true)
            setShowFloatingBtn(false)
            setMobileOpen(false)
          }}
          className={`
            fixed right-4 bottom-20 z-50 w-14 h-14 rounded-full
            bg-[#131C65]/95 backdrop-blur-md border border-gray-800 shadow-2xl
            flex items-center justify-center transition-all duration-300
            hover:shadow-3xl hover:scale-105 active:scale-95
            ${showFloatingBtn ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}
          `}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <nav
          className={`
            fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out
            ${showMobileNav ? 'translate-y-0' : 'translate-y-full'}
          `}
        >
          <div className="flex justify-center px-4 pb-4 pt-2">
            <div className="bg-[#131C65]/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl border border-gray-800 max-w-sm w-full">
              <div className="flex items-center justify-between">
                {primaryLinks.slice(0, 4).map(({ href, label, icon: Icon }) => {
                  const isActive = isActiveLink(href)
                  return (
                    <SmoothLink
                      key={href}
                      href={href}
                      className="flex flex-col items-center gap-1 group min-w-0 flex-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className={`
                        w-5 h-5 transition
                        ${isActive
                          ? 'text-yellow-400'
                          : 'text-white group-hover:text-yellow-400'
                        }
                      `}/>
                      <span className={`
                        text-xs transition truncate
                        ${isActive
                          ? 'text-yellow-400'
                          : 'text-white group-hover:text-yellow-400'
                        }
                      `}>
                        {label}
                      </span>
                      {isActive && <div className="w-1 h-1 rounded-full bg-yellow-400 mt-0.5" />}
                    </SmoothLink>
                  )
                })}
                <button
                  onClick={e => { e.stopPropagation(); setMobileOpen(!mobileOpen) }}
                  className="flex flex-col items-center gap-1 group min-w-0 flex-1"
                >
                  <Menu className="w-5 h-5 text-white group-hover:text-yellow-400 transition" />
                  <span className="text-xs text-white group-hover:text-yellow-400 transition">More</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center px-4 pb-2 relative z-50">
            <div
              className={`
                bg-[#131C65]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 max-w-sm w-full
                overflow-hidden transition-all duration-300 origin-bottom
                ${mobileOpen ? 'scale-100 opacity-100 max-h-96' : 'scale-95 opacity-0 max-h-0 pointer-events-none'}
              `}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 space-y-4">
                <SmoothLink
                  href="/events"
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 transition
                    ${
                      isActiveLink('/events')
                        ? 'text-yellow-400'
                        : 'text-white hover:text-yellow-400'
                    }
                  `}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Events</span>
                  {isActiveLink('/events') && <div className="w-1 h-1 rounded-full bg-yellow-400 ml-auto" />}
                </SmoothLink>

                <div className="space-y-2">
                  <div className={`
                    flex items-center gap-3 pb-2 border-b border-gray-800
                    ${isResourcesActive() ? 'text-yellow-400' : 'text-white'}
                  `}>
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Resources</span>
                    {isResourcesActive() && <div className="w-1 h-1 rounded-full bg-yellow-400 ml-auto" />}
                  </div>
                  <div className="space-y-2 pl-8">
                    {resourceLinks.map(({ href, label }) => {
                      const isSubActive = isActiveLink(href)
                      return (
                        <SmoothLink
                          key={href}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={`
                            block transition text-sm items-center
                            ${isSubActive
                              ? 'text-yellow-400'
                              : 'text-white hover:text-yellow-400'
                            }
                          `}
                        >
                          {label}
                          {isSubActive && <div className={`w-1 h-1 rounded-full bg-[#FFD700] ml-auto`} />}
                        </SmoothLink>
                      )
                    })}
                  </div>
                </div>

                <SmoothLink
                  href="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold
                    text-white bg-transparent backdrop-blur-sm
                    shadow-[0_2px_6px_rgba(255,255,255,0.1),0_0_1px_rgba(255,255,255,0.25)]
                    hover:shadow-[0_4px_12px_rgba(255,255,255,0.2),0_0_2px_rgba(255,255,255,0.4)]
                    ring-1 ring-inset hover:ring-white/20
                    ring-amber-400
                    transition-all duration-300
                  "
                >
                  <HeartHandshake className="w-4 h-4" />
                  Donate
                </SmoothLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}