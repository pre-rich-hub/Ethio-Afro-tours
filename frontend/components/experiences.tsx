import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { Reveal } from '@/components/reveal'

const experiences = [
  {
    title: 'Private Coffee Journeys',
    text: 'Trace the bean from wild forest to ceremony, roasted over coals by families who have welcomed guests for generations.',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg',
    href: '/tours/ethiopia-coffee-origins',
  },
  {
    title: 'Photography Expeditions',
    text: 'Chase golden light across highland escarpments and salt flats, guided by those who know exactly where the moment will appear.',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786966781/danakil-expedition.jpg',
    href: '/tours/danakil-expedition',
  },
  {
    title: 'Luxury Cultural Immersions',
    text: 'Weave a morning with master artisans, share a meal, and witness craft traditions carried across centuries.',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
    href: '/tours/omo-valley-immersion',
  },
  {
    title: 'Signature Hospitality',
    text: 'Retreat each evening to eco-lodges perched on the edge of the world, where quiet and comfort meet the wild.',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
    href: '/tours',
  },
]

export function Experiences() {
  return (
    <section id="experiences" className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-accent">
          <span className="h-px w-10 bg-accent" />
          Luxury Experiences
        </p>
        <h2 className="text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
          The moments that stay with you
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((e, i) => (
          <Reveal key={e.title} delay={(i % 2) * 120}>
            <Link
              href={e.href}
              className="group relative flex h-[300px] items-end overflow-hidden rounded-xl lg:h-[360px]"
            >
              <Image
                src={e.image}
                alt={e.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
              <div className="relative p-8">
                <h3 className="font-serif text-2xl text-background lg:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-background/85">
                  {e.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                  Discover
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
