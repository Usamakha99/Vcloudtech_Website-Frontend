import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(root, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.trim().match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-05-11",
  useCdn: false,
});

const all = await client.fetch(`*[_type == "category"]{ title, "slug": slug.current, _id }`);
const published = await client.fetch(
  `*[_type == "category" && defined(slug.current)]{ title, "slug": slug.current }`,
);
console.log("All categories:", JSON.stringify(all, null, 2));
console.log("With slug (shown on blog):", JSON.stringify(published, null, 2));
