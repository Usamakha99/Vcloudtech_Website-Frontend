import { ContractVehiclesGrid } from "@/components/marketing/ContractVehiclesGrid";
import { ContractVehiclesStackGrid } from "@/components/marketing/ContractVehiclesStackGrid";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import {
  contractsPageCorporate,
  contractsPageHero,
} from "@/lib/marketing/contracts-page-content";

import "@/components/marketing/marketing-page-hero.css";
import "./contracts-landing.css";

/** Contracts landing page — hero + corporate contracts vehicle grid. */
export function ContractsLandingPage() {
  return (
    <div className="marketing-page contracts-page" data-nav-surface="dark">
      <MarketingPageHero
        title={contractsPageHero.title}
        lede={contractsPageHero.lede}
        image={contractsPageHero.image}
        imageAlt={contractsPageHero.imageAlt}
        headingId="contracts-page-heading"
      />

      <div className="marketing-page__body contracts-page__body">
        <section
          className="contracts-page__corporate"
          aria-labelledby="contracts-corporate-heading"
        >
          <header className="contracts-page__corporate-header">
            <h2 id="contracts-corporate-heading" className="contracts-page__corporate-title">
              {contractsPageCorporate.title}
            </h2>
          </header>

          <ContractVehiclesGrid href="/contact" />
        </section>

        {/* Alternate multi-card UX — stack scroller (existing grid above stays unchanged) */}
        <section
          className="contracts-page__corporate contracts-page__corporate--stack"
          aria-labelledby="contracts-stack-heading"
        >
          <header className="contracts-page__corporate-header">
            <h2 id="contracts-stack-heading" className="contracts-page__corporate-title">
              Contract vehicles — stack view
            </h2>
            <p className="contracts-page__corporate-desc">
              Open a vehicle with more than one contract to browse cards in a stack scroller.
            </p>
          </header>

          <ContractVehiclesStackGrid href="/contact" />
        </section>
      </div>
    </div>
  );
}
