import { publicAssets } from "@/lib/public-assets";

export const servicesPageHero = {
  title: "Services",
  lede:
    "Advisory, implementation, and managed operations tailored to enterprise governance and uptime requirements.",
  image: publicAssets.servicesPage.hero,
  imageAlt: "Enterprise IT services — AI, cloud, cybersecurity, and infrastructure",
} as const;

export const servicesPageGrid = {
  heading: "What we deliver",
} as const;
