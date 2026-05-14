import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { NewsBreadcrumbs } from "@/components/vendor-updates/NewsBreadcrumbs";
import { client } from "@/sanity/lib/client";
import {
  VENDOR_UPDATE_BY_SLUG_QUERY,
  VENDOR_UPDATE_SEO_QUERY,
} from "@/sanity/lib/queries";
import { formatNewsDate, getVendorChrome } from "@/lib/vendor-news-ui";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = await client.fetch(VENDOR_UPDATE_SEO_QUERY, { slug });
  if (!meta?.title) {
    return { title: "News" };
  }
  const title = `${meta.title} | News`;
  const description =
    typeof meta.summary === "string" && meta.summary.trim().length > 0
      ? meta.summary.trim().slice(0, 160)
      : "Vendor technology update from the vCloudTech news feed.";
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function VendorUpdatePage({ params }: Props) {
  const { slug } = await params;
  const doc = await client.fetch(VENDOR_UPDATE_BY_SLUG_QUERY, { slug });

  if (!doc) notFound();

  const chrome = getVendorChrome(doc.vendor);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "News", href: "/vendor-updates" },
    { label: (doc.title ? String(doc.title).slice(0, 72) : "Article") },
  ] as const;

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)]">
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        <NewsBreadcrumbs items={crumbs} />

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04]">
          <div className={`h-1 w-full ${chrome.bar}`} aria-hidden />

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                {doc.vendor ? (
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${chrome.badge}`}
                  >
                    {doc.vendor}
                  </span>
                ) : null}
                {doc.category ? (
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {doc.category}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B224B] sm:text-[2rem] sm:leading-tight">
                {doc.title}
              </h1>
              {doc.publishedAt ? (
                <time
                  dateTime={doc.publishedAt}
                  className="mt-4 block text-sm font-medium text-slate-500"
                >
                  {formatNewsDate(doc.publishedAt)}
                </time>
              ) : null}
            </header>

            <div className="mt-10 space-y-10">
              {doc.summary ? (
                <section className="rounded-xl bg-slate-50/90 p-5 ring-1 ring-slate-200/80 sm:p-6">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    At a glance
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-800">{doc.summary}</p>
                </section>
              ) : null}

              {doc.businessImpact ? (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Why it matters
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{doc.businessImpact}</p>
                </section>
              ) : null}

              {doc.tags?.length ? (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Tags
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {doc.tags.map((tag: string) => (
                      <li key={tag}>
                        <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {doc.sourceUrl ? (
                <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-600">
                    Source material lives on the vendor&apos;s site—open the original announcement for
                    full context and assets.
                  </p>
                  <a
                    href={doc.sourceUrl}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open original source
                  </a>
                </div>
              ) : null}

              {doc.body?.length ? (
                <section className="border-t border-slate-200 pt-10">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Full note
                  </h2>
                  <div
                    className="mt-4 max-w-none text-base leading-relaxed text-slate-700 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:font-medium [&_a]:text-sky-700 [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                  >
                    <PortableText value={doc.body} />
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between gap-4 border-t border-slate-200/90 pt-8">
          <Link
            href="/vendor-updates"
            className="text-sm font-semibold text-slate-600 transition hover:text-[#1B224B]"
          >
            ← Back to News
          </Link>
          <Link href="/posts" className="text-sm font-semibold text-sky-700 transition hover:text-sky-800">
            View editorial blog →
          </Link>
        </div>
      </article>
    </div>
  );
}
