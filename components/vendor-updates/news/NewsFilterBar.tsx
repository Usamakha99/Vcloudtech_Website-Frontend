import Link from "next/link";
import type { ReactNode } from "react";

import {
  NEWS_CONTENT_TYPE_LABELS,
  NEWS_CONTENT_TYPES,
  type NewsContentTypeId,
} from "@/lib/vendor-news-content-type";
import { newsListHref } from "@/lib/vendor-news-pagination";
import {
  type VendorNewsTabId,
  VENDOR_NEWS_BRAND_COLORS,
  VENDOR_NEWS_TABS,
} from "@/lib/vendor-news-vendors";

function filterChipClass(active: boolean) {
  return `inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium whitespace-nowrap transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B] ${
    active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;
}

function FilterLink({
  href,
  active,
  children,
  dotColor,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
  dotColor?: string;
}) {
  return (
    <Link href={href} scroll={false} className={filterChipClass(active)} aria-current={active ? "page" : undefined}>
      {dotColor ? (
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
      ) : null}
      {children}
    </Link>
  );
}

type Props = {
  activeVendor?: VendorNewsTabId;
  activeType?: NewsContentTypeId;
};

/** Single-row Vendor | Type filters (scrolls horizontally on narrow viewports). */
export function NewsFilterBar({ activeVendor, activeType }: Props) {
  return (
    <div
      className="-mx-1 flex items-center gap-4 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Filter news"
    >
      <div className="flex shrink-0 items-center gap-2">
        <span className="shrink-0 text-sm font-semibold text-slate-900">Vendor</span>
        <FilterLink href={newsListHref(1, undefined, activeType)} active={!activeVendor}>
          All
        </FilterLink>
        {VENDOR_NEWS_TABS.map((tab) => (
          <FilterLink
            key={tab.id}
            href={newsListHref(1, tab.id, activeType)}
            active={activeVendor === tab.id}
            dotColor={VENDOR_NEWS_BRAND_COLORS[tab.id]}
          >
            {tab.label}
          </FilterLink>
        ))}
      </div>

      <span className="h-5 w-px shrink-0 bg-slate-200" aria-hidden />

      <div className="flex shrink-0 items-center gap-2">
        <span className="shrink-0 text-sm font-semibold text-slate-900">Type</span>
        <FilterLink href={newsListHref(1, activeVendor)} active={!activeType}>
          All types
        </FilterLink>
        {NEWS_CONTENT_TYPES.map((t) => (
          <FilterLink
            key={t}
            href={newsListHref(1, activeVendor, t)}
            active={activeType === t}
          >
            {NEWS_CONTENT_TYPE_LABELS[t]}
          </FilterLink>
        ))}
      </div>
    </div>
  );
}
