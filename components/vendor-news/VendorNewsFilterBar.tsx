"use client";

import type { ReactNode } from "react";

import {
  VENDOR_NEWS_FEED_TYPE_LABELS,
  VENDOR_NEWS_FEED_TYPES,
  VENDOR_NEWS_FEED_VENDORS,
} from "@/lib/vendor-news-feed/vendors";
import { useVendorNewsFeedStore } from "@/stores/vendor-news-feed-store";

function FilterChip({
  active,
  onClick,
  children,
  dotColor,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  dotColor?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B] ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
      aria-pressed={active}
    >
      {dotColor ? (
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}

export function VendorNewsFilterBar() {
  const vendorFilter = useVendorNewsFeedStore((s) => s.vendorFilter);
  const typeFilter = useVendorNewsFeedStore((s) => s.typeFilter);
  const setVendorFilter = useVendorNewsFeedStore((s) => s.setVendorFilter);
  const setTypeFilter = useVendorNewsFeedStore((s) => s.setTypeFilter);

  return (
    <div className="border-b border-slate-200/90 bg-white py-4">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-900">Vendor</span>
          <FilterChip active={vendorFilter === "all"} onClick={() => setVendorFilter("all")}>
            All
          </FilterChip>
          {VENDOR_NEWS_FEED_VENDORS.map((v) => (
            <FilterChip
              key={v.id}
              active={vendorFilter === v.id}
              onClick={() => setVendorFilter(v.id)}
              dotColor={v.color}
            >
              {v.label}
            </FilterChip>
          ))}
        </div>

        <span className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden />

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-900">Type</span>
          <FilterChip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
            All types
          </FilterChip>
          {VENDOR_NEWS_FEED_TYPES.map((t) => (
            <FilterChip
              key={t}
              active={typeFilter === t}
              onClick={() => setTypeFilter(t)}
            >
              {VENDOR_NEWS_FEED_TYPE_LABELS[t]}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}
