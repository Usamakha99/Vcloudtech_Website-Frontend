// import { ContractVehiclesGrid } from "@/components/marketing/ContractVehiclesGrid";
import { ContractVehiclesStackGrid } from "@/components/marketing/ContractVehiclesStackGrid";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import {
  contractsPageCorporate,
  contractsPageHero,
} from "@/lib/marketing/contracts-page-content";

import "@/components/marketing/marketing-page-hero.css";
import "./contracts-landing.css";

/** Contracts landing page — hero + corporate contracts stack. */
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
          className="contracts-page__corporate contracts-page__corporate--heading-only"
          aria-labelledby="contracts-corporate-heading"
        >
          <header className="contracts-page__corporate-header">
            <h2 id="contracts-corporate-heading" className="contracts-page__corporate-title">
              {contractsPageCorporate.title}
            </h2>
          </header>

          {/* First grid — commented out; heading only */}
          {/* <ContractVehiclesGrid href="/contact" /> */}
        </section>

        {/* Browse by stack */}
        <section
          className="contracts-page__corporate contracts-page__corporate--stack"
          aria-label="Contract vehicles"
        >
          <ContractVehiclesStackGrid href="/contact" />
        </section>
      </div>
    </div>
  );
}
