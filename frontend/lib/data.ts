// Live public data with static fallbacks for fields the backend does not store yet.
//
// Phase 1 strategy: the API is authoritative for the fields it can supply
// (prices, featured flags), while the static catalog in lib/site.ts stays the
// source for display copy (days/nights, style, season, group, teaser,
// summary, includes/excludes, itinerary, places, images). Live tours are
// merged onto their static record by slug — when a tour is not live yet (API
// down, catalog beyond page limits) the static record is returned unchanged.
//
// The Tour type in lib/site.ts is the contract: no field additions. From the
// live payload we overlay `from` (price) and `featured`; rating exists in the
// API but has no surface on the static Tour type, so it stays unused until a
// rendering element needs it.

import type { Destination, LayoverPackage, Post, Tour, TourCategory } from '@/lib/site'
import {
  destinations as staticDestinations,
  layoverPackages as staticLayoverPackages,
  posts as staticPosts,
  tours as staticTours,
  getDestination as getStaticDestination,
  getPost as getStaticPost,
  getTour as getStaticTour,
} from '@/lib/site'
import {
  getBlogPostBySlug,
  getBlogPosts,
  getDestinationBySlug,
  getDestinations,
  getLayoverPackages,
  getTours,
  getTourBySlug,
  type ApiBlogPost,
  type ApiDestination,
  type ApiLayoverPackage,
  type ApiTour,
} from '@/lib/api'

function formatPrice(price: number | null): string | null {
  if (price === null || price === undefined || price <= 0) return null
  return `$${price.toLocaleString('en-US')} per person`
}

function slugFor(canonical: { slug: string | null; id: number }, fallback: string): string {
  return canonical.slug ?? fallback
}

function toTour(live: ApiTour, fallback: Tour | undefined, index = 0): Tour {
  const slug = slugFor(live.canonical, `tour-${live.id}`)
  const itinerary = live.itinerary ?? []
  const includes = live.included ?? []
  const excludes = live.excluded ?? []
  const categories = live.categories.map((category) => category.name as TourCategory)
  const destinations = live.destinations.length
    ? live.destinations.map((destination) => destination.name)
    : live.destination
      ? [live.destination.name]
      : []
  const days = live.durationDays > 0 ? `${live.durationDays} ${live.durationDays === 1 ? 'Day' : 'Days'}` : fallback?.days ?? 'Custom length'

  return {
    popularityRank: fallback?.popularityRank ?? index + 1,
    slug,
    title: live.name,
    image: live.mainImage ?? fallback?.image ?? '/placeholder.svg',
    days,
    nights: fallback?.nights ?? Math.max(0, live.durationDays - 1),
    style: categories.length ? `${categories.join(' · ')} · Private` : fallback?.style ?? 'Private',
    season: fallback?.season ?? 'Year-round',
    from: formatPrice(live.adultPrice) ?? fallback?.from ?? 'Custom quote',
    group: fallback?.group ?? 'Private group',
    teaser: live.description || fallback?.teaser || live.name,
    summary: live.overview || fallback?.summary || live.description || live.name,
    includes: includes.length ? includes : fallback?.includes ?? [],
    excludes: excludes.length ? excludes : fallback?.excludes ?? [],
    itinerary: itinerary.length
      ? itinerary.map((step) => ({
          day: String(step.day).startsWith('Day') ? String(step.day) : `Day ${step.day}`,
          title: step.title,
          text: step.activities,
        }))
      : fallback?.itinerary ?? [],
    places: destinations.length ? destinations : fallback?.places ?? [],
    categories: categories.length ? categories : fallback?.categories ?? [],
    featured: live.isFeatured,
    accessNote: fallback?.accessNote,
  }
}

function toDestination(live: ApiDestination, fallback?: Destination): Destination {
  const slug = slugFor(live.canonical, `destination-${live.id}`)
  const description = live.description?.trim() || fallback?.intro || live.name

  return {
    slug,
    name: live.name,
    region: fallback?.region ?? 'Ethiopia',
    tag: fallback?.tag ?? 'Destination',
    image: live.imageUrl ?? fallback?.image ?? '/placeholder.svg',
    teaser: fallback?.teaser ?? description,
    intro: description,
    bestTime: fallback?.bestTime ?? 'Ask us',
    duration: fallback?.duration ?? 'Custom stay',
    altitude: fallback?.altitude ?? 'Varies',
    highlights: fallback?.highlights ?? [live.name],
    paragraphs: fallback?.paragraphs ?? [description],
    span: fallback?.span,
    accessNote: fallback?.accessNote,
  }
}

function formatDate(value: string | null): string {
  if (!value) return 'Recently'
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function readTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function toPost(live: ApiBlogPost, fallback?: Post, index = 0): Post {
  const slug = slugFor(live.canonical, `post-${live.id}`)
  const description = live.description?.trim() || fallback?.excerpt || live.title
  const body = description.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)

  return {
    slug,
    title: live.title,
    category: live.category?.name ?? fallback?.category ?? 'Journal',
    date: formatDate(live.createdAt),
    readTime: readTime(description),
    image: live.imageUrl ?? fallback?.image ?? '/placeholder.svg',
    author: fallback?.author ?? 'EthioAfro Tours',
    authorRole: fallback?.authorRole ?? 'Travel Design Team',
    excerpt: body[0] ?? description,
    body: body.length ? body : fallback?.body ?? [description],
    featured: fallback?.featured ?? index === 0,
  }
}

export async function getToursData(): Promise<Tour[]> {
  try {
    const page = await getTours({ limit: 100 })
    const staticBySlug = new Map(staticTours.map((t) => [t.slug, t]))
    return (page.items ?? []).map((live, index) => {
      const slug = live.canonical?.slug
      const fallback = slug ? staticBySlug.get(slug) : undefined
      return toTour(live, fallback, index)
    })
  } catch {
    return staticTours
  }
}

export async function getTourData(slug: string): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug)

  try {
    const live = await getTourBySlug(slug)
    if (live && live.canonical?.slug === slug) {
      return toTour(live, staticTour)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}

export async function getDestinationsData(): Promise<Destination[]> {
  try {
    const liveDestinations = await getDestinations()
    const staticBySlug = new Map(staticDestinations.map((destination) => [destination.slug, destination]))
    return liveDestinations.map((live) => {
      const slug = live.canonical?.slug
      return toDestination(live, slug ? staticBySlug.get(slug) : undefined)
    })
  } catch {
    return staticDestinations
  }
}

export async function getDestinationData(slug: string): Promise<Destination | undefined> {
  const staticDestination = getStaticDestination(slug)
  try {
    const live = await getDestinationBySlug(slug)
    return toDestination(live, staticDestination)
  } catch {
    return staticDestination
  }
}

export async function getPostsData(): Promise<Post[]> {
  try {
    const page = await getBlogPosts({ limit: 100 })
    const staticBySlug = new Map(staticPosts.map((post) => [post.slug, post]))
    return (page.items ?? []).map((live, index) => {
      const slug = live.canonical?.slug
      return toPost(live, slug ? staticBySlug.get(slug) : undefined, index)
    })
  } catch {
    return staticPosts
  }
}

export async function getPostData(slug: string): Promise<Post | undefined> {
  const staticPost = getStaticPost(slug)
  try {
    const live = await getBlogPostBySlug(slug)
    return toPost(live, staticPost)
  } catch {
    return staticPost
  }
}

export async function getLayoverPackagesData(): Promise<LayoverPackage[]> {
  try {
    const livePackages: ApiLayoverPackage[] = await getLayoverPackages()
    const staticBySlug = new Map(staticLayoverPackages.map((p) => [p.slug, p]))

    // A successful API response is authoritative, including an intentionally
    // empty catalog. Static records only supply images for matching seed slugs.
    return livePackages.map((live) => {
      const fallback = staticBySlug.get(live.slug)
      return {
        ...live,
        image:
          live.image && live.image.startsWith('/api/v1/')
            ? live.image
            : fallback?.image ?? '/placeholder.svg',
      }
    })
  } catch {
    return staticLayoverPackages
  }
}
