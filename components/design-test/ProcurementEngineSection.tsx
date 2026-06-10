import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import { CartIcon } from "@/components/icons/section-icons";

const capabilities = [
  { label: "Product search bar", detail: "Search catalog SKUs in seconds" },
  { label: "Filter by brand / category", detail: "Narrow results with precision" },
  { label: "Request a quote form", detail: "Structured RFQs in one flow" },
  { label: "Compare vendors", detail: "Side-by-side vendor options" },
  { label: "Real-time availability", detail: "Live stock and lead-time signals" },
] as const;

/** Procurement engine — explained differentiator with search-led layout. */
export function ProcurementEngineSection() {
  return (
    <section
      id="procurement-engine"
      className={`scroll-mt-24 py-14 sm:py-16 ${dt.sectionBorder}`}
      aria-labelledby="procurement-engine-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Procurement engine</p>
          <h2
            id="procurement-engine-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Core differentiator
          </h2>
          <p className={`mt-3 text-balance text-sm leading-relaxed sm:text-[15px] ${dt.headingSub}`}>
            One platform to search, filter, and quote enterprise IT — built for teams that need speed,
            visibility, and accountable sourcing.
          </p>
        </header>

        <div className={`relative mt-8 overflow-hidden sm:mt-10 ${dt.socialProofPanel}`}>
          <span
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/12 blur-3xl"
            aria-hidden
          />
          <span className={dt.cardTopLine} aria-hidden />

          <div className="relative grid gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-9 lg:grid-cols-5 lg:items-start lg:gap-10 lg:px-10">
            <div className="min-w-0 lg:col-span-2">
              <div className={dt.iconBoxCard}>
                <CartIcon />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-white">Why it matters</h3>
              <p className={`mt-3 text-sm leading-[1.75] ${dt.body}`}>
                Procurement should not mean scattered emails, outdated spreadsheets, and slow quote cycles.
                Our engine keeps product discovery, vendor comparison, and quote requests in one guided
                workflow.
              </p>
              <p className={`mt-4 text-sm leading-[1.75] ${dt.headingSub}`}>
                Less friction for buyers. Clearer paths for approvers. Faster decisions for IT leaders.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-3">
              <ProcurementSearchMock />

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-400/75">
                Platform capabilities
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {capabilities.map((item) => (
                  <li
                    key={item.label}
                    className={item.label === "Real-time availability" ? "sm:col-span-2" : undefined}
                  >
                    <CapabilityChip item={item} />
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex justify-center border-t border-orange-500/10 pt-6 sm:pt-7 lg:justify-start">
                <Link
                  href="/procurement"
                  className="inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/15 px-6 text-sm font-semibold text-orange-100 shadow-[0_8px_24px_-10px_rgba(249,115,22,0.35)] transition duration-300 hover:border-orange-400/55 hover:bg-orange-500/25 hover:text-white sm:w-auto sm:max-w-none sm:px-8"
                >
                  Start procurement
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcurementSearchMock() {
  return (
    <div className="rounded-2xl border border-orange-500/15 bg-black/45 p-4 ring-1 ring-orange-400/10 sm:p-5">
      <div
        className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-black/55 px-4 py-3 ring-1 ring-orange-400/8"
        aria-hidden
      >
        <SearchIcon />
        <span className="truncate text-sm text-orange-100/40">Search products, brands, or categories…</span>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-orange-100/45">
        Demo preview — live search connects to your procurement catalog on the platform.
      </p>
    </div>
  );
}

function CapabilityChip({ item }: { item: (typeof capabilities)[number] }) {
  return (
    <div className="flex h-full items-start gap-3 rounded-xl border border-orange-500/12 bg-black/35 px-3.5 py-3 ring-1 ring-orange-400/8 sm:px-4 sm:py-3.5">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-orange-400/90" aria-hidden />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange-100/80 sm:text-xs">
          {item.label}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-orange-100/45">{item.detail}</p>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0 text-orange-300/70"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
