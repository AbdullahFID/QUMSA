import { Metadata } from 'next'
import EventPage from '@/components/EventsPage'

export const metadata: Metadata = {
  title: 'Events - QUMSA | Queen\'s University Muslim Students Association',
  description: 'Discover upcoming QUMSA events, activities, and community gatherings. Join us for meaningful events that strengthen our community, celebrate our faith, and create lasting memories together.',
  keywords: [
    'QUMSA events',
    'Queen\'s Muslim events',
    'Islamic events Kingston',
    'Muslim student activities',
    'QUMSA calendar',
    'Islam awareness week',
    'Jummah prayer',
    'Iftar program',
    'Muslim community events',
    'Queen\'s University Islamic activities'
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
    title: 'Events - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Join us for meaningful events that strengthen our community, celebrate our faith, and create lasting memories together. Discover upcoming QUMSA events and activities.',
    url: 'https://qumsa.ca/events',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA Events - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Join us for meaningful events that strengthen our community, celebrate our faith, and create lasting memories together.',
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

export default function Events() {
  return <EventPage />
}