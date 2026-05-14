import type { Metadata } from "next";
import Link from "next/link";

import { NewsBreadcrumbs } from "@/components/vendor-updates/NewsBreadcrumbs";
import { NewsPagination } from "@/components/vendor-updates/NewsPagination";
import { VendorNewsToolbar } from "@/components/vendor-updates/VendorNewsToolbar";
import { NEWS_PAGE_SIZE, parseNewsPage } from "@/lib/vendor-news-pagination";
import { client } from "@/sanity/lib/client";
import {
  VENDOR_UPDATES_COUNT_QUERY,
  VENDOR_UPDATES_PAGE_QUERY,
} from "@/sanity/lib/queries";
import { formatNewsDate, getVendorChrome } from "@/lib/vendor-news-ui";
import { parseVendorFilter, VENDOR_NEWS_TABS } from "@/lib/vendor-news-vendors";

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

type VendorRow = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  vendor: string | null;
  category: string | null;
  summary: string | null;
};

export default async function VendorUpdatesPage({ searchParams }: { searchParams: Search }) {
  const { vendor: vendorRaw, page: pageRaw } = await searchParams;
  const vendorFilter = parseVendorFilter(vendorRaw);
  const filterVendor = vendorFilter ?? "all";

  const total = await client.fetch(VENDOR_UPDATES_COUNT_QUERY, { filterVendor });
  const totalPages = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));
  const requestedPage = parseNewsPage(pageRaw);
  const page = Math.min(requestedPage, totalPages);

  const start = (page - 1) * NEWS_PAGE_SIZE;
  const end = start + NEWS_PAGE_SIZE;

  const items = await client.fetch(VENDOR_UPDATES_PAGE_QUERY, {
    filterVendor,
    start,
    end,
  });

  const tabLabel = vendorFilter ? VENDOR_NEWS_TABS.find((t) => t.id === vendorFilter)?.label : null;

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#eef2f7_0%,#ffffff_24%,#ffffff_100%)]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        <NewsBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />

        <header className="mt-8 border-b border-slate-200/90 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/90">
            Vendor intelligence
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1B224B] sm:text-[2.5rem] sm:leading-tight">
              {tabLabel ? `${tabLabel} news` : "News"}
            </h1>
            {vendorFilter ? (
              <Link
                href="/vendor-updates"
                className="shrink-0 text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                Clear filter
              </Link>
            ) : null}
          </div>
        </header>

        <VendorNewsToolbar currentVendor={vendorFilter} />

        <div className="mt-8">
          {total === 0 && filterVendor === "all" ? (
            <div className="rounded-2xl border border-dashed border-slate-300/90 bg-white/90 px-6 py-14 text-center shadow-sm">
              <p className="text-base font-medium text-slate-800">No news items yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Run the content-automation service after configuring Sanity credentials. New items will
                appear here automatically.
              </p>
            </div>
          ) : total === 0 ? (
            <div className="rounded-2xl border border-slate-200/90 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-base font-medium text-slate-800">No items for this vendor yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Try another tab or clear the filter to see all updates.
              </p>
              <Link
                href="/vendor-updates"
                className="mt-6 inline-flex rounded-full bg-[#1B224B] px-5 py-2 text-sm font-semibold text-white hover:bg-[#141a3d]"
              >
                View all news
              </Link>
            </div>
          ) : (
            <>
              <ul className="mx-auto flex max-w-3xl flex-col gap-4">
                {(items as VendorRow[]).map((item: VendorRow) => {
                  if (!item.slug) return null;
                  const chrome = getVendorChrome(item.vendor);
                  return (
                    <li key={item._id}>
                      <Link
                        href={`/vendor-updates/${item.slug}`}
                        className="group relative flex overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] transition duration-200 hover:border-sky-200/90 hover:shadow-md"
                      >
                        <span className={`w-1 shrink-0 ${chrome.bar}`} aria-hidden />
                        <div className="flex min-w-0 flex-1 flex-col p-5 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {item.vendor ? (
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${chrome.badge}`}
                                >
                                  {item.vendor}
                                </span>
                              ) : null}
                              {item.category ? (
                                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                  {item.category}
                                </span>
                              ) : null}
                            </div>
                            <h2 className="mt-3 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-[#1B224B] sm:text-xl">
                              {item.title ?? "Untitled"}
                            </h2>
                            {item.summary ? (
                              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                {item.summary}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-4 flex shrink-0 flex-col justify-between border-t border-slate-100 pt-4 sm:mt-0 sm:w-32 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                            <time
                              dateTime={item.publishedAt ?? undefined}
                              className="text-xs font-medium text-slate-500"
                            >
                              {formatNewsDate(item.publishedAt)}
                            </time>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 sm:mt-0">
                              Read <span aria-hidden>→</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <NewsPagination page={page} totalPages={totalPages} vendor={vendorFilter} />
            </>
          )}
        </div>

        <aside className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            How this feed works
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
              <span>Each tab filters by vendor document field in Sanity—same data, clearer browsing.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
              <span>RSS sources are deduplicated before publish; editorial posts stay under Blog.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
              <span>News is paginated (10 items per page) for faster loading.</span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#1B224B] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#141a3d]"
          >
            Talk to solutions architecture
          </Link>
        </aside>
      </div>
    </div>
  );
}
