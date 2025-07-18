import Link from 'next/link'
import Image from 'next/image'
import {
  HeartHandshake,
  HandCoins,
  CreditCard,
  ArrowLeft,
} from 'lucide-react'

export const metadata = {
  title: 'Donate – QUMSA',
  description:
    'Support Queen’s University Muslim Students Association. Your contribution fuels our programs, events, and student services.',
}

export default function Donate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* -------------------------------------------------------------- Hero */}
      <section className="relative pt-32 pb-20 text-center">
        <Image
          src="/images/hero-pattern-dark.svg"   /* subtle background pattern */
          alt=""
          fill
          priority
          className="object-cover opacity-10"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <HeartHandshake className="w-12 h-12 mx-auto text-yellow-400 mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Support <span className="text-yellow-400">QUMSA</span>
          </h1>
          <p className="text-lg text-gray-400">
            Your sadaqah helps us build faith, friendship, and community at
            Queen’s University.
          </p>
        </div>

        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-400"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>
      </section>

      {/* --------------------------------------------------------- Donation Box */}
      <section className="-mt-16 pb-24">
        <div className="max-w-xl mx-auto bg-gray-800 rounded-3xl shadow-2xl px-8 py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Choose a way to give
          </h2>

          <div className="space-y-6">
            {/* One‑time amount buttons */}
            <div className="grid grid-cols-3 gap-4">
              {[25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  className="
                    py-3 rounded-xl border border-gray-700 text-gray-200
                    hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400
                    transition font-semibold
                  "
                >
                  ${amt}
                </button>
              ))}
              <button
                className="
                  col-span-3 py-3 rounded-xl border border-gray-700 text-gray-200
                  hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400
                  transition
                "
              >
                Custom Amount
              </button>
            </div>

            {/* Payment methods */}
            <div className="space-y-4">
              {[
                {
                  icon: HandCoins,
                  title: 'E‑Transfer',
                  desc: 'Send to treasurer@qumsa.ca — please include your name in the note.',
                },
                {
                  icon: CreditCard,
                  title: 'Credit / Debit',
                  desc: 'Secure checkout powered by Stripe (coming soon).',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-gray-700/40 p-4 rounded-xl"
                >
                  <Icon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="
                w-full mt-4 py-3 rounded-xl font-semibold
                bg-gradient-to-r from-yellow-400 to-green-600 text-gray-900
                hover:opacity-90 transition
              "
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
