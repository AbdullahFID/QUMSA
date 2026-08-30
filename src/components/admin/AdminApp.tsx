'use client'

import { useEffect, useState } from 'react'
import {
  ShieldCheck, LogOut, ExternalLink, Loader2, CalendarClock, Users,
  Link2, Landmark, Home, Lock, User, Eye, EyeOff, HelpCircle, Utensils,
  Pencil, Rocket, Globe, X,
} from 'lucide-react'
import { apiLogin, apiLogout, apiSession } from './adminApi'
import EventsEditor from './EventsEditor'
import TeamEditor from './TeamEditor'
import ResourcesEditor from './ResourcesEditor'
import PrayerEditor from './PrayerEditor'
import SiteEditor from './SiteEditor'
import FaqEditor from './FaqEditor'
import HalalEditor from './HalalEditor'
import PhotosEditor from './PhotosEditor'
import { Camera } from 'lucide-react'

type Tab = 'events' | 'photos' | 'team' | 'resources' | 'prayer' | 'halal' | 'faq' | 'site'

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'events', label: 'Events', icon: CalendarClock },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'resources', label: 'Resources', icon: Link2 },
  { id: 'prayer', label: 'Prayer', icon: Landmark },
  { id: 'halal', label: 'Halal Food', icon: Utensils },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'site', label: 'Homepage', icon: Home },
]

export default function AdminApp() {
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    apiSession().then((session) => {
      setUser(session?.username ?? null)
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <Backdrop>
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
          Checking session…
        </div>
      </Backdrop>
    )
  }

  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <LoginScreen onLogin={(username) => setUser(username)} />
  )
}

/* ─────────────────────────── backdrop ─────────────────────────── */

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative">
      <div className="absolute inset-0 islamic-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">{children}</div>
    </div>
  )
}

/* ─────────────────────────── login ─────────────────────────── */

function LoginScreen({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await apiLogin(username, password)
      onLogin(username)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setSubmitting(false)
    }
  }

  const inputWrap =
    'flex items-center gap-3 rounded-xl bg-white/5 border border-white/15 px-4 ' +
    'focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 transition'

  return (
    <Backdrop>
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-white mb-5 shadow-lg shadow-amber-400/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/QUMSA_LOGO.png" alt="QUMSA" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              QUMSA{' '}
              <span className="bg-linear-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                ADMIN
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-2">Update the website — no code required</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className={inputWrap}>
              <User className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                autoCapitalize="none"
                className="w-full bg-transparent py-3 text-white placeholder-gray-500 outline-none text-sm"
              />
            </div>
            <div className={inputWrap}>
              <Lock className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full bg-transparent py-3 text-white placeholder-gray-500 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 transition shrink-0"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !username || !password}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Executive access only · every change is tracked
        </p>
      </div>
    </Backdrop>
  )
}

/* ─────────────────────────── first-run guide ─────────────────────────── */

function WelcomeGuide() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem('qumsa-admin-guide-dismissed') === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem('qumsa-admin-guide-dismissed', '1')
    } catch {
      // fine — it'll just show again next visit
    }
  }

  if (dismissed) return null

  const steps = [
    { icon: Pencil, title: '1 · Edit', text: 'Pick a tab above and change anything — text, images, add or remove items. Nothing goes live yet.' },
    { icon: Rocket, title: '2 · Save & Publish', text: 'Hit the gold button at the bottom of the tab. That saves your changes for everyone.' },
    { icon: Globe, title: '3 · Wait ~2 minutes', text: 'The website rebuilds itself, then your changes are live on qumsa.ca. Refresh to see them.' },
  ]

  return (
    <div className="relative mb-8 p-5 sm:p-6 bg-linear-to-br from-amber-400/10 to-yellow-500/5 border border-amber-400/25 rounded-2xl">
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
        aria-label="Dismiss guide"
      >
        <X className="w-4 h-4" />
      </button>
      <h3 className="font-bold text-white mb-1">First time here? It&apos;s three steps 👋</h3>
      <p className="text-xs text-gray-400 mb-4">
        Anywhere you see a <span className="inline-flex w-4 h-4 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-bold items-center justify-center align-middle">?</span> hover it for an explanation. You can&apos;t break anything — every change is tracked and reversible.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="p-2 h-fit rounded-lg bg-amber-400/15 border border-amber-400/20 shrink-0">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── dashboard ─────────────────────────── */

function Dashboard({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('events')

  const logout = async () => {
    await apiLogout()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="fixed inset-0 islamic-pattern opacity-[0.03] pointer-events-none" />

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1.5 rounded-xl bg-white shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/QUMSA_LOGO.png" alt="" className="w-7 h-7 object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-bold tracking-tight whitespace-nowrap">
                QUMSA{' '}
                <span className="bg-linear-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  ADMIN
                </span>
              </span>
              <p className="text-[11px] text-gray-500 truncate">Signed in as {user}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View site</span>
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-300 hover:text-red-300 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-400/20 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto pb-px">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                tab === id
                  ? 'text-amber-400 border-amber-400 bg-white/5'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Editors stay mounted so switching tabs never loses unsaved edits */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
        <WelcomeGuide />
        <div hidden={tab !== 'events'}><EventsEditor /></div>
        <div hidden={tab !== 'photos'}><PhotosEditor /></div>
        <div hidden={tab !== 'team'}><TeamEditor /></div>
        <div hidden={tab !== 'resources'}><ResourcesEditor /></div>
        <div hidden={tab !== 'prayer'}><PrayerEditor /></div>
        <div hidden={tab !== 'halal'}><HalalEditor /></div>
        <div hidden={tab !== 'faq'}><FaqEditor /></div>
        <div hidden={tab !== 'site'}><SiteEditor /></div>
      </main>
    </div>
  )
}
