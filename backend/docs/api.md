# Ethio Afro Tour — Backend API

Express + TypeScript + Prisma (PostgreSQL on Neon) + Vitest. Node 20+, ESM (tested on Node 26).

---

## Database connectivity (read this first)

Two connection strings, both with `sslmode=require` — never `sslmode=no-verify`:

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_URL` | runtime (app, seeds, tests) | **pooled** host (`-pooler` segment) + `&pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | `prisma migrate deploy` | **direct** host, no `-pooler`, no pgbouncer flags |

- **Prisma is pinned to the 6.x line** (`prisma` and `@prisma/client` exactly `6.19.3`,
  the latest stable 6.x). This matters because Neon serves a Let's Encrypt **YR1**
  root-cert chain (`CN=*.c-5.us-east-2.aws.neon.tech`): Prisma ≤ 6.1.x could not
  verify that chain and every connect died with `P1001`. Prisma 6.19.x validates
  it fine with plain `sslmode=require`. **Do not bump to Prisma 7** without
  re-verifying TLS + PgBouncer behavior.
- Local dev machines without IPv6: the Prisma engine resolves the Neon hostname
  to AAAA records first and fails with `P1001 "Can't reach database server"`
  (no IPv4 fallback — Node's own drivers do fall back, which is why `pg` and
  openssl "work"). Workaround for this machine only: point the hostnames in both
  URLs at one of the endpoint's IPv4 literals (keep every other param identical).
- `neondb_owner` is the role Neon provisions; the password must match the current
  Neon project (rotate → update `.env`).

### Setup

```bash
cp .env.example .env   # fill in real values (DATABASE_URL, DIRECT_URL, JWT_SECRET...)
npm install            # also runs prisma generate
npx prisma migrate deploy   # applies src/prisma/migrations/0_init via DIRECT_URL
npm run seed           # catalog: destinations, tour/blog categories, testimonial (idempotent)
npm run seed:admin     # admin account from ADMIN_EMAIL / ADMIN_PASSWORD (idempotent)
```

`seed.ts` uses upserts/guards, so re-running it never duplicates rows.

---

## Development

```bash
npm run dev            # tsx watch src/server.ts
npm run typecheck      # tsc --noEmit
npm run build          # prisma generate && tsc
npm start              # node dist/server.js
```

---

## Testing

| Command | Scope | DB |
|---|---|---|
| `npm run test` | unit + integration (mocked prisma) | none (mocked) |
| `npm run test:unit` | pure-logic tests only | none |
| `npm run test:integration` | HTTP-level tests with mocked prisma | none |
| `npm run test:smoke` | real-DB smoke (runs only with `SMOKE=1`) | Neon |
| `SMOKE=1 npm run test:smoke` | media round-trip, booking create, interactive tx | Neon (seeded) |

Without `SMOKE=1` the smoke suite is skipped and exits green. Smoke prerequisites:
`npx prisma migrate deploy` + `npm run seed` + `npm run seed:admin` against the
target database.

---

## API

All routes under `/api/v1`. Responses use one envelope:

```json
{ "success": true, "message": "…", "data": … }
{ "success": false, "message": "…", "errors": [{ "path": "…", "message": "…" }] }
```

Errors: `422` validation (zod), `401` auth, `403`/`404` not found, `409`
duplicate, `500` internal (internal details only outside production).

Admin auth: HTTP-only cookie (`AUTH_COOKIE_NAME`, default `admin_session`) holding
a JWT signed with `JWT_SECRET`. `tokenVersion` bumps invalidate old sessions.

### Public

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | DB ping included (`database: connected/unreachable`) |
| GET | `/tours` | list (pagination, filters) |
| GET | `/tours/featured` | featured tours |
| GET | `/tours/slug/:slug` | detail by slug |
| GET | `/tours/:id` | detail by id |
| GET | `/tours/:id/blocked-dates` | unavailable dates |
| GET | `/destinations`, `/destinations/featured`, `/destinations/slug/:slug`, `/destinations/:id` | destinations |
| GET | `/categories` | tour categories |
| GET | `/gallery`, `/gallery/tour/:tourId` | gallery images |
| GET | `/blog/categories`, `/blog`, `/blog/slug/:slug`, `/blog/:id` | blog |
| GET | `/layover-packages` | layover packages, ordered by `sortOrder` asc then `id` asc |
| GET | `/testimonials` | testimonials |
| POST | `/bookings` | booking inquiry (validates blocked dates; email notifications log-only when `EMAIL_ENABLED=false`) |
| POST | `/contact` | contact form (email log-only when disabled) |
| POST | `/subscribe` | newsletter subscription |
| GET | `/media/:id` | binary asset (uuid) — `Content-Type`, `Content-Length` |

### Admin (cookie required)

| Method | Path | Notes |
|---|---|---|
| POST | `/auth/login` | `{ email, password }` → sets cookie |
| POST | `/auth/logout` | clears cookie |
| GET | `/auth/me` | current admin |
| PUT | `/auth/profile`, `/auth/change-password` | profile / password |
| GET/POST/PUT/DELETE | `/admin/tours`, `/admin/tours/:id` | CRUD, multipart `tourImages`, `tourDestinations`, `tourCategories` |
| GET/POST/PUT/DELETE | `/admin/layover-packages`, `/admin/layover-packages/:id` | CRUD, multipart `layoverImage` (optional), `removeImage` flag, textarea `itinerary`/`includes` (one line per entry), `sortOrder` |
| GET/POST/PUT/DELETE | `/admin/destinations[...]` | CRUD (multipart `destinationImage`) |
| GET/POST/PUT/DELETE | `/admin/categories[...]` | tour categories |
| GET/POST/DELETE | `/admin/gallery`, `/admin/gallery/:id` | gallery (multipart `galleryImage`) |
| GET/POST/PUT/DELETE | `/admin/blog[...]`, `/admin/blog-categories[...]` | blog + categories |
| GET/POST/PUT/DELETE | `/admin/testimonials[...]` | testimonials |
| GET/PUT/DELETE | `/admin/bookings[...]`, `/admin/bookings/:id/status` | bookings + status |
| GET/POST/DELETE | `/admin/contacts[...]`, `/admin/contacts/:id/reply` | contacts + reply |
| GET/DELETE | `/admin/subscribers[...]` | subscribers |
| GET | `/admin/dashboard/stats` | totals, recent bookings, trends, top tours |
| GET/POST/DELETE | `/admin/tours/:id/blocked-dates[...]` | blocked dates |

### Storage

`STORAGE_DRIVER` (default `local` for local dev; `database` auto-on-Vercel):
- `local` — files under `UPLOAD_ROOT/assets/...`, served at `/assets/...`
- `database` — bytes stored in `media_assets`, served at `/api/v1/media/:id`

### Layover package shapes

Public `GET /layover-packages` envelope data is an array of:

```json
{
  "id": 1,
  "slug": "6-hour",
  "hours": "6 Hours",
  "title": "The Espresso",
  "price": "$95 per person",
  "image": null,
  "teaser": "…",
  "itinerary": ["…"],
  "includes": ["…"],
  "best": "Connections of 8 hours or more"
}
```

Admin CRUD returns the same shape (`201` on create). Slug is derived from
`title` **at creation only** — `PUT` deliberately preserves it, so renaming a
package never changes its identity. `POST` accepts `layoverImage` optionally
(image absent == `image: null`). `PUT` image semantics: a new file replaces
and deletes the old stored file; `removeImage: "true"` clears it and deletes
the stored file; neither leaves the current image untouched.

**Image URL contract:** with the `database` driver the backend emits
`/api/v1/media/<uuid>` paths that the backend itself serves in production.
With the `local` driver (dev) it emits `/assets/...` paths that only the
backend process serves — the Next frontend does not. The public layover page
overlays a live `image` only when it starts with `/api/v1/`; seeded packages
have `image: null`, so the client's static images render instead.

---

## env vars

`NODE_ENV`, `PORT`, `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_ORIGIN` (comma list),
`JWT_SECRET` (min 16 chars), `JWT_EXPIRES_IN`, `AUTH_COOKIE_NAME`, `COOKIE_SECURE`,
`SMTP_*`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `EMAIL_ENABLED` (boolean strings
`true/false/1/0/on/off` are parsed safely — plain `false` in `.env` stays false),
`UPLOAD_ROOT`, `PUBLIC_FILE_BASE_URL`, `MAX_UPLOAD_MB`, `STORAGE_DRIVER`.

Up-to-date template with comments: `.env.example`.