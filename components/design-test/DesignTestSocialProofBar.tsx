import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";
import {
  partnerLogoDimensions,
  strategicPartnerLogos,
} from "@/lib/design-test/partner-logos";

import "./technology-partners.css";

function StrategicPartnerMarquee() {
  const marqueeLogos = [...strategicPartnerLogos, ...strategicPartnerLogos];

  return (
    <div className="tp__trusted-strip-white">
      <div className="tp__trusted-strip-marquee">
        <span className="tp__trusted-strip-fade tp__trusted-strip-fade--left" aria-hidden />
        <span className="tp__trusted-strip-fade tp__trusted-strip-fade--right" aria-hidden />

        <ul className="tp__trusted-strip-track">
          {marqueeLogos.map((partner, index) => (
            <li key={`${partner.src}-${index}`} className="tp__trusted-strip-logo-box">
              <Image
                src={partner.src}
                alt={partner.name}
                {...partnerLogoDimensions(partner.name)}
                className={`tp__trusted-strip-logo${
                  partner.name === "Microsoft" ? " tp__trusted-strip-logo--microsoft" : ""
                }`}
                sizes="(max-width: 640px) 160px, 220px"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Strategic partners — dark heading + full-width white marquee (trusted-clients strip sizing). */
export function DesignTestSocialProofBar({ belowHero = false }: { belowHero?: boolean }) {
  if (belowHero) {
    return (
      <section className="relative z-30 tp__trusted-strip" aria-labelledby="strategic-partners-heading">
        <header className="tp__trusted-strip-header border-b border-white/10 bg-[#041329]">
          <h2 id="strategic-partners-heading" className={`${dt.sectionHeadline} text-white`}>
            Strategic{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Partners
            </span>
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
