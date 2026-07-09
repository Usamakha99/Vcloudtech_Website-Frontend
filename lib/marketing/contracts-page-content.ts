import { publicAssets } from "@/lib/public-assets";

export const contractsPageHero = {
  title: "Contracts",
  lede:
    "Streamlined procurement through GSA Schedule, Sourcewell, TIPS, and other contract vehicles — built for public sector and enterprise buyers.",
  image: publicAssets.contractsPage.hero,
  imageAlt: "Government and enterprise contract procurement",
} as const;

export const contractsPageIntro = {
  badge: "Contract vehicles",
  title: "Buy with confidence through approved channels",
  lede:
    "vCloudTech holds the certifications and contract vehicles your procurement team needs — simplifying compliance, approvals, and delivery for IT initiatives nationwide.",
  ctaLabel: "Talk to procurement",
  ctaHref: "/contact",
} as const;
