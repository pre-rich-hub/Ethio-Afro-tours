import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PostCard } from '@/components/post-card'
import { posts } from '@/lib/site'

export function JournalTeaser() {
  const latest = posts.slice(0, 3)

  return (
    <section className="shell py-20 lg:py-32">
      <SectionHeading
        eyebrow="The Journal"
        title="Field notes from the highlands"
        aside="Planning guidance, destination essays and dispatches written by the designers and guides who run these journeys."
        action={{ href: '/blog', label: 'Read the journal' }}
      />

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 100}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
