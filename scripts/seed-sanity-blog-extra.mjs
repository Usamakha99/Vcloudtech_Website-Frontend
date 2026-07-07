/**
 * Seed 10 blog articles across categories not used in the original blog seed.
 * Run: npm run blog:seed-extra
 */
import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-11";

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function block(text, style = "normal") {
  return {
    _type: "block",
    style,
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  };
}

function portableParagraphs(...paragraphs) {
  return paragraphs.map((text) => block(text));
}

async function uploadImage(relativePath, filename) {
  const absolute = path.join(root, "public", relativePath);
  if (!fs.existsSync(absolute)) {
    console.warn(`  Skipping image (not found): ${relativePath}`);
    return null;
  }
  const buffer = fs.readFileSync(absolute);
  return client.assets.upload("image", buffer, { filename });
}

async function findBySlug(type, slug) {
  return client.fetch(`*[_type == $type && slug.current == $slug][0]._id`, { type, slug });
}

async function createOrSkip(type, doc) {
  const slug = doc.slug?.current;
  if (slug) {
    const existing = await findBySlug(type, slug);
    if (existing) {
      console.log(`  ↷ ${type} "${slug}" already exists`);
      return existing;
    }
  }
  const created = await client.create(doc);
  console.log(`  ✓ Created ${type}: ${doc.title ?? doc.name ?? slug}`);
  return created._id;
}

const extraCategories = [
  {
    _id: "category-web-development",
    _type: "category",
    title: "Web Development",
    slug: { _type: "slug", current: "web-development" },
    description: "Modern web platforms, APIs, and enterprise application delivery.",
    icon: "rocket",
  },
  {
    _id: "category-networking",
    _type: "category",
    title: "Networking",
    slug: { _type: "slug", current: "networking" },
    description: "Campus, WAN, SD-WAN, and secure connectivity for distributed teams.",
    icon: "network",
  },
  {
    _id: "category-data-center",
    _type: "category",
    title: "Data Center",
    slug: { _type: "slug", current: "data-center" },
    description: "Hardware lifecycle, power, cooling, and colocation strategy.",
    icon: "datacenter",
  },
  {
    _id: "category-enterprise-modernization",
    _type: "category",
    title: "Enterprise Modernization",
    slug: { _type: "slug", current: "enterprise-modernization" },
    description: "Legacy transformation, platform engineering, and operating model change.",
    icon: "enterprise",
  },
  {
    _id: "category-it-procurement",
    _type: "category",
    title: "IT Procurement",
    slug: { _type: "slug", current: "it-procurement" },
    description: "Sourcing, contracts, and compliant technology purchasing at scale.",
    icon: "cart",
  },
  {
    _id: "category-devops-automation",
    _type: "category",
    title: "DevOps & Automation",
    slug: { _type: "slug", current: "devops-automation" },
    description: "CI/CD, infrastructure as code, and platform reliability practices.",
    icon: "rocket",
  },
  {
    _id: "category-managed-services",
    _type: "category",
    title: "Managed Services",
    slug: { _type: "slug", current: "managed-services" },
    description: "24/7 operations, monitoring, and managed infrastructure support.",
    icon: "enterprise",
  },
  {
    _id: "category-digital-transformation",
    _type: "category",
    title: "Digital Transformation",
    slug: { _type: "slug", current: "digital-transformation" },
    description: "Business-led technology programs with measurable outcomes.",
    icon: "enterprise",
  },
  {
    _id: "category-compliance-governance",
    _type: "category",
    title: "Compliance & Governance",
    slug: { _type: "slug", current: "compliance-governance" },
    description: "Audit readiness, policy design, and regulatory alignment.",
    icon: "shield",
  },
  {
    _id: "category-edge-computing",
    _type: "category",
    title: "Edge Computing",
    slug: { _type: "slug", current: "edge-computing" },
    description: "Distributed compute close to users, devices, and operational sites.",
    icon: "server",
  },
];

const imagePaths = [
  "assets/blog/1.png",
  "assets/blog/2.png",
  "assets/blog/3.png",
  "assets/services/networking.png",
  "assets/services/data-center-hardware.png",
  "assets/services/ai-infrastructure.png",
  "assets/services/lifecycle-management.png",
  "assets/services/power-infrastructure.png",
  "assets/services/cyber-security.png",
  "assets/hero/hero-2.png",
];

const extraPosts = [
  {
    _id: "blogPost-modern-web-platforms",
    slug: "modern-web-platforms-for-enterprise-teams",
    title: "Modern Web Platforms for Enterprise Teams",
    categorySlug: "web-development",
    authorRef: "author-sarah-chen",
    imageIndex: 0,
    tags: ["Web Development", "APIs", "Enterprise Apps"],
    excerpt:
      "How enterprise teams ship secure, scalable web platforms with design systems, API gateways, and governed release pipelines.",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-02T10:00:00.000Z",
  },
  {
    _id: "blogPost-sd-wan-campus",
    slug: "sd-wan-and-campus-networking-playbook",
    title: "SD-WAN and Campus Networking Playbook",
    categorySlug: "networking",
    authorRef: "author-marcus-reed",
    imageIndex: 3,
    tags: ["Networking", "SD-WAN", "Campus"],
    excerpt:
      "A practical playbook for upgrading campus and WAN connectivity with SD-WAN, segmentation, and centralized policy control.",
    readingTimeMinutes: 7,
    publishedAt: "2026-04-05T10:00:00.000Z",
  },
  {
    _id: "blogPost-data-center-lifecycle",
    slug: "data-center-hardware-lifecycle-best-practices",
    title: "Data Center Hardware Lifecycle Best Practices",
    categorySlug: "data-center",
    authorRef: "author-sarah-chen",
    imageIndex: 4,
    tags: ["Data Center", "Hardware", "Lifecycle"],
    excerpt:
      "Extend asset life, reduce downtime, and align refresh cycles with workload demand using a governed hardware lifecycle model.",
    readingTimeMinutes: 8,
    publishedAt: "2026-04-08T10:00:00.000Z",
  },
  {
    _id: "blogPost-legacy-modernization",
    slug: "legacy-modernization-without-disrupting-operations",
    title: "Legacy Modernization Without Disrupting Operations",
    categorySlug: "enterprise-modernization",
    authorRef: "author-elena-vasquez",
    imageIndex: 5,
    tags: ["Modernization", "Enterprise IT", "Strategy"],
    excerpt:
      "Sequence legacy retirement, platform migration, and team enablement so business operations stay stable throughout transformation.",
    readingTimeMinutes: 7,
    publishedAt: "2026-04-11T10:00:00.000Z",
  },
  {
    _id: "blogPost-procurement-compliance",
    slug: "it-procurement-compliance-for-public-sector",
    title: "IT Procurement Compliance for Public Sector",
    categorySlug: "it-procurement",
    authorRef: "author-sarah-chen",
    imageIndex: 6,
    tags: ["Procurement", "Public Sector", "Compliance"],
    excerpt:
      "Navigate cooperative contracts, audit trails, and vendor governance when procuring infrastructure for government programs.",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-14T10:00:00.000Z",
  },
  {
    _id: "blogPost-devops-platform-teams",
    slug: "devops-platform-teams-that-scale",
    title: "DevOps Platform Teams That Scale",
    categorySlug: "devops-automation",
    authorRef: "author-elena-vasquez",
    imageIndex: 7,
    tags: ["DevOps", "Automation", "Platform Engineering"],
    excerpt:
      "Build an internal platform team that standardizes pipelines, environments, and guardrails without slowing product delivery.",
    readingTimeMinutes: 5,
    publishedAt: "2026-04-17T10:00:00.000Z",
  },
  {
    _id: "blogPost-managed-noc",
    slug: "managed-noc-for-mid-market-enterprises",
    title: "Managed NOC for Mid-Market Enterprises",
    categorySlug: "managed-services",
    authorRef: "author-marcus-reed",
    imageIndex: 8,
    tags: ["Managed Services", "NOC", "Operations"],
    excerpt:
      "When to adopt a managed NOC, how to define SLAs, and what telemetry integrations matter for mid-market IT leaders.",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-20T10:00:00.000Z",
  },
  {
    _id: "blogPost-digital-roadmap",
    slug: "building-a-digital-transformation-roadmap",
    title: "Building a Digital Transformation Roadmap",
    categorySlug: "digital-transformation",
    authorRef: "author-elena-vasquez",
    imageIndex: 9,
    tags: ["Digital Transformation", "Roadmap", "CIO"],
    excerpt:
      "Align stakeholders, funding, and technology bets in a transformation roadmap executives can track quarter by quarter.",
    readingTimeMinutes: 7,
    publishedAt: "2026-04-23T10:00:00.000Z",
  },
  {
    _id: "blogPost-compliance-audit",
    slug: "compliance-audit-readiness-for-it-leaders",
    title: "Compliance Audit Readiness for IT Leaders",
    categorySlug: "compliance-governance",
    authorRef: "author-marcus-reed",
    imageIndex: 8,
    tags: ["Compliance", "Governance", "Audit"],
    excerpt:
      "Prepare evidence, control mappings, and remediation workflows before auditors arrive—without freezing delivery teams.",
    readingTimeMinutes: 8,
    publishedAt: "2026-04-26T10:00:00.000Z",
  },
  {
    _id: "blogPost-edge-ai-inference",
    slug: "edge-ai-inference-at-enterprise-scale",
    title: "Edge AI Inference at Enterprise Scale",
    categorySlug: "edge-computing",
    authorRef: "author-elena-vasquez",
    imageIndex: 5,
    tags: ["Edge Computing", "AI", "Inference"],
    excerpt:
      "Deploy low-latency inference close to operations with secure device management, model versioning, and observability.",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-29T10:00:00.000Z",
  },
];

async function main() {
  console.log("Seeding 10 extra blog categories and articles...\n");

  console.log("Categories");
  const categoryIdBySlug = new Map();
  for (const category of extraCategories) {
    const id = await createOrSkip("category", category);
    categoryIdBySlug.set(category.slug.current, id);
  }

  console.log("\nUploading images");
  const assets = await Promise.all(
    imagePaths.map((relativePath, index) =>
      uploadImage(relativePath, `blog-extra-${index + 1}.png`),
    ),
  );

  function imageField(asset, alt) {
    if (!asset) return undefined;
    return {
      _type: "image",
      alt,
      asset: { _type: "reference", _ref: asset._id },
    };
  }

  console.log("\nBlog articles");
  for (const post of extraPosts) {
    const categoryId = categoryIdBySlug.get(post.categorySlug);
    if (!categoryId) {
      console.warn(`  Skipping "${post.slug}" — category "${post.categorySlug}" not found`);
      continue;
    }
    const asset = assets[post.imageIndex];
    const doc = {
      _id: post._id,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      author: { _type: "reference", _ref: post.authorRef },
      categories: [{ _type: "reference", _ref: categoryId }],
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      metaDescription: post.excerpt.slice(0, 155),
      readingTimeMinutes: post.readingTimeMinutes,
      featured: false,
      tags: post.tags,
      mainImage: imageField(asset, post.title),
      body: [
        ...portableParagraphs(post.excerpt),
        block("Key takeaways for IT leaders", "h2"),
        block("Align architecture decisions with business risk and operational maturity.", "normal"),
        block("Instrument platforms early so adoption and performance are measurable.", "normal"),
        block("Govern change with cross-functional review—not ad hoc exceptions.", "normal"),
      ],
    };
    await createOrSkip("blogPost", doc);
  }

  console.log("\nDone! Hard-refresh /blog (dev fetches live Sanity data).");
  for (const post of extraPosts) {
    console.log(`  - /blog/${post.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
