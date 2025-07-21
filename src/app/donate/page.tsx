import { Metadata } from 'next'
import Donate from '@/components/donate'

export const metadata: Metadata = {
  title: 'Donate - QUMSA | Queen\'s University Muslim Students Association',
  description: 'Support Queen\'s University Muslim Students Association. Your contribution fuels our programs, events, student services, and community initiatives that strengthen our faith and foster meaningful connections.',
  keywords: [
    'QUMSA donation',
    'Queen\'s Muslim donation',
    'Support Muslim students',
    'Islamic charity Kingston',
    'Muslim student support',
    'QUMSA fundraising',
    'Queen\'s University Islamic community',
    'Muslim student association funding',
    'Islamic programs donation',
    'Queen\'s Muslim community support'
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
    title: 'Donate - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Support Queen\'s University Muslim Students Association. Your contribution fuels our programs, events, student services, and community initiatives that strengthen our faith.',
    url: 'https://qumsa.ca/donate',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Support QUMSA - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donate - QUMSA | Queen\'s University Muslim Students Association',
    description: 'Support Queen\'s University Muslim Students Association. Your contribution fuels our programs, events, and student services.',
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

export default function DonatePage() {
  return <Donate />
}