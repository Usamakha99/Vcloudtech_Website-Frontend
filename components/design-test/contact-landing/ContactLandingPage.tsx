"use client";

import { type FormEvent, useState } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import { designTestInquiryTypes } from "@/lib/design-test/contact-options";

import "@/components/home/shared/styles/closing-sections.css";
import "./contact-landing.css";

/** Dedicated contact landing page — intro left, form right. */
export function ContactLandingPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-landing">
      <div className="contact-landing__split dt-contact__split-shell">
        <header className="contact-landing__intro">
          <p className={`${dt.badge} dt-contact__badge`}>Contact</p>
          <h1 className="dt-contact__headline contact-landing__title">Talk to an expert</h1>
          <p className="dt-contact__lede dt-contact__lede--prominent contact-landing__lede">
            Share your priorities, timelines, and compliance context. Our solutions team will route
            your inquiry to the right specialists.
          </p>
        </header>

        <div className="contact-landing__form-wrap">
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
                  <label htmlFor="landing-contact-name" className="dt-contact__label">
                    Full Name
                  </label>
                  <input
                    id="landing-contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="dt-contact__input"
                  />
                </div>

                <div className="dt-contact__field">
                  <label htmlFor="landing-contact-email" className="dt-contact__label">
                    Email Address
                  </label>
                  <input
                    id="landing-contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="dt-contact__input"
                  />
                </div>

                <div className="dt-contact__field">
                  <label htmlFor="landing-contact-inquiry" className="dt-contact__label">
                    Inquiry Type
                  </label>
                  <div className="dt-contact__select-wrap">
                    <select
                      id="landing-contact-inquiry"
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
                  <label htmlFor="landing-contact-message" className="dt-contact__label">
                    Message
                  </label>
                  <textarea
                    id="landing-contact-message"
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
        </div>
      </div>
    </div>
  );
}
