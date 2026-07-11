# Pulso Web

Next.js (App Router, TypeScript) frontend for the [Pulso](https://github.com/pulso-health-tracker) health dashboard — same 3 charts as the original Django+Vite dashboard, redesigned around server-side rendering: `app/page.tsx` fetches data server-side based on URL search params, instead of client-side `useEffect` calls.

## Tech Stack

- **Next.js** (App Router), **TypeScript**
- **Chart.js** + `react-chartjs-2`
- **Vitest** + **Testing Library** (Client Component unit tests)
- **Playwright** (end-to-end)

## Prerequisites

- [pulso-api](https://github.com/pulso-health-tracker/pulso-api) running locally, exposing `/api/metrics/{energy-vs-goal,workout-volume,top-record-types}` — which in turn needs [pulso-etl](https://github.com/pulso-health-tracker/pulso-etl)'s Postgres running and populated.
- Node 20+, or Docker.

## Quick Start

### With Docker

```bash
API_BASE_URL=http://host.docker.internal:8080 docker compose up --build
```

App is then available at http://localhost:3000.

### Local Development

```bash
npm install
API_BASE_URL=http://localhost:8080 npm run dev
```

## Configuration

| Variable        | Default                  | Description                                             |
|------------------|----------------------------|-----------------------------------------------------------|
| `API_BASE_URL`    | `http://localhost:8080`    | Base URL of the metrics API (`pulso-api`) — server-only, never sent to the browser |

## Architecture

`app/page.tsx` is a Server Component: it reads `start`/`end` from `searchParams`, fetches all 3 metrics endpoints server-side via `lib/api.ts`, and passes the results as props into `Dashboard`. `DateRangeSelector` is the only interactive piece — it's a Client Component that updates the URL via `router.push`, which triggers Next.js to re-run `page.tsx` on the server with the new params. The 3 chart components are Client Components (Chart.js needs a canvas) that render whatever data they're given via props — they never fetch anything themselves.

See `docs/superpowers/specs/2026-07-11-nextjs-frontend-migration-design.md` in `pulso-dashboard` for the full design rationale.

## Testing

```bash
# Unit tests (Client Components)
npm test

# End-to-end (requires a real metrics API running — see tests/e2e/dashboard.spec.ts)
npm run test:e2e
```

## Continuous Integration

**Build and Test** (`.github/workflows/tests.yml`) — Vitest unit tests, plus a Playwright e2e job that checks out `pulso-etl` and `pulso-api`, loads fixture data, builds and starts the real Go API, and drives the full rendered app.

**Docker Build** (`.github/workflows/docker.yml`) — builds the production Docker image.
