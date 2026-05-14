import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";
import { VENDOR_UPDATE_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export default async function VendorUpdatePage({ params }: Props) {
  const { slug } = await params;
  const doc = await client.fetch(VENDOR_UPDATE_BY_SLUG_QUERY, { slug });

  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/vendor-updates" className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← News
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {[doc.vendor, doc.category].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B224B]">{doc.title}</h1>
        {doc.publishedAt ? (
          <time dateTime={doc.publishedAt} className="mt-2 block text-sm text-slate-500">
            {new Date(doc.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
      </header>

      <div className="mt-10 space-y-6 text-slate-700">
        {doc.summary ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Summary</h2>
            <p className="mt-2 leading-relaxed">{doc.summary}</p>
          </section>
        ) : null}
        {doc.businessImpact ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Business impact</h2>
            <p className="mt-2 leading-relaxed">{doc.businessImpact}</p>
          </section>
        ) : null}
        {doc.tags?.length ? (
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-500">Tags: </span>
            {doc.tags.join(", ")}
          </p>
        ) : null}
        {doc.sourceUrl ? (
          <p>
            <a
              href={doc.sourceUrl}
              className="text-sm font-semibold text-sky-700 underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read original announcement
            </a>
          </p>
        ) : null}
        {doc.body ? (
          <div className="prose prose-slate max-w-none border-t border-slate-200 pt-8">
            <PortableText value={doc.body} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
