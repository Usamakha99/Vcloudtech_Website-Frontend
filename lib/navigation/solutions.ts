/** Slugs for `/solutions/[slug]` — shared by nav config and static generation. */
export const SOLUTION_SLUGS = [
  "ai-data-center",
  "ai-infrastructure-procurement",
  "data-center-hardware",
  "data-center-networking",
  "power-infrastructure",
  "lifecycle-management",
  "managed-services",
  "network-modernization",
  "compliance-advisory",
  "digital-workplace",
  "microsoft",
  "aws",
  "cloud-infrastructure",
  "cybersecurity",
  "data-ai",
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];
