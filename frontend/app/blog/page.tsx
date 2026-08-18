import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { PostCard } from '@/components/post-card'
import { PostsGrid } from '@/components/posts-grid'
import { SectionHeading } from '@/components/section-heading'
import { NewsletterForm } from '@/components/newsletter-form'
import { CtaBand } from '@/components/cta-band'
import { posts } from '@/lib/site'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Planning guidance, destination essays and dispatches from the designers and guides who run our Ethiopian journeys.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Field notes from the highlands"
        lede="Written by the people who run these journeys — when to come, what to pack, how to sit through a coffee ceremony properly, and why we work the way we do."
        image="https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg"
        imageAlt="Coffee growing in Ethiopia, the birthplace of coffee"
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

      {/* Newsletter */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              The Letter
            </p>
            <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
              One letter a season, no more than that
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-background/70">
              Festival dates worth planning around, new lodges we have actually
              slept in, and the occasional honest word about where not to go this
              month.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:justify-self-end">
            <NewsletterForm />
          </Reveal>
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
