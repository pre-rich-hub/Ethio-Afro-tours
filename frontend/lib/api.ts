// Typed client for the EthioAfroTours Express API.
//
// All requests are same-origin relative paths ("/api/v1/...") so Next's
// dev/prod rewrites route them to the backend (see next.config.mjs). The API
// wraps every response in an envelope: { success, message, data }.
//
// Non-2xx responses are thrown with the backend's message so callers can
// render it directly as form feedback.

// Abort any request that does not complete in time. This is a dev/build
// safety net: from a local machine every DB round trip over the Neon pooler
// costs ~1.7s, so slug lookups can stall static generation for minutes.
// Callers with a fallback (e.g. lib/data.ts static records) recover on the
// thrown AbortError; in production the API answers in ~100ms and the timeout
// never fires.
const REQUEST_TIMEOUT_MS = 5_000

type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
}

export type ApiImage = {
  id: number
  imageUrl: string
  tourId: number | null
}

export type ApiTour = {
  id: number
  name: string
  description: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: number
  rating: number | null
  noOfRates: number
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string; slug?: string | null; imageUrl?: string | null }[]
  categories: { id: number; name: string }[]
  gallery: ApiImage[]
  durationDays: number
  included?: string[]
  excluded?: string[]
  itinerary?: { day: number | string; title: string; activities: string }[]
  journeyMap?: string | null
  createdAt: string | null
  updatedAt: string | null
  canonical: { type: string; id: number; suggestedPath: string; slug: string | null }
}

export type ToursParams = {
  featured?: boolean
  page?: number
  limit?: number
  categorySlug?: string
  destinationSlug?: string
  q?: string
  priceMin?: number
  priceMax?: number
  ratingMin?: number
}

export type ToursPage = {
  items: ApiTour[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })

  let envelope: ApiEnvelope<T> | undefined
  try {
    envelope = (await response.json()) as ApiEnvelope<T>
  } catch {
    // Non-JSON error body (proxy down, HTML error page, …)
  }

  if (!response.ok || !envelope?.success) {
    throw new Error(envelope?.message ?? `Request failed (${response.status})`)
  }

  return envelope.data as T
}

function queryString(params: Record<string, unknown> = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export async function getTours(params: ToursParams = {}): Promise<ToursPage> {
  return request<ToursPage>(`/api/v1/tours${queryString(params)}`)
}

export async function getTourBySlug(slug: string): Promise<ApiTour> {
  return request<ApiTour>(`/api/v1/tours/slug/${encodeURIComponent(slug)}`)
}

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await request<null>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function subscribe(email: string): Promise<void> {
  await request<null>('/api/v1/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export type ApiLayoverPackage = {
  id: number
  slug: string
  hours: string
  title: string
  price: string
  image: string | null
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export async function getLayoverPackages(): Promise<ApiLayoverPackage[]> {
  return request<ApiLayoverPackage[]>('/api/v1/layover-packages')
}