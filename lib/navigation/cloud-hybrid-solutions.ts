import type { NavGroup } from "@/lib/navigation/types";

export const CLOUD_HYBRID_OVERVIEW_SLUG = "cloud-infrastructure" as const;

/** Solutions dropdown — cloud & hybrid group. */
export const cloudHybridSolutionsGroup: NavGroup = {
  title: "Cloud & Hybrid",
  overviewHref: `/solutions/${CLOUD_HYBRID_OVERVIEW_SLUG}`,
  items: [
    { label: "Microsoft solutions", href: "/solutions/microsoft" },
    { label: "AWS solutions", href: "/solutions/aws" },
    { label: "Cloud infrastructure", href: "/solutions/cloud-infrastructure" },
  ],
};
