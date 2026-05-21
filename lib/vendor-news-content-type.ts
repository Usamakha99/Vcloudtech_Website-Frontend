/** Content-type tabs for News (title/summary heuristic — matches former RSS classifier). */
export const NEWS_CONTENT_TYPES = ["blog", "research", "announcement"] as const;

export type NewsContentTypeId = (typeof NEWS_CONTENT_TYPES)[number];

export const NEWS_CONTENT_TYPE_LABELS: Record<NewsContentTypeId, string> = {
  blog: "Blog",
  research: "Research",
  announcement: "Announcement",
};

const TYPE_IDS = new Set<string>(NEWS_CONTENT_TYPES);

/** Normalize `?type=` — returns `undefined` for All or invalid. */
export function parseTypeFilter(raw: string | string[] | undefined): NewsContentTypeId | undefined {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || typeof v !== "string") return undefined;
  const id = v.trim().toLowerCase();
  if (!TYPE_IDS.has(id)) return undefined;
  return id as NewsContentTypeId;
}
