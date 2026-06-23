"use client";

import { type FormEvent, useState } from "react";

import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";
import { dt } from "@/components/design-test/design-test-theme";
import {
  designTestContactInfo,
  designTestInquiryTypes,
} from "@/lib/design-test/contact-options";

import "./design-test-closing-sections.css";

/** Contact Us — enterprise form with optional info panel. */
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
        <DtScrollReveal className="dt-contact__header mx-auto max-w-3xl text-center">
          <p className={dt.badge}>Contact</p>
          <h2 id="contact-heading" className={`${dt.sectionHeadline} mt-5 text-white`}>
            Contact us
          </h2>
          <p className={`dt-contact__lede mt-3 ${dt.body}`}>
            Tell us about your environment, timeline, and priorities — our solutions team will route
            your inquiry to the right specialists.
          </p>
        </DtScrollReveal>

        <div className="dt-contact__layout">
          <DtScrollReveal delay={0.08} className="dt-contact__form-wrap">
            <div className="dt-contact__form-panel">
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
                      rows={5}
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

          <DtScrollReveal delay={0.14} className="dt-contact__aside-wrap">
            <aside className="dt-contact__aside" aria-label="Contact information">
              <ul className="dt-contact__info-list">
                <li className="dt-contact__info-item">
                  <span className="dt-contact__info-label">Email</span>
                  <a
                    href={`mailto:${designTestContactInfo.email}`}
                    className="dt-contact__info-value"
                  >
                    {designTestContactInfo.email}
                  </a>
                </li>
                <li className="dt-contact__info-item">
                  <span className="dt-contact__info-label">Phone</span>
                  <a
                    href={`tel:${designTestContactInfo.phone.replace(/\D/g, "")}`}
                    className="dt-contact__info-value"
                  >
                    {designTestContactInfo.phone}
                  </a>
                </li>
                <li className="dt-contact__info-item">
                  <span className="dt-contact__info-label">Business Hours</span>
                  <span className="dt-contact__info-value dt-contact__info-value--plain">
                    {designTestContactInfo.hours}
                  </span>
                </li>
              </ul>

              <p className={`dt-contact__aside-note ${dt.body}`}>
                Enterprise accounts receive priority routing and a dedicated solutions architect.
              </p>
            </aside>
          </DtScrollReveal>
        </div>
      </div>
    </section>
  );
}
