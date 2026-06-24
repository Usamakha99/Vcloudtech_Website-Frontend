import type { NavGroup } from "@/lib/navigation/types";

/** Overview route: `/solutions/ai-data-center` */
export const AI_DATA_CENTER_OVERVIEW_SLUG = "ai-data-center" as const;

const aiDataCenterChildPages = [
  {
    slug: "ai-infrastructure-procurement",
    label: "AI Infrastructure Procurement",
    // description: "Source, stage, and deploy AI-ready compute and storage at scale.",
  },
  {
    slug: "data-center-hardware",
    label: "Data Center Hardware",
    // description: "Servers, racks, and facility-ready hardware for modern workloads.",
  },
  {
    slug: "data-center-networking",
    label: "Networking",
    // description: "High-bandwidth fabrics built for AI training and inference traffic.",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    // description: "Protect AI pipelines, workloads, and data center operations end to end.",
  },
  {
    slug: "power-infrastructure",
    label: "Power Infrastructure",
    // description: "Power distribution, cooling alignment, and resilient energy design.",
  },
  {
    slug: "lifecycle-management",
    label: "Lifecycle Management",
    // description: "Deployment, maintenance, refresh, and decommission programs.",
  },
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
    // description: page.description,
  })),
};
