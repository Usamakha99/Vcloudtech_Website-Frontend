import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";
import { partnerLogoStripClass, partnerLogos } from "@/lib/design-test/partner-logos";

import "./technology-partners.css";

function StrategicPartnerLogoItems({ idPrefix }: { idPrefix: string }) {
  return partnerLogos.map((partner) => (
    <li key={`${idPrefix}-${partner.src}`} className="tp__trusted-strip-logo-box tp__trusted-strip-logo-box--equal">
      <div className="tp__strategic-strip-slot">
        <Image
          src={partner.src}
          alt={partner.name}
          fill
          className={`tp__strategic-strip-logo ${partnerLogoStripClass(partner.name)}`.trim()}
          sizes="(max-width: 640px) 160px, 200px"
        />
      </div>
    </li>
  ));
}

function StrategicPartnerMarquee() {
  return (
    <div className="tp__trusted-strip-white">
      <div className="tp__trusted-strip-marquee tp__trusted-strip-marquee--strategic">
        <span className="tp__trusted-strip-fade tp__trusted-strip-fade--left" aria-hidden />
        <span className="tp__trusted-strip-fade tp__trusted-strip-fade--right" aria-hidden />

        <div className="tp__strategic-marquee-group">
          <ul className="tp__trusted-strip-track tp__trusted-strip-track--static">
            <StrategicPartnerLogoItems idPrefix="a" />
          </ul>
          <ul className="tp__trusted-strip-track tp__trusted-strip-track--static" aria-hidden>
            <StrategicPartnerLogoItems idPrefix="b" />
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Strategic partners — dark heading + full-width white marquee (trusted-clients strip sizing). */
export function DesignTestSocialProofBar({ belowHero = false }: { belowHero?: boolean }) {
  if (belowHero) {
    return (
      <section
        className="relative z-30 tp__trusted-strip tp__trusted-strip--below-hero"
        aria-labelledby="strategic-partners-heading"
      >
        <header className="tp__trusted-strip-header">
          <h2 id="strategic-partners-heading" className={`${dt.sectionHeadline} text-white`}>
            Strategic Partners
          </h2>
        </header>

        <StrategicPartnerMarquee />
      </section>
    );
  }

  return (
    <section
      className="relative z-30 mb-6 border-b border-t border-white/10 bg-[#041329] sm:mb-8"
      aria-label="Technology partners"
    >
      <StrategicPartnerMarquee />
    </section>
  );
}
