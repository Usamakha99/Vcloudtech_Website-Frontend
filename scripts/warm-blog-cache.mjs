/**
 * Warm the on-disk Sanity blog cache (run after publishing in Studio).
 * Usage: npm run blog:cache
 */
import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(root, "..", ".env.local");
const cacheDir = path.join(root, "..", ".cache", "sanity");

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.trim().match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-11",
  useCdn: true,
});

const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    metaDescription,
    publishedAt,
    readingTimeMinutes,
    featured,
    tags,
    mainImage,
    "category": categories[0]->{ title, "slug": slug.current },
    "author": author->{ name, "slug": slug.current, role, linkedIn, image }
  }
`;

const BLOG_CATEGORIES_QUERY = `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current,
    description,
    icon
  }
`;

const BLOG_POST_SLUGS_QUERY = `
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }
`;

async function writeCache(key, data) {
  await fs.promises.mkdir(cacheDir, { recursive: true });
  await fs.promises.writeFile(
    path.join(cacheDir, `${key}.json`),
    JSON.stringify(data),
    "utf8",
  );
}

const [posts, categories, slugs] = await Promise.all([
  client.fetch(BLOG_POSTS_QUERY),
  client.fetch(BLOG_CATEGORIES_QUERY),
  client.fetch(BLOG_POST_SLUGS_QUERY),
]);

await Promise.all([
  writeCache("blog-posts", posts),
  writeCache("blog-categories", categories),
  writeCache("blog-slugs", slugs),
]);

console.log(`Cached ${posts.length} posts, ${categories.length} categories, ${slugs.length} slugs.`);
