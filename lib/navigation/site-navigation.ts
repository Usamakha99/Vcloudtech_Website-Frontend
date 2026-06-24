import { solutionsNavGroups } from "@/lib/navigation/solution-groups";
import type { NavItem } from "@/lib/navigation/types";

/**
 * Primary site navigation — single source of truth for header and mobile drawer.
 * Update labels/hrefs here only; UI components stay presentational.
 */
export const siteNavigation: readonly NavItem[] = [
  {
    type: "dropdown",
    label: "Solutions",
    href: "/solutions",
    groups: solutionsNavGroups,
  },
  { type: "link", label: "Services", href: "/services" },
  { type: "link", label: "Procurement", href: "/procurement" },
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Blog", href: "/posts" },
  { type: "link", label: "News", href: "/vendor-updates" },
  { type: "link", label: "Contact", href: "/contact" },
] as const;

export const siteNavCta = {
  label: "Talk to Expert",
  href: "/contact",
} as const;

export const siteSearchPath = "/search" as const;
