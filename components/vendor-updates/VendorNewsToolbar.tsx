import Link from "next/link";

import { type VendorNewsTabId, VENDOR_NEWS_TABS } from "@/lib/vendor-news-vendors";

function tabClass(active: boolean) {
  return active
    ? "border-[#1B224B] bg-[#1B224B] text-white shadow-sm"
    : "border-slate-300 bg-white text-[#1B224B] shadow-sm hover:border-slate-400 hover:bg-slate-50/80";
}

type Props = {
  currentVendor?: VendorNewsTabId;
};

/**
 * Vendor filter: horizontal tabs + `<details>` menu (no client JS).
 * Matches News page “browse by vendor” pattern — `?vendor=` on `/vendor-updates`.
 */
export function VendorNewsToolbar({ currentVendor }: Props) {
  const active = currentVendor;

  return (
    <section
      aria-label="Filter news by vendor"
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Label row — same baseline as your reference UI */}
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Browse by vendor
        </p>
        <p className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:block sm:text-right">
          Quick filter
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="-mx-0.5 flex gap-2 overflow-x-auto pb-0.5 pl-0.5 pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link
              href="/vendor-updates"
              scroll={false}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition ${tabClass(!active)}`}
            >
              All
            </Link>
            {VENDOR_NEWS_TABS.map((tab) => {
              const isOn = active === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/vendor-updates?vendor=${tab.id}`}
                  scroll={false}
                  className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition ${tabClass(isOn)}`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:hidden">
            Quick filter
          </p>
          <details className="group relative w-full sm:max-w-[14rem] lg:w-[14rem]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1B224B] shadow-sm transition hover:border-slate-400 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
              <span className="truncate">
                {active ? VENDOR_NEWS_TABS.find((t) => t.id === active)?.label ?? "Vendor" : "All vendors"}
              </span>
              <span className="shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden>
                ▾
              </span>
            </summary>
            <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-slate-900/5 sm:left-auto sm:min-w-[14rem]">
              <Link
                href="/vendor-updates"
                scroll={false}
                className="block px-4 py-2.5 text-sm font-medium text-[#1B224B] hover:bg-slate-50"
              >
                All vendors
              </Link>
              {VENDOR_NEWS_TABS.map((tab) => (
                <Link
                  key={tab.id}
                  href={`/vendor-updates?vendor=${tab.id}`}
                  scroll={false}
                  className="block px-4 py-2.5 text-sm font-medium text-[#1B224B] hover:bg-slate-50"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
