import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { partnerLogoVisualClass, partnerLogos } from "@/lib/marketing/partner-logos";
import {
  partnersPageHero,
  partnersPageIntro,
} from "@/lib/marketing/partners-page-content";

import "@/components/marketing/marketing-page-hero.css";
import "./partners-landing.css";

/** Partners landing page — hero, intro, and major technology partner logos. */
export function PartnersLandingPage() {
  return (
    <div className="marketing-page partners-page" data-nav-surface="dark">
      <MarketingPageHero
        title={partnersPageHero.title}
        lede={partnersPageHero.lede}
        image={partnersPageHero.image}
        imageAlt={partnersPageHero.imageAlt}
        headingId="partners-page-heading"
      />

      <div className="marketing-page__body">
        <section className="marketing-page__section" aria-labelledby="partners-intro-heading">
          <header className="marketing-page__section-header">
            <p className={dt.metaLabel}>{partnersPageIntro.badge}</p>
            <h2 id="partners-intro-heading" className="marketing-page__section-title">
              {partnersPageIntro.title}
            </h2>
            <p className="marketing-page__section-lede">{partnersPageIntro.lede}</p>
            <Link href={partnersPageIntro.ctaHref} className="marketing-page__cta">
              {partnersPageIntro.ctaLabel}
            </Link>
          </header>
        </section>

        <section className="partners-page__logos" aria-label="Major technology partners">
          <ul className="partners-page__logos-grid">
            {partnerLogos.map((partner) => (
              <li key={partner.name} className="partners-page__logo-cell">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className={`partners-page__logo ${partnerLogoVisualClass(partner.name)}`}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
