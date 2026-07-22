# PROJECT_RULES.md

Project-specific rules for the **vCloudTech Marketing Website**. Every rule below is extracted from and verified against this codebase — no generic advice. Each rule states **WHY** it exists so future contributors (human or AI) understand the intent.

---

## Architecture

- **Use the App Router only. Never add a `pages/` directory.**
  WHY: The app is built entirely on `app/` (e.g. `app/layout.tsx`, `app/(site)/`, `app/studio/[[...tool]]/`). Mixing routers would fragment layout, metadata, and routing conventions.

- **This is Next.js 16 + React 19 — do not assume older Next APIs.**
  WHY: `package.json` pins `next: 16.2.6`, `react: 19.2.4`. `AGENTS.md` explicitly says APIs/conventions differ from older versions and to read `node_modules/next/dist/docs/` before writing code.

- **Treat `services/content-automation/` as a separate Node package, not part of the Next build.**
  WHY: It has its own `package.json` and is driven by root scripts `automation:install|build|once|daemon`. It is a sidecar RSS → OpenAI → Sanity pipeline, not imported by the web app.

- **Marketing pages are static TS; blog/vendor content comes from Sanity.**
  WHY: Marketing copy lives in `lib/marketing/*` modules, while `lib/blog/*` and `sanity/*` handle CMS content. Keep this split — don’t move static marketing copy into the CMS or hardcode CMS content into components.

---

## Folder Structure

- **Put route entries in `app/(site)/…` and page composition in `components/<domain>-landing/`.**
  WHY: Pattern is consistent: `app/(site)/partners/page.tsx` renders `components/partners-landing/PartnersLandingPage.tsx`. Same for about, services, contracts.

- **Keep content/config in `lib/`, not inside components.**
  WHY: Copy, nav, assets are centralized: `lib/marketing/*-content.ts`, `lib/navigation/global-nav.ts`, `lib/public-assets.ts`. Components import from there.

- **Sanity helpers live under `sanity/lib/`, not `lib/`.**
  WHY: `sanity/lib/client.ts`, `sanity/lib/serverClient.ts`, `sanity/lib/queries.ts` are the verified locations; `lib/` is for app/marketing utilities.

- **Homepage-only composition lives in the private folder `app/(site)/_home/`.**
  WHY: `HomePage.tsx` + `home-sections.ts` sit there; the `_` prefix keeps it out of the URL space while co-locating homepage logic.

---

## Components

- **Reuse `MarketingPageHero` for marketing page heroes; page-specific heroes follow the `AboutHero` pattern.**
  WHY: `components/marketing/MarketingPageHero.tsx` is shared by partners, services, and contracts landing pages. About uses a dedicated `components/about-landing/AboutHero.tsx` when it needs more than the shared props. Don’t bloat the shared hero with one-page-only props.

- **Homepage sections are config-driven — register sections in `home-sections.ts`.**
  WHY: `app/(site)/_home/home-sections.ts` defines `HOME_SECTIONS`; the homepage renders from that list rather than hardcoding order in JSX.

- **Default to Server Components; add `"use client"` only when interactivity requires it.**
  WHY: Interactive islands (nav, FAQ, marquees, `TiltCard`, contract stack) are `"use client"`; the rest render on the server. This keeps JS payload minimal.

- **Search for an existing component/util/CSS before creating a new one.**
  WHY: `.cursor/rules/agent-behavior.mdc` mandates “Existing Project First” — reuse before creating. Duplicates (e.g. a second hero) have already caused churn.

---

## Styling

- **Two allowed styling mechanisms only: Tailwind utility classes and co-located plain CSS files.**
  WHY: The repo uses Tailwind v4 plus feature CSS (e.g. `marketing-page-hero.css`, `technology-partners.css`, `contract-vehicles-stack.css`). There is no SCSS and no CSS Modules — don’t introduce them.

- **Never introduce Bootstrap or any other CSS framework.**
  WHY: No Bootstrap dependency exists; all styling is Tailwind + `dt` tokens. Adding one would conflict with the design system and reset layers.

- **Page-specific style overrides go in that page’s CSS with a page-scoped selector.**
  WHY: Partners overrides are scoped as `.partners-page .marketing-page__hero…` in `components/partners-landing/partners-landing.css`, so the shared hero stays intact for other pages. Follow the same scoping pattern.

---

## Tailwind

- **Tailwind v4 is configured via PostCSS + `@import "tailwindcss"` in `app/globals.css`.**
  WHY: `postcss.config.mjs` uses `@tailwindcss/postcss`; `globals.css` has `@import "tailwindcss"`, `@config`, and `@source` lines. Don’t revert to a v3-style setup.

- **Keep `@source` globs in `globals.css` accurate to where classes live.**
  WHY: Tailwind v4 scans `@source "../app"` and `@source "../components"`. Classes outside scanned paths won’t generate.

- **`tailwind.config.js` currently has an empty `theme.extend` and `darkMode: "class"` — brand values are applied as arbitrary values / tokens, not theme extensions.**
  WHY: Colors like `bg-[#041329]` and the `dt` class strings are the established approach; adding theme keys would create two competing sources of truth.

---

## CSS

- **Name CSS classes with the existing BEM-ish, feature-prefixed conventions.**
  WHY: Verified prefixes include `marketing-page__…`, `partners-page…`, `tp__…`, `about-page__…`, `cv-stack__…`, `dt-…`. Consistency keeps selectors predictable and override-safe.

- **Use the existing CSS custom properties for hero/layout alignment.**
  WHY: `marketing-page-hero.css` relies on `--dt-bg`, `--dt-text`, `--dt-primary`, `--dt-nav-occupancy`, `--site-align-x`, `--site-hero-copy-max`. Reuse them so pages line up with the nav and shared left edge.

- **Respect `prefers-reduced-motion` in any CSS animation.**
  WHY: Existing keyframe animations (marquees, floats) already guard with `@media (prefers-reduced-motion: reduce)`; new motion must match.

---

## Design System

- **Use the `dt` token maps from `components/marketing/design-test-theme.ts` before writing new class strings.**
  WHY: `dt.badge`, `dt.metaLabel`, `dt.card`, `dt.iconBox`, `dt.accentDash`, etc. are the reuse surface (e.g. `dt.metaLabel` is used on the Partners intro). This keeps spacing/typography consistent.

- **Preserve the brand palette exactly.**
  WHY: `dtColors` defines `bg #041329`, `card #111F34`, `primary #E55614`, `accent #b3b3b3`, `text #FFFFFF`, `muted #A1A1AA`. These recur across CSS and tokens; changing them breaks visual consistency site-wide.

- **The primary CTA color language is white button → `#b3b3b3` hover (or `#E55614` primary), per `dtCta` and hero CSS.**
  WHY: `.marketing-page__cta` uses white bg with `--dt-primary` hover; `dtCta` encodes the orange primary. Keep CTAs within this language.

---

## Naming

- **Components: PascalCase files (`MarketingPageHero.tsx`, `PartnersLandingPage.tsx`).**
  WHY: Verified across `components/`.

- **Hooks: `use*` (`useIntroReady`, `useNavSurfaceTheme`).**
  WHY: Verified in `components/intro/intro-context.tsx` and `components/marketing/global-nav/useNavSurfaceTheme.ts`.

- **Lib modules: kebab-case files (`global-nav.ts`, `public-assets.ts`, `partners-page-content.ts`).**
  WHY: Verified across `lib/`.

- **Constants: SCREAMING_SNAKE (`HOME_SECTIONS`, `SOLUTION_SLUGS`).**
  WHY: Verified in `app/(site)/_home/home-sections.ts` and `lib/navigation/*`.

- **Design tokens are the `dt*` namespace (`dt`, `dtColors`, `dtCta`).**
  WHY: Verified in `design-test-theme.ts`.

---

## Animation

- **Use Framer Motion for JS-driven animation; follow existing patterns.**
  WHY: `framer-motion@^12` powers `DtScrollReveal`, `FaqSection` (`AnimatePresence`), `PartnersSection`, `ResourceHubSection` (`useInView`). Prefer these patterns (scroll fade-up `once: true`, accordion) over new libraries.

- **Custom pointer-driven effects are implemented with plain handlers + inline transforms, not tilt libraries.**
  WHY: `components/home/sections/partners/TiltCard.tsx` implements 3D tilt with `onMouseMove`/state and gates on `(hover: hover) and (pointer: fine)`. Match this approach and keep effects disabled on touch.

- **rAF/DOM-based animation for performance-critical, per-frame work (avoid per-frame React re-renders).**
  WHY: The contract stack (`components/marketing/ContractVehicleDetailStack.tsx`) paints transforms via `requestAnimationFrame` and only updates React state after settling — done specifically to remove hitching.

---

## Performance

- **Serve images through `next/image`; Sanity images use the configured `remotePatterns`.**
  WHY: `next.config.ts` whitelists `cdn.sanity.io`; `next/image` is used in heroes and grids for sizing/lazy behavior.

- **Bump `assetVersions` in `lib/public-assets.ts` when replacing a static asset at the same path.**
  WHY: Assets are cache-busted via `?v=` (e.g. `partnerPage: "4"`). Replacing a file without bumping the version can serve stale CDN/browser copies.

- **Keep blog reads cached and resilient.**
  WHY: `lib/blog/fetch.ts` uses `server-only`, `unstable_cache`, ISR tags, plus disk fallback (`sanity-disk-cache.ts`) and retries (`sanity-resilient-fetch.ts`) so a Sanity blip doesn’t break the page or poison the Next cache.

- **Don’t block mobile with the intro splash.**
  WHY: Intro logic (`components/intro/*`, `globals.css`) intentionally skips the splash on mobile so first paint isn’t delayed.

---

## Accessibility

- **Every hero/section root needs a programmatic label.**
  WHY: Existing sections use `aria-labelledby` tied to a heading `id` (e.g. `MarketingPageHero` `aria-labelledby={headingId}` with an `<h1 id=…>`). Keep this pairing.

- **Mark decorative media `aria-hidden` and give real images meaningful `alt`.**
  WHY: Hero media wrappers use `aria-hidden`; content images pass `alt` (e.g. partner logos use the partner name). This distinction is already consistent.

- **Interactive controls expose state and focus styles.**
  WHY: Nav uses `aria-expanded`/`aria-controls`; the contract stack uses a tablist pattern; `ButtonLink`/CSS provide `focus-visible` outlines. New controls must do the same.

- **Provide the skip link and keep `lang="en"`.**
  WHY: `MarketingLayoutShell` includes a skip link and `app/layout.tsx` sets `lang="en"` — foundational a11y already in place.

---

## SEO

- **Every route exports `metadata` or `generateMetadata`; pull descriptions from content modules.**
  WHY: `app/(site)/partners/page.tsx` builds `metadata` (title, description, Open Graph) from `partnersPageHero.lede`. Root `app/layout.tsx` sets the `%s | vCloudTech` title template.

- **Blog articles must emit structured data via the existing helper.**
  WHY: `lib/blog/seo.ts` (`buildArticleJsonLd`) plus OG/Twitter/canonical are the established blog SEO surface. Reuse it instead of hand-writing tags.

- **Derive absolute URLs from `SITE_URL` / `NEXT_PUBLIC_SITE_URL`.**
  WHY: That is the single source for canonical/OG URLs (fallback `https://vcloudtech.com`). Don’t hardcode domains.

---

## Sanity CMS

- **Read public content through the CDN client; keep write access in the automation service.**
  WHY: `sanity/lib/serverClient.ts` uses `useCdn: true` for fast/reliable blog reads. The write client belongs to `services/content-automation/`, not the web app.

- **Add content types as schemas under `sanity/schemaTypes/` and query via `sanity/lib/queries.ts`.**
  WHY: Existing types (`blogPost`, `post`, `author`, `category`, `blockContent`, `vendorUpdate`) and GROQ queries follow this structure.

- **Map raw Sanity docs to typed shapes before use.**
  WHY: `lib/blog/map-sanity-blog.ts` + `lib/blog/types.ts` convert CMS data into `BlogArticle`-style types so components consume stable interfaces.

- **The Studio is embedded at `/studio` (`app/studio/[[...tool]]/`).**
  WHY: Verified route group; don’t relocate or duplicate the Studio mount.

---

## Routing

- **Dynamic route params are async — type as `Promise<…>` and `await` them.**
  WHY: This is the Next 15+/16 convention already used on slug pages (`blog/[slug]`, `posts/[slug]`, `solutions/[slug]`, `vendor-updates/[slug]`).

- **Pre-render known slugs with `generateStaticParams` and use `revalidate` for freshness.**
  WHY: Blog/solutions use `generateStaticParams`; content routes set `export const revalidate = …`. Keep ISR behavior consistent.

- **Public pages belong to the `(site)` group so they share the marketing shell.**
  WHY: `app/(site)/layout.tsx` provides nav/footer/shell; putting a public page outside the group loses that chrome.

---

## State Management

- **Use local React state/hooks and Context only — no external state library.**
  WHY: The repo uses `useState`/`useEffect` in client components and one Context (`components/intro/intro-context.tsx`). There is no Redux/Zustand/Jotai; don’t add one without explicit need.

- **Do not reference a `stores/` folder as if it exists.**
  WHY: `globals.css` mentions it in `@source`, but the folder is not present. State is component-local by design.

---

## Imports

- **Use the `@/*` path alias for cross-module imports.**
  WHY: `tsconfig.json` maps `@/*` to the repo root; imports like `@/components/...`, `@/lib/...` are the standard across the codebase.

- **Import feature CSS in the component/page that owns it.**
  WHY: e.g. `PartnersLandingPage.tsx` imports `marketing-page-hero.css`, `technology-partners.css`, and `./partners-landing.css`. CSS travels with the feature that needs it.

- **Import `server-only` in modules that must never reach the client.**
  WHY: `lib/blog/fetch.ts` uses it to enforce server-side execution of CMS reads.

---

## Things Never To Change

- **Don’t modify the shared `MarketingPageHero` in a way that only serves one page.**
  WHY: It’s used by partners, services, and contracts. One-page needs go in that page’s CSS/component (the Partners overrides live in `partners-landing.css`).

- **Don’t change brand colors or the `dt` token contract casually.**
  WHY: `dtColors`/`dt` are referenced site-wide; a change ripples across every page.

- **Don’t pull `services/content-automation` into the Next bundle.**
  WHY: It’s intentionally separate (own package, excluded from root TS build); importing it would bloat/break the web build.

- **Don’t introduce Bootstrap, SCSS, CSS Modules, Prettier configs, or a state library without explicit approval.**
  WHY: None exist today; adding them changes project-wide conventions and tooling expectations.

- **Don’t commit or open PRs unless explicitly asked.**
  WHY: `.cursor/rules/agent-behavior.mdc` and the Karpathy guidelines require surgical, approved changes.

- **Don’t delete existing comments/code or refactor unrelated areas.**
  WHY: `.cursor/rules/agent-behavior.mdc` (“Surgical Changes”) forbids drive-by edits; keep diffs minimal.

---

## Best Practices Already Followed

- **Config-driven composition** — homepage sections via `HOME_SECTIONS` (`app/(site)/_home/home-sections.ts`).
- **Content/presentation separation** — copy in `lib/marketing/*`, nav in `lib/navigation/*`, assets in `lib/public-assets.ts`.
- **Server-first with client islands** — `"use client"` only where interactivity is required.
- **Resilient CMS layer** — CDN client + cache tags + disk fallback + retries for blog.
- **Design tokens over ad-hoc styles** — `dt` class maps and CSS variables for consistent UI.
- **Asset versioning** — `assetVersions` cache-busting for static media.
- **Accessibility baked in** — skip link, `lang`, `aria-*`, `focus-visible`, reduced-motion guards.
- **Page-scoped CSS overrides** — page classes (`.partners-page`) wrap shared selectors instead of forking shared components.
- **Motion performance discipline** — rAF/DOM painting for per-frame animation (contract stack), hover effects gated to fine-pointer devices (`TiltCard`).
- **Lint as the quality gate** — `npm run lint` (ESLint flat config, `eslint-config-next` core-web-vitals + TypeScript); check lints on touched files before finishing.

---

*Generated from a read-only analysis of this repository. All rules trace to verified files; nothing here is invented.*
