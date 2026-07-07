"use client";

import { type FormEvent, useState } from "react";

import { blogLanding } from "@/lib/blog/types";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="blog-newsletter" aria-labelledby="blog-newsletter-heading">
      <div className="blog-container">
        <div className="blog-newsletter__panel">
          <div className="blog-newsletter__copy">
            <h2 id="blog-newsletter-heading" className="blog-newsletter__title">
              {blogLanding.newsletter.title}
            </h2>
            <p className="blog-newsletter__desc">{blogLanding.newsletter.description}</p>
          </div>

          {submitted ? (
            <p className="blog-newsletter__success" role="status">
              Thank you for subscribing. We&apos;ll be in touch soon.
            </p>
          ) : (
            <form className="blog-newsletter__form" onSubmit={handleSubmit}>
              <label className="blog-newsletter__field">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="blog-newsletter__input"
                />
              </label>
              <button type="submit" className="blog-btn blog-btn--primary">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
