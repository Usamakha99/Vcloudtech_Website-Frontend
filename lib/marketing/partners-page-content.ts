import { publicAssets } from "@/lib/public-assets";

export const partnersPageHero = {
  title: "Partners",
  lede: "400+ technology partners across cybersecurity, software, hardware, and cloud.",
  image: publicAssets.partnerPage.hero,
  imageAlt: "Technology partnership and global collaboration",
} as const;

export const partnersPageIntro = {
  badge: "Technology partners",
  title: "World-class partners. One trusted integrator",
  lede:
    "vCloudTech maintains authorized relationships with leading vendors so your teams can source, deploy, and support solutions through a single accountable partner.",
  ctaLabel: "Become a partner",
  ctaHref: "/contact",
} as const;
