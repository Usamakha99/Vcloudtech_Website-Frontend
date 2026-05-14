import type { NavItem } from "@/lib/navigation/types";

import { SOLUTION_SLUGS, type SolutionSlug } from "@/lib/navigation/solutions";

const solutionLabels: Record<SolutionSlug, { label: string; description: string }> = {
  microsoft: {
    label: "Microsoft Solutions",
    description: "Azure, Microsoft 365, and hybrid enterprise platforms.",
  },
  aws: {
    label: "AWS Solutions",
    description: "Landing zones, modernization, and managed cloud on AWS.",
  },
  "cloud-infrastructure": {
    label: "Cloud Infrastructure",
    description: "Architecture, migration, and resilient multi-cloud operations.",
  },
  cybersecurity: {
    label: "Cybersecurity",
    description: "Zero trust, compliance alignment, and continuous protection.",
  },
  "data-ai": {
    label: "Data & AI",
    description: "Analytics platforms, governance, and responsible AI adoption.",
  },
};

const solutionChildren = SOLUTION_SLUGS.map((slug) => ({
  label: solutionLabels[slug].label,
  href: `/solutions/${slug}`,
  description: solutionLabels[slug].description,
}));

/**
 * Primary site navigation — single source of truth for header and mobile drawer.
 * Update labels/hrefs here only; UI components stay presentational.
 */
export const siteNavigation: readonly NavItem[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "dropdown",
    label: "Solutions",
    href: "/solutions",
    children: solutionChildren,
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
