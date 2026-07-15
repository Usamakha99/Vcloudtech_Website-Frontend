import { publicAssets, withAssetVersion, assetVersions } from "@/lib/public-assets";

import { blogDetailCta } from "./blog-detail-cta";

export { blogDetailCta };

export const blogLanding = {
  hero: {
    badge: "Blogs",
    title: "Blogs",
    description:
      "Explore vCloudTech insights across AI infrastructure, cloud engineering, cybersecurity, networking, data centers, procurement, and enterprise digital transformation.",
    image:
      publicAssets.blogPage?.hero ??
      withAssetVersion("/assets/blog hero/blog-hero.png", assetVersions.blogPage ?? "1"),
    imageAlt: "vCloudTech blogs — enterprise technology insights and industry perspectives",
  },
  newsletter: {
    title: "Stay Ahead of Enterprise Technology",
    description:
      "Receive curated insights on AI infrastructure, cloud strategy, and enterprise security—delivered monthly to your inbox.",
  },
  finalCta: {
    title: "Ready to Modernize Your Infrastructure?",
    description: "Talk to our experts and discover AI-powered enterprise solutions.",
    buttonLabel: "Contact Our Team",
    buttonHref: "/contact",
  },
  detailCta: blogDetailCta,
} as const;
