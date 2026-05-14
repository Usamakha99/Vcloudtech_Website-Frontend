import type { Metadata } from "next";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { VENDOR_UPDATES_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
  description:
    "Vendor technology headlines synced from official RSS feeds into Sanity CMS.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VendorUpdatesPage() {
  const items = await client.fetch(VENDOR_UPDATES_QUERY);

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col px-6 py-16">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#1B224B]">News</h1>
        <p className="mt-2 text-slate-600">
          Headlines from vendor RSS feeds (Microsoft, AWS, Dell, NVIDIA, Cisco), ingested by the
          content-automation service and published here.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-slate-600">
          No news items yet. Run the content-automation service after configuring environment variables.
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {items.map(
            (item: {
              _id: string;
              title: string | null;
              slug: string | null;
              publishedAt: string | null;
              vendor: string | null;
              category: string | null;
              summary: string | null;
            }) => (
              <li key={item._id}>
                <Link
                  href={`/vendor-updates/${item.slug}`}
                  className="block rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow hover:border-sky-200/80 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.vendor ? <span>{item.vendor}</span> : null}
                    {item.category ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>{item.category}</span>
                      </>
                    ) : null}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h2>
                  {item.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.summary}</p>
                  ) : null}
                  <p className="mt-3 text-xs text-slate-400">{formatDate(item.publishedAt)}</p>
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
