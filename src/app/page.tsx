// app/page.tsx
import type { Metadata } from 'next'
import Homepage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'QUMSA | Queen\'s University Muslim Students Association - Home Page',
  description: 'Join Queen\'s University Muslim Students Association (QUMSA) - building faith, friendship, and community at Queen\'s University. Prayer times, halal food, events, and Islamic resources for Muslim students in Kingston, Ontario.',
  keywords: [
    'QUMSA',
    'Queen\'s University Muslim Students Association',
    'Queen\'s Muslim students',
    'Islamic community Queen\'s',
    'Muslim students Kingston',
    'Queen\'s Islamic society',
    'Prayer times Queen\'s',
    'Halal food Kingston',
    'Muslim student events',
    'Queen\'s mosque',
    'Islamic student organization',
    'Muslim community Ontario',
    'Queen\'s University Islamic',
    'MSA Queen\'s',
    'Muslim students Canada',
    'Islamic faith community',
    'Queen\'s religious groups',
    'Muslim student support',
    'Islamic activities Queen\'s',
    'Kingston Muslim community'
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
    title: 'QUMSA | Queen\'s University Muslim Students Association',
    description: 'Building faith, friendship, and community at Queen\'s University. Join our vibrant Muslim student community for prayer, events, and spiritual growth.',
    url: 'https://qumsa.ca',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QUMSA | Queen\'s University Muslim Students Association',
    description: 'Building faith, friendship, and community at Queen\'s University. Join our vibrant Muslim student community.',
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

export default function Page() {
  return <Homepage />
}