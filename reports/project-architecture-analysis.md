# Project Architecture Analysis

**Project:** vCloudTech Marketing Website  
**Path:** `C:\Users\usama\vcloudtech-test-website`  
**Scope:** Read-only analysis of the existing codebase  
**Date:** 2026-07-22  

**Verdict:** Single Next.js 16 App Router marketing site + Sanity CMS + a sibling Node automation package (not a true monorepo workspace).

---

## 1. Project Architecture

| Aspect | Finding |
|--------|---------|
| Router | **App Router only** (`app/`). No `pages/` directory. |
| Framework | Next.js **16.2.6**, React **19.2.4**, TypeScript **strict** |
| CMS | Sanity Studio embedded at `/studio` |
| Layout | Not an npm/pnpm workspace monorepo; one root app + nested `services/content-automation` with its own `package.json` |

**Entry flow:**

```
app/(site)/page.tsx → _home/HomePage.tsx → home-sections.ts
app/(site)/layout.tsx → MarketingLayoutShell
app/layout.tsx → fonts + IntroAppProvider + globals.css
```

---

## 2. Folder Structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router routes, root layout, fonts, globals |
| `components/` | UI by domain (home, marketing, landing pages, blog helpers) |
| `lib/` | Content config, nav, blog fetch/SEO, asset paths, fonts |
| `sanity/` | Schema, GROQ queries, Sanity clients, env |
| `public/` | Static images/video/brand assets |
| `scripts/` | One-off Node tooling (seed, cache warm, media optimize) |
| `services/content-automation/` | Standalone RSS → OpenAI → Sanity pipeline |
| `reports/` | Manager weekly work reports |
| `.cursor/rules/` | Agent behavioral + report conventions |
| `AGENTS.md` / `CLAUDE.md` | Next.js 16 “read the docs” agent rule |

---

## 3. Frameworks and Libraries

### Root dependencies

| Package | Version |
|---------|---------|
| `next` | `16.2.6` |
| `react` / `react-dom` | `19.2.4` |
| `framer-motion` | `^12.38.0` |
| `sanity` | `^5.24.0` |
| `next-sanity` | `^12.4.5` |
| `@sanity/icons` | `^3.7.4` |
| `@sanity/image-url` | `^2.1.1` |
| `@sanity/vision` | `^5.24.0` |
| `@portabletext/react` | `^6.2.0` |
| `styled-components` | `^6.4.1` *(Sanity Studio)* |

### Root devDependencies

| Package | Version |
|---------|---------|
| `typescript` | `^5` |
| `tailwindcss` | `^4.3.0` |
| `@tailwindcss/postcss` | `^4` |
| `postcss` | `^8.5.14` |
| `autoprefixer` | `^10.5.0` |
| `eslint` | `^9` |
| `eslint-config-next` | `16.2.6` |
| `@types/node` | `^20` |
| `@types/react` / `@types/react-dom` | `^19` |
| `sharp` | `^0.34.5` |
| `@ffmpeg-installer/ffmpeg` | `^1.1.0` |

### `services/content-automation` (separate package)

`@sanity/client`, `axios`, `dotenv`, `node-cron`, `openai`, `rss-parser`, `tsx`, `typescript`

**Not present:** Zustand, Redux, React Query, Bootstrap, CSS Modules, SCSS, Prettier, Jest/Vitest/Playwright.

---

## 4. Styling Approach

### Tailwind

- **Primary styling system:** Tailwind CSS v4 via PostCSS
- Entry: `app/globals.css` (`@import "tailwindcss"`, `@config`, `@source`)
- Config: `tailwind.config.js` (mostly empty `theme.extend`; `darkMode: "class"`)
- PostCSS: `postcss.config.mjs` with `@tailwindcss/postcss`

### CSS

- Many co-located **plain CSS** files next to features
- Examples: `components/marketing/design-test-*.css`, `app/(site)/blog/blog.css`, section CSS under `components/home/sections/**`
- BEM-ish class prefixes: `tp__`, `blog-`, `about-page__`, `dt-`, `cv-stack__`

### SCSS

- **Not used**

### CSS Modules

- **Not used** (`*.module.css` not present)

### Design Tokens

- **JS class-string tokens:** `components/marketing/design-test-theme.ts` (`dt`, `dtColors`, `dtCta`)
- **CSS custom properties:** under `.design-test-lab-page` in `design-test-global-nav.css` (e.g. `--dt-nav-occupancy`)
- **Tailwind `@theme inline`** font tokens in `globals.css`
- Brand palette: `#041329` bg · `#111F34` cards · `#E55614` primary · `#FFFFFF` / `#A1A1AA` text · `#b3b3b3` accent

### Bootstrap

- **Not used.** No Bootstrap package or CSS. Project convention is **Tailwind only**.

---

## 5. State Management

| Pattern | Where |
|---------|--------|
| Local `useState` / `useEffect` | Client components (nav, FAQ, forms, filters, marquees, stack) |
| React Context | `components/intro/intro-context.tsx` → `useIntroReady()` |
| No Zustand / Redux / Jotai | — |

Server Components are default; client islands marked `"use client"`.

---

## 6. Routing

**Route groups:**

- `app/(site)/` — public marketing shell
- `app/studio/[[...tool]]/` — Sanity Studio catch-all

**Static pages (examples):**

- `/` → `app/(site)/page.tsx`
- `/about`, `/contact`, `/services`, `/partners`, `/contracts`, `/industry`, `/procurement`, `/solutions`, `/blog`, `/posts`, `/vendor-updates`

**Dynamic routes:**

| Route | File |
|-------|------|
| `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` |
| `/posts/[slug]` | `app/(site)/posts/[slug]/page.tsx` |
| `/solutions/[slug]` | `app/(site)/solutions/[slug]/page.tsx` |
| `/vendor-updates/[slug]` | `app/(site)/vendor-updates/[slug]/page.tsx` |
| `/studio/[[...tool]]` | `app/studio/[[...tool]]/page.tsx` |

**Notes:**

- Next 15+/16 params: `params` / `searchParams` typed as `Promise<…>` and awaited
- Private folder: `app/(site)/_home/` — homepage composition, not a URL segment

---

## 7. API Architecture

- **No `app/api/` route handlers** in this repo
- External systems:
  - **Sanity CDN/API** via `next-sanity` clients (`sanity/lib/client.ts`, `sanity/lib/serverClient.ts`)
  - **Content automation** (separate process): RSS → OpenAI → Sanity write client
- Forms (newsletter/contact) are client-side UI; no dedicated in-repo backend routes found

---

## 8. Data Fetching Strategy

1. **Server Components** fetch Sanity directly (e.g. vendor updates)
2. **Blog layer** (`lib/blog/fetch.ts`): `server-only`, `unstable_cache`, ISR tags `["blog"]`, disk fallback, retries
3. **ISR:** `export const revalidate = 60` on blog/posts/vendor-updates
4. **Static params:** `generateStaticParams` on blog + solutions slugs
5. **Marketing copy:** mostly static TS modules under `lib/marketing/*` (no CMS)

Sanity schemas: `blogPost`, `post`, `author`, `category`, `blockContent`, `vendorUpdate` in `sanity/schemaTypes/`.

---

## 9. Component Architecture

| Folder | Role |
|--------|------|
| `marketing/` | Shell: nav, footer, heroes, contract grids, `design-test-theme` |
| `home/sections/*` | Homepage sections |
| `home/shared/` | `GlassCard`, `DtScrollReveal` |
| `*-landing/` | Full page compositions (about, contact, partners, services, industries, contracts) |
| `layout/` | `MarketingLayoutShell`, `MarketingDocPage` |
| `intro/` | First-visit splash |
| `posts/` | Portable Text bodies |
| `vendor-updates/` | News UI |
| `ui/` | Minimal shared primitives |
| `brand/`, `icons/` | Logo + section icons |

Homepage is **config-driven** via `HOME_SECTIONS` in `app/(site)/_home/home-sections.ts`.

---

## 10. Reusable UI System

Thin, not a full component library:

- **`dt` design tokens** — primary reuse surface
- **`ButtonLink`** — `components/ui/ButtonLink.tsx`
- **`DtScrollReveal`**, **`GlassCard`**, **`MarketingPageHero`**, **`MarketingDocPage`**
- Nav packaged as `components/marketing/global-nav/` with barrel `index.ts`
- Blog UI is feature-local, not a shared design-system package

---

## 11. Existing Coding Conventions

- Path alias `@/*` → repo root (`tsconfig.json`)
- Prefer **Server Components**; `"use client"` only when needed
- `server-only` for blog fetch layer
- Content/config separated from presentational components (`lib/marketing`, `lib/navigation`)
- JSDoc on non-obvious helpers
- `as const` for slug/content tables
- Dual styling: Tailwind utilities + BEM-ish CSS class prefixes
- Next 16 awareness: read `node_modules/next/dist/docs/` before APIs (`AGENTS.md`)

---

## 12. Naming Conventions

| Kind | Pattern | Examples |
|------|---------|----------|
| Components | PascalCase | `MarketingLayoutShell.tsx`, `DesignTestGlobalNavbar.tsx` |
| Hooks | `use*` | `useNavSurfaceTheme`, `useIntroReady` |
| Theme tokens | `dt*` | `dt`, `dtColors`, `dtCta` |
| CSS class prefixes | kebab + BEM-ish | `design-test-lab-page`, `dt-global-nav__links` |
| Lib modules | kebab-case files | `global-nav.ts`, `public-assets.ts` |
| Constants | SCREAMING_SNAKE | `HOME_SECTIONS`, `SOLUTION_SLUGS`, `NEWS_PAGE_SIZE` |
| Routes | kebab-case URLs | `/vendor-updates`, `/ai-data-center` |
| Automation | camelCase services | `ingestVendorFeed.ts`, `runVendorFeedsJob.ts` |

---

## 13. Animation Libraries and Patterns

**Library:** `framer-motion@^12.38.0`

**Used in:**

- `DtScrollReveal.tsx`
- `FaqSection.tsx` (`AnimatePresence`)
- `PartnersSection.tsx`
- `ResourceHubSection.tsx` (`useInView`)
- `AboutStorySection.tsx`
- `DesignTestGlobalNavDropdown.tsx`

**Also:** CSS keyframes in `globals.css` (marquees, partner float, service snake border) with `@media (prefers-reduced-motion: reduce)`.

**Pattern:** scroll-triggered fade-up (`once: true`), accordion expand, dropdown enter/exit — not heavy page transitions.

---

## 14. Performance Optimizations

- `next/image` + Sanity CDN remotePatterns
- Local fonts via `next/font/local` (Montserrat) + Google Geist Mono
- Poppins via `lib/fonts/poppins.ts` on marketing shell
- ISR / `unstable_cache` / Sanity CDN
- Disk cache fallback for blog so failed Sanity does not poison Next cache
- Media optimize script: `scripts/optimize-public-media.mjs` + `sharp`
- Asset cache-bust query versions in `lib/public-assets.ts`
- Intro splash skips on mobile
- Turbopack root pinned to cwd to avoid automation circular traversal

---

## 15. SEO Implementation

- Root `metadata` + `viewport` in `app/layout.tsx` (title template `%s | vCloudTech`)
- Per-route `export const metadata` or `generateMetadata`
- Blog: Open Graph, Twitter cards, canonical, JSON-LD via `lib/blog/seo.ts`
- Vendor updates: dynamic titles from filters
- **No** `app/sitemap.ts` or `app/robots.ts` found
- `SITE_URL` from `NEXT_PUBLIC_SITE_URL` with fallback `https://vcloudtech.com`

---

## 16. Accessibility Implementation

- Skip link in `MarketingLayoutShell`
- `lang="en"` on `<html>`
- Widespread `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-hidden`
- Nav: `aria-controls` for mobile panel; tablist pattern on contract stack
- `sr-only` labels (e.g. newsletter email)
- `focus-visible` outlines on interactive controls
- `prefers-reduced-motion` for several animations
- `role="status"` on newsletter success

---

## 17. Existing Design System

**JS tokens** — `components/marketing/design-test-theme.ts`:

```ts
export const dtColors = {
  bg: "#041329",
  card: "#111F34",
  primary: "#E55614",
  accent: "#b3b3b3",
  text: "#FFFFFF",
  muted: "#A1A1AA",
} as const;
```

**Supporting CSS:** `design-test-lab-full-width.css`, `design-test-responsive.css`, `design-test-typography.css`, `design-test-footer.css`, `design-test-global-nav.css`.

Shell uses class `design-test-lab-page` and background `#041329`.

---

## 18. Existing Utility Functions (`lib/`)

| Area | Paths |
|------|-------|
| Blog | `lib/blog/fetch.ts`, `map-sanity-blog.ts`, `seo.ts`, `utils.ts`, `sanity-disk-cache.ts`, `sanity-resilient-fetch.ts` |
| Marketing content | `lib/marketing/*-content.ts`, logos, FAQ, contracts |
| Navigation | `lib/navigation/global-nav.ts`, `solutions.ts`, `active-path.ts` |
| Assets | `lib/public-assets.ts` |
| Vendor news | `lib/vendor-news-*.ts` |
| Fonts | `lib/fonts/poppins.ts` |

Sanity helpers live under `sanity/lib/` (not `lib/`).

---

## 19. Existing Hooks

No `hooks/` directory. Co-located hooks:

| Hook | File |
|------|------|
| `useIntroReady` | `components/intro/intro-context.tsx` |
| `useNavSurfaceTheme` | `components/marketing/global-nav/useNavSurfaceTheme.ts` |

Other logic uses inline hooks inside client components.

---

## 20. Existing Services

**In-app:** no `services/` under the Next app.

**Standalone:** `services/content-automation/`

```
src/
  index.ts              # once | --daemon
  jobs/runVendorFeedsJob.ts
  services/pipeline/    # ingest + GPT draft
  integrations/         # sanity, openai, rss, http
  config/               # env, feeds, vendorGuard
  schedulers/cron.ts
```

Root npm scripts: `automation:install|build|once|daemon`.

---

## 21. Existing Constants

No central `constants/` folder. Constants live next to domains:

- `HOME_SECTIONS` — `app/(site)/_home/home-sections.ts`
- `SOLUTION_SLUGS` — `lib/navigation/*`
- `VENDOR_NEWS_TABS`, `NEWS_PAGE_SIZE` — `lib/vendor-news-*`
- `SITE_URL`, `assetVersions` — blog utils / `public-assets`
- Sanity env — `sanity/env.ts`

---

## 22. Existing Types / Interfaces

| Location | Contents |
|----------|----------|
| `lib/blog/types.ts` | `BlogArticle`, `BlogAuthor`, `BlogCategory`, TOC, FAQ |
| `lib/navigation/types.ts` | `NavItem`, `NavGroup`, `NavChild` |
| `services/content-automation/src/types/index.ts` | Pipeline types |
| Inline types | Page `Props`, Sanity mapped types |
| Solution slug unions | derived from `SOLUTION_SLUGS` |

No shared root `types/` package.

---

## 23. Existing Testing Setup

- **No** `*.test.*` / `*.spec.*`
- **No** Jest, Vitest, Playwright, Cypress configs
- Quality gate today: `npm run lint` (ESLint)

---

## 24. Build Tools

- Next.js compiler / Turbopack (`next dev`, `next build`)
- TypeScript (`noEmit`, Next plugin)
- PostCSS + Tailwind v4
- Sanity CLI (`sanity.config.ts`, `sanity.cli.ts`)
- Scripts: seed blog, warm cache, optimize media, logo knockout
- Automation: `tsc` → `dist/` via its own tsconfig (excluded from root TS)

---

## 25. Linting & Formatting

- ESLint flat config: `eslint.config.mjs` = `eslint-config-next` core-web-vitals + typescript
- Script: `"lint": "eslint"`
- **No Prettier** config or dependency found
- Formatting is informal / editor-driven

---

## 26. Deployment Configuration

| Artifact | Status |
|----------|--------|
| `vercel.json` | Not present |
| Dockerfile / compose | Not present |
| `.github/workflows` | Not present |
| `.vercel` | gitignored |

Implied: deploy as a standard Next.js app (likely Vercel). Automation service is a separate Node process (cron/daemon), not part of the Next build.

Env: `.env*` gitignored; Sanity + `NEXT_PUBLIC_SITE_URL` expected.

---

## 27. Architectural Patterns Already Followed

1. **App Router + route groups** for shared marketing shell
2. **CMS for blog/vendor news; static TS for marketing pages**
3. **Config-driven homepage sections**
4. **Design-token class maps** (`dt`) instead of a heavy UI kit
5. **Resilient Sanity reads** (CDN + disk cache + retries)
6. **ISR / tag revalidation** for content freshness
7. **Client islands** for interactivity; server-first by default
8. **Sidecar automation service** for content ingestion
9. **Asset versioning** for static media cache busting
10. **Embedded CMS Studio** at `/studio`

---

## 28. Things You Should Never Change (Project Conventions)

### From repo agent docs

- **`AGENTS.md` / `CLAUDE.md`:** This is Next.js **16** with breaking changes — **do not assume older Next APIs**. Read `node_modules/next/dist/docs/` before coding; heed deprecations.

### From `.cursor/rules/karpathy-guidelines.mdc`

- Don’t over-engineer; surgical diffs only
- Don’t “drive-by” refactor adjacent code or delete unrelated dead code
- Surface assumptions; verify with success criteria

### From `.cursor/rules/weekly-work-reports.mdc`

- Manager reports must follow the prescribed structure/tone when requested

### From established codebase practice (treat as hard constraints)

- **Tailwind + design-test tokens only** — do **not** introduce Bootstrap or other CSS frameworks
- Preserve **dark navy / orange** design-test language (`#041329`, `#E55614`, `dt` / `design-test-*`)
- Keep **App Router** structure; don’t add Pages Router
- Keep marketing copy/nav in **`lib/`**; update `global-nav.ts` when changing navigation
- Preserve blog fetch resilience patterns (`server-only`, disk cache, don’t poison Next cache)
- Don’t pull `services/content-automation` into the Next bundle
- Match existing naming (`DesignTest*`, `dt`, kebab CSS files next to features)
- When replacing images at the same path, bump `assetVersions` in `lib/public-assets.ts`
- Do not commit unless the user asks

---

## Recommended Cursor Rules

These are the exact rules an AI coding assistant should follow when contributing to this codebase.

### Core Behavior

1. **Next.js 16 first** — Never assume Next.js 13/14 APIs from training data. Before using unfamiliar Next APIs, read guides under `node_modules/next/dist/docs/`. Heed deprecation notices (`AGENTS.md`).
2. **Karpathy guidelines** — Think before coding; simplicity first; surgical changes only; define verifiable success criteria. Every changed line must trace to the user request.
3. **Ask when unclear** — If requirements are ambiguous or multiple interpretations exist, ask before implementing. Do not silently pick an approach.

### Styling Rules

4. **Never use Bootstrap** — This project uses Tailwind CSS v4 + co-located plain CSS + `dt` design tokens only.
5. **Never introduce SCSS or CSS Modules** unless explicitly requested.
6. **Reuse `dt` / `dtColors` / `dtCta`** from `components/marketing/design-test-theme.ts` before inventing new color classes.
7. **Preserve brand colors:** `#041329`, `#111F34`, `#E55614`, `#FFFFFF`, `#A1A1AA`, `#b3b3b3`.
8. Match existing CSS naming prefixes (`tp__`, `dt-`, `about-page__`, `cv-stack__`, etc.) when extending a feature.

### Architecture Rules

9. **Server Components by default** — Add `"use client"` only when interactivity requires it.
10. **Do not add `app/api` routes** unless the user asks for a backend endpoint; current forms/CMS patterns don’t rely on them.
11. **Do not introduce global state libraries** (Zustand, Redux, etc.) without explicit request.
12. Keep marketing content and nav config in `lib/marketing/` and `lib/navigation/` — don’t hardcode nav links deep inside random components.
13. Leave `services/content-automation` alone unless the task is specifically about automation; never import it into the Next app.

### Change Discipline

14. **Surgical diffs only** — Don’t refactor adjacent code, “clean up” formatting, or delete unrelated dead code.
15. **Image replaces:** bump `assetVersions` in `lib/public-assets.ts`; don’t change layout CSS unless asked.
16. **Commits / PRs:** only when the user explicitly asks.
17. Prefer editing existing files over creating new ones; don’t invent abstractions for one-off use.

### Domain Patterns to Preserve

18. Homepage sections stay config-driven via `HOME_SECTIONS`.
19. Blog/CMS reads must stay resilient (CDN + cache tags + disk fallback patterns).
20. Marketing heroes share `MarketingPageHero` / about-specific hero patterns — page-specific overrides go in page CSS (e.g. `partners-landing.css`), not by breaking the shared component for one page.
21. Prefer Framer Motion patterns already in the repo (scroll reveal, accordion) over new animation libraries.
22. Respect `prefers-reduced-motion` when adding motion.

### Quality Bar

23. After substantive edits, check lints on touched files and fix what you introduced.
24. Don’t claim work that isn’t backed by commits or verified changes.
25. For manager/weekly reports, follow `.cursor/rules/weekly-work-reports.mdc` structure and tone.

---

## Quick Reference: Key Files

| Concern | Path |
|---------|------|
| Structure map | `PROJECT_STRUCTURE.md` |
| Root deps | `package.json` |
| Next config | `next.config.ts` |
| Global CSS / Tailwind | `app/globals.css` |
| Design tokens | `components/marketing/design-test-theme.ts` |
| Site shell | `components/layout/MarketingLayoutShell.tsx` |
| Nav config | `lib/navigation/global-nav.ts` |
| Blog fetch | `lib/blog/fetch.ts` |
| Sanity queries | `sanity/lib/queries.ts` |
| Assets / versions | `lib/public-assets.ts` |
| Agent Next rule | `AGENTS.md` |
| Karpathy rules | `.cursor/rules/karpathy-guidelines.mdc` |
| Weekly report rules | `.cursor/rules/weekly-work-reports.mdc` |
