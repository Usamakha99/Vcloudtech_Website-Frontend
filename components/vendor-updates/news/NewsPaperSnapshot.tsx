import Link from "next/link";

import { type VendorNewsTabId, VENDOR_NEWS_TABS } from "@/lib/vendor-news-vendors";

type Stat = { label: string; value: string; variant?: "up" | "down" | "flat" };

type Props = {
  filterLabel: string;
  inViewCount: number;
  platformCount: number;
  activeVendor?: VendorNewsTabId;
};

export function NewsPaperSnapshot({
  filterLabel,
  inViewCount,
  platformCount,
  activeVendor,
}: Props) {
  const stats: Stat[] = [
    { label: "In this feed", value: String(inViewCount), variant: "flat" },
    { label: "Platform total", value: String(platformCount), variant: "up" },
    { label: "Coverage", value: `${VENDOR_NEWS_TABS.length} vendors`, variant: "flat" },
  ];

  return (
    <section className="border-t border-sky-700/30 bg-sky-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Vendor snapshot</h2>
          <p className="mt-1 text-sm text-sky-100">
            {filterLabel} · updated from live RSS
          </p>
        </div>
        <nav aria-label="Vendor regions" className="flex flex-wrap gap-2 text-sm font-medium">
          <Link
            href="/vendor-updates"
            className={`rounded-full px-3 py-1 ${!activeVendor ? "bg-white text-sky-700" : "bg-sky-500/40 hover:bg-sky-500/55"}`}
            scroll={false}
          >
            All
          </Link>
          {VENDOR_NEWS_TABS.map((tab) => (
            <Link
              key={tab.id}
              href={`/vendor-updates?vendor=${tab.id}`}
              className={`rounded-full px-3 py-1 ${
                activeVendor === tab.id ? "bg-white text-sky-700" : "bg-sky-500/40 hover:bg-sky-500/55"
              }`}
              scroll={false}
            >
              {tab.label}
            </Link>
          ))}
          <Link
            href="/vendor-updates"
            className="ml-1 rounded-full border border-white/40 px-3 py-1 text-white hover:bg-white/10"
            scroll={false}
          >
            View all →
          </Link>
        </nav>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 pb-5 sm:gap-3 sm:px-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-200">
              {s.label}
            </p>
            <p
              className={`mt-1 text-xl font-bold tabular-nums sm:text-2xl ${
                s.variant === "up"
                  ? "text-emerald-200"
                  : s.variant === "down"
                    ? "text-red-200"
                    : ""
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
