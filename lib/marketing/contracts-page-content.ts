import { contractVehicles } from "@/lib/marketing/contract-vehicles";
import { publicAssets } from "@/lib/public-assets";

export const contractsPageHero = {
  title: "Government Contracts",
  lede:
    "Streamlined procurement through GSA Schedule, Sourcewell, TIPS, and other contract vehicles built for public sector and enterprise buyers.",
  image: publicAssets.contractsPage.hero,
  imageAlt: "Government and enterprise contract procurement",
} as const;

export const contractsPageCorporate = {
  title: "VCloudTech Corporate Contracts",
  description:
    "Our contract vehicles covering federal, state, and local governments and educational organizations nationwide.",
} as const;

/** @deprecated Use contractVehicles from lib/marketing/contract-vehicles.ts */
export const contractsPageVehicles = contractVehicles.map((vehicle) => ({
  ...vehicle,
  href: "/contact" as const,
}));
