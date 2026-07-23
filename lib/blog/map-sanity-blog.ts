import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/sanity/lib/image";
import type { BlogArticle, BlogAuthor, BlogCategory, BlogCategoryIcon, TocItem } from "./types";

type SanityImage = {
  alt?: string;
  asset?: {_ref?: string};
};

type SanityAuthor = {
  name?: string;
  slug?: string;
  role?: string;
  linkedIn?: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
};

type SanityCategory = {
  title?: string;
  slug?: string;
  description?: string;
  icon?: string;
};

export type SanityBlogPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  metaDescription?: string;
  publishedAt?: string;
  readingTimeMinutes?: number;
  featured?: boolean;
  tags?: string[];
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  category?: SanityCategory | null;
  author?: SanityAuthor | null;
  faq?: {question?: string; answer?: string}[];
  relatedPosts?: SanityBlogPost[];
};

const DEFAULT_CATEGORY_ICON: BlogCategoryIcon = "enterprise";

const iconValues: BlogCategoryIcon[] = [
  "server",
  "shield",
  "cloud",
  "network",
  "datacenter",
  "enterprise",
  "cart",
  "rocket",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function portableTextToPlain(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) return "";
  return blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children as {text?: string}[] | undefined)
        ?.map((child) => child.text ?? "")
        .join("") ?? "",
    )
    .join(" ")
    .trim();
}

function blockChildrenToText(children?: {text?: string}[]) {
  return children?.map((child) => child.text ?? "").join("") ?? "";
}

export function extractTableOfContents(body?: PortableTextBlock[]): TocItem[] {
  if (!body?.length) return [];

  return body
    .filter((block) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
    .map((block) => {
      const title = blockChildrenToText(block.children as {text?: string}[]);
      return {
        id: slugify(title),
        title,
        level: block.style === "h3" ? 3 : 2,
      } as TocItem;
    })
    .filter((item) => item.title.length > 0);
}

export function estimateReadingTime(body?: PortableTextBlock[], explicitMinutes?: number) {
  if (explicitMinutes && explicitMinutes > 0) return explicitMinutes;
  const words = portableTextToPlain(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function imageUrl(image?: SanityImage, width = 800, height = 450) {
  if (!image?.asset?._ref) return "";
  return urlFor(image).width(width).height(height).fit("crop").auto("format").url();
}

function mapAuthor(author?: SanityAuthor | null): BlogAuthor | null {
  if (!author?.name) return null;
  return {
    name: author.name,
    slug: author.slug,
    role: author.role,
    bio: portableTextToPlain(author.bio),
    image: author.image?.asset?._ref ? imageUrl(author.image, 160, 160) : undefined,
    linkedIn: author.linkedIn,
  };
}

export function mapSanityBlogPost(post: SanityBlogPost, includeBody = false): BlogArticle | null {
  if (!post.slug || !post.title || !post.publishedAt || !post.excerpt) return null;

  const image = imageUrl(post.mainImage);
  const readingTimeMinutes = estimateReadingTime(post.body, post.readingTimeMinutes);

  const faq =
    post.faq
      ?.filter((item) => item.question && item.answer)
      .map((item) => ({
        question: item.question!,
        answer: item.answer!,
      })) ?? undefined;

  const tableOfContents = extractTableOfContents(post.body);
  if (faq?.length) {
    tableOfContents.push({
      id: "blog-faq-heading",
      title: "Frequently asked questions",
      level: 2,
    });
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription ?? post.excerpt,
    category: post.category?.title ?? "Enterprise IT",
    categorySlug: post.category?.slug ?? "enterprise-it",
    author: mapAuthor(post.author),
    publishedAt: post.publishedAt,
    readingTimeMinutes,
    image: image || "/assets/services/ai-infrastructure.png",
    imageAlt: post.mainImage?.alt ?? post.title,
    featured: post.featured ?? false,
    tags: post.tags ?? [],
    tableOfContents,
    body: includeBody ? post.body : undefined,
    faq,
    relatedSlugs:
      post.relatedPosts
        ?.map((related) => related.slug)
        .filter((slug): slug is string => Boolean(slug)) ?? [],
  };
}

export function mapSanityCategory(category: SanityCategory): BlogCategory | null {
  if (!category.slug || !category.title) return null;
  const icon = iconValues.includes(category.icon as BlogCategoryIcon)
    ? (category.icon as BlogCategoryIcon)
    : DEFAULT_CATEGORY_ICON;

  return {
    slug: category.slug,
    name: category.title.trim(),
    description: category.description?.trim() ?? "",
    icon,
  };
}

export function mapRelatedPosts(posts?: SanityBlogPost[]) {
  return (posts ?? [])
    .map((post) => mapSanityBlogPost(post))
    .filter((article): article is BlogArticle => Boolean(article));
}
