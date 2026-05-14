import type { VendorFeedConfig, VendorId } from "../types/index.js";
import { assertVendorId } from "./vendorGuard.js";

/**
 * Curated vendor RSS entry points.
 * URLs are official or widely stable feeds; replace if a vendor changes endpoints.
 */
const feeds: VendorFeedConfig[] = [
  {
    vendor: "microsoft",
    label: "Microsoft (Azure blog)",
    feedUrl: "https://azure.microsoft.com/en-us/blog/feed/",
  },
  {
    vendor: "aws",
    label: "AWS (What’s New)",
    feedUrl: "https://aws.amazon.com/about-aws/whats-new/recent/feed/",
  },
  {
    vendor: "dell",
    label: "Dell Technologies (blog)",
    feedUrl: "https://www.delltechnologies.com/blog/feed/",
  },
  {
    vendor: "nvidia",
    label: "NVIDIA (developer blog)",
    feedUrl: "https://developer.nvidia.com/blog/feed/",
  },
  {
    vendor: "cisco",
    label: "Cisco (blogs)",
    feedUrl: "https://blogs.cisco.com/feed",
  },
];

feeds.forEach((f) => assertVendorId(f.vendor));

export function getVendorFeeds(): readonly VendorFeedConfig[] {
  return feeds;
}

export function getFeedByVendor(vendor: VendorId): VendorFeedConfig | undefined {
  return feeds.find((f) => f.vendor === vendor);
}
