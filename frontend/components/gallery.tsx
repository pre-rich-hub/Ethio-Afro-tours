'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'

const shots = [
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
    location: 'Lalibela',
    description: 'Sunlight falling into the rock cut Bete Maryam church.',
  },
  {
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786804467/simien-mountains.png',
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
    src: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786804466/lake-tana.png',
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
    <section
      id="journal"
      className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-charcoal group/viewport"
    >
      <div className="absolute inset-0">
        {shots.map((shot, idx) => {
          const isActive = idx === activeIndex
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
              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.08)_52%,rgba(0,0,0,0.38)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-charcoal/55 to-transparent" />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-7 z-30 flex items-center justify-center px-6">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-charcoal/35 px-3 py-2 backdrop-blur-md">
          {shots.map((_, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  setIsPlaying(true)
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${isActive ? 'w-8 bg-accent' : 'w-2 bg-white/45 hover:bg-white/85'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-7 right-5 z-30 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover/viewport:opacity-100 focus-within:opacity-100 md:right-8 md:opacity-100">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-charcoal/40 text-sand backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + shots.length) % shots.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-charcoal/40 text-sand backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % shots.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-charcoal/40 text-sand backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
      </div>

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

      {isPlaying && (
        <div
          key={activeIndex}
          className="absolute bottom-0 left-0 right-0 z-30 h-[3px] origin-left animate-progress-grow bg-accent/90"
        />
      )}
    </section>
  )
}
