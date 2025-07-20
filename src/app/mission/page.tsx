// src/app/mission/page.tsx

import type { Metadata } from 'next'
import MissionPanels from '../../components/MissionPanels'

// Typed metadata export for SEO and social previews
export const metadata: Metadata = {
  title: 'Our Mission – QUMSA',
  description:
    "Learn about QUMSA's mission to build faith, friendship, and community at Queen's University.",
}

export default function MissionPage() {
  return <MissionPanels />
}
