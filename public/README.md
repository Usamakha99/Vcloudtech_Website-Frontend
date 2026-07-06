# Public assets

Static files served from the site root. Prefer paths from `lib/public-assets.ts` in code.

## Layout

| Folder | Contents |
|--------|----------|
| `assets/about/` | About page and homepage about section imagery |
| `assets/blog/` | Resource hub blog banner images (`1.jpg`–`3.jpg`) |
| `assets/contact/` | Contact page hero |
| `assets/credentials/` | ISO, GSA, Sourcewell, TIPS badge marks |
| `assets/hero/` | Homepage carousel slides |
| `assets/industries/` | Industries we serve sector artwork |
| `assets/locations/` | Office / location illustrations (contact page) |
| `assets/services/` | Solutions & services card artwork |
| `brand/` | vCloudTech logos + `favicon.png` |
| `clients/` | Trusted client seals (numbered PNGs) |
| `intro/` | Splash loader video |
| `partners/` | Technology partner logos |

## Adding assets

1. Place files in the matching folder above (kebab-case filenames).
2. Register the path in `lib/public-assets.ts`.
3. Import from `@/lib/public-assets` in components or content modules.
