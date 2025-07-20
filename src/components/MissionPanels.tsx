'use client'

import { useRef, JSX } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Megaphone, GraduationCap, ShieldCheck, Handshake, HeartHandshake, Compass, Gem } from 'lucide-react'

export default function MissionPanels(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // --- Animation Timings ---
  // Panel 1 (Hero): 0% -> 12%
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const panel1Scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.85])

  // Panel 2 (Mission Statement): 12% -> 32%
  const panel2Opacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1])
  const panel2Scale = useTransform(scrollYProgress, [0.12, 0.18], [0.85, 1])

  // Mission Title: 18% -> 24%
  const missionTitleOpacity = useTransform(scrollYProgress, [0.18, 0.22, 0.24, 0.26], [0, 1, 1, 0])
  const missionTitleY = useTransform(scrollYProgress, [0.24, 0.26], [0, -50])

  // Mission Content: 26% -> 32%
  const missionContentOpacity = useTransform(scrollYProgress, [0.26, 0.30, 0.32, 0.34], [0, 1, 1, 0])
  const missionContentY = useTransform(scrollYProgress, [0.26, 0.30], [50, 0])

  // Panel 3 (Core Areas): 34% -> 60%
  const panel3Opacity = useTransform(scrollYProgress, [0.34, 0.40], [0, 1])
  const panel3Scale = useTransform(scrollYProgress, [0.34, 0.40], [0.85, 1])

  // Core Areas Title: 40% -> 46%
  const coreAreasTitleOpacity = useTransform(scrollYProgress, [0.40, 0.44, 0.46, 0.48], [0, 1, 1, 0])
  const coreAreasTitleY = useTransform(scrollYProgress, [0.46, 0.48], [0, -50])

  // Core Areas Batch 1 (first 2): 48% -> 54%
  const coreAreasBatch1Opacity = useTransform(scrollYProgress, [0.48, 0.52, 0.54, 0.56], [0, 1, 1, 0])
  const coreAreasBatch1Y = useTransform(scrollYProgress, [0.48, 0.52], [50, 0])

  // Core Areas Batch 2 (last 2): 56% -> 60%
  const coreAreasBatch2Opacity = useTransform(scrollYProgress, [0.56, 0.60, 0.62, 0.64], [0, 1, 1, 0])
  const coreAreasBatch2Y = useTransform(scrollYProgress, [0.56, 0.60], [50, 0])

  // Panel 4 (Services Container): 64% -> 100%
  const panel4Opacity = useTransform(scrollYProgress, [0.64, 0.70], [0, 1])
  const panel4Scale = useTransform(scrollYProgress, [0.64, 0.70], [0.85, 1])

  // Services Title: 70% -> 76%
  const servicesTitleOpacity = useTransform(scrollYProgress, [0.70, 0.74, 0.76, 0.78], [0, 1, 1, 0])
  const servicesTitleY = useTransform(scrollYProgress, [0.76, 0.78], [0, -50])

  // Services Batch 1 (first 3): 78% -> 84%
  const servicesBatch1Opacity = useTransform(scrollYProgress, [0.78, 0.82, 0.84, 0.86], [0, 1, 1, 0])
  const servicesBatch1Y = useTransform(scrollYProgress, [0.78, 0.82], [50, 0])

  // Services Batch 2 (last 3): 86% -> 100%
  const servicesBatch2Opacity = useTransform(scrollYProgress, [0.86, 0.90], [0, 1])
  const servicesBatch2Y = useTransform(scrollYProgress, [0.86, 0.90], [50, 0])

  // Animated background for the entire component
  const bgGradient = useTransform(scrollYProgress, [0, 0.5, 1], [
    'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    'linear-gradient(135deg, #475569 0%, #64748b 100%)'
  ])

  const coreAreas = [
    { Icon: Heart, title: 'Religious', desc: 'Supporting students in fulfilling their religious obligations through worship and spiritual growth.', color: 'from-rose-400 to-pink-500' },
    { Icon: Megaphone, title: 'Social', desc: 'Creating opportunities for connection, building meaningful relationships and community bonds.', color: 'from-blue-400 to-cyan-500' },
    { Icon: GraduationCap, title: 'Academic', desc: 'Providing educational programming, halaqas, and peer support for academic success.', color: 'from-emerald-400 to-teal-500' },
    { Icon: Handshake, title: 'Charitable', desc: 'Engaging in community service and charitable initiatives to give back to our community.', color: 'from-amber-400 to-orange-500' },
  ]

  // Split core areas for mobile batching
  const coreAreasBatch1 = coreAreas.slice(0, 2)
  const coreAreasBatch2 = coreAreas.slice(2, 4)

  const services = [
    'Daily and Friday prayers for spiritual fulfillment',
    'Ramadan iftars bringing the community together',
    'Eid celebrations honoring Islamic traditions',
    'Halaqas for learning and spiritual discussion',
    'Social events fostering friendship and connection',
    'Peer support networks for academic and personal growth',
  ]

  // Split services for mobile batching
  const servicesBatch1 = services.slice(0, 3)
  const servicesBatch2 = services.slice(3, 6)

  return (
    <div ref={containerRef} className="relative h-[800vh] text-white">
      {/* Fixed positioning that adjusts to nav height automatically */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ background: bgGradient }} className="absolute inset-0 z-0" />
        
        <div className="relative z-10 w-full h-full">

          {/* Panel 1: Hero */}
          <motion.div
            style={{ opacity: panel1Opacity, scale: panel1Scale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl text-center px-4">
              <div className="mb-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                  <Compass className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-400 font-medium text-base">Our Mission</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-amber-200 to-emerald-200 bg-clip-text text-transparent">Serving the Muslim</span><br />
                <span className="bg-gradient-to-r from-emerald-200 via-blue-200 to-white bg-clip-text text-transparent">Student Community</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                QUMSA exists to support Muslim students at Queen's University through comprehensive programming in a welcoming and inclusive environment.
              </p>
            </div>
          </motion.div>

          {/* Panel 2: Mission Statement Container */}
          <motion.div
            style={{ opacity: panel2Opacity, scale: panel2Scale }}
            className="absolute inset-0"
          >
            {/* Mission Title */}
            <motion.div
              style={{ opacity: missionTitleOpacity, y: missionTitleY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-6">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-medium text-base">What We Stand For</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                  Our Mission Statement
                </h2>
              </div>
            </motion.div>

            {/* Mission Content */}
            <motion.div
              style={{ opacity: missionContentOpacity, y: missionContentY }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-4xl">
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-12">
                  <p className="text-lg md:text-2xl text-slate-100 leading-relaxed text-center">
                    The Queen's University Muslim Student Association (QUMSA) exists to <span className="text-amber-300 font-semibold">serve the Muslim student community</span> at Queen's University by providing <span className="text-emerald-300 font-semibold">religious, social, academic, and charitable programming</span> in a welcoming and inclusive environment. We support students in fulfilling their religious obligations while creating opportunities for connection and helping Muslim students <span className="text-blue-300 font-semibold">thrive on campus, build meaningful relationships, and feel a strong sense of belonging and purpose</span> throughout their university experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel 3: Core Areas Container */}
          <motion.div
            style={{ opacity: panel3Opacity, scale: panel3Scale }}
            className="absolute inset-0"
          >
            {/* Core Areas Title */}
            <motion.div
              style={{ opacity: coreAreasTitleOpacity, y: coreAreasTitleY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-6">
                  <HeartHandshake className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-base">How We Serve</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                  Our Core Areas
                </h2>
              </div>
            </motion.div>

            {/* Core Areas Batch 1 */}
            <motion.div
              style={{ opacity: coreAreasBatch1Opacity, y: coreAreasBatch1Y }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {coreAreasBatch1.map(({ Icon, title, desc, color }) => (
                    <div key={title} className="group text-center">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 mb-6`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                      <p className="text-slate-300 text-base leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Core Areas Batch 2 */}
            <motion.div
              style={{ opacity: coreAreasBatch2Opacity, y: coreAreasBatch2Y }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {coreAreasBatch2.map(({ Icon, title, desc, color }) => (
                    <div key={title} className="group text-center">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 mb-6`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                      <p className="text-slate-300 text-base leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel 4: Services Container */}
          <motion.div
            style={{ opacity: panel4Opacity, scale: panel4Scale }}
            className="absolute inset-0"
          >
            {/* Services Title */}
            <motion.div
              style={{ opacity: servicesTitleOpacity, y: servicesTitleY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-6">
                  <Gem className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-base">What We Provide</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                  Our Services
                </h2>
              </div>
            </motion.div>
            
            {/* Services Batch 1 */}
            <motion.div
              style={{ opacity: servicesBatch1Opacity, y: servicesBatch1Y }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-4xl">
                <div className="space-y-6">
                  {servicesBatch1.map((text, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-slate-900 text-xl group-hover:scale-110 transition-transform duration-300">
                        {i + 1}
                      </div>
                      <span className="text-lg text-slate-100 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services Batch 2 */}
            <motion.div
              style={{ opacity: servicesBatch2Opacity, y: servicesBatch2Y }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-4xl">
                <div className="space-y-6">
                  {servicesBatch2.map((text, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-slate-900 text-xl group-hover:scale-110 transition-transform duration-300">
                        {i + 4}
                      </div>
                      <span className="text-lg text-slate-100 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}