import type { PortableTextBlock } from "@portabletext/types";

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
