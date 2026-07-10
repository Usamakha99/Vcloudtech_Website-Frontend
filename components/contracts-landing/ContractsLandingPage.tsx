import Link from "next/link";

import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import {
  contractsPageCorporate,
  contractsPageHero,
  contractsPageVehicles,
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
            <p className="contracts-page__corporate-desc">{contractsPageCorporate.description}</p>
          </header>

          <ul className="contracts-page__vehicles" aria-label="Contract vehicles">
            {contractsPageVehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <Link href={vehicle.href} className="contracts-page__vehicle">
                  {vehicle.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
