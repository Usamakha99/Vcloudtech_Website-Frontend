/**
 * Static asset paths under /public — single source of truth.
 * See public/README.md for folder layout.
 *
 * Bump `assetVersions` when replacing files at the same path (cache bust).
 */

export const assetVersions = {
  industries: "8",
  blog: "10",
  about: "16",
  contact: "1",
  partnerPage: "1",
  contractsPage: "1",
  servicesPage: "2",
  topContractHolders: "1",
  services: "9",
  hero: "9",
  intro: "3",
} as const;

export function withAssetVersion(path: string, version: string): string {
  return `${path}?v=${version}`;
}

export const publicAssets = {
  brand: {
    logo: "/brand/vcloudtech-logo-nobg.png",
    logoLight: "/brand/light_logo.png",
    source: "/brand/vcloudtech-logo.png",
    favicon: "/brand/favicon.png",
    markOutline: "/assets/vcloudtech02.png",
  },
  intro: {
    loaderVideo: withAssetVersion("/intro/loader-intro-v2.mp4", assetVersions.intro),
  },
  hero: {
    slide1: withAssetVersion("/assets/hero/hero-1.png", assetVersions.hero),
    slide2: withAssetVersion("/assets/hero/hero-2.png", assetVersions.hero),
    slide3: withAssetVersion("/assets/hero/hero-3.png", assetVersions.hero),
  },
  about: {
    heroVideo: withAssetVersion("/assets/about/about-hero.mp4", assetVersions.about),
    storyOffice: "/assets/about/about-story-office.png",
    reliablePartner: withAssetVersion(
      "/assets/about/about-us3.png",
      assetVersions.about,
    ),
    journeyInfographic: withAssetVersion(
      "/assets/about/our-journey-infographic.gif",
      assetVersions.about,
    ),
  },
  contact: {
    hero: withAssetVersion("/assets/contact/contact-us.png", assetVersions.contact),
  },
  partnerPage: {
    hero: withAssetVersion("/assets/partners/partner.png", assetVersions.partnerPage),
  },
  contractsPage: {
    hero: withAssetVersion("/assets/contracts/contracts.png", assetVersions.contractsPage),
  },
  servicesPage: {
    hero: withAssetVersion("/assets/website hero sections/2.png", assetVersions.servicesPage),
  },
  topContractHolders: {
    sourcewell: withAssetVersion(
      "/assets/Top Contracts holders/5.png",
      assetVersions.topContractHolders,
    ),
    costars: withAssetVersion(
      "/assets/Top Contracts holders/6.png",
      assetVersions.topContractHolders,
    ),
    buyboard: withAssetVersion(
      "/assets/Top Contracts holders/7.png",
      assetVersions.topContractHolders,
    ),
    cmas: withAssetVersion(
      "/assets/Top Contracts holders/8.png",
      assetVersions.topContractHolders,
    ),
    tips: withAssetVersion(
      "/assets/Top Contracts holders/9.png",
      assetVersions.topContractHolders,
    ),
  },
  locations: {
    texas: "/assets/locations/texas-dallas-skyline-v2.png",
    california: "/assets/locations/california-bridge-lineart-v2.png",
  },
  blog: {
    banner: (index: 1 | 2 | 3) =>
      withAssetVersion(`/assets/blog/${index}.png`, assetVersions.blog),
  },
  industries: {
    government: withAssetVersion("/assets/industries/government-sector.png", assetVersions.industries),
    education: withAssetVersion("/assets/industries/education-sector.png", assetVersions.industries),
    healthcare: withAssetVersion("/assets/industries/health-care.png", assetVersions.industries),
    financial: withAssetVersion("/assets/industries/financial-sector.png", assetVersions.industries),
    publicSector: withAssetVersion("/assets/industries/public-sector.png", assetVersions.industries),
    commercial: withAssetVersion(
      "/assets/industries/commercial-enterprise-sector.png",
      assetVersions.industries,
    ),
  },
  services: {
    aiProcurement: withAssetVersion(
      "/assets/services/ai-infrastructure.png",
      assetVersions.services,
    ),
    dataCenterHardware: withAssetVersion(
      "/assets/services/data-center-hardware.png",
      assetVersions.services,
    ),
    networking: withAssetVersion("/assets/services/networking.png", assetVersions.services),
    cybersecurity: withAssetVersion("/assets/services/cyber-security.png", assetVersions.services),
    powerInfrastructure: withAssetVersion(
      "/assets/services/power-infrastructure.png",
      assetVersions.services,
    ),
    lifecycleManagement: withAssetVersion(
      "/assets/services/lifecycle-management.png",
      assetVersions.services,
    ),
  },
  credentials: {
    iso: "/assets/credentials/iso-9001-2015-white.png",
    gsa: "/assets/credentials/gsa-white.png",
    sourcewell: "/assets/credentials/sourcewell-white.png",
    tips: "/assets/credentials/tips-white.png",
  },
  clients: {
    logo: (id: number) => `/clients/${id}.png`,
  },
  partners: {
    logo: (filename: string) => `/partners/${filename}`,
  },
} as const;
