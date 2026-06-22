import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";
import { dt, dtCta } from "@/components/design-test/design-test-theme";

import "./design-test-closing-sections.css";

const EXPERT_SPARKS = [
  { left: "5%", top: "12%", variant: 1, delay: 0 },
  { left: "14%", top: "68%", variant: 4, delay: 0.35 },
  { left: "22%", top: "28%", variant: 2, delay: 1.1 },
  { left: "31%", top: "82%", variant: 5, delay: 0.7 },
  { left: "38%", top: "16%", variant: 3, delay: 1.8 },
  { left: "48%", top: "74%", variant: 6, delay: 0.2 },
  { left: "56%", top: "22%", variant: 1, delay: 2.4 },
  { left: "63%", top: "58%", variant: 4, delay: 1.4 },
  { left: "71%", top: "10%", variant: 2, delay: 0.9 },
  { left: "79%", top: "44%", variant: 5, delay: 2.1 },
  { left: "86%", top: "78%", variant: 3, delay: 0.55 },
  { left: "92%", top: "24%", variant: 6, delay: 1.65 },
  { left: "8%", top: "42%", variant: 3, delay: 2.8 },
  { left: "26%", top: "52%", variant: 6, delay: 0.15 },
  { left: "44%", top: "38%", variant: 2, delay: 3.1 },
  { left: "68%", top: "86%", variant: 1, delay: 1.25 },
  { left: "84%", top: "56%", variant: 4, delay: 2.55 },
  { left: "52%", top: "8%", variant: 5, delay: 0.85 },
] as const;

/** Pre-footer CTA — meet experts / book a strategy call. */
export function MeetExpertsCtaSection() {
  return (
    <section
      id="meet-experts"
      className={`dt-experts-cta scroll-mt-24 ${dt.sectionBorder}`}
      aria-labelledby="meet-experts-heading"
    >
      <div className="dt-experts-cta__sparks" aria-hidden>
        {EXPERT_SPARKS.map((spark, index) => (
          <span
            key={index}
            className={`dt-experts-cta__spark dt-experts-cta__spark--drift-${spark.variant}`}
            style={{
              left: spark.left,
              top: spark.top,
              animationDelay: `${spark.delay}s`,
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
