/** Slugs for `/solutions/[slug]` — shared by nav config and static generation. */
export const SOLUTION_SLUGS = [
  "microsoft",
  "aws",
  "cloud-infrastructure",
  "cybersecurity",
  "data-ai",
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];
