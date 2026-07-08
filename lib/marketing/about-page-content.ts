import { publicAssets } from "@/lib/public-assets";

export const aboutPageHero = {
  titleLines: ["Confidence in Every Connection", "Built on Trust"] as const,
  lede:
    "Enterprise IT partner delivering cybersecurity, cloud infrastructure, and managed services to government, healthcare, and commercial clients nationwide.",
  image: publicAssets.about.landing,
  heroGif: publicAssets.about.heroGif,
  imageAlt: "vCloud Tech enterprise technology team and workspace",
} as const;

export const aboutStatsSection = {
  badge: "OUR MILESTONES",
} as const;

export const aboutStory = {
  badge: "OUR STORY",
  title: "From IT Reseller to AI-Powered Enterprise Technology Partner",
  titleLines: [
    "From IT Reseller to AI-Powered",
    "Enterprise Technology Partner",
  ] as const,
  image: publicAssets.about.storyOffice,
  imageAlt: "vCloud Tech modern enterprise office and technology workspace",
  paragraphs: [
    "vCloudTech started with a simple goal make enterprise technology actually work for the people who depend on it. What began as hands on IT support has grown into a full-spectrum technology partner one that now uses AI powered monitoring, automation, and threat detection to solve problems before they become outages.",
    "Today, government agencies, hospitals, schools, and enterprises across 50 states trust vCloudTech to manage their cybersecurity, cloud, and IT infrastructure. We haven't lost what got us here every client gets a dedicated team, transparent communication, and infrastructure that's engineered to perform not just promised to.",
    "As technology evolves, so do we. Our growing investment in AI and intelligent automation means faster response times, smarter risk detection, and IT environments that adapt before problems start.",
  ],
} as const;

export const aboutStats = [
  { target: 15, suffix: "+", label: "Years in Business" },
  { target: 800, suffix: "+", label: "Clients Served" },
  { target: 50, suffix: "", label: "States & Territories Covered" },
] as const;

export const aboutJourney = {
  badge: "OUR JOURNEY",
  title: "Two Decades of Building Reliable, AI-Ready Infrastructure",
  milestones: [
    {
      id: "founding",
      year: "Founding",
      description:
        "Started as a local IT reseller solving real-world infrastructure problems",
    },
    {
      id: "growth",
      year: "Growth",
      description:
        "Earned GSA Schedule status, becoming a trusted government IT procurement partner",
    },
    {
      id: "scale",
      year: "Scale",
      description:
        "Expanded service to 50 states and 800+ clients across government, healthcare, and enterprise",
    },
    {
      id: "compliance",
      year: "Compliance",
      description:
        "Achieved ISO 9001:2015 certification, reinforcing our commitment to quality and security",
    },
    {
      id: "today",
      year: "Today",
      description:
        "Investing in AI-driven content systems, automation, and intelligent IT operations to serve clients faster and smarter",
    },
  ],
} as const;

export const aboutValues = {
  badge: "WHAT DRIVES US",
  title: "The Values Behind Every Connection",
  items: [
    {
      id: "reliability",
      icon: "server" as const,
      title: "Reliability First",
      description:
        "Infrastructure and IT support you can depend on, every single day no exceptions.",
    },
    {
      id: "integrity",
      icon: "handshake" as const,
      title: "Integrity",
      description: "Honest guidance and transparent pricing. No upsells, no surprises.",
    },
    {
      id: "innovation",
      icon: "rocket" as const,
      title: "Customer-Centric Innovation",
      description:
        "We use AI and automation to solve your problems faster, not to sell you technology you don't need.",
    },
    {
      id: "security",
      icon: "shield" as const,
      title: "Security by Design",
      description:
        "Every solution we build is engineered with cybersecurity at its core, not bolted on as an afterthought.",
    },
  ],
} as const;
