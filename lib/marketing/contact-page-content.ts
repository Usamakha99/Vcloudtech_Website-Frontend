import { designTestContactInfo, designTestInquiryTypes } from "@/lib/marketing/contact-options";
import { designTestFooterLocations } from "@/lib/marketing/footer-content";
import { publicAssets } from "@/lib/public-assets";

export const contactPageHero = {
  title: "Contact us",
  lede:
    "Speak with our solutions architects about AI infrastructure, data center buildouts, and enterprise IT. We help you plan, deploy, and scale with confidence.",
  image: publicAssets.contact.hero,
  imageAlt: "Enterprise technology and data analytics",
  ctaLabel: "Send a message",
  ctaHref: "#contact-form",
} as const;

export const contactInfoCards = [
  {
    id: "headquarters",
    title: "Headquarters",
    lines: [
      designTestFooterLocations.headquarters.lines[0],
      designTestFooterLocations.headquarters.lines[1],
    ],
    href: designTestFooterLocations.headquarters.mapsUrl,
    linkLabel: "View on Google Maps",
  },
  {
    id: "email",
    title: "Email",
    lines: [designTestContactInfo.email],
    href: `mailto:${designTestContactInfo.email}`,
    linkLabel: "Send an email",
  },
  {
    id: "phone",
    title: "Phone",
    lines: [designTestContactInfo.phone],
    href: `tel:${designTestContactInfo.phone.replace(/\D/g, "")}`,
    linkLabel: "Call our team",
  },
  {
    id: "hours",
    title: "Business Hours",
    lines: [designTestContactInfo.hours],
    subline: designTestContactInfo.enterpriseNote,
  },
] as const;

export const contactOfficeLocations = [
  {
    id: "hq",
    label: "Headquarters",
    region: designTestFooterLocations.headquarters.region,
    lines: [...designTestFooterLocations.headquarters.lines],
    mapsUrl: designTestFooterLocations.headquarters.mapsUrl,
    mapsLabel: "Open in Google Maps",
    image: publicAssets.locations.texas,
    imageAlt: "Dallas skyline line art illustration",
  },
  {
    id: "office",
    label: "Office",
    region: designTestFooterLocations.office.region,
    lines: [...designTestFooterLocations.office.lines],
    mapsUrl: designTestFooterLocations.office.mapsUrl,
    mapsLabel: "Open in Google Maps",
    image: publicAssets.locations.california,
    imageAlt: "Golden Gate Bridge isometric illustration",
  },
] as const;

export const contactMapEmbed = {
  title: "VCloud Tech Headquarters",
  src: "https://maps.google.com/maps?q=2601+E+State+Highway+121+Business,+Suite+509M,+Lewisville,+TX+75067&hl=en&z=14&output=embed",
} as const;

export const contactWhyCards = [
  {
    id: "experts",
    title: "Enterprise AI Experts",
    description:
      "Senior architects and procurement specialists who understand AI workloads, data center design, and enterprise-scale deployment.",
  },
  {
    id: "partners",
    title: "Certified Technology Partners",
    description:
      "Authorized relationships with leading hardware, cloud, and security vendors plus GSA, Sourcewell, and TIPS contract vehicles.",
  },
  {
    id: "response",
    title: "Fast Response Time",
    description:
      "Priority routing for enterprise accounts with defined SLAs and a dedicated solutions team for time-sensitive initiatives.",
  },
  {
    id: "solutions",
    title: "End-to-End IT Solutions",
    description:
      "From strategy and sourcing to deployment, lifecycle management, and ongoing support one partner across your stack.",
  },
] as const;

export const contactFormServices = designTestInquiryTypes;
