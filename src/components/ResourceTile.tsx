// components/ResourceTile.tsx
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface Props {
  href: string
  title: string
  icon: LucideIcon
  description: string
  color: string
}

export default function ResourceTile({
  href,
  title,
  icon: Icon,
  description,
  color,
}: Props) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />
      <div className="relative p-8">
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${color} mb-6 group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-islamic-gold transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-islamic-gold to-islamic-emerald transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  )
}
