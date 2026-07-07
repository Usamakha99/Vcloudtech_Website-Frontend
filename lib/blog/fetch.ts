import { sanityServerClient } from "@/sanity/lib/serverClient";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_TRENDING_TAGS_QUERY,
} from "@/sanity/lib/queries";

import {
  mapRelatedPosts,
  mapSanityBlogPost,
  mapSanityCategory,
  type SanityBlogPost,
} from "./map-sanity-blog";
import type { BlogArticle, BlogCategory } from "./types";

const blogFetchOptions = { next: { revalidate: 60, tags: ["blog"] } } as const;

export async function fetchBlogPosts(): Promise<BlogArticle[]> {
  const posts = await sanityServerClient.fetch<SanityBlogPost[]>(
    BLOG_POSTS_QUERY,
    {},
    blogFetchOptions,
  );
  return posts
    .map((post) => mapSanityBlogPost(post))
    .filter((article): article is BlogArticle => Boolean(article));
}

export async function fetchBlogPostBySlug(slug: string) {
  const post = await sanityServerClient.fetch<SanityBlogPost | null>(
    BLOG_POST_QUERY,
    { slug },
    blogFetchOptions,
  );
  if (!post) return null;

  const article = mapSanityBlogPost(post, true);
  if (!article) return null;

  const related = mapRelatedPosts(post.relatedPosts).slice(0, 3);

  return { article, related };
}

export async function fetchBlogSlugs() {
  const rows = await sanityServerClient.fetch<{ slug: string }[]>(
    BLOG_POST_SLUGS_QUERY,
    {},
    blogFetchOptions,
  );
  return rows.map((row) => row.slug).filter(Boolean);
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const categories = await sanityServerClient.fetch(
    BLOG_CATEGORIES_QUERY,
    {},
    blogFetchOptions,
  );
  return categories
    .map((category: Parameters<typeof mapSanityCategory>[0]) => mapSanityCategory(category))
    .filter((category: BlogCategory | null): category is BlogCategory => Boolean(category));
}

export async function fetchBlogTrendingTags(): Promise<string[]> {
  const tags = await sanityServerClient.fetch<string[]>(
    BLOG_TRENDING_TAGS_QUERY,
    {},
    blogFetchOptions,
  );
  return tags.filter(Boolean);
}
