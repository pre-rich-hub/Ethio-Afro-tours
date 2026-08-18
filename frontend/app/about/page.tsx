import type { Metadata } from 'next'
import { AboutContent } from './about-content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Ethio Afro Tours is a fully licensed luxury tour operator and destination management company based in Addis Ababa, Ethiopia, creating private tailor-made journeys for more than 15 years.',
}

export default function AboutPage() {
  return <AboutContent />
}
