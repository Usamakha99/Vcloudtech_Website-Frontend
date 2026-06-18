import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";
import { dt, dtCta } from "@/components/design-test/design-test-theme";

import "./design-test-closing-sections.css";

/** Pre-footer CTA — meet experts / book a strategy call. */
export function MeetExpertsCtaSection() {
  return (
    <section
      id="meet-experts"
      className={`dt-experts-cta scroll-mt-24 ${dt.sectionBorder}`}
      aria-labelledby="meet-experts-heading"
    >
      <div className="dt-experts-cta__sparks" aria-hidden>
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="dt-experts-cta__spark"
            style={{
              left: `${8 + ((index * 17) % 84)}%`,
              top: `${12 + ((index * 23) % 76)}%`,
              animationDelay: `${(index % 6) * 0.45}s`,
            }}
          />
        ))}
      </div>

      <div className="dt-experts-cta__glow" aria-hidden />

      <div className="dt-experts-cta__inner">
        <DtScrollReveal className="dt-experts-cta__content">
          <VCloudTechLogoImage variant="light" className="dt-experts-cta__logo mx-auto h-9 w-auto sm:h-10" />

          <h2 id="meet-experts-heading" className={`${dt.sectionHeadline} mt-6 text-white sm:mt-7`}>
            Meet Our Experts
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${dt.body}`}>Schedule Your Free Strategy Call</p>

          <Link
            href="/contact"
            className={`dt-experts-cta__button mt-8 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold text-[#041329] shadow-lg shadow-[#E55614]/25 transition duration-300 ${dtCta.bg} hover:bg-[#f06520] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55614]/60`}
          >
            Book a Free Call
          </Link>
        </DtScrollReveal>
      </div>
    </section>
  );
}
