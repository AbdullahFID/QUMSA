'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Heart, MessageCircle } from 'lucide-react'

/* ─────────────────────── Animated Background ─────────────────────── */
const AnimatedBackground = () => {
  const [stars, setStars] = React.useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([])

  React.useEffect(() => {
    const starArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
    setStars(starArray)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900" />

      {/* Animated Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Can non-Muslims attend QUMSA events?',
      a: 'Absolutely! Our events are open to everyone interested in learning about Islam and building community. We welcome people of all backgrounds who want to engage respectfully and learn more about Islamic culture and values.',
    },
    {
      q: 'Is there a membership fee for QUMSA?',
      a: "No membership fee required! All Queen's students are welcome to join at no cost. Some special events may have a small ticket fee, but we always strive to keep events accessible.",
    },
    {
      q: 'Where and when do Friday prayers take place?',
      a: 'During the academic term, Jummah prayers are held in Mitchell Hall Auditorium every Friday. Follow @qumsa on Instagram or join our WhatsApp channel for weekly timing/location updates.',
    },
    {
      q: 'How can I get involved with QUMSA activities?',
      a: 'Join our WhatsApp groups, attend events, volunteer for Ramadan Iftars, become a Khatib volunteer, or fill out our feedback form to suggest new initiatives. We love enthusiastic community members!',
    },
    {
      q: 'What resources are available for new Muslim students?',
      a: 'We provide prayer-space info, halal-food guides, connection to local Islamic communities, mental-health resources via Naseeha, academic-support networks, and above all a welcoming community.',
    },
    {
      q: 'How do I report concerns or incidents?',
      a: 'Use our confidential incident-reporting form in the Community Support section. All reports are taken seriously and addressed promptly—your safety and well-being are priorities.',
    },
    {
      q: 'Are there opportunities for Islamic education and learning?',
      a: 'Yes! We host study circles, guest speakers, and workshops. Watch our socials/WhatsApp for upcoming events, or suggest topics through the feedback form.',
    },
    {
      q: "How can I contribute to QUMSA's charitable initiatives?",
      a: 'Donate to our Ramadan Iftar, Palestine relief, or propose new initiatives. Volunteers are always needed to organise and execute service projects throughout the year.',
    },
  ]

  const toggleFAQ = (idx: number) => setOpenFAQ(openFAQ === idx ? null : idx)

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-20 relative text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/10">
              <HelpCircle className="w-10 h-10 text-yellow-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 text-slate-300 leading-relaxed">
              Get answers to common questions about our community and resources at Queen&rsquo;s University.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20
                            hover:border-white/40 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-8 text-left flex justify-between items-center
                              hover:bg-white/5 transition-colors rounded-3xl"
                  >
                    <h3 className="text-xl font-semibold pr-4 text-white">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-yellow-400 transition-transform duration-500 ease-in-out ${
                        openFAQ === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Animated content container */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === idx 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-8">
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-slate-300 leading-relaxed text-lg">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 relative text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4 text-white">
              Built with love for our community
            </h3>
            
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              This resource hub was created to strengthen our bonds and make essential 
              services easily accessible for all QUMSA members and friends.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.whatsapp.com/channel/0029VaEZcoSLNSZyWbQK390Q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 
                           backdrop-blur-xl rounded-full border border-white/20 hover:border-white/40
                           text-white hover:text-yellow-300 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp</span>
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSehVDpbg6QM56gaW5Y51gFH-t0b55TF_qrMA7b0-mCKg0PWPw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 
                           backdrop-blur-xl rounded-full border border-white/20 hover:border-white/40
                           text-white hover:text-yellow-300 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Feedback</span>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-slate-400">
                © 2025 QUMSA & Collaborators
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FAQ