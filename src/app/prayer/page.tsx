import PrayerPanel from '../../components/PrayerPanel'

export const metadata = {
  title:
    "Prayer Times & Events – QUMSA | Queen's University Muslim Students' Association",
  description:
    'Accurate, real‑time Islamic prayer times for Kingston, Ontario, plus upcoming community events and programs.',
  keywords:
    'prayer times, Kingston Ontario, QUMSA, Queens University, Islamic prayer, Fajr, Dhuhr, Asr, Maghrib, Isha, events, community',
  openGraph: {
    title: 'Prayer Times & Events – QUMSA',
    description: 'Live prayer times and community events for Kingston, Ontario',
    type: 'website',
  },
}

export default function Prayer() {
  return <PrayerPanel />
}