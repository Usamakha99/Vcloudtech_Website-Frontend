export const designTestFooterLinks = {
  services: [
    { label: "Procurement", href: "/procurement" },
    { label: "Cloud", href: "/solutions/cloud-infrastructure" },
    { label: "Security", href: "/solutions/cybersecurity" },
    { label: "IT Support", href: "/contact" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Resources", href: "/posts" },
    { label: "Contact", href: "/contact" },
  ],
  contact: [
    { label: "Get a Quote", href: "/contact" },
    { label: "Services", href: "/services" },
  ],
} as const;

export const designTestFooterCerts = [
  { acronym: "MBE", label: "Minority-owned" },
  { acronym: "SBE", label: "Small business" },
  { acronym: "DBE", label: "Disadvantaged business" },
  { acronym: "ISO 9001", label: "Quality certified" },
] as const;
