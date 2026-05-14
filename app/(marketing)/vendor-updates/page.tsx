import type { Metadata } from "next";
import Link from "next/link";

import { NewsBreadcrumbs } from "@/components/vendor-updates/NewsBreadcrumbs";
import { client } from "@/sanity/lib/client";
import { VENDOR_UPDATES_QUERY } from "@/sanity/lib/queries";
import { formatNewsDate, getVendorChrome } from "@/lib/vendor-news-ui";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News | Vendor intelligence",
  description:
    "Curated vendor technology headlines from official RSS sources—organized for enterprise teams.",
  openGraph: {
    title: "News | vCloudTech",
    description:
      "Vendor intelligence feed: Microsoft, AWS, Dell, NVIDIA, Cisco—and more as we expand coverage.",
    type: "website",
  },
};

type VendorRow = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  vendor: string | null;
  category: string | null;
  summary: string | null;
};

export default async function VendorUpdatesPage() {
  const items = await client.fetch(VENDOR_UPDATES_QUERY);

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f1f5f9_0%,#ffffff_22%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
        <NewsBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />

        <header className="mt-8 max-w-3xl border-b border-slate-200/90 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/90">
            Vendor intelligence
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1B224B] sm:text-[2.5rem] sm:leading-tight">
            News
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            A single place to scan what major technology vendors are announcing—synced from trusted RSS
            feeds and published through Sanity so your team stays aligned without chasing dozens of blogs.
          </p>
          {items.length > 0 ? (
            <p className="mt-5 text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="tabular-nums text-slate-800">{items.length}</span>{" "}
              {items.length === 1 ? "update" : "updates"}
            </p>
          ) : null}
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
          <div>
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300/90 bg-white/80 px-6 py-14 text-center shadow-sm">
                <p className="text-base font-medium text-slate-800">No news items yet</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                  Run the content-automation service after configuring Sanity credentials. New items will
                  appear here automatically.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-5">
                {items.map((item: VendorRow) => {
                  if (!item.slug) return null;
                  const chrome = getVendorChrome(item.vendor);
                  return (
                    <li key={item._id}>
                      <Link
                        href={`/vendor-updates/${item.slug}`}
                        className="group relative flex overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200/80 hover:shadow-md hover:ring-slate-900/[0.06]"
                      >
                        <span
                          className={`w-1 shrink-0 ${chrome.bar}`}
                          aria-hidden
                        />
                        <div className="flex min-w-0 flex-1 flex-col p-5 pl-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
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
                          <div className="mt-4 flex shrink-0 flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:mt-0 sm:w-36 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                            <time
                              dateTime={item.publishedAt ?? undefined}
                              className="text-xs font-medium text-slate-500"
                            >
                              {formatNewsDate(item.publishedAt)}
                            </time>
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition group-hover:gap-2">
                              Read
                              <span aria-hidden className="translate-y-px">
                                →
                              </span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                How this feed works
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  <span>Sources are official vendor RSS endpoints—deduplicated before publish.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  <span>Content is stored in Sanity for governance, previews, and future enrichment.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  <span>Editorial blog posts live separately under Blog in the main navigation.</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#1B224B] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#141a3d]"
              >
                Talk to solutions architecture
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
