// app/layout.tsx
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "QUMSA • Queen's University Muslim Students Association",
  description:
    "Building faith, friendship, and community on campus. Join Kingston's premier Muslim student organization.",
  keywords:
    "Queen's University, Muslim Students, MSA, Kingston, Islamic, Community, Prayer, Halal",
  authors: [{ name: 'QUMSA' }],
  openGraph: {
    title: "QUMSA • Queen's University Muslim Students Association",
    description: 'Building faith, friendship, and community on campus.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "QUMSA • Queen's University Muslim Students Association",
    description: 'Building faith, friendship, and community on campus.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen islamic-pattern`}
      >
        <Navbar />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
