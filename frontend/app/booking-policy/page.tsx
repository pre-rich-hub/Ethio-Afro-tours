import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { PolicyPage } from '@/components/policy-page'
import { bookingPolicy } from '@/lib/policies'
import { buildSocialMetadata } from '@/lib/seo'
import { buildBreadcrumbList, buildWebPage, pageStructuredData } from '@/lib/structured-data'

const socialImage = 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg'

export const metadata: Metadata = {
  title: bookingPolicy.title,
  description: bookingPolicy.description,
  alternates: { canonical: '/booking-policy' },
  ...buildSocialMetadata({
    title: bookingPolicy.title,
    description: bookingPolicy.description,
    path: '/booking-policy',
    image: socialImage,
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default function BookingPolicyPage() {
  return (
    <>
      <JsonLd data={pageStructuredData(
        buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Booking & Cancellation Policy', path: '/booking-policy' }]),
        buildWebPage({ path: '/booking-policy', name: bookingPolicy.title, description: bookingPolicy.description }),
      )} />
      <PolicyPage document={bookingPolicy} />
    </>
  )
}
