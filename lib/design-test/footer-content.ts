export const designTestFooterAddress = {
  line1: "609 Deep Valley Drive Suite 200",
  line2: "Rolling Hills Estates, CA 90274",
  full: "609 Deep Valley Drive Suite 200, Rolling Hills Estates, CA 90274",
} as const;

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

export const designTestFooterSocial = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vcloud-tech",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/vcloudtechinc",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/vcloudtech/",
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://twitter.com/vCloudTech",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@vcloudtech",
  },
] as const;
