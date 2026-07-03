# Project structure

Quick map of the vCloudTech marketing site codebase.

## Routes — `app/`

| Path | Purpose |
|------|---------|
| `(site)/` | All public marketing pages (shared layout + nav/footer) |
| `(site)/_home/` | Homepage section config (`home-sections.ts`, `HomePage.tsx`) |
| `(site)/about`, `contact`, `services`, `solutions`, `posts`, `procurement`, `vendor-updates` | Page routes |
| `studio/` | Sanity CMS admin at `/studio` |
| `layout.tsx` | Root layout (fonts, intro splash) |
| `fonts/` | Montserrat variable font |

## Components — `components/`

| Folder | Purpose |
|--------|---------|
| `marketing/` | Site shell: global nav, footer, theme tokens (`dt`), global CSS |
| `marketing/global-nav/` | Sticky navbar + mobile drawer |
| `about-landing/` | About page sections |
| `contact-landing/` | Contact page |
| `home/sections/` | Homepage sections (hero, about, partners, FAQ, etc.) |
| `home/shared/` | Reusable home utilities (`GlassCard`, `DtScrollReveal`) |
| `services/` | Services / solutions grid |
| `layout/` | `MarketingLayoutShell`, doc page wrapper |
| `vendor-updates/` | Vendor news UI |
| `posts/` | Blog post rendering (`PostBody`) |
| `intro/` | Splash video on first visit |
| `brand/`, `ui/`, `icons/` | Logo, buttons, section icons |

## Content & config — `lib/`

| Folder / file | Purpose |
|---------------|---------|
| `marketing/` | Page copy and content (about, contact, FAQ, footer, logos) |
| `navigation/` | Nav config (`global-nav.ts`) + solution route groups |
| `public-assets.ts` | Static image/video paths (see `public/README.md`) |
| `vendor-news-*.ts` | Vendor updates pagination and UI helpers |
| `fonts/poppins.ts` | Marketing site font |

## Static files — `public/`

See [`public/README.md`](public/README.md) for the asset folder layout.

## CMS — `sanity/`

Schema, client, and queries for blog posts and vendor updates.

## Automation — `services/content-automation/`

Standalone Node service: RSS → Sanity vendor news pipeline.

## Key entry points

```
Homepage     → app/(site)/page.tsx → _home/HomePage.tsx → home-sections.ts
Site shell   → app/(site)/layout.tsx → MarketingLayoutShell
Nav config   → lib/navigation/global-nav.ts
Asset paths  → lib/public-assets.ts
```
