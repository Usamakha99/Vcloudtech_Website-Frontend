import type { SanityClient } from "@sanity/client";

import type { PipelineStats, VendorFeedConfig, VendorUpdateDraft } from "../../types/index.js";
import { fetchRssFeed } from "../../integrations/rss/rssClient.js";
import { summarizeFeedItem } from "../../integrations/openai/summarizer.js";
import { vendorUpdateExistsBySourceId } from "../../integrations/sanity/duplicateChecker.js";
import { createVendorUpdate } from "../../integrations/sanity/vendorUpdateRepository.js";
import { buildVendorUpdateBody } from "../../integrations/sanity/portableText.js";
import { hashSourceUrl } from "../../utils/hash.js";
import { slugify, uniqueSlug } from "../../utils/slug.js";
import { logger } from "../../lib/logger.js";

/**
 * Pipeline for one vendor feed: fetch → dedupe → enrich → publish.
 * Each step is delegated to a small integration to keep this function readable.
 */
export async function ingestVendorFeed(
  client: SanityClient,
  feed: VendorFeedConfig,
  maxItems: number,
): Promise<PipelineStats> {
  const stats: PipelineStats = {
    vendor: feed.vendor,
    fetched: 0,
    created: 0,
    skippedDuplicate: 0,
    skippedError: 0,
  };

  const items = await fetchRssFeed(feed.feedUrl);
  stats.fetched = items.length;
  const slice = items.slice(0, maxItems);

  for (const item of slice) {
    const sourceId = hashSourceUrl(item.link);
    try {
      if (await vendorUpdateExistsBySourceId(client, sourceId)) {
        stats.skippedDuplicate += 1;
        continue;
      }

      const ai = await summarizeFeedItem(item, feed.label);
      const slugBase = slugify(ai.seoTitle);
      const slugCurrent = uniqueSlug(slugBase, sourceId.slice(0, 14));
      const publishedAt = item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString();

      const doc: VendorUpdateDraft = {
        _type: "vendorUpdate",
        sourceId,
        sourceUrl: item.link,
        vendor: feed.vendor,
        title: ai.seoTitle.slice(0, 120),
        slug: { _type: "slug", current: slugCurrent },
        summary: ai.summary,
        businessImpact: ai.businessImpact,
        category: ai.category,
        tags: ai.tags,
        publishedAt,
        body: buildVendorUpdateBody(ai.summary, ai.businessImpact),
        rawRssTitle: item.title,
      };

      await createVendorUpdate(client, doc);
      stats.created += 1;
    } catch (err) {
      stats.skippedError += 1;
      logger.warn("ingest_item_failed", {
        vendor: feed.vendor,
        link: item.link,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return stats;
}
