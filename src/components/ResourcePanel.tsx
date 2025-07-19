'use client'

import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ExternalLink,
  Calendar,
  Heart,
  Users,
  AlertTriangle,
  MessageCircle,
  MapPin,
  Scale,
  Zap,
  HelpCircle,
  ArrowRight,
  Star,
  Search,
  Sparkles,
  Moon,
  Sun,
} from 'lucide-react'

/* ─────────────────────────── types ─────────────────────────── */
interface Resource {
  title: string
  url: string
  icon: React.ReactNode
  description: string
  featured?: boolean
}
interface ResourceCategory {
  [key: string]: Resource[]
}

/* ─────────────────────── Animated Background ─────────────────────── */
const AnimatedBackground = () => {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, delay: number, duration: number}>>([])
  
  useEffect(() => {
    const starArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
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
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
    </div>
  )
}

/* ────────────────────────── component ───────────────────────── */
const ResourcePanel: React.FC = () => {
  /* state ------------------------------------------------------ */
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  /* resources -------------------------------------------------- */
  const resources: ResourceCategory = {
    'Ramadan & Community': [
      {
        title: 'Ramadan Iftar Donation',
        url: 'https://www.launchgood.com/v4/campaign/qumsa_2025_ramadan_iftar_program',
        icon: <Heart className="w-6 h-6" />,
        description: 'Support our community Iftar program during the holy month',
        featured: true,
      },
      {
        title: 'Ramadan Iftars Volunteer Sign Up 2025',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSdG95p_4DhImGpG496phBMszzNtv9ZOh5ajTOEPV4d5wvew2g/viewform',
        icon: <Users className="w-6 h-6" />,
        description: 'Join our volunteer team for Ramadan events and community service',
      },
      {
        title: 'Ramadan Resources',
        url: 'https://drive.google.com/drive/folders/1rMCYRXNlu8cpHgLiOhBz7Ea6EMdUu7hm',
        icon: <Calendar className="w-6 h-6" />,
        description: 'Complete collection of Ramadan materials and spiritual resources',
      },
    ],
    'Community Support': [
      {
        title: 'Report an Incident',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScvCBcbHT54johcw318W4A84TyzVXpTkn6VNAL1jO7sr8ipxg/viewform',
        icon: <AlertTriangle className="w-6 h-6" />,
        description: 'Safe and confidential reporting for any community concerns',
        featured: true,
      },
      {
        title: 'QUMSA Feedback Form',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSehVDpbg6QM56gaW5Y51gFH-t0b55TF_qrMA7b0-mCKg0PWPw/viewform',
        icon: <MessageCircle className="w-6 h-6" />,
        description: 'Share your thoughts, suggestions, and help us improve',
      },
      {
        title: 'Khatib Volunteer',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeGpLRbyscX3qdrJes9tcT2H7J3615sSqLnnnL48Y3fl2jxEQ/viewform?usp=send_form',
        icon: <Users className="w-6 h-6" />,
        description: 'Volunteer to give Friday sermons and serve the community',
      },
      {
        title: 'Naseeha Mental Health Resources',
        url: 'https://www.naseeha.org/about-us/',
        icon: <Heart className="w-6 h-6" />,
        description: 'Professional mental health support specifically for Muslims',
      },
    ],
    'Palestine Solidarity': [
      {
        title: 'Joint Statement on Palestine',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfN1szzgpHRcSXOJph5s4XOHirMXHc72srT1JBxu1kJHRpmzg/viewform',
        icon: <Scale className="w-6 h-6" />,
        description: "Queen's Palestine Solidarity Groups official statement",
      },
      {
        title: 'Donate to Palestine – Islamic Relief',
        url: 'https://www.islamicreliefcanada.org/emergencies/palestine-appeal',
        icon: <Heart className="w-6 h-6" />,
        description: 'Support Palestinian relief efforts through Islamic Relief Canada',
        featured: true,
      },
      {
        title: 'Donate to Palestine – LaunchGood',
        url: 'https://www.launchgood.com/v4/campaign/palestine_under_attack',
        icon: <Heart className="w-6 h-6" />,
        description: 'Emergency humanitarian aid for Palestine through LaunchGood',
      },
    ],
    'Connect & Communicate': [
      {
        title: 'QUMSA WhatsApp Channel',
        url: 'https://www.whatsapp.com/channel/0029VaEZcoSLNSZyWbQK390Q',
        icon: <MessageCircle className="w-6 h-6" />,
        description: 'Stay updated with official announcements and community news',
        featured: true,
      },
      {
        title: 'Brothers WhatsApp Group',
        url: 'https://chat.whatsapp.com/KtJKrInPRiaKfZ4HmCOl5q?mode=r_c',
        icon: <Users className="w-6 h-6" />,
        description: 'Connect with brothers in the community and build friendships',
      },
      {
        title: 'Sisters WhatsApp Group',
        url: 'https://chat.whatsapp.com/I3bo4j8jmvi5i7z02YF7qT',
        icon: <Users className="w-6 h-6" />,
        description: 'Connect with sisters in the community and build friendships',
      },
    ],
    'Local Resources': [
      {
        title: 'Islamic Society of Kingston',
        url: 'https://kingstonmuslims.ca/',
        icon: <MapPin className="w-6 h-6" />,
        description: 'Local Islamic community centre and mosque services',
      },
      {
        title: 'OSAP for Muslims',
        url: 'https://osapformuslims.ca/',
        icon: <Zap className="w-6 h-6" />,
        description: 'Financial-aid guidance specifically for Muslim students',
      },
      {
        title: 'Kingston Mosque Bus Stop Petition',
        url: 'https://www.change.org/p/kingston-city-officials-kingston-ontario-mosque-bus-stop',
        icon: <MapPin className="w-6 h-6" />,
        description: 'Support better public-transit access to the local mosque',
      },
    ],
    'Human Rights': [
      {
        title: 'Petition Against Uyghur Forced Labour',
        url: 'https://www.change.org/p/justin-trudeau-ban-products-made-from-uyghur-forced-labour',
        icon: <Scale className="w-6 h-6" />,
        description: 'Stand against Uyghur persecution and forced-labour products',
      },
      {
        title: 'Black Lives Matter Resources',
        url: 'https://blacklivesmatters.carrd.co/',
        icon: <Scale className="w-6 h-6" />,
        description: 'Support racial-justice initiatives and community solidarity',
      },
    ],
  }

  /* FAQs -------------------------------------------------------- */
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

  /* derived lists ---------------------------------------------- */
  const allResources = Object.entries(resources).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  )
  const featuredResources = allResources.filter((r) => r.featured)
  const filteredResources =
    searchTerm.length === 0
      ? []
      : allResources.filter(
          (r) =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.category.toLowerCase().includes(searchTerm.toLowerCase())
        )

  /* helpers ----------------------------------------------------- */
  const toggleFAQ = (idx: number) => setOpenFAQ(openFAQ === idx ? null : idx)
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-20 relative text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Floating Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/10">
              <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Community
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 text-slate-300 leading-relaxed">
              Everything you need to connect, contribute, and thrive in our
              vibrant Muslim community at&nbsp;Queen&rsquo;s University.
            </p>

            {/* Enhanced Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative group">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="peer w-full py-6 pl-16 pr-6 rounded-2xl 
                             bg-white/10 backdrop-blur-2xl shadow-2xl 
                             border border-white/20
                             focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30
                             text-white placeholder-slate-300 text-lg
                             transition-all duration-300 hover:bg-white/15"
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center">
                  <Search className="w-6 h-6 text-slate-300 peer-focus:text-yellow-400 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-yellow-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-yellow-500/10 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── SEARCH RESULTS ───────────── */}
        {searchTerm && (
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-slate-300">
                  Found {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
                </p>
              </div>
              
              {filteredResources.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-lg">No matching resources found. Try different keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl 
                                 border border-white/20 hover:border-white/40
                                 hover:bg-white/15 transition-all duration-500 
                                 hover:scale-105 hover:-translate-y-2"
                      onMouseEnter={() => setHoveredCard(`search-${idx}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {item.featured && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="p-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300">
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <div className="text-xs font-semibold text-yellow-400 bg-yellow-400/20 px-3 py-1 rounded-full">
                          {item.category}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                        <span>Explore Resource</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      
                      {hoveredCard === `search-${idx}` && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 pointer-events-none" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ───────────── FEATURED RESOURCES ───────────── */}
        {!searchTerm && (
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full">
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-400">Featured Resources</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Most Essential Links
                </h2>
                <p className="text-xl text-slate-300">
                  Quick access to our most important community resources
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredResources.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
                               rounded-3xl border border-white/20 hover:border-yellow-400/50
                               hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10
                               transition-all duration-500 hover:scale-105 text-center"
                    onMouseEnter={() => setHoveredCard(`featured-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative">
                      <div className="inline-flex p-6 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl mb-6 group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300">
                        <div className="text-white transform group-hover:scale-110 transition-transform">{item.icon}</div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {hoveredCard === `featured-${idx}` && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 pointer-events-none" />
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───────────── TABLE OF CONTENTS ───────────── */}
        {!searchTerm && (
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 text-white">
                  Browse by Category
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.keys(resources).map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => scrollTo(cat.replace(/\s+/g, '-').toLowerCase())}
                    className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl 
                               border border-white/20 hover:border-white/40
                               hover:bg-white/15 transition-all duration-500 
                               hover:scale-105 text-left"
                    onMouseEnter={() => setHoveredCard(`category-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors">
                      {cat}
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {resources[cat].length} amazing {resources[cat].length === 1 ? 'resource' : 'resources'} available
                    </p>
                    <div className="flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                      <span>Explore Category</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    {hoveredCard === `category-${idx}` && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none" />
                    )}
                  </button>
                ))}
                
                <button
                  onClick={() => scrollTo('faq')}
                  className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl 
                             border border-white/20 hover:border-white/40
                             hover:bg-white/15 transition-all duration-500 
                             hover:scale-105 text-left"
                  onMouseEnter={() => setHoveredCard('faq-category')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors">
                    FAQ
                  </h3>
                  <p className="text-slate-300 mb-6">
                    {faqs.length} frequently asked questions answered
                  </p>
                  <div className="flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                    <span>Get Answers</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  {hoveredCard === 'faq-category' && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none" />
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ───────────── RESOURCE SECTIONS ───────────── */}
        {!searchTerm && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
            {Object.entries(resources).map(([category, items], categoryIdx) => (
              <section
                key={category}
                id={category.replace(/\s+/g, '-').toLowerCase()}
                className="scroll-mt-20 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 rounded-3xl" />
                <div className="relative">
                  <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 text-white">
                      {category}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl 
                                   border border-white/20 hover:border-white/40
                                   hover:bg-white/15 transition-all duration-500 
                                   hover:scale-105 hover:-translate-y-3"
                        onMouseEnter={() => setHoveredCard(`${category}-${idx}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {item.featured && (
                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        )}
                        
                        <div className="flex items-start space-x-6 mb-6">
                          <div className="p-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300">
                            <div className="text-white">{item.icon}</div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                          <span>Access Resource</span>
                          <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        
                        {hoveredCard === `${category}-${idx}` && (
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 pointer-events-none" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ───────────── FAQ ───────────── */}
        {!searchTerm && (
          <section id="faq" className="scroll-mt-20 py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse">
                    <HelpCircle className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-400">FAQ</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-slate-300">
                  Get answers to common questions about our community and resources
                </p>
              </div>

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
                        className={`w-6 h-6 text-yellow-400 transition-transform duration-300 ${
                          openFAQ === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFAQ === idx && (
                      <div className="px-8 pb-8">
                        <div className="pt-4 border-t border-white/20">
                          <p className="text-slate-300 leading-relaxed text-lg">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

export default ResourcePanel
