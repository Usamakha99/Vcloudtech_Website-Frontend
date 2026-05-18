import Parser from "rss-parser";

import { classifyVendorArticle } from "./classify";
import type { VendorNewsArticle } from "./types";
import { VENDOR_NEWS_FEED_VENDORS, type VendorNewsFeedId } from "./vendors";

const parser = new Parser({
  timeout: 25_000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; vCloudTech-VendorNews/1.0)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; vCloudTech-VendorNews/1.0)",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

function sanitizeFeedXml(raw: string): string {
  let xml = raw.trim();
  if (xml.charCodeAt(0) === 0xfeff) xml = xml.slice(1);
  xml = xml.replace(/([\w:.-]+)=>(?=\s|\/|>)/g, '$1=""');
  xml = xml.replace(/\s([a-zA-Z_][\w:.-]*)=(?=\s*[>/])/g, ' $1=""');
  return xml;
}

async function downloadFeedXml(feedUrl: string): Promise<string> {
  const res = await fetch(feedUrl, {
    headers: FETCH_HEADERS,
    signal: AbortSignal.timeout(45_000),
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${feedUrl}`);
  return res.text();
}

async function parseFeedXml(xml: string) {
  try {
    return await parser.parseString(xml);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("Attribute without value")) throw err;
    return parser.parseString(sanitizeFeedXml(xml));
  }
}

async function fetchVendorArticles(
  vendorId: VendorNewsFeedId,
  feedUrl: string,
  fallback?: string,
): Promise<VendorNewsArticle[]> {
  const urls = [feedUrl, fallback].filter((u): u is string => Boolean(u));
  let lastError: unknown;

  for (const url of urls) {
    try {
      const xml = await downloadFeedXml(url);
      const feed = await parseFeedXml(xml);
      return (feed.items ?? [])
        .map((item, index) => {
          const title = (item.title ?? "Untitled").trim();
          const link = (item.link ?? (item.guid as string | undefined) ?? "").trim();
          if (!link) return null;

          const excerpt =
            (item.contentSnippet ?? item.summary ?? "").trim().slice(0, 220) ||
            "Read the full story on the vendor site.";

          const { type, tag } = classifyVendorArticle(title, excerpt);
          const pub = item.isoDate ?? item.pubDate ?? null;

          return {
            id: `${vendorId}-${index}-${link}`,
            vendorId,
            title,
            excerpt,
            link,
            publishedAt: pub ? new Date(pub).toISOString() : null,
            type,
            tag,
          } satisfies VendorNewsArticle;
        })
        .filter((a): a is VendorNewsArticle => a !== null)
        .slice(0, 16);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

export async function fetchAllVendorNewsFeeds(): Promise<VendorNewsArticle[]> {
  const results = await Promise.all(
    VENDOR_NEWS_FEED_VENDORS.map(async (vendor) => {
      try {
        return await fetchVendorArticles(
          vendor.id,
          vendor.feedUrl,
          "feedUrlFallback" in vendor ? vendor.feedUrlFallback : undefined,
        );
      } catch {
        return [] as VendorNewsArticle[];
      }
    }),
  );

  const articles = results.flat();
  articles.sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });

  return articles;
}
