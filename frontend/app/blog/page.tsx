import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { PostCard } from '@/components/post-card'
import { PostsGrid } from '@/components/posts-grid'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { JsonLd } from '@/components/json-ld'
import { posts } from '@/lib/site'
import { buildBreadcrumbList, pageStructuredData } from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'

const pageTitle = 'The Journal'
const pageDescription =
  'Planning guidance, destination essays and dispatches from the designers and guides who run our Ethiopian journeys.'
const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg'
const heroImageAlt = 'Coffee cherries growing in Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/blog' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/blog',
    image: heroImage,
    imageAlt: heroImageAlt,
  }),
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
          ]),
        )}
      />
      <PageHero
        eyebrow="The Journal"
        title="Field notes from the highlands"
        lede="Written by the people who run these journeys — when to come, what to pack, how to sit through a coffee ceremony properly, and why we work the way we do."
        image={heroImage}
        imageAlt={heroImageAlt}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      {/* Featured */}
      <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-accent">
            <span className="rule" />
            Latest Dispatch
          </p>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>

      {/* All posts */}
      <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Archive"
            title="Everything we have written down"
            aside="Six essays and counting, filed by what they are actually useful for."
          />
          <PostsGrid posts={rest} />
        </div>
      </section>

      <CtaBand
        title="Read something that changed your mind?"
        text="Most of these essays started as an answer to a guest question. Ask us yours and it may well become the next one."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="https://res.cloudinary.com/q16lm8mo/image/upload/v1786804467/simien-mountains.png"
      />
    </>
  )
}
