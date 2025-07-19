'use client'

import { useState, useEffect, ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import Script from 'next/script'

export default function ClientApp({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Allow exit animation to complete before hiding preloader
      setTimeout(() => {
        setLoading(false)
        // Add a small delay before showing content to ensure clean transition
        setTimeout(() => setShowContent(true), 50)
      }, 800)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader isExiting={isExiting} />
  }

  if (!showContent) {
    return <div className="fixed inset-0 bg-white" />
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 relative animate-fadeInUp">
        {children}
      </main>
      <Footer />
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "QUMSA",
          "alternateName": "Queen's University Muslim Students Association",
          "url": "https://qumsa.ca",
          "logo": "https://qumsa.ca/images/QUMSA_LOGO.png",
          "description": "Building faith, friendship, and community on campus. Kingston's premier Muslim student organization at Queen's University.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kingston",
            "addressRegion": "Ontario",
            "addressCountry": "CA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "General Inquiry",
            "email": "info@qumsa.ca"
          },
          "sameAs": [
            "https://www.facebook.com/QUMSA",
            "https://twitter.com/QUMSA_Kingston",
            "https://instagram.com/qumsa"
          ],
          "memberOf": {
            "@type": "EducationalOrganization",
            "name": "Queen's University",
            "url": "https://queensu.ca"
          },
          "foundingLocation": {
            "@type": "Place",
            "name": "Kingston, Ontario, Canada"
          }
        }        `}
      </Script>
    </>
  )
}
