import Link from "next/link";

import { ContractVehiclesGrid } from "@/components/marketing/ContractVehiclesGrid";
import { dt } from "@/components/marketing/design-test-theme";

import "./top-contracts.css";

/** Top performing contracts holder — vehicle chips after Solutions. */
export function HomeTopContractsSection() {
  return (
    <section
      id="contracts"
      className={`tc relative z-10 scroll-mt-24 py-16 sm:py-20 lg:py-24 ${dt.sectionBorder}`}
      aria-labelledby="top-contracts-heading"
    >
      <div className="tc__glow" aria-hidden />

      <div className="tc__inner">
        <header className="tc__header">
          <p className={dt.badge}>Contracts</p>
          <h2 id="top-contracts-heading" className="tc__heading">
            Top Performing Contracts Holder
          </h2>
        </header>

        <ContractVehiclesGrid href="/contact" />

        <div className="tc__footer">
          <Link href="/contracts" className="tc__cta">
            View all contracts
            <span className="tc__cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
