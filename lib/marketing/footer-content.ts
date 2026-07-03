export const designTestFooterLocations = {
  headquarters: {
    country: "United States",
    region: "Texas - Headquarter",
    lines: [
      "vCloud Tech Inc.",
      "2601 E State Highway 121 Business, Suite 509M, Lewisville, TX 75067",
    ],
    mapsUrl: "https://maps.app.goo.gl/kqTMFYHWSD9PbBRz8",
    ariaLabel: "Open VCloud Tech Headquarters in Google Maps",
  },
  office: {
    region: "California",
    lines: [
      "609 Deep Valley Drive Suite 200",
      "Rolling Hills Estates, CA 90274",
    ],
    mapsUrl: "https://maps.app.goo.gl/vGG2BifQVrR58kYN6",
    ariaLabel: "Open VCloud Tech Office Location in Google Maps",
  },
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
