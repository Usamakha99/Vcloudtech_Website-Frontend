import { buildVendorUpdateBody } from "../../integrations/sanity/portableText.js";
import type { NormalizedFeedItem, VendorFeedConfig, VendorUpdateDraft } from "../../types/index.js";
import { slugify, uniqueSlug } from "../../utils/slug.js";

const MAX_SUMMARY = 6000;

function plainSnippet(s: string): string {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/** Build a Sanity draft from RSS fields only (no OpenAI). */
export function buildVendorDraftFromRssItem(
  item: NormalizedFeedItem,
  feed: VendorFeedConfig,
  sourceId: string,
): VendorUpdateDraft {
  const rawTitle = item.title.trim() || "Vendor update";
  const title = rawTitle.slice(0, 120);
  const snippet = plainSnippet((item.contentSnippet ?? "").trim());
  const summary = (snippet || rawTitle).slice(0, MAX_SUMMARY);
  const slugBase = slugify(rawTitle);
  const slugCurrent = uniqueSlug(slugBase, sourceId.slice(0, 14));
  const publishedAt = item.pubDate
    ? new Date(item.pubDate).toISOString()
    : new Date().toISOString();

  return {
    _type: "vendorUpdate",
    sourceId,
    sourceUrl: item.link,
    vendor: feed.vendor,
    title,
    slug: { _type: "slug", current: slugCurrent },
    summary,
    businessImpact: "",
    category: feed.label,
    tags: [feed.vendor],
    publishedAt,
    body: buildVendorUpdateBody(summary, ""),
    rawRssTitle: item.title,
  };
}
