import FAQ from "@/components/FAQ";
import type { Metadata } from "next";

// Export metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "Frequently Asked Questions - QUMSA | Queen's University Muslim Students Association",
  description: "Find answers to the most commonly asked questions about QUMSA programs, events, membership, prayer facilities, and community services at Queen's University.",
  keywords: [
    'QUMSA FAQ',
    'Queen\'s Muslim students questions',
    'QUMSA membership',
    'Queen\'s Islamic services',
    'Muslim student help Kingston',
    'QUMSA programs questions',
    'Queen\'s prayer room',
    'Islamic events FAQ',
    'Muslim community support',
    'Queen\'s University Islam',
    'QUMSA contact information',
    'Muslim student resources',
    'Islamic student association FAQ',
    'Queen\'s halal food'
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
    title: "Frequently Asked Questions - QUMSA | Queen's University Muslim Students Association",
    description: "Find answers to the most commonly asked questions about QUMSA programs, events, membership, and community services at Queen's University.",
    url: 'https://qumsa.ca/faq',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'QUMSA FAQ - Queen\'s University Muslim Students Association',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Frequently Asked Questions - QUMSA | Queen's University Muslim Students Association",
    description: "Find answers to the most commonly asked questions about QUMSA programs, events, and community services.",
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
  return <FAQ />;
}