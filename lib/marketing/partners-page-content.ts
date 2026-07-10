import { publicAssets } from "@/lib/public-assets";

export const partnersPageHero = {
  title: "Partners",
  lede: "400+ technology partners across cybersecurity, software, hardware, and cloud.",
  image: publicAssets.partnerPage.hero,
  imageAlt: "Technology partnership and global collaboration",
} as const;

export const partnersPageIntro = {
  badge: "Technology partners",
  titleLead: "World-class partners.",
  titleAccent: "One trusted integrator.",
  lede: "400+ technology partners across cybersecurity, software, hardware, and cloud.",
  ctaLabel: "Become a partner",
  ctaHref: "/contact",
} as const;
