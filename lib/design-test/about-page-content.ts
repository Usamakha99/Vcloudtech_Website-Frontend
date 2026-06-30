export const aboutPageHero = {
  badge: "WHO WE ARE",
  titleLead: "Confidence in Every Connection -",
  titleAccent: "Built on Trust",
  lede:
    "vCloudTech is an AI-driven enterprise IT partner delivering cybersecurity, cloud infrastructure, and managed IT services to government, healthcare, and commercial clients nationwide. We combine intelligent automation with two decades of hands-on engineering to keep your business connected, protected, and always one step ahead.",
  image: "/images/about Us landing3.png",
  learnMoreLabel: "Learn More",
  learnMoreHref: "#about-story",
  contactLabel: "Contact Us",
  contactHref: "/contact",
} as const;

export const aboutStory = {
  badge: "OUR STORY",
  title: "From IT Reseller to AI-Powered Enterprise Technology Partner",
  image: "/images/reliable-it-partner.png",
  imageAlt:
    "Reliable IT partner — enterprise infrastructure, security, and AI-ready technology delivery",
  paragraphs: [
    "vCloudTech started with a simple goal: make enterprise technology actually work for the people who depend on it. What began as hands-on IT support has grown into a full-spectrum technology partner — one that now uses AI-powered monitoring, automation, and threat detection to solve problems before they become outages.",
    "Today, government agencies, hospitals, schools, and enterprises across 50 states trust vCloudTech to manage their cybersecurity, cloud, and IT infrastructure. We haven't lost what got us here: every client gets a dedicated team, transparent communication, and infrastructure that's engineered to perform — not just promised to.",
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
        "Infrastructure and IT support you can depend on, every single day — no exceptions.",
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

export const aboutCta = {
  title: "Let's Build Something Reliable — Together",
  lede:
    "Talk to our team about how AI-powered IT solutions can simplify your infrastructure, strengthen your security, and scale with your business.",
  buttonLabel: "Book a Free Call",
  buttonHref: "/contact",
} as const;
