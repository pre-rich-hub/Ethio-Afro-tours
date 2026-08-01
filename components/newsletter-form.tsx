'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export function NewsletterForm() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <p className="flex w-full max-w-sm items-center gap-3 border border-accent/40 px-5 py-4 text-sm text-background/80">
        <Check className="h-4 w-4 shrink-0 text-accent" />
        Thank you — the next letter will find you.
      </p>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
      className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email"
        className="w-full rounded-full border border-background/25 bg-transparent px-5 py-3.5 text-sm text-background placeholder:text-background/45 focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors duration-300 hover:bg-accent/90"
      >
        Join
      </button>
    </form>
  )
}
