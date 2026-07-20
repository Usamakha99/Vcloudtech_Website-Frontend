import { contractVehicles } from "@/lib/marketing/contract-vehicles";
import { publicAssets } from "@/lib/public-assets";

export const contractsPageHero = {
  title: "Government Contracts",
  lede:
    "vCloudTech holds active government contracts, providing federal agencies, defense organizations, and state and local governments with direct access to enterprise cybersecurity, cloud infrastructure, AI-powered IT solutions, and managed services streamlining procurement while maintaining full compliance. Faster procurement. Trusted expertise. One reliable partner.",
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
