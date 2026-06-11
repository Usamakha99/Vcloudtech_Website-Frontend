import Link from "next/link";

import { dt, dtCta } from "@/components/design-test/design-test-theme";
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
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
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
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#E55614]/12 blur-3xl"
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

              <p className={`mt-5 ${dt.metaLabel}`}>
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

              <div className="mt-7 flex justify-center border-t border-white/10 pt-6 sm:pt-7 lg:justify-start">
                <Link
                  href="/procurement"
                  className={`inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-sm transition duration-300 sm:w-auto sm:max-w-none sm:px-8 ${dtCta.bg} ${dtCta.bgHover}`}
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
    <div className={dt.procurementMock}>
      <div className={dt.procurementSearch} aria-hidden>
        <SearchIcon />
        <span className="truncate text-sm text-[#A1A1AA]">Search products, brands, or categories…</span>
      </div>
      <p className={`mt-3 text-[11px] leading-relaxed ${dt.body}`}>
        Demo preview — live search connects to your procurement catalog on the platform.
      </p>
    </div>
  );
}

function CapabilityChip({ item }: { item: (typeof capabilities)[number] }) {
  return (
    <div className={dt.procurementChip}>
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#E55614]" aria-hidden />
      <div className="min-w-0">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-xs ${dt.heading}`}>
          {item.label}
        </p>
        <p className={`mt-1 text-[11px] leading-relaxed ${dt.body}`}>{item.detail}</p>
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
      className="h-4 w-4 shrink-0 text-[#A1A1AA]"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
