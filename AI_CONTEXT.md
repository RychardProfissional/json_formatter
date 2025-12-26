# AI_CONTEXT — Respawn Tech (json_formatter)

## Goal
This repo is a Next.js (App Router) website for **Respawn Tech** (https://respawntech.dev) with:
- Institutional pages (home, about, contact, legal)
- A small static blog (no DB)
- Developer tools hosted under `/tools` (no subdomain)
- A “hexagonal-ish” separation of concerns: `domain` (pure logic), `application` (config/keys), `infra` (adapters), `ui` (components/providers)

No database is used.

## Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Running
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## High-level structure
- `src/app/` — Next App Router routes
- `src/domain/` — pure logic (no browser APIs)
- `src/application/` — app constants/config (consent keys, theme keys, tool ids)
- `src/infra/` — adapters (e.g. localStorage wrapper)
- `src/ui/` — providers/components/hooks
- `src/content/` — static content (blog metadata)
- `public/` — static assets served at `/` (`ads.txt`, `og.svg`, fallback `favicon.ico`/`favicon.svg`)

TypeScript path alias: `@/*` → `src/*` (see `tsconfig.json`).

## Routes
### Institutional
- `/` — Home (institutional + FAQ JSON-LD)
- `/sobre` — About
- `/contato` — Contact (mailto form)
- `/politica-de-privacidade` — Privacy policy
- `/termos-de-uso` — Terms

### Blog
- `/blog` — blog index
- `/blog/[slug]` — blog posts (static params)
  - `como-formatar-json-online`
  - `ferramentas-uteis-para-programadores`
  - `como-validar-cpf-json-regex`

Blog metadata list: `src/content/blog.ts`.

### Tools
- `/tools` — tools index
- `/tools/json-formatter`
- `/tools/json-validator`
- `/tools/json-minify`
- `/tools/json-escape`
- `/tools/json-csv`
- `/tools/jsonl-prettify`

Tool domain logic lives in `src/domain/tools/*` and is imported by the tool UI clients.

## SEO
- `src/app/robots.ts` serves `/robots.txt`
- `src/app/sitemap.ts` serves `/sitemap.xml`
- Page-level `metadata` is set on server components (App Router rule).
- `public/og.svg` is used as the default OG image.
- Favicon (Next.js App Router standard): `src/app/icon.svg`.

## Layout, nav, theme, consent
- Root layout: `src/app/layout.tsx`
  - Wraps the app with providers and `SiteShell`.
- Shell (header/footer): `src/ui/components/SiteShell.tsx`
- Theme toggle:
  - Provider: `src/ui/providers/ThemeProvider.tsx`
  - Toggle button: `src/ui/components/ThemeToggle.tsx`
- i18n (simple dictionary-based): `src/ui/providers/I18nProvider.tsx`
  - Currently `pt-BR` and `en` dictionaries.
- Consent/Ads/Analytics:
  - `src/ui/providers/ConsentProvider.tsx`
  - Cookie preferences link: `src/ui/components/CookiePrefsLink.tsx`
  - Ad slot component (safe retry/width check): `src/ui/components/AdSlot.tsx`
  - `public/ads.txt` contains AdSense declaration.

## Hexagonal layers (practical)
- `src/domain/`: pure functions only.
  - Example: `parseJson`, `formatJson`, `minifyJson`, `jsonToCsv`, `csvToJson`, `prettifyJsonl`.
- `src/infra/`: adapters around browser APIs.
  - Example: `src/infra/browser/storage.ts`.
- `src/ui/`: client UI, state, providers.
- `src/application/`: app constants and keys.

## Adding a new tool
1. Add pure logic (if needed) under `src/domain/tools/`.
2. Export it via `src/domain/tools/index.ts`.
3. Create route under `src/app/tools/<tool-slug>/page.tsx`.
   - Keep `metadata` in the server `page.tsx`.
   - Put interactive code in a sibling `*Client.tsx` file with `"use client"`.
4. Add the card to `src/app/tools/page.tsx`.
5. Add the URL to `src/app/sitemap.ts`.

## Adding a new locale
1. Update dictionaries in `src/ui/providers/I18nProvider.tsx`.
2. If you need routing-based locale later, keep this provider as the base (currently it’s an in-memory toggle-ready implementation).

## Redirects / legacy URLs
- Redirect rules live in `next.config.ts`.

## Notes
- Legacy static `.html` site was removed from the repo; everything is now `.ts/.tsx`.
- There is no DB; everything is static or runs in the browser.
