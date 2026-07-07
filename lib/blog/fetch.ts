import { client } from "@/sanity/lib/client";
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

export async function fetchBlogPosts(): Promise<BlogArticle[]> {
  const posts = await client.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY);
  return posts
    .map((post) => mapSanityBlogPost(post))
    .filter((article): article is BlogArticle => Boolean(article));
}

export async function fetchBlogPostBySlug(slug: string) {
  const post = await client.fetch<SanityBlogPost | null>(BLOG_POST_QUERY, {slug});
  if (!post) return null;

  const article = mapSanityBlogPost(post, true);
  if (!article) return null;

  const related = mapRelatedPosts(post.relatedPosts).slice(0, 3);

  return {article, related};
}

export async function fetchBlogSlugs() {
  const rows = await client.fetch<{slug: string}[]>(BLOG_POST_SLUGS_QUERY);
  return rows.map((row) => row.slug).filter(Boolean);
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const categories = await client.fetch(BLOG_CATEGORIES_QUERY);
  return categories
    .map((category: Parameters<typeof mapSanityCategory>[0]) => mapSanityCategory(category))
    .filter((category: BlogCategory | null): category is BlogCategory => Boolean(category));
}

export async function fetchBlogTrendingTags(): Promise<string[]> {
  const tags = await client.fetch<string[]>(BLOG_TRENDING_TAGS_QUERY);
  return tags.filter(Boolean);
}
