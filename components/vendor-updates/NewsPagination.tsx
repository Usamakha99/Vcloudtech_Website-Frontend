import Link from "next/link";

import { newsListHref } from "@/lib/vendor-news-pagination";
import type { VendorNewsTabId } from "@/lib/vendor-news-vendors";

type Props = {
  page: number;
  totalPages: number;
  vendor?: VendorNewsTabId;
};

export function NewsPagination({ page, totalPages, vendor }: Props) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? newsListHref(page - 1, vendor) : null;
  const next = page < totalPages ? newsListHref(page + 1, vendor) : null;

  return (
    <nav
      className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-4 border-t border-slate-200/90 pt-8 sm:flex-row sm:items-center sm:justify-between"
      aria-label="News pages"
    >
      {prev ? (
        <Link
          href={prev}
          className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#1B224B] shadow-sm transition hover:border-slate-400 hover:bg-slate-50 sm:min-w-[8.5rem]"
        >
          ← Previous
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-center text-sm font-semibold text-slate-400 sm:min-w-[8.5rem]">
          ← Previous
        </span>
      )}

      <p className="text-center text-sm font-medium text-slate-600">
        Page <span className="tabular-nums text-slate-900">{page}</span> of{" "}
        <span className="tabular-nums text-slate-900">{totalPages}</span>
      </p>

      {next ? (
        <Link
          href={next}
          className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#1B224B] shadow-sm transition hover:border-slate-400 hover:bg-slate-50 sm:min-w-[8.5rem]"
        >
          Next →
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-center text-sm font-semibold text-slate-400 sm:min-w-[8.5rem]">
          Next →
        </span>
      )}
    </nav>
  );
}
