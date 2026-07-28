import { publicAssets } from "@/lib/public-assets";

/** Content for `/new-homepage` — CloudTech-style enterprise layout. */

export const nhHero = {
  title: "Build the Future of Technology",
  tags: [
    "Enterprise Infrastructure",
    "AI",
    "Cloud",
    "Cybersecurity",
    "Modern Workplace",
  ],
  lede: "vCloud Tech is a trusted technology partner delivering enterprise infrastructure, AI, cloud, cybersecurity, and modern workplace solutions.",
  primaryCta: { label: "Request a Consultation", href: "/contact" },
  secondaryCta: { label: "Talk to an Architect", href: "/contact" },
  image: publicAssets.hero.slide1,
  imageAlt: "Enterprise technology skyline",
  credentials: [
    { label: "Microsoft", src: "/partners/microsoft.png" },
    { label: "AWS", src: "/partners/aws.png" },
    { label: "Apple", src: "/partners/apple.png" },
  ],
  certLabels: ["ISO 9001:2015", "MBE / DBE / SBE"],
} as const;

export const nhPartnersStrip = {
  heading: "Trusted by Leading Technology Partners",
  cta: { label: "View All Partners", href: "/partners" },
  logos: [
    { name: "Microsoft", src: "/partners/microsoft.png" },
    { name: "AWS", src: "/partners/aws.png" },
    { name: "Cisco", src: "/partners/cisco.png" },
    { name: "Dell", src: "/partners/dell.png" },
    { name: "HP", src: "/partners/hp.png?v=2" },
    { name: "Lenovo", src: "/partners/lenovo.png?v=3" },
    { name: "Adobe", src: "/partners/adobe.png" },
    { name: "Palo Alto", src: "/partners/PANW_Parent_Brand_Primary_Logo_RGB.png" },
    { name: "Intel", src: "/partners/intel.png" },
  ],
} as const;

export const nhSolutions = {
  heading: "Explore Our Technology Solutions",
  cta: { label: "View All 25+ Solutions", href: "/services" },
  items: [
    {
      id: "ai",
      title: "AI & Data",
      description:
        "GPU infrastructure, data platforms, and AI-ready architecture for enterprise workloads.",
      href: "/solutions/ai-infrastructure-procurement",
      image: publicAssets.services.aiProcurement,
    },
    {
      id: "cloud",
      title: "Cloud",
      description:
        "Migration, modernization, and multi-cloud operations built for governance and scale.",
      href: "/solutions/data-center-networking",
      image: publicAssets.services.networking,
    },
    {
      id: "cyber",
      title: "Cybersecurity",
      description:
        "Layered defense across endpoint, network, identity, and cloud — continuously monitored.",
      href: "/solutions/cybersecurity",
      image: publicAssets.services.cybersecurity,
    },
    {
      id: "infra",
      title: "Infrastructure",
      description:
        "Servers, storage, networking, and power designed for resilient data center environments.",
      href: "/solutions/data-center-hardware",
      image: publicAssets.services.dataCenterHardware,
    },
    {
      id: "workplace",
      title: "Modern Workplace",
      description:
        "Endpoints, collaboration, and lifecycle services that keep teams productive and secure.",
      href: "/solutions/lifecycle-management",
      image: publicAssets.services.lifecycleManagement,
    },
  ],
} as const;

export const nhIndustries = {
  heading: "Solutions for Every Industry",
  items: [
    { id: "government", label: "Government", href: "/industry" },
    { id: "education", label: "Education", href: "/industry" },
    { id: "healthcare", label: "Healthcare", href: "/industry" },
    { id: "financial", label: "Financial", href: "/industry" },
    { id: "public", label: "Public Sector", href: "/industry" },
    { id: "commercial", label: "Commercial", href: "/industry" },
    { id: "enterprise", label: "Enterprise", href: "/industry" },
  ],
} as const;

export const nhGovernment = {
  eyebrow: "Government Solutions",
  title: "Your Mission. Our Technology.",
  lede: "Compliant procurement and mission-ready infrastructure for agencies that cannot afford downtime.",
  image: publicAssets.industries.government,
  imageAlt: "Government technology solutions",
  href: "/industry",
  segments: [
    { id: "federal", label: "Federal" },
    { id: "state", label: "State & Local" },
    { id: "edu", label: "Education" },
    { id: "health", label: "Healthcare" },
    { id: "defense", label: "Defense" },
  ],
} as const;

export const nhEnterpriseAi = {
  title: "Power Your Enterprise with AI",
  lede: "From GPU clusters to private AI platforms — infrastructure, agents, and data readiness in one partner.",
  href: "/solutions/ai-infrastructure-procurement",
  linkLabel: "Explore AI Solutions",
  capabilities: [
    { id: "infra", label: "AI Infrastructure" },
    { id: "private", label: "Private AI" },
    { id: "agents", label: "Agents" },
    { id: "data", label: "Data Platforms" },
    { id: "llm", label: "LLMs" },
  ],
  badge: "NVIDIA Partner Ready",
} as const;

export const nhSuccess = {
  heading: "Customer Success Stories",
  cta: { label: "View All Case Studies", href: "/blog" },
  stories: [
    {
      id: "k12",
      title: "K-12 School District",
      result: "Modernized campus networking with 40% faster deployment cycles.",
      href: "/blog",
      image: publicAssets.industries.education,
    },
    {
      id: "health",
      title: "Regional Health System",
      result: "Hardened clinical endpoints while maintaining HIPAA-aligned uptime.",
      href: "/blog",
      image: publicAssets.industries.healthcare,
    },
    {
      id: "city",
      title: "Municipal Government",
      result: "Streamlined procurement across multi-agency infrastructure refreshes.",
      href: "/blog",
      image: publicAssets.industries.publicSector,
    },
  ],
  quote: {
    text: "vCloud Tech became an extension of our IT team — responsive, accountable, and ready for what comes next.",
    name: "Director of IT",
    role: "Enterprise Public Sector Client",
  },
} as const;

export const nhResources = {
  heading: "Resources & Insights",
  tabs: ["All", "White Papers", "Case Studies", "Guides", "News"],
  items: [
    {
      id: "wp1",
      tag: "White Paper",
      tagTone: "green",
      title: "Building AI-Ready Data Centers",
      description: "A practical framework for GPU density, power, and cooling decisions.",
      href: "/blog",
      action: "Download",
      image: publicAssets.blogPage.hero,
    },
    {
      id: "cs1",
      tag: "Case Study",
      tagTone: "blue",
      title: "Secure Cloud Migration Playbook",
      description: "How regulated teams move workloads without disrupting operations.",
      href: "/blog",
      action: "Read",
      image: publicAssets.services.cybersecurity,
    },
    {
      id: "g1",
      tag: "Guide",
      tagTone: "orange",
      title: "Zero Trust for Hybrid Networks",
      description: "Identity, segmentation, and monitoring patterns that scale.",
      href: "/blog",
      action: "Read",
      image: publicAssets.services.networking,
    },
    {
      id: "n1",
      tag: "News",
      tagTone: "navy",
      title: "Enterprise Infrastructure Trends",
      description: "What procurement and architecture leaders are prioritizing this year.",
      href: "/blog",
      action: "Read",
      image: publicAssets.about.heroImage,
    },
  ],
} as const;

export const nhGlobal = {
  heading: "Global Reach. Local Delivery.",
  lede: "Supporting enterprise and public-sector clients with responsive coverage across key markets.",
  stats: [
    { value: "4", label: "Countries" },
    { value: "3", label: "Continents" },
    { value: "80+", label: "Technology Partners" },
    { value: "1,000+", label: "Customers" },
  ],
  locations: [
    { id: "usa", label: "USA Headquarters", image: publicAssets.locations.texas },
    { id: "ca", label: "California", image: publicAssets.locations.california },
    { id: "on", label: "Ontario", image: publicAssets.locations.ontario },
  ],
} as const;
