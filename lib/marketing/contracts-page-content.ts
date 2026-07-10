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

/** Cooperative / government contract vehicles — small clickable chips. */
export const contractsPageVehicles = [
  { id: "gsa", label: "GSA Schedule", href: "/contact" },
  { id: "tips", label: "TIPS", href: "/contact" },
  { id: "sourcewell", label: "Sourcewell", href: "/contact" },
  { id: "equalis", label: "Equalis Group", href: "/contact" },
  { id: "buyboard", label: "BuyBoard", href: "/contact" },
  { id: "cmas", label: "CMAS", href: "/contact" },
  { id: "pca", label: "PCA", href: "/contact" },
  { id: "costars", label: "COSTARS", href: "/contact" },
  { id: "epic6", label: "EPIC6", href: "/contact" },
  { id: "allied", label: "Allied States Cooperative", href: "/contact" },
  { id: "goodbuy", label: "Goodbuy", href: "/contact" },
  { id: "texbuy", label: "TEX BUY", href: "/contact" },
] as const;