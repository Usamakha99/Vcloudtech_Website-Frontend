/**
 * Design-test global navigation — single source of truth.
 * Update labels and hrefs here; UI components stay presentational.
 */

import { aiDataCenterSolutionsGroup } from "@/lib/navigation/ai-data-center-solutions";
import type { NavGroup } from "@/lib/navigation/types";

export type DesignTestGlobalNavLink = {
  label: string;
  href: string;
};

export type DesignTestGlobalNavItem =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "dropdown";
      label: string;
      href: string;
      groups: readonly NavGroup[];
    };

/** Primary global nav items (marketing routes + Solutions dropdown). */
export const designTestGlobalNavItems: readonly DesignTestGlobalNavItem[] = [
  {
    type: "dropdown",
    label: "Solutions",
    href: "/solutions",
    groups: [aiDataCenterSolutionsGroup],
  },
  { type: "link", label: "Services", href: "/services" },
  { type: "link", label: "Resources", href: "/posts" },
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Contact", href: "/contact" },
] as const;

/** @deprecated Use `designTestGlobalNavItems` — flat links only. */
export const designTestGlobalNavLinks: readonly DesignTestGlobalNavLink[] =
  designTestGlobalNavItems.flatMap((item) =>
    item.type === "link" ? [{ label: item.label, href: item.href }] : [],
  );

export const designTestGlobalNavCta = {
  label: "Get Started",
  href: "/contact",
} as const;

export const designTestGlobalNavBrand = {
  href: "/",
  ariaLabel: "vCloudTech home",
} as const;
