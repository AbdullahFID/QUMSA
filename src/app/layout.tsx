import './globals.css'
import ClientApp from './ClientApp'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#131C65',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QUMSA',
  alternateName: "Queen's University Muslim Students Association",
  url: 'https://qumsa.ca',
  logo: 'https://qumsa.ca/images/QUMSA_LOGO.png',
  description:
    "Building faith, friendship, and community on campus. Kingston's premier Muslim student organization at Queen's University.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kingston',
    addressRegion: 'Ontario',
    addressCountry: 'CA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'General Inquiry',
    email: 'qumsachair@gmail.com',
  },
  sameAs: [
    'https://www.facebook.com/QUMSA',
    'https://twitter.com/QUMSA_Kingston',
    'https://instagram.com/qumsa',
  ],
  memberOf: {
    '@type': 'EducationalOrganization',
    name: "Queen's University",
    url: 'https://queensu.ca',
  },
  foundingLocation: {
    '@type': 'Place',
    name: 'Kingston, Ontario, Canada',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://qumsa.ca'),
  title: {
    default: "QUMSA • Queen's University Muslim Students Association",
    template: "%s | QUMSA",
  },
  description: "Building faith, friendship, and community on campus. Join Kingston's premier Muslim student organization at Queen's University.",
  keywords: [
    "Queen's University",
    "Muslim Students Association",
    "MSA",
    "Kingston Ontario",
    "Islamic community",
    "University students",
    "Prayer times",
    "Halal food",
    "Islamic events",
    "Campus ministry"
  ],
  authors: [{ name: 'QUMSA', url: 'https://qumsa.ca' }],
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico'
  },
  creator: 'QUMSA',
  publisher: 'QUMSA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    title: "QUMSA • Queen's University Muslim Students Association",
    description: "Building faith, friendship, and community on campus. Join Kingston's premier Muslim student organization at Queen's University.",
    url: '/',
    siteName: 'QUMSA',
    type: 'website',
    locale: 'en_CA',
    images: [
      {
        url: '/images/QUMSA_Banner.png',
        width: 851,
        height: 315,
        alt: 'QUMSA - Building Muslim community at Queens University',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "QUMSA • Queen's University Muslim Students Association",
    description: "Building faith, friendship, and community on campus. Join Kingston's premier Muslim student organization at Queen's University.",
    creator: '@QUMSA_Kingston',
    site: '@QUMSA_Kingston',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        alt: 'QUMSA Logo'
      }
    ]
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': '/',
      en: '/'
    }
  },
  category: 'education',
  classification: 'Student Organization'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen islamic-pattern`}>
        <ClientApp>{children}</ClientApp>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
