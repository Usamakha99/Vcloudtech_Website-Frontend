import { aiDataCenterSolutionsGroup } from "@/lib/navigation/ai-data-center-solutions";
import { cloudHybridSolutionsGroup } from "@/lib/navigation/cloud-hybrid-solutions";
import { dataAiSolutionsGroup } from "@/lib/navigation/data-ai-solutions";
import { managedServicesSolutionsGroup } from "@/lib/navigation/managed-services-solutions";
import type { NavGroup } from "@/lib/navigation/types";

/** All Solutions dropdown parent groups (marketing + homepage nav). */
export const solutionsNavGroups: readonly NavGroup[] = [
  aiDataCenterSolutionsGroup,
  cloudHybridSolutionsGroup,
  dataAiSolutionsGroup,
  managedServicesSolutionsGroup,
];
