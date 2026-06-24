import type { NavGroup } from "@/lib/navigation/types";

export const DATA_AI_OVERVIEW_SLUG = "data-ai" as const;

/** Solutions dropdown — data & AI group. */
export const dataAiSolutionsGroup: NavGroup = {
  title: "Data & AI",
  overviewHref: `/solutions/${DATA_AI_OVERVIEW_SLUG}`,
  items: [
    { label: "Data platforms", href: "/solutions/data-ai" },
    { label: "AI readiness", href: "/solutions/ai-data-center" },
    { label: "Lifecycle management", href: "/solutions/lifecycle-management" },
  ],
};
