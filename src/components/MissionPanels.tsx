'use client'

import { useRef, JSX } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Users, BookOpen, Compass } from 'lucide-react'

export default function MissionPanels(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // --- Animation Timings ---
  // Panel 1 (Hero): 0% -> 20%
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const panel1Scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85])

  // Panel 2 (Values): 15% -> 50%
  const panel2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.40, 0.50], [0, 1, 1, 0])
  const panel2Scale = useTransform(scrollYProgress, [0.15, 0.25, 0.40, 0.50], [0.85, 1, 1, 0.85])

  // Panel 3 (Mandate Container): Fades in at 50%
  const panel3Opacity = useTransform(scrollYProgress, [0.50, 0.60], [0, 1])
  const panel3Scale = useTransform(scrollYProgress, [0.50, 0.60], [0.85, 1])

  // --- Mandate Sub-Animations (within Panel 3's timeline) ---
  // Title: Fades in (60-65%), then fades out (70-75%)
  const mandateTitleOpacity = useTransform(scrollYProgress, [0.60, 0.65, 0.70, 0.75], [0, 1, 1, 0])
  const mandateTitleY = useTransform(scrollYProgress, [0.70, 0.75], [0, -50])

  // Batch 1: Fades in (75-80%), then fades out (85-90%)
  const mandateBatch1Opacity = useTransform(scrollYProgress, [0.75, 0.80, 0.85, 0.90], [0, 1, 1, 0])
  const mandateBatch1Y = useTransform(scrollYProgress, [0.75, 0.80, 0.85, 0.90], [50, 0, 0, -50])
  
  // Batch 2: Fades in (90-95%) and stays
  const mandateBatch2Opacity = useTransform(scrollYProgress, [0.90, 0.95], [0, 1])
  const mandateBatch2Y = useTransform(scrollYProgress, [0.90, 0.95], [50, 0])

  // Animated background for the entire component
  const bgGradient = useTransform(scrollYProgress, [0, 0.5, 1], [
    'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    'linear-gradient(135deg, #475569 0%, #64748b 100%)'
  ])

  const coreValues = [
    { Icon: Heart, title: 'Faith', desc: 'Strengthening our connection to Allah.', color: 'from-rose-400 to-pink-500' },
    { Icon: Users, title: 'Community', desc: 'Building lasting bonds of sister/brotherhood.', color: 'from-blue-400 to-cyan-500' },
    { Icon: BookOpen, title: 'Education', desc: 'Growing in knowledge and understanding.', color: 'from-emerald-400 to-teal-500' },
  ]

  // Added more items for the two-batch demonstration
  const mandateItems = [
    'Provide accessible worship services for students',
    'Strengthen bonds among Muslims on campus',
    'Increase Islamic awareness & dispel misconceptions',
    'Serve as a primary educational & spiritual resource',
    'Foster a welcoming environment for all individuals',
    'Engage in outreach and interfaith dialogue',
  ]
  const mandateBatch1 = mandateItems.slice(0, 3);
  const mandateBatch2 = mandateItems.slice(3, 6);

  return (
    <div ref={containerRef} className="relative h-[700vh] text-white">
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
                <span className="bg-gradient-to-r from-white via-amber-200 to-emerald-200 bg-clip-text text-transparent">Building Faith,</span><br />
                <span className="bg-gradient-to-r from-emerald-200 via-blue-200 to-white bg-clip-text text-transparent">Friendship & Community</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                QUMSA is the heartbeat of Muslim life at Queen's University—uniting students through worship, service, and learning.
              </p>
            </div>
          </motion.div>

          {/* Panel 2: Core Values */}
          <motion.div
            style={{ opacity: panel2Opacity, scale: panel2Scale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-5xl px-4">
              <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {coreValues.map(({ Icon, title, desc, color }) => (
                  <div key={title} className="group text-center">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 mb-6`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Our Mandate (Container for the sub-animation) */}
          <motion.div
            style={{ opacity: panel3Opacity, scale: panel3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
              <div className="relative w-full max-w-4xl px-4 h-full">
                {/* Mandate Title */}
                <motion.div
                  style={{ opacity: mandateTitleOpacity, y: mandateTitleY }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-white via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                    Our Mandate
                  </h2>
                </motion.div>
                
                {/* Mandate Batch 1 */}
                <motion.div
                  style={{ opacity: mandateBatch1Opacity, y: mandateBatch1Y }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="space-y-6 w-full">
                    {mandateBatch1.map((text, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-slate-900 text-xl">{i + 1}</div>
                        <span className="text-xl text-slate-100 leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Mandate Batch 2 */}
                <motion.div
                  style={{ opacity: mandateBatch2Opacity, y: mandateBatch2Y }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="space-y-6 w-full">
                    {mandateBatch2.map((text, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-slate-900 text-xl">{i + 4}</div>
                        <span className="text-xl text-slate-100 leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}