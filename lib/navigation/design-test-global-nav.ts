/**
 * Design-test global navigation — single source of truth.
 * Update labels and hrefs here; UI components stay presentational.
 */

export type DesignTestGlobalNavLink = {
  label: string;
  href: string;
};

/** Primary global links (marketing routes). */
export const designTestGlobalNavLinks: readonly DesignTestGlobalNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/posts" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const designTestGlobalNavCta = {
  label: "Get a Quote",
  href: "/contact",
} as const;

export const designTestGlobalNavBrand = {
  href: "/",
  ariaLabel: "vCloudTech home",
} as const;
