"use client";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { dt } from "@/components/marketing/design-test-theme";

import { HomeContactForm } from "./HomeContactForm";

import "@/components/home/shared/styles/closing-sections.css";

/** Contact Us — intro left, form right. */
export function HomeContactSection() {
  return (
    <section
      id="contact"
      className={`dt-contact scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="contact-heading"
    >
      <div className="dt-contact__inner">
        <div className="dt-contact__layout dt-contact__layout--split dt-contact__split-shell">
          <DtScrollReveal className="dt-contact__intro">
            <p className={`${dt.badge} dt-contact__badge`}>Contact</p>
            <h2 id="contact-heading" className="dt-contact__headline">
              Contact Us
            </h2>
            <p className="dt-contact__lede dt-contact__lede--prominent">
              Tell us about your environment, timeline, and priorities and our solutions team will
              route your inquiry to the right specialists.
            </p>
          </DtScrollReveal>

          <DtScrollReveal delay={0.08} className="dt-contact__form-wrap">
            <div className="dt-contact__form-panel dt-contact__form-panel--minimal">
              <HomeContactForm />
            </div>
          </DtScrollReveal>
        </div>
      </div>
    </section>
  );
}
