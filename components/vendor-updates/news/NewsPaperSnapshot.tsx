import { NewsFilterBar } from "@/components/vendor-updates/news/NewsFilterBar";
import type { NewsContentTypeId } from "@/lib/vendor-news-content-type";
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
  activeType?: NewsContentTypeId;
};

export function NewsPaperSnapshot({
  filterLabel,
  inViewCount,
  platformCount,
  activeVendor,
  activeType,
}: Props) {
  const stats: Stat[] = [
    { label: "In this feed", value: String(inViewCount), variant: "flat" },
    { label: "Platform total", value: String(platformCount), variant: "up" },
    { label: "Coverage", value: `${VENDOR_NEWS_TABS.length} vendors`, variant: "flat" },
  ];

  return (
    <section className="border-b border-slate-200/90 bg-white">
      <div className="flex h-0.5 w-full" aria-hidden>
        {VENDOR_NEWS_TABS.map((tab) => (
          <span
            key={tab.id}
            className="min-w-0 flex-1"
            style={{ backgroundColor: VENDOR_NEWS_BRAND_COLORS[tab.id] }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-6 pt-5 sm:px-6 sm:pb-7">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Intelligence snapshot
          </p>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-[#1B224B] sm:text-xl">
            Vendor snapshot
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {filterLabel} · updated from live RSS
          </p>
        </header>

        <div className="mt-4 border-t border-slate-200/90 pt-4">
          <NewsFilterBar activeVendor={activeVendor} activeType={activeType} />
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
                className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-4"
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
