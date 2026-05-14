import type { SanityClient } from "@sanity/client";

import { env } from "../config/env.js";
import { getVendorFeeds } from "../config/feeds.js";
import { logger } from "../lib/logger.js";
import { ingestVendorFeed } from "../services/pipeline/ingestVendorFeed.js";

/**
 * Top-level job: processes all configured vendor feeds sequentially.
 * Why sequential: reduces burst load on OpenAI (when enabled) and Sanity; easy to parallelize later per vendor.
 */
export async function runVendorFeedsJob(client: SanityClient): Promise<void> {
  const feeds = getVendorFeeds();
  logger.info("job_vendor_feeds_start", {
    vendors: feeds.map((f) => f.vendor),
    rssOnly: env.pipeline.rssOnly,
  });

  for (const feed of feeds) {
    try {
      const stats = await ingestVendorFeed(client, feed, env.pipeline.maxItemsPerVendor);
      logger.info("job_vendor_feeds_vendor_done", { ...stats });
    } catch (err) {
      logger.error("job_vendor_feeds_vendor_failed", {
        vendor: feed.vendor,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  logger.info("job_vendor_feeds_complete");
}
