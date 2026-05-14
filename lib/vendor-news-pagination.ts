import type { VendorNewsTabId } from "@/lib/vendor-news-vendors";

export const NEWS_PAGE_SIZE = 10;

/** Parse `?page=` — 1-based, clamped to >= 1 before totalPages is known. */
export function parseNewsPage(raw: string | string[] | undefined): number {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s || typeof s !== "string") return 1;
  const n = Number.parseInt(s.trim(), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

export function newsListHref(page: number, vendor?: VendorNewsTabId): string {
  const p = new URLSearchParams();
  if (vendor) p.set("vendor", vendor);
  if (page > 1) p.set("page", String(page));
  const q = p.toString();
  return q ? `/vendor-updates?${q}` : "/vendor-updates";
}
