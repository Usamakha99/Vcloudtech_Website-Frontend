import Link from "next/link";

import { DesignTestCredentialsStrip } from "@/components/home/sections/about/CredentialsStrip";
import { dt } from "@/components/marketing/design-test-theme";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import {
  contractsPageHero,
  contractsPageIntro,
} from "@/lib/marketing/contracts-page-content";

import "@/components/marketing/marketing-page-hero.css";
import "./contracts-landing.css";

/** Contracts landing page — hero, procurement intro, and credential vehicles. */
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

      <div className="marketing-page__body">
        <section className="marketing-page__section" aria-labelledby="contracts-intro-heading">
          <header className="marketing-page__section-header">
            <p className={dt.metaLabel}>{contractsPageIntro.badge}</p>
            <h2 id="contracts-intro-heading" className="marketing-page__section-title">
              {contractsPageIntro.title}
            </h2>
            <p className="marketing-page__section-lede">{contractsPageIntro.lede}</p>
            <Link href={contractsPageIntro.ctaHref} className="marketing-page__cta">
              {contractsPageIntro.ctaLabel}
            </Link>
          </header>
        </section>

        <section className="contracts-page__credentials" aria-label="Certifications and contract vehicles">
          <DesignTestCredentialsStrip embedded />
        </section>
      </div>
    </div>
  );
}
