'use client'

import { motion } from 'framer-motion'
import { Package, Sparkles, Clock } from 'lucide-react'

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-amber-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-20 w-16 h-16 bg-gray-400/20 rounded-full blur-xl"
            animate={{
              y: [0, -25, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Package className="w-24 h-24 md:w-32 md:h-32 text-white" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-8 h-8 text-amber-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            <span className="bg-linear-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
          >
            Our exclusive merchandise collection is in the works.
            <br className="hidden sm:block" />
            Get ready for something amazing!
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-3 text-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
            }}
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Clock className="w-5 h-5" />
            </motion.div>
            <span className="text-sm md:text-base font-medium">
              Stay tuned for updates
            </span>
          </motion.div>

          <motion.div
            className="mt-12 mx-auto w-24 h-0.5 bg-linear-to-r from-transparent via-amber-300 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.9,
            }}
          />
        </div>
      </div>
    </div>
  )
}