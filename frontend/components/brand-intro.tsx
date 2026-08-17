import { OptimizedImage as Image } from '@/components/optimized-image'
import { Reveal } from '@/components/reveal'

export function BrandIntro() {
  return (
    <section id="about" className="scroll-mt-20 mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Our Philosophy
          </p>
          <h2 className="max-w-[18ch] text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
            Every journey begins with a story
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              For thousands of years, Ethiopia has welcomed explorers, traders,
              pilgrims, artists, and dreamers. It is a land of rock-hewn
              churches, highland kingdoms, and the birthplace of coffee.
            </p>
            <p>
              EthioAfro exists to help you experience that legacy through
              journeys crafted with care, knowledge, and authenticity — not
              packages, but experiences designed around the traveler you are.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {[
              ['We listen', 'before we recommend'],
              ['We design', 'journeys, not packages'],
              ['We remain', 'present, before and after'],
            ].map(([bold, rest]) => (
              <p key={bold} className="text-sm leading-relaxed">
                <span className="block font-serif text-xl text-foreground">
                  {bold}
                </span>
                <span className="text-muted-foreground">{rest}</span>
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg"
              alt="Addis Ababa, Ethiopia"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
