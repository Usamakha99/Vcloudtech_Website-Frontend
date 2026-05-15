import Link from "next/link";

import { formatNewsDateMeta, getVendorChrome, getVendorShortLabel } from "@/lib/vendor-news-ui";

export type PaperItem = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  vendor: string | null;
  category: string | null;
  summary: string | null;
};

function ContinueReading({ href }: { href: string }) {
  return (
    <Link href={href} className="text-[13px] font-semibold text-sky-600 hover:text-sky-800">
      Continue reading
    </Link>
  );
}

type GridProps = {
  featured: PaperItem | null;
  thumbStories: PaperItem[];
  latest: PaperItem[];
  trending: PaperItem[];
  leftSectionTitle?: string;
};

export function NewsPaperColumns({
  featured,
  thumbStories,
  latest,
  trending,
  leftSectionTitle = "Spotlight",
}: GridProps) {
  if (!featured?.slug) {
    return null;
  }

  const leadChrome = getVendorChrome(featured.vendor);
  const tag = featured.category?.trim() || getVendorShortLabel(featured.vendor);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:py-12">
      {/* Left — featured + thumbs */}
      <section className="min-w-0 border-b border-neutral-200 pb-10 lg:border-b-0 lg:pb-0">
        <h2 className="flex items-center gap-1 text-lg font-bold tracking-tight text-neutral-950">
          {leftSectionTitle}
          <span className="text-neutral-400" aria-hidden>
            ›
          </span>
        </h2>
        <p className="mt-2 text-[12px] font-medium text-neutral-500">
          Lead story · official vendor feeds
        </p>

        <article className="mt-6">
          <Link href={`/vendor-updates/${featured.slug}`} className="group block">
            <div
              className={`relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 ${leadChrome.thumb}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
              <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-900">
                {tag}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold leading-snug text-neutral-950 group-hover:underline group-hover:decoration-sky-600 group-hover:underline-offset-4 sm:text-[1.35rem]">
              {featured.title ?? "Untitled"}
            </h3>
          </Link>
          {featured.summary ? (
            <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-neutral-600">
              {featured.summary}
            </p>
          ) : null}

          {thumbStories.length > 0 ? (
            <div className="mt-4 flex gap-2">
              {thumbStories.slice(0, 3).map((t) => {
                if (!t.slug) return null;
                const tc = getVendorChrome(t.vendor);
                return (
                  <Link
                    key={t._id}
                    href={`/vendor-updates/${t.slug}`}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden ${tc.thumb} ring-1 ring-neutral-200/80 transition hover:ring-2 hover:ring-sky-500/40`}
                    title={t.title ?? ""}
                  />
                );
              })}
            </div>
          ) : null}

          <div className="mt-5">
            <ContinueReading href={`/vendor-updates/${featured.slug}`} />
          </div>
        </article>
      </section>

      {/* Middle — latest list */}
      <section className="min-w-0 border-b border-neutral-200 pb-10 lg:border-b-0 lg:border-l lg:border-neutral-200 lg:pb-0 lg:pl-8">
        <h2 className="flex items-center gap-1 text-lg font-bold tracking-tight text-neutral-950">
          Latest news
          <span className="text-neutral-400" aria-hidden>
            ›
          </span>
        </h2>
        <ul className="mt-6 divide-y divide-neutral-200">
          {latest.length === 0 ? (
            <li className="py-8 text-[14px] text-neutral-500">
              End of this page&apos;s rundown — use pagination for more headlines.
            </li>
          ) : null}
          {latest.map((item) => {
            if (!item.slug) return null;
            const c = getVendorChrome(item.vendor);
            return (
              <li key={item._id} className="py-5 first:pt-0">
                <div className="flex flex-wrap items-baseline gap-2 gap-y-1">
                  <span className={`${c.badge} rounded-sm`}>{getVendorShortLabel(item.vendor)}</span>
                  {item.publishedAt ? (
                    <time className="text-[12px] text-neutral-400" dateTime={item.publishedAt}>
                      {formatNewsDateMeta(item.publishedAt)}
                    </time>
                  ) : null}
                </div>
                <Link
                  href={`/vendor-updates/${item.slug}`}
                  className="mt-2 block text-[17px] font-bold leading-snug text-neutral-950 hover:text-sky-800"
                >
                  {item.title ?? "Untitled"}
                </Link>
                <div className="mt-2">
                  <ContinueReading href={`/vendor-updates/${item.slug}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Right — trending thumbs */}
      <section className="min-w-0 lg:border-l lg:border-neutral-200 lg:pl-8">
        <h2 className="flex items-center gap-1 text-lg font-bold tracking-tight text-neutral-950">
          Trending now
          <span className="text-neutral-400" aria-hidden>
            ›
          </span>
        </h2>
        <p className="mt-2 text-[12px] text-neutral-500">Recent picks across every vendor feed.</p>
        <ul className="mt-6 space-y-6">
          {trending.map((item) => {
            if (!item.slug) return null;
            const c = getVendorChrome(item.vendor);
            return (
              <li key={item._id}>
                <Link
                  href={`/vendor-updates/${item.slug}`}
                  className="group flex gap-4 border-b border-neutral-100 pb-6 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={`${c.badge} rounded-sm`}>{getVendorShortLabel(item.vendor)}</span>
                      {item.publishedAt ? (
                        <time className="text-[12px] text-neutral-400" dateTime={item.publishedAt}>
                          {formatNewsDateMeta(item.publishedAt)}
                        </time>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[15px] font-bold leading-snug text-neutral-950 group-hover:text-sky-800">
                      {item.title ?? "Untitled"}
                    </p>
                    <span className="mt-2 inline-block text-[13px] font-semibold text-sky-600 group-hover:text-sky-800">
                      Continue reading
                    </span>
                  </div>
                  <div
                    className={`h-20 w-20 shrink-0 ${c.thumb} ring-1 ring-neutral-200/90`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
