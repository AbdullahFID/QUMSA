import PrayerPanel from '@/components/PrayerPanel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Prayer Times & Events - QUMSA | Queen's University Muslim Students Association",
  description: 'Accurate, real‑time Islamic prayer times for Kingston, Ontario, plus upcoming community events and programs. Stay connected with your faith through precise prayer schedules and meaningful community gatherings.',
  keywords: [
    'prayer times Kingston',
    'Islamic prayer times Ontario',
    'QUMSA prayer schedule',
    'Queens University Muslim prayer',
    'Kingston mosque times',
    'Fajr prayer times',
    'Dhuhr prayer times',
    'Asr prayer times',
    'Maghrib prayer times',
    'Isha prayer times',
    'Muslim community events Kingston',
    'Islamic calendar Kingston',
    'Queen\'s Muslim prayer room',
    'Jummah prayer Queen\'s'
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
    title: "Prayer Times & Events - QUMSA | Queen's University Muslim Students Association",
    description: 'Accurate, real‑time Islamic prayer times for Kingston, Ontario, plus upcoming community events and programs.',
    url: 'https://qumsa.ca/prayer',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA Prayer Times - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prayer Times & Events - QUMSA | Queen's University Muslim Students Association",
    description: 'Accurate, real‑time Islamic prayer times for Kingston, Ontario, plus upcoming community events.',
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

export default function Prayer() {
  return <PrayerPanel />
}