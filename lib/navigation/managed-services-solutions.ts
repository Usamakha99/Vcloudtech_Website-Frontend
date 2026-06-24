import type { NavGroup } from "@/lib/navigation/types";

export const MANAGED_SERVICES_OVERVIEW_SLUG = "managed-services" as const;

const managedServicesChildPages = [
  { slug: "managed-services", label: "Managed IT operations" },
  { slug: "network-modernization", label: "Network modernization" },
  { slug: "compliance-advisory", label: "Compliance advisory" },
  { slug: "digital-workplace", label: "Digital workplace" },
] as const;

export type ManagedServicesChildSlug = (typeof managedServicesChildPages)[number]["slug"];

export const MANAGED_SERVICES_CHILD_SLUGS = managedServicesChildPages.map((page) => page.slug);

/** Solutions dropdown — managed services group. */
export const managedServicesSolutionsGroup: NavGroup = {
  title: "Managed Services",
  overviewHref: `/solutions/${MANAGED_SERVICES_OVERVIEW_SLUG}`,
  items: managedServicesChildPages.map((page) => ({
    label: page.label,
    href: `/solutions/${page.slug}`,
  })),
};
