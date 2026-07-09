import "server-only";

import { unstable_cache } from "next/cache";

import { sanityServerClient } from "@/sanity/lib/serverClient";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_TRENDING_TAGS_QUERY,
} from "@/sanity/lib/queries";

import { readSanityDiskCache, writeSanityDiskCache } from "./sanity-disk-cache";
import { withSanityRetries } from "./sanity-resilient-fetch";
import {
  mapRelatedPosts,
  mapSanityBlogPost,
  mapSanityCategory,
  type SanityBlogPost,
} from "./map-sanity-blog";
import type { BlogArticle, BlogCategory } from "./types";

const BLOG_REVALIDATE_SECONDS = 300;

type BlogFetchOptions = {
  next: { revalidate: number; tags: string[] };
};

const blogFetchOptions: BlogFetchOptions = {
  next: { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
};

function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return withSanityRetries(() => sanityServerClient.fetch<T>(query, params, blogFetchOptions));
}

/** On network failure, serve disk cache. Never return a fallback that poisons Next cache. */
async function withPersistentCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  try {
    const data = await fetcher();
    await writeSanityDiskCache(key, data);
    return data;
  } catch (error) {
    const cached = await readSanityDiskCache<T>(key);
    if (cached !== null) {
      console.warn(`[blog] serving disk cache for "${key}" after Sanity fetch failed`);
      return cached;
    }

    throw error;
  }
}

async function fetchBlogPostDocument(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await fetchSanity<SanityBlogPost | null>(BLOG_POST_QUERY, { slug });

    if (post) {
      await writeSanityDiskCache(`blog-post:${slug}`, post);
      return post;
    }

    const cached = await readSanityDiskCache<SanityBlogPost>(`blog-post:${slug}`);
    return cached ?? null;
  } catch (error) {
    const cached = await readSanityDiskCache<SanityBlogPost>(`blog-post:${slug}`);
    if (cached) {
      console.warn(`[blog] serving disk cache for blog-post:${slug}`);
      return cached;
    }

    throw error;
  }
}

const getBlogPostsCached = unstable_cache(
  async () =>
    withPersistentCache<SanityBlogPost[]>("blog-posts", () =>
      fetchSanity<SanityBlogPost[]>(BLOG_POSTS_QUERY),
    ),
  ["blog-posts"],
  { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
);

const getBlogCategoriesCached = unstable_cache(
  async () =>
    withPersistentCache<Parameters<typeof mapSanityCategory>[0][]>("blog-categories", () =>
      fetchSanity(BLOG_CATEGORIES_QUERY),
    ),
  ["blog-categories"],
  { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
);

const getBlogSlugsCached = unstable_cache(
  async () =>
    withPersistentCache<{ slug: string }[]>("blog-slugs", () =>
      fetchSanity<{ slug: string }[]>(BLOG_POST_SLUGS_QUERY),
    ),
  ["blog-slugs"],
  { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
);

const getBlogTrendingTagsCached = unstable_cache(
  async () =>
    withPersistentCache<string[]>("blog-tags", () => fetchSanity<string[]>(BLOG_TRENDING_TAGS_QUERY)),
  ["blog-tags"],
  { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
);

export async function fetchBlogPostBySlug(slug: string) {
  let post: SanityBlogPost | null;

  try {
    post = await unstable_cache(
      () => fetchBlogPostDocument(slug),
      ["blog-post", slug],
      { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog", `blog-post:${slug}`] },
    )();
  } catch {
    post = await readSanityDiskCache<SanityBlogPost>(`blog-post:${slug}`);
  }

  if (!post) return null;

  const article = mapSanityBlogPost(post, true);
  if (!article) return null;

  const related = mapRelatedPosts(post.relatedPosts).slice(0, 3);
  return { article, related };
}

export async function fetchBlogPosts(): Promise<BlogArticle[]> {
  try {
    const posts = await getBlogPostsCached();
    return posts
      .map((post) => mapSanityBlogPost(post))
      .filter((article): article is BlogArticle => Boolean(article));
  } catch {
    const posts = await readSanityDiskCache<SanityBlogPost[]>("blog-posts");
    return (posts ?? [])
      .map((post) => mapSanityBlogPost(post))
      .filter((article): article is BlogArticle => Boolean(article));
  }
}

export async function fetchBlogSlugs() {
  try {
    const rows = await getBlogSlugsCached();
    return rows.map((row) => row.slug).filter(Boolean);
  } catch {
    const rows = await readSanityDiskCache<{ slug: string }[]>("blog-slugs");
    return (rows ?? []).map((row) => row.slug).filter(Boolean);
  }
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  try {
    const categories = await getBlogCategoriesCached();
    return categories
      .map((category) => mapSanityCategory(category))
      .filter((category): category is BlogCategory => Boolean(category));
  } catch {
    const categories = await readSanityDiskCache<Parameters<typeof mapSanityCategory>[0][]>(
      "blog-categories",
    );
    return (categories ?? [])
      .map((category) => mapSanityCategory(category))
      .filter((category): category is BlogCategory => Boolean(category));
  }
}

export async function fetchBlogTrendingTags(): Promise<string[]> {
  try {
    const tags = await getBlogTrendingTagsCached();
    return tags.filter(Boolean);
  } catch {
    const tags = await readSanityDiskCache<string[]>("blog-tags");
    return (tags ?? []).filter(Boolean);
  }
}
