/**
 * Seed Sanity with blog authors, categories, and articles.
 * Run: node scripts/seed-sanity-blog.mjs
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

const authors = [
  {
    _id: "author-sarah-chen",
    _type: "author",
    name: "Sarah Chen",
    slug: { _type: "slug", current: "sarah-chen" },
    role: "Director of Cloud Architecture",
    linkedIn: "https://www.linkedin.com/company/vcloudtech",
    bio: [
      block(
        "Sarah leads hybrid cloud strategy for enterprise clients across government, healthcare, and financial services.",
      ),
    ],
  },
  {
    _id: "author-marcus-reed",
    _type: "author",
    name: "Marcus Reed",
    slug: { _type: "slug", current: "marcus-reed" },
    role: "Principal Security Architect",
    linkedIn: "https://www.linkedin.com/company/vcloudtech",
    bio: [
      block(
        "Marcus designs zero-trust programs and security operations frameworks for regulated enterprise environments.",
      ),
    ],
  },
  {
    _id: "author-elena-vasquez",
    _type: "author",
    name: "Elena Vasquez",
    slug: { _type: "slug", current: "elena-vasquez" },
    role: "Head of AI Infrastructure",
    linkedIn: "https://www.linkedin.com/company/vcloudtech",
    bio: [
      block(
        "Elena advises CIOs on GPU platforms, AI workload placement, and enterprise automation at scale.",
      ),
    ],
  },
];

const categories = [
  {
    _id: "category-cloud-computing",
    _type: "category",
    title: "Cloud Computing",
    slug: { _type: "slug", current: "cloud-computing" },
    description: "Hybrid cloud, migration, and multi-cloud governance for enterprise teams.",
    icon: "cloud",
  },
  {
    _id: "category-ai-infrastructure",
    _type: "category",
    title: "AI Infrastructure",
    slug: { _type: "slug", current: "ai-infrastructure" },
    description: "GPU platforms, model deployment, and intelligent workload design.",
    icon: "server",
  },
  {
    _id: "category-cybersecurity",
    _type: "category",
    title: "Cybersecurity",
    slug: { _type: "slug", current: "cybersecurity" },
    description: "Zero trust, threat defense, and enterprise security operations.",
    icon: "shield",
  },
];

async function main() {
  console.log("Seeding Sanity blog content...\n");

  console.log("Authors");
  for (const author of authors) {
    await createOrSkip("author", author);
  }

  console.log("\nCategories");
  for (const category of categories) {
    await createOrSkip("category", category);
  }

  console.log("\nUploading images");
  const [img1, img2, img3] = await Promise.all([
    uploadImage("assets/blog/2.png", "blog-cloud.png"),
    uploadImage("assets/blog/3.png", "blog-ai.png"),
    uploadImage("assets/services/cyber-security.png", "blog-security.png"),
  ]);

  function imageField(asset, alt) {
    if (!asset) return undefined;
    return {
      _type: "image",
      alt,
      asset: { _type: "reference", _ref: asset._id },
    };
  }

  const posts = [
    {
      _id: "blogPost-aws-hybrid-infrastructure",
      _type: "blogPost",
      title: "AWS Hybrid Infrastructure Without Downtime Risk",
      slug: { _type: "slug", current: "aws-hybrid-infrastructure-without-downtime" },
      author: { _type: "reference", _ref: "author-sarah-chen" },
      categories: [{ _type: "reference", _ref: "category-cloud-computing" }],
      publishedAt: new Date("2026-03-12T10:00:00.000Z").toISOString(),
      excerpt:
        "A practical framework for migrating mission-critical workloads to hybrid cloud while maintaining uptime, compliance, and operational continuity.",
      metaDescription:
        "Learn how enterprise teams deploy AWS hybrid infrastructure without downtime risk using phased migration and governed landing zones.",
      readingTimeMinutes: 8,
      featured: true,
      tags: ["Hybrid Cloud", "AWS", "Migration", "Enterprise IT"],
      mainImage: imageField(img1, "Cloud server infrastructure with enterprise data visualization"),
      body: [
        ...portableParagraphs(
          "Enterprise teams are under pressure to modernize without disrupting mission-critical workloads. Hybrid infrastructure provides a controlled path—extending on-premises investments while unlocking cloud elasticity.",
        ),
        block("Why hybrid infrastructure wins in enterprise IT", "h2"),
        ...portableParagraphs(
          "A well-designed hybrid model balances compliance, latency, and cost. Organizations retain sensitive data in controlled environments while using public cloud for elastic compute and managed services.",
          "Sequence migrations by workload criticality. Start with non-production environments, validate runbooks, then promote patterns to production with change windows aligned to business calendars.",
        ),
        block("Reference architecture patterns", "h2"),
        block("Active-active DR with automated failover between regions", "normal"),
        block("Unified identity across on-premises and cloud control planes", "normal"),
      ],
      faq: [
        {
          _type: "faqItem",
          question: "How long does a hybrid migration typically take?",
          answer:
            "Most enterprise programs run 12–24 weeks across discover, design, migrate, and optimize phases.",
        },
        {
          _type: "faqItem",
          question: "Can we keep sensitive data on-premises?",
          answer:
            "Yes. Hybrid models routinely keep regulated data in private environments while using cloud for analytics and DR.",
        },
      ],
    },
    {
      _id: "blogPost-enterprise-ai-strategy",
      _type: "blogPost",
      title: "Enterprise AI Strategy for IT Leaders",
      slug: { _type: "slug", current: "enterprise-ai-strategy-for-it-leaders" },
      author: { _type: "reference", _ref: "author-elena-vasquez" },
      categories: [{ _type: "reference", _ref: "category-ai-infrastructure" }],
      publishedAt: new Date("2026-02-28T10:00:00.000Z").toISOString(),
      excerpt:
        "How CIOs align AI investments with governance, infrastructure readiness, and measurable business outcomes across the enterprise.",
      metaDescription:
        "Enterprise AI strategy guide for IT leaders: governance, infrastructure readiness, and ROI measurement.",
      readingTimeMinutes: 6,
      featured: false,
      tags: ["Artificial Intelligence", "Strategy", "Governance"],
      mainImage: imageField(img2, "AI neural network visualization for enterprise technology"),
      body: [
        ...portableParagraphs(
          "AI strategy must connect model ambition with infrastructure reality. IT leaders should inventory data quality, GPU capacity, security controls, and operational skills before scaling pilots.",
        ),
        block("Assessing AI readiness", "h2"),
        block("Data lineage and classification for training sets", "normal"),
        block("GPU/CPU capacity forecasts by business unit", "normal"),
        block("MLOps tooling and deployment pipelines", "normal"),
        block("Governance and risk", "h2"),
        ...portableParagraphs(
          "Establish an AI review board with security, legal, and architecture representation before production deployments.",
        ),
      ],
    },
    {
      _id: "blogPost-zero-trust-security",
      _type: "blogPost",
      title: "Zero Trust Security for the Modern Enterprise",
      slug: { _type: "slug", current: "zero-trust-security-for-enterprise" },
      author: { _type: "reference", _ref: "author-marcus-reed" },
      categories: [{ _type: "reference", _ref: "category-cybersecurity" }],
      publishedAt: new Date("2026-02-05T10:00:00.000Z").toISOString(),
      excerpt:
        "Implement continuous verification, micro-segmentation, and identity-centric controls without disrupting user productivity.",
      metaDescription:
        "Zero trust security for enterprises: identity-centric access, micro-segmentation, and continuous verification.",
      readingTimeMinutes: 7,
      featured: false,
      tags: ["Zero Trust", "Enterprise Security", "Identity"],
      mainImage: imageField(img3, "Enterprise cybersecurity and threat defense"),
      body: [
        ...portableParagraphs(
          "Zero trust replaces implicit network trust with continuous verification. For enterprise IT leaders, the goal is consistent policy enforcement across users, devices, applications, and data.",
        ),
        block("Core principles", "h2"),
        block("Verify explicitly on every access request", "normal"),
        block("Apply least-privilege access with just-in-time elevation", "normal"),
        block("Assume breach and instrument for detection", "normal"),
        ...portableParagraphs(
          "Zero trust is a program, not a product. Identity, endpoint, network, and data controls must align under a single governance model.",
        ),
      ],
      faq: [
        {
          _type: "faqItem",
          question: "Does zero trust require replacing our VPN?",
          answer:
            "Many programs transition from VPN-centric access to identity-aware proxies and ZTNA, often in phases.",
        },
      ],
    },
  ];

  console.log("\nBlog articles");
  const postIds = [];
  for (const post of posts) {
    const id = await createOrSkip("blogPost", post);
    postIds.push(id);
  }

  // Link related posts after all exist
  const relatedUpdates = [
    {
      id: "blogPost-aws-hybrid-infrastructure",
      related: ["blogPost-enterprise-ai-strategy", "blogPost-zero-trust-security"],
    },
    {
      id: "blogPost-enterprise-ai-strategy",
      related: ["blogPost-aws-hybrid-infrastructure", "blogPost-zero-trust-security"],
    },
    {
      id: "blogPost-zero-trust-security",
      related: ["blogPost-aws-hybrid-infrastructure", "blogPost-enterprise-ai-strategy"],
    },
  ];

  console.log("\nLinking related articles");
  for (const item of relatedUpdates) {
    const exists = await client.fetch(`*[_id == $id][0]._id`, { id: item.id });
    if (!exists) continue;
    await client
      .patch(item.id)
      .set({
        relatedPosts: item.related.map((ref) => ({ _type: "reference", _ref: ref, _key: ref })),
      })
      .commit();
    console.log(`  ✓ Related posts linked for ${item.id}`);
  }

  console.log("\nDone! Open /blog or /studio to review.");
  console.log("Articles:");
  for (const post of posts) {
    console.log(`  - /blog/${post.slug.current}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
