'use client'

import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ExternalLink,
  ArrowRight,
  Star,
  Search,
  Sparkles,
  Moon,
  Sun,
  Calendar,
  HeartHandshake,
  UserPlus,
  AlertTriangle,
  MessageSquareText,
  Mic,
  HeartPulse,
  Scale,
  HandHeart,
  HeartPlus,
  MessageCircle,
  MessagesSquare,
  MessageSquare,
  MapPin,
  Zap,
  Locate,
  Gavel,
  CircleEqual,
  Heart,
  HelpCircle,
} from 'lucide-react'

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

const AnimatedBackground = () => {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([])

  useEffect(() => {
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-navy-900" />

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

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-amber-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}

const ResourcePanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const resources: ResourceCategory = {
    'Ramadan & Community': [
      {
        title: 'Ramadan Iftar Donation',
        url: 'https://www.launchgood.com/v4/campaign/qumsa_2025_ramadan_iftar_program',
        icon: <HeartHandshake className="w-6 h-6" />,
        description: 'Support our community Iftar program during the holy month',
        featured: true,
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
        icon: <MessageSquareText className="w-6 h-6" />,
        description: 'Share your thoughts, suggestions, and help us improve',
      },
      {
        title: 'Khatib Volunteer',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeGpLRbyscX3qdrJes9tcT2H7J3615sSqLnnnL48Y3fl2jxEQ/viewform?usp=send_form',
        icon: <Mic className="w-6 h-6" />,
        description: 'Volunteer to give Friday sermons and serve the community',
      },
      {
        title: 'Naseeha Mental Health Resources',
        url: 'https://www.naseeha.org/about-us/',
        icon: <HeartPulse className="w-6 h-6" />,
        description: 'Professional mental-health support specifically for Muslims',
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
        title: 'Donate to Palestine -- Islamic Relief',
        url: 'https://www.islamicreliefcanada.org/emergencies/palestine-appeal',
        icon: <HandHeart className="w-6 h-6" />,
        description: 'Support Palestinian relief efforts through Islamic Relief Canada',
        featured: true,
      },
      {
        title: 'Donate to Palestine -- LaunchGood',
        url: 'https://www.launchgood.com/v4/campaign/palestine_under_attack',
        icon: <HeartPlus className="w-6 h-6" />,
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
        icon: <MessagesSquare className="w-6 h-6" />,
        description: 'Connect with brothers in the community and build friendships',
      },
      {
        title: 'Sisters WhatsApp Group',
        url: 'https://chat.whatsapp.com/I3bo4j8jmvi5i7z02YF7qT',
        icon: <MessageSquare className="w-6 h-6" />,
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
        icon: <Locate className="w-6 h-6" />,
        description: 'Support better public-transit access to the local mosque',
      },
    ],

    'Human Rights': [
      {
        title: 'Petition Against Uyghur Forced Labour',
        url: 'https://www.change.org/p/justin-trudeau-ban-products-made-from-uyghur-forced-labour',
        icon: <Gavel className="w-6 h-6" />,
        description: 'Stand against Uyghur persecution and forced-labour products',
      },
      {
        title: 'Black Lives Matter Resources',
        url: 'https://blacklivesmatters.carrd.co/',
        icon: <CircleEqual className="w-6 h-6" />,
        description: 'Support racial-justice initiatives and community solidarity',
      },
    ],
  }

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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <section className="pt-24 pb-20 relative text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/20 backdrop-blur-xl rounded-full mb-8 border border-amber-400/30">
              <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                Community
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed">
              Everything you need to connect, contribute, and thrive in our
              vibrant Muslim community at&nbsp;Queen&rsquo;s University.
            </p>

            <div className="max-w-xl mx-auto">
              <div className="relative group">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="peer w-full py-6 pl-16 pr-6 rounded-2xl 
                             bg-white/10 backdrop-blur-2xl shadow-2xl 
                             border border-white/20
                             focus:border-amber-400 focus:ring-4 focus:ring-amber-400/30
                             text-white placeholder-gray-300 text-lg
                             transition-all duration-300 hover:bg-white/15"
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center">
                  <Search className="w-6 h-6 text-gray-300 peer-focus:text-amber-400 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-yellow-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:via-yellow-500/10 group-hover:to-amber-500/10 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {searchTerm && (
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-gray-300">
                  Found {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
                </p>
              </div>
              
              {filteredResources.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg">No matching resources found. Try different keywords.</p>
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
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="p-4 bg-amber-500/20 rounded-2xl group-hover:bg-amber-500/30 transition-all duration-300">
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <div className="text-xs font-semibold text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full">
                          {item.category}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center text-amber-400 font-medium group-hover:text-amber-300 transition-colors">
                        <span>Explore Resource</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      
                      {hoveredCard === `search-${idx}` && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 pointer-events-none" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {!searchTerm && (
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-amber-900/10 to-blue-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-amber-400/20 rounded-full">
                    <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <span className="text-2xl font-bold text-amber-400">Featured Resources</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Most Essential Links
                </h2>
                <p className="text-xl text-gray-300">
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
                               rounded-3xl border border-white/20 hover:border-amber-400/50
                               hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10
                               transition-all duration-500 hover:scale-105 text-center"
                    onMouseEnter={() => setHoveredCard(`featured-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative">
                      <div className="inline-flex p-6 bg-amber-500/20 rounded-2xl mb-6 group-hover:bg-amber-500/30 transition-all duration-300">
                        <div className="text-white transform group-hover:scale-110 transition-transform">{item.icon}</div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {hoveredCard === `featured-${idx}` && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 pointer-events-none" />
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

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
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full" />
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
                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        )}
                        
                        <div className="flex items-start space-x-6 mb-6">
                          <div className="p-4 bg-amber-500/20 rounded-2xl group-hover:bg-amber-500/30 transition-all duration-300">
                            <div className="text-white">{item.icon}</div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-amber-400 font-medium group-hover:text-amber-300 transition-colors">
                          <span>Access Resource</span>
                          <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        
                        {hoveredCard === `${category}-${idx}` && (
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 pointer-events-none" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        <footer className="py-20 relative text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 backdrop-blur-xl rounded-full mb-6 border border-amber-400/30">
              <Heart className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4 text-white">
              Built with love for our community
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
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
                           text-white hover:text-amber-300 transition-all duration-300"
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
                           text-white hover:text-amber-300 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Feedback</span>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-gray-400">
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