/**
 * Global navigation — single source of truth.
 * Update labels and hrefs here; UI components stay presentational.
 */

import { solutionsNavGroups } from "@/lib/navigation/solution-groups";
import type { NavGroup } from "@/lib/navigation/types";

export type GlobalNavItem =
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
export const globalNavItems: readonly GlobalNavItem[] = [
  {
    type: "dropdown",
    label: "Solutions",
    href: "/solutions",
    groups: solutionsNavGroups,
  },
  { type: "link", label: "Services", href: "/services" },
  { type: "link", label: "Government Contracts", href: "/contracts" },
  { type: "link", label: "Blogs", href: "/blog" },
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Contact", href: "/contact" },
] as const;

export const globalNavCta = {
  label: "Get Started",
  href: "/contact",
} as const;

export const globalNavBrand = {
  href: "/",
  ariaLabel: "vCloudTech home",
} as const;
