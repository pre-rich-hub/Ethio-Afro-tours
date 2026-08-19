import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { getLayoverPackagesData } from '@/lib/data'
import { layoverFaqs } from '@/lib/faqs'
import {
  buildBreadcrumbList,
  buildFaqPage,
  pageStructuredData,
} from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'
import { LayoverContent } from './layover-content'

const pageTitle = 'Addis Ababa Layover Tours'
const pageDescription =
  'Private Addis Ababa layover tours and multi-day stopover extensions from Bole International Airport, planned around your confirmed flights.'
const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786970122/Bole_International.jpg'
const heroImageAlt = 'Bole International Airport in Addis Ababa, Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/layover' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/layover',
    image: heroImage,
    imageAlt: heroImageAlt,
  }),
}

export default async function LayoverPage() {
  const packages = await getLayoverPackagesData()

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Layover', path: '/layover' },
          ]),
          buildFaqPage('/layover', layoverFaqs),
        )}
      />
      <LayoverContent packages={packages} />
    </>
  )
}

// ISR: admin edits surface within an hour (deliberate deviation from the
// statically frozen tours pages — the catalog is now API-backed).
export const dynamic = 'force-dynamic'
