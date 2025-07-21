// src/app/mission/page.tsx

import type { Metadata } from 'next'
import MissionPanels from '@/components/MissionPanels'

// Typed metadata export for SEO and social previews
export const metadata: Metadata = {
  title: 'Our Mission - QUMSA | Queen\'s University Muslim Students Association',
  description: 'Learn about QUMSA\'s mission to build faith, friendship, and community at Queen\'s University. Discover how we strengthen Islamic identity, foster brotherhood and sisterhood, and create a welcoming environment for all Muslim students.',
  keywords: [
    'QUMSA mission',
    'Queen\'s Muslim community',
    'Islamic faith at university',
    'Muslim student brotherhood',
    'Islamic sisterhood Queen\'s',
    'Muslim student mission',
    'Queen\'s Islamic values',
    'Muslim community building',
    'Islamic identity Kingston',
    'Queen\'s University Muslim vision'
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
    title: 'Our Mission - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Learn about QUMSA\'s mission to build faith, friendship, and community at Queen\'s University. Discover how we strengthen Islamic identity and foster brotherhood and sisterhood.',
    url: 'https://qumsa.ca/mission',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA Mission - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mission - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Learn about QUMSA\'s mission to build faith, friendship, and community at Queen\'s University.',
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

export default function MissionPage() {
  return <MissionPanels />
}