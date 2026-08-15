'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { Reveal } from '@/components/reveal'

const shots = [
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
    location: 'Lalibela',
    description: 'Sunlight falling into the rock cut Bete Maryam church.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801433/simien-mountains.jpg',
    location: 'Simien Mountains',
    description: 'Gelada troops foraging along the vertical basalt rim.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801428/danakil-depression.jpg',
    location: 'Danakil Depression',
    description: 'Acid deposits and salt pans 100 meters below sea level.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
    location: 'Omo Valley',
    description: 'Morning light crossing the winding Omo River.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg',
    location: 'Gondar',
    description: 'White-robed processional crowds around Fasilides’ Pool.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/lake-tana.jpg',
    location: 'Lake Tana',
    description: 'Parchment gospels preserved on thatched island sanctuaries.',
  },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % shots.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [isPlaying, activeIndex])

  return (
    <section id="journal" className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-36">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-accent">
            <span className="rule !w-10" />
            The Exhibition
          </p>
          <h2 className="max-w-[16ch] text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
            Ethiopia, seen slowly
          </h2>
        </div>
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
          A gallery of quiet moments captured on our journeys — the light, the
          texture, the human scale of an ancient land.
        </p>
      </Reveal>

      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-charcoal/10 shadow-2xl border border-charcoal/10 group/viewport">
        {shots.map((shot, idx) => {
          const isActive = idx === activeIndex
          // Alternate animation direction/style
          const kbClass = idx % 2 === 0 ? 'animate-kb-1' : 'animate-kb-2'
          return (
            <div
              key={shot.src}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <Image
                src={shot.src}
                alt={`${shot.location}, Ethiopia`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover ${isActive ? kbClass : 'scale-100'}`}
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/30 z-20" />
            </div>
          )
        })}

        {/* Top-right overlay indicating index */}
        <div className="absolute top-4 right-4 z-20 bg-charcoal/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-sand/10">
          <span className="text-[10px] font-mono tracking-widest text-sand uppercase">
            Exhibition {activeIndex + 1} / {shots.length}
          </span>
        </div>

        {/* Bottom-left metadata overlay */}
        <div className="absolute bottom-6 left-6 z-20 max-w-[70vw] md:max-w-md text-balance">
          <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
            Captured Moments
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl text-white font-serif mt-1 font-normal tracking-wide">
            {shots[activeIndex].location}
          </h3>
          <p className="text-xs sm:text-sm text-sand/80 mt-1 lines-clamp-2 md:line-clamp-none font-sans leading-relaxed">
            {shots[activeIndex].description}
          </p>
        </div>

        {/* Bottom-center dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex items-center gap-2">
          {shots.map((_, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  setIsPlaying(true) // reset timer & keep playing on selection
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${isActive ? 'w-8 bg-accent' : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          })}
        </div>

        {/* Bottom-right interactive controls overlay */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 opacity-0 group-hover/viewport:opacity-100 md:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-charcoal/60 backdrop-blur-md border border-sand/10 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + shots.length) % shots.length)}
            className="p-2.5 rounded-full bg-charcoal/60 backdrop-blur-md border border-sand/10 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % shots.length)}
            className="p-2.5 rounded-full bg-charcoal/60 backdrop-blur-md border border-sand/10 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic CSS animations styles injected locally */}
        <style>{`
          @keyframes kb-pan-1 {
            0% { transform: scale(1.03) translate(0%, 0%); }
            100% { transform: scale(1.08) translate(-1%, -0.5%); }
          }
          @keyframes kb-pan-2 {
            0% { transform: scale(1.08) translate(0%, 0%); }
            100% { transform: scale(1.03) translate(1%, 0.5%); }
          }
          .animate-kb-1 {
            animation: kb-pan-1 8000ms ease-out forwards;
          }
          .animate-kb-2 {
            animation: kb-pan-2 8000ms ease-out forwards;
          }
          @keyframes progress-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          .animate-progress-grow {
            animation: progress-grow 7000ms linear forwards;
          }
        `}</style>

        {/* Progress Bar indicating time remaining for current slide */}
        {isPlaying && (
          <div
            key={activeIndex}
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent/90 z-20 origin-left animate-progress-grow"
          />
        )}
      </div>
    </section>
  )
}
