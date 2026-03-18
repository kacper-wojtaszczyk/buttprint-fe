# CLAUDE.md

This file provides guidance to Claude Code when working in the Buttprint FE repository.

## What This Is

SvelteKit + TypeScript application. The visual layer of [Buttprint](../docs/buttprint.md). A thin display layer — no environmental data processing, no scoring, no SVG generation:

```
Browser (this) → Buttprint API (Go, public) → Jackfruit (Go, private)
```

Gathers user input (location + time), calls Buttprint API, displays the returned SVG and metadata, handles URL routing for shareability.

**Full spec:** [docs/buttprint-fe-spec.md](../docs/buttprint-fe-spec.md)

## Commands

```bash
# (stubs — fill in after scaffolding with `npm create svelte@latest`)
npm install           # Install dependencies
npm run dev           # Dev server with hot reload (Vite)
npm run build         # Production build
npm run preview       # Preview production build
npx svelte-check      # TypeScript + Svelte type checking
```

Node.js, SvelteKit, TypeScript, Vite. Node adapter for deployment (SSR for OG meta tags).

## SvelteKit Project Structure

```
src/
├── routes/
│   ├── +layout.svelte              ← global layout (dark theme, header)
│   ├── +page.svelte                ← landing page
│   ├── [location]/
│   │   ├── +page.svelte            ← main buttprint view
│   │   ├── +page.ts                ← client-side load: fetches buttprint from API
│   │   ├── +page.server.ts         ← server-side load: parses params for OG meta
│   │   └── [timestamp]/
│   │       ├── +page.svelte
│   │       ├── +page.ts
│   │       └── +page.server.ts
│   └── about/
│       └── +page.svelte
├── lib/
│   ├── cities.json                 ← static city list (~50 European cities)
│   ├── api.ts                      ← Buttprint API client (called from browser)
│   └── components/
│       ├── ButtDisplay.svelte      ← SVG container with gallery framing
│       ├── CityPicker.svelte       ← dropdown backed by cities.json
│       ├── TimePicker.svelte       ← native datetime wrapper
│       └── DataReadout.svelte      ← raw values + lineage attribution
├── app.css                         ← global styles (dark palette, typography)
└── svelte.config.js                ← Node adapter configuration
```

## Node Adapter Decision

**Use the Node adapter from day 1** — deployed as a Node.js server in a Kapsule container.

**Why not static:** Dynamic routes (`/rotterdam/2026-03-08T14:00:00Z`) can't be pre-rendered. Static fallback = blank shell until JS loads + no per-URL OG meta tags.

**SSR role is minimal:** Server parses URL params → renders correct `<meta>` tags in HTML shell. Actual buttprint data (SVG, variables, scores) is fetched **client-side** after hydration. The FE server never calls Buttprint API — the browser does directly.

## Key Design Decisions

- **City resolution lives in FE:** Static `cities.json` maps slugs to coords. API only ever receives `(lat, lon, time)` — never city names.
- **Timestamps are RFC 3339:** Native datetime picker produces local time without timezone. FE must append the user's timezone offset (or `Z` for UTC) before sending to the API.
- **Lineage is nullable:** `variables[].lineage` may be null on each variable. Display gracefully when present, omit when absent.
- **Plain CSS, no component library:** Scoped `<style>` blocks per component. Dark gallery aesthetic — deep warm grays, centered specimen.

## TypeScript / Svelte Conventions

- Strict TypeScript — type the API response structure, no `any`
- `<script lang="ts">` in all Svelte components
- Reactive declarations (`$:`) for derived state
- SvelteKit `load` functions return typed objects consumed by `+page.svelte`
- Plain CSS with CSS custom properties for theming
- Respect Svelte's scoped styles — don't use global selectors to reach into child components
