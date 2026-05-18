/**
 * Domain types for the vendor feed → CMS pipeline (optional OpenAI enrichment).
 * Kept in one module so integrations and services share a single contract.
 */

export type VendorId = "microsoft" | "aws" | "dell" | "nvidia" | "cisco";

export interface VendorFeedConfig {
  /** Stable id stored on Sanity documents */
  vendor: VendorId;
  /** Human label for logs */
  label: string;
  /** RSS or Atom feed URL */
  feedUrl: string;
  /** Used when primary feed returns malformed XML or HTTP errors */
  feedUrlFallback?: string;
}

/** Normalized item from any RSS source */
export interface NormalizedFeedItem {
  title: string;
  link: string;
  contentSnippet?: string;
  pubDate?: string;
}

/** Structured model returned by the AI layer */
export interface AiEnrichedContent {
  seoTitle: string;
  summary: string;
  businessImpact: string;
  category: string;
  tags: string[];
}

/** Payload used when creating a Sanity document */
export interface VendorUpdateDraft {
  _type: "vendorUpdate";
  sourceId: string;
  sourceUrl: string;
  vendor: VendorId;
  title: string;
  slug: { _type: "slug"; current: string };
  summary: string;
  businessImpact: string;
  category: string;
  tags: string[];
  publishedAt: string;
  body: unknown[];
  rawRssTitle: string;
}

export interface PipelineStats {
  vendor: VendorId;
  /** Total items returned by the RSS parser */
  fetched: number;
  /** How many feed rows we actually walked (may be less than fetched) */
  scanned: number;
  created: number;
  skippedDuplicate: number;
  skippedError: number;
}
