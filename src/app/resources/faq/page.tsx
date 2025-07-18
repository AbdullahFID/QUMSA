// app/resources/faq/page.tsx
import { HelpCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ – QUMSA',
  description: 'Answers to common questions about QUMSA, events, and campus life.',
}

const faqs = [
  {
    q: 'Can non‑Muslims attend QUMSA events?',
    a: 'Absolutely — our events are open to everyone interested in learning and building community.',
  },
  {
    q: 'Is there a membership fee?',
    a: 'Nope! All Queen’s students are welcome at no cost. Some special events may have a ticket.',
  },
  {
    q: 'Where do Friday prayers take place?',
    a: 'During term, Jummah is in Mitchell Hall Auditorium (check @qumsa Insta for weekly updates).',
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-600 via-primary-700 to-islamic-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <HelpCircle className="w-8 h-8" />
            </div>
            <span className="text-islamic-gold font-bold text-lg">FAQ</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Frequently&nbsp;<span className="gradient-text">Asked</span> Questions
          </h1>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
                {q}
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
