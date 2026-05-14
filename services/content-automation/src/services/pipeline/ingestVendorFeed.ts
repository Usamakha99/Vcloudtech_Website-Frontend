import type { SanityClient } from "@sanity/client";

import type { PipelineStats, VendorFeedConfig, VendorUpdateDraft } from "../../types/index.js";
import { fetchRssFeed } from "../../integrations/rss/rssClient.js";
// FUTURE (OpenAI): import { env } from "../../config/env.js";
// FUTURE (OpenAI): import { summarizeFeedItem } from "../../integrations/openai/summarizer.js";
// FUTURE (OpenAI): import { buildVendorUpdateBody } from "../../integrations/sanity/portableText.js";
// FUTURE (OpenAI): import { slugify, uniqueSlug } from "../../utils/slug.js";
import { vendorUpdateExistsBySourceId } from "../../integrations/sanity/duplicateChecker.js";
import { createVendorUpdate } from "../../integrations/sanity/vendorUpdateRepository.js";
import { hashSourceUrl } from "../../utils/hash.js";
import { logger } from "../../lib/logger.js";
import { buildVendorDraftFromRssItem } from "./rssVendorDraft.js";

/**
 * Pipeline for one vendor feed: fetch → dedupe → publish (RSS fields).
 *
 * OpenAI enrichment is **commented out** for now; full implementation stays in
 * `integrations/openai/summarizer.ts`. To restore: uncomment imports above, uncomment the
 * block at the bottom of this file, and re-enable `RSS_ONLY` / `openai.apiKey` logic in `env.ts`.
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

      const doc: VendorUpdateDraft = buildVendorDraftFromRssItem(item, feed, sourceId);

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

/*
 * ---------------------------------------------------------------------------
 * FUTURE — OpenAI branch (do not delete). Paste above `createVendorUpdate` when re-enabling:
 *
 *      let doc: VendorUpdateDraft;
 *      if (env.pipeline.rssOnly) {
 *        doc = buildVendorDraftFromRssItem(item, feed, sourceId);
 *      } else {
 *        const ai = await summarizeFeedItem(item, feed.label);
 *        const slugBase = slugify(ai.seoTitle);
 *        const slugCurrent = uniqueSlug(slugBase, sourceId.slice(0, 14));
 *        const publishedAt = item.pubDate
 *          ? new Date(item.pubDate).toISOString()
 *          : new Date().toISOString();
 *
 *        doc = {
 *          _type: "vendorUpdate",
 *          sourceId,
 *          sourceUrl: item.link,
 *          vendor: feed.vendor,
 *          title: ai.seoTitle.slice(0, 120),
 *          slug: { _type: "slug", current: slugCurrent },
 *          summary: ai.summary,
 *          businessImpact: ai.businessImpact,
 *          category: ai.category,
 *          tags: ai.tags,
 *          publishedAt,
 *          body: buildVendorUpdateBody(ai.summary, ai.businessImpact),
 *          rawRssTitle: item.title,
 *        };
 *      }
 *
 *      await createVendorUpdate(client, doc);
 *
 * And replace the single `const doc = buildVendorDraft...` + `await createVendorUpdate`
 * lines with that block. Restore `env` / OpenAI-related settings in `config/env.ts`.
 * ---------------------------------------------------------------------------
 */
