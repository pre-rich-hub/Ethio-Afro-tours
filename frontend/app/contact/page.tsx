import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { ContactContent } from '@/app/contact/contact-content'
import { buildBreadcrumbList, pageStructuredData } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Speak directly with an Addis-based travel designer about your Ethiopian journey. We are available Monday to Saturday, 8:00 AM - 5:30 PM.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        )}
      />
      <ContactContent />
    </>
  )
}
