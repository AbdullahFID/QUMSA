// app/team/page.tsx
import {
  UsersRound,
  Users,
  Sparkles,
  Crown,
  Briefcase,
  Heart,
  Calendar,
  Megaphone,
  Star,
} from 'lucide-react'
import type { Metadata } from 'next'
import TeamCard from '@/components/TeamCard'

export const metadata: Metadata = {
  title: "Executive Team - QUMSA | Queen's University Muslim Students Association",
  description:
    "Meet the passionate volunteers who lead Queen's University Muslim Students Association. Dedicated students driving faith, friendship, and community at Queen's University.",
  keywords: [
    'QUMSA executive team',
    "Queen's Muslim student leaders",
    'QUMSA board members',
    'Muslim student association executives',
    "Queen's Islamic leadership",
    'QUMSA volunteers',
    'Muslim community leaders Kingston',
    "Queen's student government",
    'Islamic student leadership',
    'QUMSA president',
    'Muslim student representatives',
    "Queen's Islamic community leaders",
    'QUMSA committee members',
    'Muslim student council',
  ],
  authors: [{ name: 'QUMSA' }],
  creator: "Queen's University Muslim Students Association",
  publisher: 'QUMSA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Executive Team - QUMSA | Queen's University Muslim Students Association",
    description:
      "Meet the passionate volunteers who lead Queen's University Muslim Students Association. Dedicated students driving faith, friendship, and community.",
    url: 'https://qumsa.ca/team',
    siteName: 'QUMSA',
    images: [
      {
        url: '/images/QUMSA_LOGO.png',
        width: 1200,
        height: 630,
        alt: "QUMSA Executive Team - Queen's University Muslim Students Association",
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Executive Team - QUMSA | Queen's University Muslim Students Association",
    description:
      "Meet the passionate volunteers who lead Queen's University Muslim Students Association.",
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

// ===================== TEAM DATA =====================
// Local images: /images/headshots/[name].jpeg
// Drive fallback for missing headshots

type TeamMember = {
  name: string
  role: string
  img: string
  description: string
  profileUrl: string
  email: string
}

const PLACEHOLDER_IMG = '/images/team/placeholder.png'

// Helper for local images
const localImg = (filename: string) => `/images/headshots/${filename}`

// Helper for Drive images (fallback)
const driveImg = (id?: string) =>
  id ? `https://drive.google.com/uc?export=view&id=${id}` : PLACEHOLDER_IMG

// --- Co-Presidents ---
const coPresidents: TeamMember[] = [
  {
    name: 'Amaan Hussaini',
    role: 'Co-President',
    img: localImg('amaan-hussaini.jpeg'),
    description: "I once went to an abandoned house and it wasn't abandoned....",
    profileUrl: '#',
    email: 'president@qumsa.ca',
  },
  {
    name: 'Aisha Bharuchi',
    role: 'Co-President',
    img: localImg('aisha-bharuchi.jpeg'),
    description: 'I read 15 books this summer.',
    profileUrl: '#',
    email: 'president@qumsa.ca',
  },
]

// --- Directors & Operations ---
const vicePresidents: TeamMember[] = [
  {
    name: 'Shahmeer Raza',
    role: 'Treasurer',
    img: localImg('shahmeer-raza.jpeg'),
    description: "I've visited the Eiffel Tower.",
    profileUrl: '#',
    email: 'finance@qumsa.ca',
  },
  {
    name: 'Aasiya Ahmad',
    role: 'Director of Ops & Logs',
    img: localImg("aasiya.jpeg"), // TODO: No local file found
    description: "I've stayed asleep for over 20 hours.",
    profileUrl: '#',
    email: 'operations@qumsa.ca',
  },
  {
    name: 'Salem Cherif',
    role: 'Supplies & Sourcing Coordinator',
    img: localImg('salem-cherif.jpeg'),
    description:
      'I have two older brothers - one born in the same year as me, and the other born exactly 4 years apart.',
    profileUrl: '#',
    email: 'operations@qumsa.ca',
  },
  {
    name: 'Seham Kettaneh',
    role: 'Director of Fundraising',
    img: localImg('sehem.jpeg'), // TODO: No local file found
    description: 'I am a certified trainee firefighter.',
    profileUrl: '#',
    email: 'fundraising@qumsa.ca',
  },
  {
    name: 'Zaid Alam',
    role: 'Director of Outreach',
    img: localImg('zaid-alam.jpeg'),
    description:
      'I SOMETIMES wear my glasses even though I should wear them all the time.',
    profileUrl: '#',
    email: 'outreach@qumsa.ca',
  },
  {
    name: 'Cleon Aristo',
    role: "Director of Da'wah & Islamic Affairs",
    img: localImg('cleon-aristo.jpeg'),
    description: 'Guess the origin of my name.',
    profileUrl: '#',
    email: 'dawah@qumsa.ca',
  },
]

// --- Affairs / Reps ---
const affairsCoordinators: TeamMember[] = [
  {
    name: 'Aumama Al-Naib',
    role: 'Director of External Affairs',
    img: localImg('Aumama_Al_Naib.jpg'),
    description:
      'This past summer, I got to spend time in 3 different countries (layover not included🥲)!',
    profileUrl: '#',
    email: 'external@qumsa.ca',
  },
  {
    name: 'Ajwaad',
    role: 'Director of Internal Affairs',
    img: localImg('ajwaad-khan.jpeg'),
    description: 'I like birds.',
    profileUrl: '#',
    email: 'internal@qumsa.ca',
  },
  {
    name: 'Saad Rizvi',
    role: "Brother's Representative",
    img: localImg('saad-rizvi.jpg'),
    description: 'I was a professional basketball player in 1972.',
    profileUrl: '#',
    email: 'brothers@qumsa.ca',
  },
  {
    name: 'Taha Salah',
    role: "Brothers' Representative",
    img: localImg('Taha.jpeg'), // TODO: File says "Taha Elatrash" - name mismatch, keeping Drive
    description: 'None.',
    profileUrl: '#',
    email: 'brothers@qumsa.ca',
  },
  {
    name: 'Fatima Aboujassoum',
    role: "Sisters' Representative",
    img: localImg('fatima-aboujassoum.jpeg'),
    description: 'I qualified for a CrossFit competition a year ago!',
    profileUrl: '#',
    email: 'sisters@qumsa.ca',
  },
]

// --- Events Team ---
const eventsCoordinators: TeamMember[] = [
  {
    name: 'Karim Ali',
    role: 'Director of Events',
    img: localImg('Karim.jpeg'),
    description: 'I like horses.',
    profileUrl: '#',
    email: 'events@qumsa.ca',
  },
  {
    name: 'Hussam Hayek',
    role: 'Special Events Coordinator',
    img: localImg('Hussam.jpeg'), // TODO: No local file found
    description: "I'm the best rock paper scissors player in the province.",
    profileUrl: '#',
    email: 'events@qumsa.ca',
  },
  {
    name: 'Mihran Asadullah',
    role: 'Special Events Coordinator',
    img: localImg('mihran-asadullah.jpeg'),
    description: "I'm the best rock paper scissors player in the province.",
    profileUrl: '#',
    email: 'events@qumsa.ca',
  },
]

// --- Media / Digital / Graphics ---
const marketingCoordinators: TeamMember[] = [
  {
    name: 'Zahra Abba',
    role: 'Director of Media & Communications',
    img: localImg('zahra-abba.jpeg'),
    description: 'I read over 200 books during the pandemic!',
    profileUrl: '#',
    email: 'media@qumsa.ca',
  },
  {
    name: 'Yaseen Malam',
    role: 'Digital Content Coordinator',
    img: localImg('yaseen-malam.jpeg'),
    description: 'I reread the entire Red Rising series in 2 weeks.',
    profileUrl: '#',
    email: 'media@qumsa.ca',
  },
  {
    name: 'Sahar Hakimi',
    role: 'Digital Content Coordinator',
    img: localImg('honestlyidk.png'), // TODO: No local file found
    description: 'I hate strawberries.',
    profileUrl: '#',
    email: 'media@qumsa.ca',
  },
  {
    name: 'Samrah Junaid',
    role: 'Graphics Coordinator',
    img: localImg("Taha.jpeg"), // No headshot available
    description: "I've been on the second tallest roller coaster in the world.",
    profileUrl: '#',
    email: 'graphics@qumsa.ca',
  },
  {
    name: 'Rayyan Shaikh',
    role: 'Graphics Coordinator',
    img: localImg('rayyan-shaikh.jpeg'),
    description: 'I love ice cream.',
    profileUrl: '#',
    email: 'graphics@qumsa.ca',
  },
  {
    name: 'Iffah Sami',
    role: 'Graphics Coordinator',
    img: localImg('iffah.jpeg'), // No headshot available
    description: '',
    profileUrl: '#',
    email: 'graphics@qumsa.ca',
  },
]

// --- First Year Reps ---
const firstYearReps: TeamMember[] = [
  {
    name: 'Sarah Hussain',
    role: 'First Year Representative',
    img: localImg('sarah-hussain.jpeg'),
    description: 'I have a 6 year old cat :).',
    profileUrl: '#',
    email: 'firstyear@qumsa.ca',
  },
]

// Team sections configuration with icons
const teamSections = [
  {
    id: 'presidents',
    title: 'Co-Presidents',
    subtitle: 'Leading with vision and purpose',
    members: coPresidents,
    icon: Crown,
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
  },
  {
    id: 'directors',
    title: 'Directors & Operations',
    subtitle: 'Keeping QUMSA running strong',
    members: vicePresidents,
    icon: Briefcase,
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
  },
  {
    id: 'affairs',
    title: 'Affairs & Representatives',
    subtitle: 'Supporting students and strengthening community',
    members: affairsCoordinators,
    icon: Heart,
    gradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
  },
  {
    id: 'events',
    title: 'Events Team',
    subtitle: 'Creating memorable experiences',
    members: eventsCoordinators,
    icon: Calendar,
    gradient: 'from-violet-400 via-purple-400 to-indigo-400',
  },
  {
    id: 'marketing',
    title: 'Media & Creative Team',
    subtitle: 'Amplifying our voice and presence',
    members: marketingCoordinators,
    icon: Megaphone,
    gradient: 'from-blue-400 via-sky-400 to-cyan-400',
  },
  {
    id: 'firstyear',
    title: 'First Year Representatives',
    subtitle: 'Bridging new students to our community',
    members: firstYearReps,
    icon: Star,
    gradient: 'from-lime-400 via-green-400 to-emerald-400',
  },
] as const

const TEAM_MEMBER_COUNT = teamSections.reduce((sum, s) => sum + s.members.length, 0)
const DEPARTMENT_COUNT = teamSections.length

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-slate-800/40 via-blue-800/30 to-blue-900/40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 30 L30 60 L0 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-400"
              />
              <circle
                cx="30"
                cy="30"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-400"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Badge */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="p-2 bg-linear-to-r from-amber-400 to-yellow-400 rounded-full">
                <UsersRound className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-amber-400 font-medium text-sm sm:text-base">Meet the Team</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              Executive{' '}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500">
                Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Dedicated students driving faith, friendship, and community at Queen&apos;s.
            </p>

            {/* Stats Row (dynamic) */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-400">
                  {TEAM_MEMBER_COUNT}
                </div>
                <div className="text-sm text-gray-400 mt-1">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-400">
                  {DEPARTMENT_COUNT}
                </div>
                <div className="text-sm text-gray-400 mt-1">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-rose-400 to-pink-400">
                  1
                </div>
                <div className="text-sm text-gray-400 mt-1">United Community</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping delay-1000" />
        </div>
      </section>

      {/* Team Sections */}
      <section className="relative py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamSections.map((section) => {
            const IconComponent = section.icon
            return (
              <div key={section.id} className="mb-20 sm:mb-32 last:mb-0">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center justify-center mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-linear-to-r ${section.gradient} shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-slate-900" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    <span className={`bg-clip-text text-transparent bg-linear-to-r ${section.gradient}`}>
                      {section.title}
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">{section.subtitle}</p>

                  {/* Decorative Line */}
                  <div
                    className={`mt-6 mx-auto w-24 h-1 rounded-full bg-linear-to-r ${section.gradient} opacity-60`}
                  />
                </div>

                {/* Team Cards Grid */}
                <div
                  className={`grid gap-6 sm:gap-8 ${
                    section.members.length === 1
                      ? 'grid-cols-1 max-w-md mx-auto'
                      : section.members.length === 2
                        ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                        : section.members.length === 3
                          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                >
                  {section.members.map((member, index) => (
                    <div
                      key={`${section.id}-${index}`}
                      className="transform transition-all duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TeamCard
                        name={member.name}
                        role={member.role}
                        img={member.img}
                        description={member.description}
                        profileUrl={member.profileUrl}
                        email={member.email}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="relative py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 bg-linear-to-br from-white/8 to-white/2 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-amber-400/30 transition-all duration-500">
            <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-r from-amber-400 to-yellow-400 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Want to Join Our Team?</h3>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              We&apos;re always looking for passionate individuals to help build and strengthen our
              community. Follow us on Instagram for announcements about executive applications and
              volunteer opportunities!
            </p>
            <a
              href="https://instagram.com/qumsaqueens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 hover:scale-105"
            >
              <span>Follow @qumsaqueens</span>
              <Sparkles className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500" />
    </div>
  )
}