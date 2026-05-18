"use client";

import {
  useFilteredVendorNews,
  useVendorNewsFeedStore,
} from "@/stores/vendor-news-feed-store";

import { VendorNewsCard } from "./VendorNewsCard";

export function VendorNewsGrid() {
  const articles = useFilteredVendorNews();
  const loading = useVendorNewsFeedStore((s) => s.loading);
  const error = useVendorNewsFeedStore((s) => s.error);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-lg border border-slate-200 bg-slate-50"
            aria-hidden
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-semibold text-slate-900">{error}</p>
        <button
          type="button"
          onClick={() => useVendorNewsFeedStore.getState().loadFeeds()}
          className="mt-4 rounded-lg bg-[#1B224B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#141a38]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 text-center text-slate-600 sm:px-6 lg:px-8">
        No articles match the current filters.
      </div>
    );
  }

  return (
    <div
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4"
      role="list"
      aria-label="Vendor news articles"
    >
      {articles.map((article) => (
        <div key={article.id} role="listitem">
          <VendorNewsCard article={article} />
        </div>
      ))}
    </div>
  );
}
