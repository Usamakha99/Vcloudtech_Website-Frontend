import type { PortableTextBlock } from "@portabletext/types";

import { publicAssets } from "@/lib/public-assets";

export type BlogCategoryIcon =
  | "server"
  | "shield"
  | "cloud"
  | "network"
  | "datacenter"
  | "enterprise"
  | "cart"
  | "rocket";

export type BlogAuthor = {
  name: string;
  slug?: string;
  role?: string;
  bio?: string;
  image?: string;
  linkedIn?: string;
};

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  author: BlogAuthor | null;
  publishedAt: string;
  readingTimeMinutes: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  tableOfContents: TocItem[];
  body?: PortableTextBlock[];
  faq?: BlogFaqItem[];
  relatedSlugs: string[];
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
  icon: BlogCategoryIcon;
};

export const blogLanding = {
  hero: {
    badge: "Blogs",
    title: "Blogs",
    description:
      "Explore vCloudTech insights across AI infrastructure, cloud engineering, cybersecurity, networking, data centers, procurement, and enterprise digital transformation.",
    image: publicAssets.blogPage.hero,
    imageAlt: "vCloudTech blogs — enterprise technology insights and industry perspectives",
  },
  newsletter: {
    title: "Stay Ahead of Enterprise Technology",
    description:
      "Receive curated insights on AI infrastructure, cloud strategy, and enterprise security—delivered monthly to your inbox.",
  },
  finalCta: {
    title: "Ready to Modernize Your Infrastructure?",
    description: "Talk to our experts and discover AI-powered enterprise solutions.",
    buttonLabel: "Contact Our Team",
    buttonHref: "/contact",
  },
  detailCta: {
    title: "Need Expert Guidance?",
    description: "Talk with our AI Infrastructure Specialists.",
    primaryLabel: "Book Consultation",
    primaryHref: "/contact",
    secondaryLabel: "Contact Sales",
    secondaryHref: "/contact",
  },
} as const;
