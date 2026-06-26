"use client";

import { type FormEvent, useState } from "react";

import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";
import { dt } from "@/components/design-test/design-test-theme";
import { designTestInquiryTypes } from "@/lib/design-test/contact-options";

import "./design-test-closing-sections.css";

/** Contact Us — intro left, form right. */
export function ContactUsSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

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
              Contact us
            </h2>
            <p className="dt-contact__lede dt-contact__lede--prominent">
              Tell us about your environment, timeline, and priorities and our solutions team will
              route your inquiry to the right specialists.
            </p>
          </DtScrollReveal>

          <DtScrollReveal delay={0.08} className="dt-contact__form-wrap">
            <div className="dt-contact__form-panel dt-contact__form-panel--minimal">
              {submitted ? (
                <div className="dt-contact__success" role="status">
                  <p className="dt-contact__success-title">Message received</p>
                  <p className={`dt-contact__success-text ${dt.body}`}>
                    Thank you for reaching out. A member of our team will respond within one business
                    day.
                  </p>
                </div>
              ) : (
                <form className="dt-contact__form" onSubmit={handleSubmit} noValidate>
                  <div className="dt-contact__field">
                    <label htmlFor="contact-name" className="dt-contact__label">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="dt-contact__input"
                    />
                  </div>

                  <div className="dt-contact__field">
                    <label htmlFor="contact-email" className="dt-contact__label">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="dt-contact__input"
                    />
                  </div>

                  <div className="dt-contact__field">
                    <label htmlFor="contact-inquiry" className="dt-contact__label">
                      Inquiry Type
                    </label>
                    <div className="dt-contact__select-wrap">
                      <select
                        id="contact-inquiry"
                        name="inquiryType"
                        required
                        className="dt-contact__select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an inquiry type
                        </option>
                        {designTestInquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="dt-contact__field">
                    <label htmlFor="contact-message" className="dt-contact__label">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      className="dt-contact__textarea"
                    />
                  </div>

                  <button type="submit" className="dt-contact__submit">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </DtScrollReveal>
        </div>
      </div>
    </section>
  );
}
