import type { BlogArticle } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vcloudtech.com";

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTimeLabel(minutes: number) {
  return `${minutes} min read`;
}

export function getFeaturedArticle(articles: BlogArticle[]) {
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getLatestArticles(articles: BlogArticle[], excludeSlug?: string) {
  return articles
    .filter((article) => article.slug !== excludeSlug)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getAdjacentArticles(articles: BlogArticle[], slug: string) {
  const sorted = getLatestArticles(articles);
  const index = sorted.findIndex((article) => article.slug === slug);
  return {
    previous: index > 0 ? sorted[index - 1] : undefined,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

export type SortOption = "newest" | "oldest" | "reading-time";

export function filterArticles(
  articles: BlogArticle[],
  options: {
    query?: string;
    categorySlug?: string;
    sort?: SortOption;
  },
) {
  const query = options.query?.trim().toLowerCase() ?? "";
  let results = [...articles];

  if (options.categorySlug) {
    results = results.filter((article) => article.categorySlug === options.categorySlug);
  }

  if (query) {
    results = results.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  const sort = options.sort ?? "newest";
  results.sort((a, b) => {
    if (sort === "oldest") return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
    if (sort === "reading-time") return b.readingTimeMinutes - a.readingTimeMinutes;
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });

  return results;
}
