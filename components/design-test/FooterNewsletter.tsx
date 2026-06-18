"use client";

import { type FormEvent, useState } from "react";

import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";

import "./design-test-closing-sections.css";

/** Newsletter strip above footer links. */
export function FooterNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <DtScrollReveal className="dt-newsletter">
      <div className="dt-newsletter__copy">
        <h2 className="dt-newsletter__headline">Stay Updated with Technology Insights</h2>
        <p className="dt-newsletter__desc">
          Subscribe to receive industry updates, technology trends, and product announcements.
        </p>
      </div>

      {submitted ? (
        <p className="dt-newsletter__success" role="status">
          You&apos;re subscribed. Thank you.
        </p>
      ) : (
        <form className="dt-newsletter__form" onSubmit={handleSubmit}>
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="dt-newsletter__input"
            placeholder="Email address"
          />
          <button type="submit" className="dt-newsletter__submit">
            Subscribe
          </button>
        </form>
      )}
    </DtScrollReveal>
  );
}
