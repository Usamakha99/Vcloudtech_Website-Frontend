import { fetchAllVendorNewsFeeds } from "@/lib/vendor-news-feed/rss";
import type { VendorNewsFeedApiResponse } from "@/lib/vendor-news-feed/types";

export const runtime = "nodejs";
export const revalidate = 300;

export async function GET() {
  const articles = await fetchAllVendorNewsFeeds();
  const body: VendorNewsFeedApiResponse = {
    articles,
    fetchedAt: new Date().toISOString(),
  };
  return Response.json(body);
}
