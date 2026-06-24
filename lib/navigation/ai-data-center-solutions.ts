import type { NavGroup } from "@/lib/navigation/types";

/** Overview route: `/solutions/ai-data-center` */
export const AI_DATA_CENTER_OVERVIEW_SLUG = "ai-data-center" as const;

const aiDataCenterChildPages = [
  { slug: "ai-infrastructure-procurement", label: "AI Infrastructure Procurement" },
  { slug: "data-center-hardware", label: "Data Center Hardware" },
  { slug: "data-center-networking", label: "Networking" },
  { slug: "cybersecurity", label: "Cybersecurity" },
  { slug: "power-infrastructure", label: "Power Infrastructure" },
  { slug: "lifecycle-management", label: "Lifecycle Management" },
] as const;

export type AiDataCenterChildSlug = (typeof aiDataCenterChildPages)[number]["slug"];

export const AI_DATA_CENTER_CHILD_SLUGS = aiDataCenterChildPages.map((page) => page.slug);

/** Solutions dropdown — AI Data Center group (shared by marketing + design-test nav). */
export const aiDataCenterSolutionsGroup: NavGroup = {
  title: "AI Data Center Solutions",
  overviewHref: `/solutions/${AI_DATA_CENTER_OVERVIEW_SLUG}`,
  items: aiDataCenterChildPages.map((page) => ({
    label: page.label,
    href: `/solutions/${page.slug}`,
  })),
};
