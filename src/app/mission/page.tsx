// src/app/mission/page.tsx
export const metadata = {
  title: 'Our Mission – QUMSA',
  description:
    "Learn about QUMSA's mission to build faith, friendship, and community at Queen's University.",
}

import MissionPanels from '../../components/MissionPanels'

export default function MissionPage() {
  return <MissionPanels />
}
