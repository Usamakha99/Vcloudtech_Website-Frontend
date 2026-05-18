import type { VendorNewsArticle } from "@/lib/vendor-news-feed/types";
import {
  getVendorNewsFeedColor,
  getVendorNewsFeedLabel,
  VENDOR_NEWS_FEED_TYPE_LABELS,
} from "@/lib/vendor-news-feed/vendors";

const TAG_COLORS: Record<string, string> = {
  "AI/ML": "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
  Databases: "bg-slate-100 text-slate-700 ring-slate-200/80",
  Sustainability: "bg-violet-50 text-violet-800 ring-violet-200/80",
  Azure: "bg-sky-50 text-sky-800 ring-sky-200/80",
  Security: "bg-rose-50 text-rose-800 ring-rose-200/80",
  Kubernetes: "bg-indigo-50 text-indigo-800 ring-indigo-200/80",
  Storage: "bg-amber-50 text-amber-900 ring-amber-200/80",
  Networking: "bg-cyan-50 text-cyan-900 ring-cyan-200/80",
  Cloud: "bg-slate-100 text-slate-600 ring-slate-200/80",
};

function formatDate(iso: string | null): string {
  if (!iso) return "Recently";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = { article: VendorNewsArticle };

export function VendorNewsCard({ article }: Props) {
  const color = getVendorNewsFeedColor(article.vendorId);
  const vendorLabel = getVendorNewsFeedLabel(article.vendorId);
  const typeLabel = VENDOR_NEWS_FEED_TYPE_LABELS[article.type];
  const tagClass = TAG_COLORS[article.tag] ?? TAG_COLORS.Cloud;

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {vendorLabel}
        </span>
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {typeLabel}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-3 text-[15px] font-bold leading-snug text-slate-900">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1B224B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          {article.title}
        </a>
      </h3>

      <p className="mt-2 line-clamp-4 flex-1 text-[13px] leading-relaxed text-slate-600">
        {article.excerpt}
      </p>

      <footer className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <time className="text-xs text-slate-500" dateTime={article.publishedAt ?? undefined}>
          {formatDate(article.publishedAt)}
        </time>
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${tagClass}`}
        >
          {article.tag}
        </span>
      </footer>
    </article>
  );
}
