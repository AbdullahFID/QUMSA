import ResourcePanel from "@/components/ResourcePanel";
import type { Metadata } from "next";

// Export metadata for SEO and social platforms
export const metadata: Metadata = {
  title: "Resource Hub - QUMSA | Queen's University Muslim Students Association",
  description: "Access centralized academic, spiritual, and social resources curated by QUMSA for the Queen's Muslim community. Find study guides, Islamic resources, campus support services, and community connections.",
  keywords: [
    'QUMSA resources',
    'Queen\'s Muslim student resources',
    'Islamic academic support',
    'Muslim student services Kingston',
    'Queen\'s Islamic resources',
    'QUMSA study materials',
    'Muslim campus life Queen\'s',
    'Islamic spiritual resources',
    'Queen\'s halal resources',
    'Muslim student support services',
    'QUMSA academic help',
    'Islamic community resources',
    'Queen\'s Muslim networking',
    'Muslim student handbook'
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
    title: "Resource Hub - QUMSA | Queen's University Muslim Students Association",
    description: "Access centralized academic, spiritual, and social resources curated by QUMSA for the Queen's Muslim community.",
    url: 'https://qumsa.ca/resources',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA Resource Hub - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Resource Hub - QUMSA | Queen's University Muslim Students Association",
    description: "Access centralized academic, spiritual, and social resources curated by QUMSA for the Queen's Muslim community.",
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
};

export default function Page() {
  return <ResourcePanel />;
}