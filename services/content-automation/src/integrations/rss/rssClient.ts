import Parser from "rss-parser";

import type { NormalizedFeedItem } from "../../types/index.js";
import { logger } from "../../lib/logger.js";

const parser = new Parser({
  timeout: 25_000,
  headers: {
    "User-Agent": "vCloudTech-ContentAutomation/1.0 (+https://example.com)",
  },
});

/**
 * Thin RSS integration — only knows how to fetch and normalize a feed URL.
 * Vendor-specific rules stay in config, not here.
 */
export async function fetchRssFeed(feedUrl: string): Promise<NormalizedFeedItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const items: NormalizedFeedItem[] = (feed.items ?? []).map((item) => ({
      title: (item.title ?? "Untitled").trim(),
      link: (item.link ?? item.guid ?? "").trim(),
      contentSnippet: (item.contentSnippet ?? item.summary ?? "").trim() || undefined,
      pubDate: item.pubDate ?? item.isoDate,
    }));

    return items.filter((i) => i.link.length > 0);
  } catch (err) {
    logger.error("rss_fetch_failed", {
      feedUrl,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
