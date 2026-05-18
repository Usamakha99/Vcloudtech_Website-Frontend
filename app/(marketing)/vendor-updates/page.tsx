import type { Metadata } from "next";

import type { PaperItem } from "@/components/vendor-updates/news/NewsPaperColumns";
import { NewsPaperColumns } from "@/components/vendor-updates/news/NewsPaperColumns";
import { NewsPaperMasthead } from "@/components/vendor-updates/news/NewsPaperMasthead";
import { NewsPaperSnapshot } from "@/components/vendor-updates/news/NewsPaperSnapshot";
import { NewsPagination } from "@/components/vendor-updates/NewsPagination";
import { NEWS_PAGE_SIZE, parseNewsPage } from "@/lib/vendor-news-pagination";
import { formatPaperMastheadDate } from "@/lib/vendor-news-ui";
import { parseVendorFilter, VENDOR_NEWS_TABS } from "@/lib/vendor-news-vendors";
import { client } from "@/sanity/lib/client";
import {
  VENDOR_NEWS_PLATFORM_COUNT_QUERY,
  VENDOR_NEWS_TRENDING_QUERY,
  VENDOR_UPDATES_COUNT_QUERY,
  VENDOR_UPDATES_PAGE_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

type Search = Promise<{ vendor?: string; page?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const { vendor } = await searchParams;
  const v = parseVendorFilter(vendor);
  const tab = v ? VENDOR_NEWS_TABS.find((t) => t.id === v) : undefined;
  const title = tab ? `News — ${tab.label}` : "News";
  const description = tab
    ? `Latest ${tab.label} technology headlines from our vendor intelligence feed.`
    : "Curated vendor technology headlines from official RSS sources—organized for enterprise teams.";
  return {
    title: `${title} | vCloudTech`,
    description,
    openGraph: {
      title: `${title} | vCloudTech`,
      description,
      type: "website",
    },
  };
}

export default async function VendorUpdatesPage({ searchParams }: { searchParams: Search }) {
  const { vendor: vendorRaw, page: pageRaw } = await searchParams;
  const vendorFilter = parseVendorFilter(vendorRaw);
  const filterVendor = vendorFilter ?? "all";

  const now = new Date();
  const todayLabel = formatPaperMastheadDate(now);
  const todayIso = now.toISOString().slice(0, 10);

  const [total, platformCount, trendingRaw] = await Promise.all([
    client.fetch(VENDOR_UPDATES_COUNT_QUERY, { filterVendor }),
    client.fetch(VENDOR_NEWS_PLATFORM_COUNT_QUERY),
    client.fetch(VENDOR_NEWS_TRENDING_QUERY),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));
  const requestedPage = parseNewsPage(pageRaw);
  const page = Math.min(requestedPage, totalPages);

  const start = (page - 1) * NEWS_PAGE_SIZE;
  const end = start + NEWS_PAGE_SIZE;

  const items = (await client.fetch(VENDOR_UPDATES_PAGE_QUERY, {
    filterVendor,
    start,
    end,
  })) as PaperItem[];

  const tabLabel = vendorFilter ? VENDOR_NEWS_TABS.find((t) => t.id === vendorFilter)?.label : null;
  const filterSnapshotLabel = tabLabel ? `${tabLabel} feed` : "All vendors";

  const featured = items.find((row) => row.slug) ?? null;
  const withoutFeatured = featured
    ? items.filter((row) => row._id !== featured._id)
    : items;
  const thumbStories = withoutFeatured.slice(0, 3);
  const latestStories = withoutFeatured.slice(3);

  const trendingList = trendingRaw as PaperItem[];
  const pageIds = new Set(items.map((i) => i._id));
  let trendingForColumn = trendingList.filter((t) => !pageIds.has(t._id)).slice(0, 6);
  if (trendingForColumn.length === 0) {
    trendingForColumn = trendingList.slice(0, 6);
  }

  const leftTitle = tabLabel ? `${tabLabel} spotlight` : "Spotlight";

  return (
    <div className="min-h-full bg-white text-neutral-950">
      <NewsPaperMasthead todayLabel={todayLabel} todayIso={todayIso} activeVendor={vendorFilter} />

      <NewsPaperSnapshot
        filterLabel={filterSnapshotLabel}
        inViewCount={total}
        platformCount={platformCount}
        activeVendor={vendorFilter}
      />

      {total === 0 && filterVendor === "all" ? (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="text-lg font-semibold text-neutral-800">No news items yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
            Run the content-automation service with Sanity credentials. Headlines sync here automatically.
          </p>
        </div>
      ) : total === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="text-lg font-semibold text-neutral-800">No items for this vendor</p>
          <p className="mt-2 text-sm text-neutral-600">Pick another vendor from the masthead.</p>
        </div>
      ) : featured?.slug ? (
        <>
          <NewsPaperColumns
            featured={featured}
            thumbStories={thumbStories}
            latest={latestStories}
            trending={trendingForColumn}
            leftSectionTitle={leftTitle}
          />

          <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
            <NewsPagination page={page} totalPages={totalPages} vendor={vendorFilter} />
          </div>
        </>
      ) : null}
    </div>
  );
}
