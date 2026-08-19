import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { privacyPolicy } from '@/lib/policies'
import { buildSocialMetadata } from '@/lib/seo'
import { buildBreadcrumbList, buildWebPage, pageStructuredData } from '@/lib/structured-data'
import { PrivacyContent } from './privacy-content'

const socialImage = 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg'

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: '/privacy' },
  ...buildSocialMetadata({
    title: privacyPolicy.title,
    description: privacyPolicy.description,
    path: '/privacy',
    image: socialImage,
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={pageStructuredData(
        buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }]),
        buildWebPage({ path: '/privacy', name: privacyPolicy.title, description: privacyPolicy.description }),
      )} />
      <PrivacyContent />
    </>
  )
}
