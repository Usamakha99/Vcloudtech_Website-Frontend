import { contractVehicles } from "@/lib/marketing/contract-vehicles";
import { publicAssets } from "@/lib/public-assets";

export const contractsPageHero = {
  title: "Government Contracts",
  lede:
    "Trusted by government agencies through active contracts, vCloud Tech simplifies procurement while delivering secure cloud, cybersecurity, AI-powered IT, and managed services with full compliance.",
  image: publicAssets.contractsPage.hero,
  imageAlt: "Government and enterprise contract procurement",
} as const;

export const contractsPageCorporate = {
  title: "vCloud Tech Corporate Contracts",
} as const;

/** @deprecated Use contractVehicles from lib/marketing/contract-vehicles.ts */
export const contractsPageVehicles = contractVehicles.map((vehicle) => ({
  ...vehicle,
  href: "/contact" as const,
}));
