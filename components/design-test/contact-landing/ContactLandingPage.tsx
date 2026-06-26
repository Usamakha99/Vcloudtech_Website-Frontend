"use client";

import { Fragment, type FormEvent, useState } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import {
  designTestContactInfo,
  designTestInquiryTypes,
} from "@/lib/design-test/contact-options";
import { designTestFooterLocations } from "@/lib/design-test/footer-content";

import "../design-test-closing-sections.css";
import "./contact-landing.css";

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="contact-landing__pin">
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

type OfficeLinkProps = {
  country?: string;
  region: string;
  lines: readonly string[];
  mapsUrl: string;
  ariaLabel: string;
};

function OfficeLink({ country, region, lines, mapsUrl, ariaLabel }: OfficeLinkProps) {
  return (
    <a
      href={mapsUrl}
      className="contact-landing__office-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {country ? <span className="contact-landing__office-country">{country}</span> : null}
      <span className="contact-landing__office-region">{region}</span>
      <span className="contact-landing__office-body">
        <LocationPinIcon />
        <span className="contact-landing__office-address">
          {lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </span>
      </span>
    </a>
  );
}

/** Dedicated contact landing page — hero, form, offices (not homepage section). */
export function ContactLandingPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-landing">
      <header className="contact-landing__hero">
        <p className={dt.badge}>Contact</p>
        <h1 className="contact-landing__title">Talk to an expert</h1>
        <p className={`contact-landing__lede ${dt.body}`}>
          Share your priorities, timelines, and compliance context. Our solutions team will route
          your inquiry to the right specialists.
        </p>
      </header>

      <div className="contact-landing__layout">
        <div className="contact-landing__form-wrap">
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
        </div>

        <aside className="contact-landing__aside" aria-label="Contact information">
          <div className="contact-landing__info-card">
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

            <p className={`contact-landing__note ${dt.body}`}>
              Typical response time is one business day. For urgent procurement or security matters,
              note that in your message subject line.
            </p>
          </div>

          <div className="contact-landing__offices">
            <p className="contact-landing__offices-title">Our offices</p>
            <OfficeLink
              country={designTestFooterLocations.headquarters.country}
              region={designTestFooterLocations.headquarters.region}
              lines={designTestFooterLocations.headquarters.lines}
              mapsUrl={designTestFooterLocations.headquarters.mapsUrl}
              ariaLabel={designTestFooterLocations.headquarters.ariaLabel}
            />
            <span className="contact-landing__office-divider" aria-hidden />
            <OfficeLink
              region={designTestFooterLocations.office.region}
              lines={designTestFooterLocations.office.lines}
              mapsUrl={designTestFooterLocations.office.mapsUrl}
              ariaLabel={designTestFooterLocations.office.ariaLabel}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
