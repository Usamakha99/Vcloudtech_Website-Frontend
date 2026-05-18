import Link from "next/link";

import {
  type VendorNewsTabId,
  VENDOR_NEWS_BRAND_COLORS,
  VENDOR_NEWS_TABS,
} from "@/lib/vendor-news-vendors";

type Stat = { label: string; value: string; variant?: "up" | "down" | "flat" };

type Props = {
  filterLabel: string;
  inViewCount: number;
  platformCount: number;
  activeVendor?: VendorNewsTabId;
};

function vendorChipClass(active: boolean, vendorId?: VendorNewsTabId): string {
  const base =
    "rounded-full border px-3 py-1 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]";

  if (!active) {
    return `${base} border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50`;
  }

  if (vendorId) {
    return `${base} border-transparent text-white shadow-sm`;
  }

  return `${base} border-[#1B224B] bg-[#1B224B] text-white shadow-sm`;
}

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
    <section className="mt-6 border-b border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white sm:mt-8">
      {/* Enterprise vendor lane — brand color markers */}
      <div className="flex h-1 w-full" aria-hidden>
        {VENDOR_NEWS_TABS.map((tab) => (
          <span
            key={tab.id}
            className="min-w-0 flex-1"
            style={{ backgroundColor: VENDOR_NEWS_BRAND_COLORS[tab.id] }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-6 pt-5 sm:px-6 sm:pb-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Intelligence snapshot
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-[#1B224B] sm:text-xl">
              Vendor snapshot
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {filterLabel} · updated from live RSS
            </p>
          </div>

          <nav
            aria-label="Vendor regions"
            className="flex max-w-full flex-wrap gap-2 text-sm font-medium"
          >
            <Link
              href="/vendor-updates"
              scroll={false}
              className={vendorChipClass(!activeVendor)}
            >
              All
            </Link>
            {VENDOR_NEWS_TABS.map((tab) => {
              const isOn = activeVendor === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/vendor-updates?vendor=${tab.id}`}
                  scroll={false}
                  className={vendorChipClass(isOn, tab.id)}
                  style={
                    isOn
                      ? {
                          backgroundColor: VENDOR_NEWS_BRAND_COLORS[tab.id],
                          borderColor: VENDOR_NEWS_BRAND_COLORS[tab.id],
                        }
                      : undefined
                  }
                >
                  {tab.label}
                </Link>
              );
            })}
            <Link
              href="/vendor-updates"
              scroll={false}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-[#1B224B] shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              View all →
            </Link>
          </nav>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {stats.map((s, index) => {
            const accent =
              index === 0 && activeVendor
                ? VENDOR_NEWS_BRAND_COLORS[activeVendor]
                : index === 1
                  ? "#1B224B"
                  : "#64748b";

            return (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm"
              >
                <span
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
                <p className="pl-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {s.label}
                </p>
                <p
                  className={`mt-1 pl-2 text-2xl font-bold tabular-nums tracking-tight ${
                    s.variant === "up" ? "text-emerald-700" : "text-[#1B224B]"
                  }`}
                >
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
