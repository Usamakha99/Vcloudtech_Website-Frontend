import axios from "axios";
import Parser from "rss-parser";

import type { NormalizedFeedItem } from "../../types/index.js";
import { logger } from "../../lib/logger.js";

const parser = new Parser({
  timeout: 25_000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; vCloudTech-ContentAutomation/1.0; +https://vcloudtech.com)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; vCloudTech-ContentAutomation/1.0; +https://vcloudtech.com)",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

/**
 * Vendor feeds sometimes ship broken XML (e.g. `attr=` with no value).
 * xml2js (used by rss-parser) rejects those unless we normalize first.
 */
export function sanitizeFeedXml(raw: string): string {
  let xml = raw.trim();
  if (xml.charCodeAt(0) === 0xfeff) {
    xml = xml.slice(1);
  }

  // `some-attr=>` or `some-attr= >`
  xml = xml.replace(/([\w:.-]+)=>(?=\s|\/|>)/g, '$1=""');
  // `attr=` immediately before `>` or `/`
  xml = xml.replace(/\s([a-zA-Z_][\w:.-]*)=(?=\s*[>/])/g, ' $1=""');

  return xml;
}

async function downloadFeedXml(feedUrl: string): Promise<string> {
  const timeoutMs = 45_000;
  let lastError: unknown;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await axios.get<string>(feedUrl, {
        timeout: timeoutMs,
        responseType: "text",
        headers: FETCH_HEADERS,
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400,
      });
      return res.data;
    } catch (err) {
      lastError = err;
      if (attempt < 2) {
        logger.warn("rss_download_retry", { feedUrl, attempt });
        await new Promise((r) => setTimeout(r, 2_000));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function normalizeItems(feed: Parser.Output<Record<string, unknown>>): NormalizedFeedItem[] {
  return (feed.items ?? [])
    .map((item) => ({
      title: (item.title ?? "Untitled").trim(),
      link: (item.link ?? (item.guid as string | undefined) ?? "").trim(),
      contentSnippet:
        (item.contentSnippet ?? item.summary ?? "").trim() || undefined,
      pubDate: item.pubDate ?? item.isoDate,
    }))
    .filter((i) => i.link.length > 0);
}

async function parseFeedXml(xml: string, feedUrl: string): Promise<NormalizedFeedItem[]> {
  try {
    const feed = await parser.parseString(xml);
    return normalizeItems(feed);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("Attribute without value")) {
      throw err;
    }
    logger.warn("rss_parse_retry_after_sanitize", { feedUrl });
    const feed = await parser.parseString(sanitizeFeedXml(xml));
    return normalizeItems(feed);
  }
}

/**
 * Fetch and normalize a feed URL. Tries parse first; on malformed-attribute errors,
 * re-parses after {@link sanitizeFeedXml}.
 */
export async function fetchRssFeed(
  feedUrl: string,
  options?: { fallbackFeedUrl?: string },
): Promise<NormalizedFeedItem[]> {
  const urls = [feedUrl, options?.fallbackFeedUrl].filter(
    (u): u is string => Boolean(u),
  );

  let lastError: unknown;

  for (const url of urls) {
    try {
      const xml = await downloadFeedXml(url);
      return await parseFeedXml(xml, url);
    } catch (err) {
      lastError = err;
      logger.error("rss_fetch_failed", {
        feedUrl: url,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
