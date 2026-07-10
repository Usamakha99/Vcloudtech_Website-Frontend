import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { partnerLogoVisualClass, partnerLogos } from "@/lib/marketing/partner-logos";
import {
  partnersPageHero,
  partnersPageIntro,
} from "@/lib/marketing/partners-page-content";

import "@/components/home/sections/partners/technology-partners.css";
import "@/components/marketing/marketing-page-hero.css";
import "./partners-landing.css";

/** Partners landing page — hero, intro, and major partners grid (same as homepage). */
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
        <section
          className="marketing-page__section partners-page__intro"
          aria-labelledby="partners-intro-heading"
        >
          <header className="partners-page__intro-header">
            <p className={dt.metaLabel}>{partnersPageIntro.badge}</p>
            <h2 id="partners-intro-heading" className="partners-page__intro-title">
              {partnersPageIntro.titleLead} {partnersPageIntro.titleAccent}
            </h2>
            <p className="partners-page__intro-lede">{partnersPageIntro.lede}</p>
            <Link href={partnersPageIntro.ctaHref} className="marketing-page__cta">
              {partnersPageIntro.ctaLabel}
            </Link>
          </header>
        </section>

        <section
          className="tp__partners-showcase-wrap partners-page__major relative z-10"
          aria-labelledby="partners-major-heading"
        >
          <div className="tp__subsection-inner tp__subsection-inner--major">
            <h3 id="partners-major-heading" className="tp__trusted-heading">
              Major Partners
            </h3>
            <ul className="tp__partner-grid tp__partner-grid--all" data-nav-surface="light">
              {partnerLogos.map((partner) => (
                <li key={partner.name}>
                  <div className="tp__partner-cell group">
                    <div className="tp__partner-logo-slot">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        unoptimized={partner.name === "HP"}
                        className={`tp__partner-logo ${partnerLogoVisualClass(partner.name)}`.trim()}
                        sizes="(max-width: 640px) 124px, 152px"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="tp__major-partners-footer">
              <Link href="/contact" className="tp__cta">
                Become a Partner
                <span className="tp__cta-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
