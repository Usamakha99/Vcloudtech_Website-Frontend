import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import {
  contractHolderVisualClass,
  topContractHolderItems,
} from "@/lib/marketing/top-contract-holders";

import "../partners/technology-partners.css";
import "./top-contracts.css";

/** Top performing contracts holder — five logo cards after Solutions. */
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
            Top Performing Contracts
          </h2>
        </header>

        <ul className="tc__logos tp__partner-grid tp__partner-grid--all">
          {topContractHolderItems.map((item) => (
            <li key={item.id}>
              <Link href="/contracts" className="tc__logo-link">
                <div className="tp__partner-cell">
                  <div className="tp__partner-logo-slot">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 42vw, 20vw"
                      className={`tp__partner-logo ${contractHolderVisualClass(item.id)}`}
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

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
