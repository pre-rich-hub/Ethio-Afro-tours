import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function Testimonial() {
  return (
    <section className="bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
        <Reveal>
          <p className="mb-10 flex items-center justify-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-10 bg-accent" />
            In Their Words
            <span className="h-px w-10 bg-accent" />
          </p>
          <blockquote className="text-balance font-serif text-3xl leading-[1.3] text-foreground sm:text-4xl lg:text-[2.75rem]">
            &ldquo;We have traveled the world, yet nothing prepared us for
            Ethiopia. Every detail was considered, every guide extraordinary. We
            did not feel like tourists — we felt like guests of an old
            friend.&rdquo;
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4">
            <span className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                src="/images/traveler-portrait.png"
                alt="Portrait of Eleanor Whitmore"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span className="text-left">
              <span className="block font-medium text-foreground">
                Eleanor Whitmore
              </span>
              <span className="block text-sm text-muted-foreground">
                The Historic Route · United Kingdom
              </span>
            </span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
