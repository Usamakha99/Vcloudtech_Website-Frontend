# AI_ONBOARDING.md

Welcome to the **vCloudTech Marketing Website**. This document gets a senior frontend engineer productive *before writing the first line of code*. Everything here is drawn from this actual repository — file paths are real, examples are copied from the codebase.

> Companion docs: `PROJECT_RULES.md` (hard rules + WHY), `reports/project-architecture-analysis.md` (deep architecture report), `AGENTS.md` (Next.js 16 warning), `.cursor/rules/*` (agent behavior + Karpathy guidelines).

---

## 1. The 60-second mental model

- **Next.js 16 App Router** marketing site (React 19, TypeScript strict).
- **Sanity CMS** powers blog/vendor content; **marketing pages are static TS**.
- **Tailwind v4 + co-located CSS + `dt` design tokens** for styling. No Bootstrap, no SCSS, no CSS Modules.
- **Server Components by default**; interactivity lives in small `"use client"` islands.
- A **separate Node service** (`services/content-automation/`) ingests RSS → OpenAI → Sanity. It is *not* part of the web build.

If you remember one thing: **this is Next.js 16 — do not assume Next 13/14 APIs.** `AGENTS.md` says read `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

---

## 2. Architecture

**Entry flow:**

```
app/layout.tsx            → fonts + IntroAppProvider + globals.css (root shell)
app/(site)/layout.tsx     → MarketingLayoutShell (nav, footer, skip link)
app/(site)/page.tsx       → _home/HomePage.tsx → home-sections.ts (HOME_SECTIONS)
```

**Route groups:**

- `app/(site)/…` — all public marketing pages (share the marketing shell).
- `app/studio/[[...tool]]/` — embedded Sanity Studio at `/studio`.

**Key directories:**

| Path | What lives here |
|------|-----------------|
| `app/` | Routes, root layout, global CSS |
| `components/` | UI grouped by domain (`marketing/`, `home/sections/*`, `*-landing/`, `layout/`, `ui/`, `intro/`) |
| `lib/` | Content, nav, blog fetch/SEO, asset paths (`lib/marketing/*`, `lib/navigation/*`, `lib/blog/*`, `lib/public-assets.ts`) |
| `sanity/` | Schemas, GROQ queries, clients |
| `public/` | Static images/video/brand assets |
| `services/content-automation/` | Standalone content pipeline (own `package.json`) |

---

## 3. Design philosophy

- **Server-first, minimal JS.** Only opt into the client when you need state/effects/handlers.
- **Content is data.** Copy and config live in `lib/`, not hardcoded in components. Example: `lib/marketing/partners-page-content.ts` holds `partnersPageHero` and `partnersPageIntro`.
- **Tokens over ad-hoc styling.** Reuse `dt` class maps from `components/marketing/design-test-theme.ts`.
- **Shared components stay generic; page needs are page-scoped.** The Partners page tweaks the shared hero via `.partners-page .marketing-page__hero…` in `partners-landing.css` instead of forking the component.
- **Surgical changes.** Per `.cursor/rules/agent-behavior.mdc`: touch only what the task needs; don’t refactor unrelated code or delete comments.

**Brand palette (from `design-test-theme.ts` → `dtColors`):**

```ts
bg: "#041329"   card: "#111F34"   primary: "#E55614"
accent: "#b3b3b3"   text: "#FFFFFF"   muted: "#A1A1AA"
```

---

## 4. Reusable components (know these before building)

| Component | Path | Use for |
|-----------|------|---------|
| `MarketingPageHero` | `components/marketing/MarketingPageHero.tsx` | Standard marketing hero (image bg, gradient, title, optional lede). Used by partners, services, contracts. |
| `AboutHero` | `components/about-landing/AboutHero.tsx` | Pattern to follow when a page needs a *custom* hero beyond the shared props. |
| `ButtonLink` | `components/ui/ButtonLink.tsx` | Buttons/links with variant map (`primary`, `secondary`, `ctaWhite`, etc.). |
| `DtScrollReveal` | `components/home/shared/DtScrollReveal.tsx` | Scroll-triggered fade-up (Framer Motion). |
| `GlassCard` | `components/home/shared/` | Glass surface card. |
| `TiltCard` | `components/home/sections/partners/TiltCard.tsx` | Pointer-driven 3D tilt (fine-pointer only). |
| `MarketingLayoutShell` | `components/layout/` | Page chrome: nav, footer, skip link. |

**Design tokens:** `dt.badge`, `dt.metaLabel`, `dt.card`, `dt.cardHover`, `dt.iconBox`, `dt.accentDash`, `dt.statValue`, `dt.statLabel`, and `dtCta` — all in `components/marketing/design-test-theme.ts`.

---

## 5. Coding conventions

- **Path alias `@/*`** → repo root (`tsconfig.json`). Import as `@/components/...`, `@/lib/...`.
- **Naming:**
  - Components: PascalCase (`PartnersLandingPage.tsx`)
  - Hooks: `use*` (`useNavSurfaceTheme`, `useIntroReady`)
  - Lib files: kebab-case (`partners-page-content.ts`, `public-assets.ts`)
  - Constants: SCREAMING_SNAKE (`HOME_SECTIONS`, `SOLUTION_SLUGS`)
  - Tokens: `dt*` namespace
- **`as const`** for content/config tables (see every `lib/marketing/*-content.ts`).
- **`server-only`** in modules that must not reach the client (`lib/blog/fetch.ts`).
- **JSDoc** one-liners on non-obvious components (e.g. the comment atop `MarketingPageHero`).

---

## 6. Styling conventions

- **Tailwind utilities** for layout/spacing in JSX; **co-located CSS files** for complex/reused visuals (e.g. `marketing-page-hero.css`, `technology-partners.css`, `contract-vehicles-stack.css`).
- **CSS class naming is BEM-ish with feature prefixes:** `marketing-page__…`, `partners-page…`, `tp__…`, `about-page__…`, `cv-stack__…`, `dt-…`.
- **Reuse layout CSS variables:** `--dt-bg`, `--dt-text`, `--dt-primary`, `--dt-nav-occupancy`, `--site-align-x`, `--site-hero-copy-max` (defined/consumed in `marketing-page-hero.css`). These keep pages aligned with the nav and shared left edge.
- **Page overrides are scoped:** wrap shared selectors with the page class, e.g.:

```css
/* components/partners-landing/partners-landing.css */
.partners-page .marketing-page__hero {
  min-height: clamp(24rem, 52vw, 60rem);
}
```

---

## 7. Animation conventions

- **Framer Motion** for declarative animation. Patterns already in use:
  - Scroll fade-up with `once: true` — `DtScrollReveal`, `ResourceHubSection` (`useInView`)
  - Accordion enter/exit — `FaqSection` (`AnimatePresence`)
- **Pointer effects = plain handlers + inline transforms**, not tilt libraries. `TiltCard.tsx` tracks the mouse, clamps tilt to ±8°, and **only activates on `(hover: hover) and (pointer: fine)`** so mobile is untouched.
- **Per-frame work uses rAF + direct DOM writes**, not per-frame React state. See `components/marketing/ContractVehicleDetailStack.tsx` — it paints transforms via `requestAnimationFrame` and updates React state only after the animation settles (done to kill hitching).
- **Always guard motion** with `@media (prefers-reduced-motion: reduce)` (existing marquees/floats do).

---

## 8. How pages are structured

A public page is three layers:

```
app/(site)/<route>/page.tsx        → route + metadata; renders the landing component
components/<route>-landing/<Name>LandingPage.tsx  → composition
lib/marketing/<route>-page-content.ts             → copy/config
```

**Real example — Partners:**

- `app/(site)/partners/page.tsx` — exports `metadata` (title/description/OG from `partnersPageHero.lede`) and returns `<PartnersLandingPage />`.
- `components/partners-landing/PartnersLandingPage.tsx` — renders `<MarketingPageHero … />` + intro section + partner grid; imports its CSS.
- `lib/marketing/partners-page-content.ts` — `partnersPageHero` and `partnersPageIntro` objects.
- `components/partners-landing/partners-landing.css` — page-scoped overrides.

---

## 9. How to build a NEW page (step by step)

1. **Create the content module:** `lib/marketing/<name>-page-content.ts` with an `as const` object (title, lede, image via `publicAssets`, CTA, etc.). Follow `partners-page-content.ts`.
2. **Create the composition:** `components/<name>-landing/<Name>LandingPage.tsx`. Reuse `MarketingPageHero` for the hero. Wrap the root in `className="marketing-page <name>-page"` and `data-nav-surface="dark"` (as Partners does).
3. **Add page-scoped CSS if needed:** `components/<name>-landing/<name>-landing.css`, scoping overrides under `.<name>-page …`.
4. **Create the route:** `app/(site)/<name>/page.tsx` — export `metadata` (pull description from your content module) and render the landing component.
5. **Images:** put assets in `public/…`, reference through `lib/public-assets.ts`, and set a version in `assetVersions`.
6. **Verify:** run `npm run lint` and check the touched files for errors before finishing.

**Don’t** invent a new hero if `MarketingPageHero` fits. Only go the `AboutHero` route when the design genuinely exceeds the shared props — and keep it in the page’s own folder.

---

## 10. How to reuse existing components

- **Hero:** prefer `MarketingPageHero` (props: `title`, `lede?`, `image`, `imageAlt?`, `headingId`). Style deltas → page CSS, not new props.
- **Buttons/links:** use `ButtonLink` variants rather than re-styling anchors.
- **Cards/badges/icons:** compose from `dt.card`, `dt.cardHover`, `dt.badge`, `dt.iconBox` before writing new classes.
- **Scroll reveal:** wrap content in `DtScrollReveal` instead of new IntersectionObserver code.
- **Partner logos:** data comes from `lib/marketing/partner-logos.ts` (`partnerLogos`, `partnerLogoVisualClass`) — don’t hardcode logo lists.
- **Nav/menu changes:** edit `lib/navigation/global-nav.ts`, not individual components.

Before creating anything new, search first — this is a hard rule in `.cursor/rules/agent-behavior.mdc` (“Existing Project First”).

---

## 11. Common mistakes to avoid

- **Assuming old Next.js APIs.** Params on dynamic routes are async (`Promise<…>`, must be awaited). Read `node_modules/next/dist/docs/` first.
- **Editing the shared hero for one page.** `MarketingPageHero` serves partners/services/contracts — a one-page change there breaks the others. Use page-scoped CSS.
- **Adding `"use client"` to whole pages.** Keep client boundaries small; only interactive leaves need it.
- **Replacing an image without bumping `assetVersions`.** You’ll serve stale cached media (assets are `?v=`-busted in `lib/public-assets.ts`).
- **Introducing Bootstrap/SCSS/CSS Modules/a state library.** None exist; don’t add them.
- **Per-frame React state for animations.** Use rAF + DOM like `ContractVehicleDetailStack`.
- **Enabling hover/tilt effects on touch.** Gate on `(hover: hover) and (pointer: fine)` like `TiltCard`.
- **Hardcoding nav or copy in components.** Put it in `lib/`.
- **Importing from `services/content-automation`.** It’s a separate package, excluded from the web build.

---

## 12. Project dos and don'ts

**Do**
- Reuse `dt` tokens and shared components.
- Keep content in `lib/`, styles scoped, changes surgical.
- Run `npm run lint` on touched files.
- Respect reduced-motion and fine-pointer gates.
- Match existing naming and CSS prefixes.

**Don't**
- Don’t add a `pages/` router or new CSS framework.
- Don’t change brand colors / `dt` contract casually.
- Don’t refactor unrelated code or delete comments.
- Don’t commit or open PRs unless explicitly asked (`.cursor/rules/agent-behavior.mdc`).
- Don’t claim something is tested unless you actually verified it.

---

## 13. Performance expectations

- **Images via `next/image`** only; Sanity images use the `cdn.sanity.io` `remotePatterns` in `next.config.ts`.
- **Cache-bust static assets** with `assetVersions` in `lib/public-assets.ts`.
- **Blog reads are cached + resilient:** `lib/blog/fetch.ts` uses `server-only`, `unstable_cache`, ISR tags, disk fallback (`sanity-disk-cache.ts`), retries (`sanity-resilient-fetch.ts`). Don’t bypass this layer.
- **Keep JS light:** server-first, small client islands.
- **Animation must not jank:** rAF/DOM for heavy motion; lock input during transitions where needed (see the contract stack).

---

## 14. Accessibility expectations

- **Label section/hero roots** with `aria-labelledby` tied to a heading `id` (see `MarketingPageHero`).
- **Decorative media** gets `aria-hidden`; **content images** get meaningful `alt` (partner logos use the brand name).
- **Interactive controls** expose state (`aria-expanded`/`aria-controls`), use a tablist pattern where appropriate (contract stack), and show `focus-visible` outlines.
- **Foundations exist** — skip link in `MarketingLayoutShell`, `lang="en"` in `app/layout.tsx`. Keep them.
- **Respect `prefers-reduced-motion`** for any new animation.

---

## 15. SEO expectations

- **Every route** exports `metadata` or `generateMetadata`; pull the description from the page’s content module (Partners does this from `partnersPageHero.lede`).
- **Root title template** is `%s | vCloudTech` (`app/layout.tsx`).
- **Blog articles** must emit JSON-LD via `lib/blog/seo.ts` (`buildArticleJsonLd`) plus OG/Twitter/canonical — reuse the helper.
- **Absolute URLs** come from `SITE_URL` / `NEXT_PUBLIC_SITE_URL` (fallback `https://vcloudtech.com`); never hardcode the domain.
- **Pre-render slugs** with `generateStaticParams` and set `revalidate` for ISR.

---

## 16. Your first task checklist

1. Read `AGENTS.md`, `PROJECT_RULES.md`, and `.cursor/rules/agent-behavior.mdc`.
2. Skim `components/marketing/design-test-theme.ts` (the token vocabulary).
3. Open one full page slice end-to-end: `app/(site)/partners/page.tsx` → `PartnersLandingPage.tsx` → `partners-page-content.ts` → `partners-landing.css`.
4. Look at `MarketingPageHero.tsx` and `AboutHero.tsx` to understand shared vs. custom heroes.
5. Run the app (`npm run dev`) and `npm run lint`.
6. Only then start coding — smallest possible diff, reuse first, verify lints.

---

*Generated from a read-only analysis of this repository. All examples reference real files; nothing here is generic filler.*
