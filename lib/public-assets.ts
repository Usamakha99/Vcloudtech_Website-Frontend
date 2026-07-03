/**
 * Static asset paths under /public — single source of truth.
 * See public/README.md for folder layout.
 */

export const publicAssets = {
  brand: {
    logo: "/brand/vcloudtech-logo-nobg.png",
    logoLight: "/brand/light_logo.png",
    source: "/brand/vcloudtech-logo.png",
  },
  intro: {
    loaderVideo: "/intro/loader-intro.mp4",
  },
  hero: {
    slide1: "/assets/hero/hero-1.png",
    slide2: "/assets/hero/hero-2.png",
    slide4: "/assets/hero/hero-4.png",
  },
  about: {
    landing: "/assets/about/about-us-landing3.png",
    storyOffice: "/assets/about/about-story-office.png",
    reliablePartner: "/assets/about/about-us3.png",
  },
  contact: {
    hero: "/assets/contact/contact-us-hero.png",
  },
  locations: {
    texas: "/assets/locations/texas-dallas-skyline-v2.png",
    california: "/assets/locations/california-bridge-lineart-v2.png",
  },
  blog: {
    banner: (index: 1 | 2 | 3) => `/assets/blog/${index}.jpg`,
  },
  industries: {
    government: "/assets/industries/government-sector.png",
    education: "/assets/industries/education-sector.png",
    healthcare: "/assets/industries/health-care.png",
    financial: "/assets/industries/financial-sector.png",
    publicSector: "/assets/industries/public-sector.png",
    commercial: "/assets/industries/commercial-enterprise-sector.png",
  },
  services: {
    aiProcurement: "/assets/services/ai-infrastructure.png",
    dataCenterHardware: "/assets/services/data-center-hardware.png",
    networking: "/assets/services/networking.png",
    cybersecurity: "/assets/services/cyber-security.png",
    powerInfrastructure: "/assets/services/power-infrastructure.png",
    lifecycleManagement: "/assets/services/lifecycle-management.png",
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
