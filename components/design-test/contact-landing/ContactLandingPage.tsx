"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import {
  CompassIcon,
  GovernmentIcon,
  HandshakeIcon,
  HeadsetIcon,
  RocketIcon,
  ServerIcon,
  ShieldIcon,
  SolutionsIcon,
} from "@/components/icons/section-icons";
import { dt } from "@/components/design-test/design-test-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  contactFormServices,
  contactInfoCards,
  contactMapEmbed,
  contactOfficeLocations,
  contactPageHero,
  contactWhyCards,
} from "@/lib/design-test/contact-page-content";
import { designTestContactInfo } from "@/lib/design-test/contact-options";

import "@/components/home/shared/styles/closing-sections.css";
import "./contact-landing.css";

const whyIcons = {
  experts: ServerIcon,
  partners: HandshakeIcon,
  response: RocketIcon,
  solutions: SolutionsIcon,
} as const;

const infoIcons = {
  headquarters: GovernmentIcon,
  email: CompassIcon,
  phone: HeadsetIcon,
  hours: ShieldIcon,
} as const;

/** Premium enterprise contact page — hero, form, info, locations, map, and CTAs. */
export function ContactLandingPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page" data-nav-surface="dark">
      {/* 1. Hero — full-width banner, left copy (reference layout) */}
      <section id="hero" className="contact-page__hero" aria-labelledby="contact-page-heading">
        <div className="contact-page__hero-media" aria-hidden>
          <Image
            src={contactPageHero.image}
            alt=""
            fill
            priority
            className="contact-page__hero-image"
            sizes="100vw"
          />
          <div className="contact-page__hero-overlay" />
        </div>

        <div className="contact-page__hero-inner">
          <div className="contact-page__hero-content">
            <h1 id="contact-page-heading" className="contact-page__hero-title">
              {contactPageHero.title}
            </h1>
            <p className="contact-page__hero-lede">{contactPageHero.lede}</p>
            <ButtonLink
              href={contactPageHero.ctaHref}
              variant="ctaWhite"
              className="contact-page__hero-cta"
            >
              {contactPageHero.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="contact-page__body">
        {/* 2. Contact form */}
        <section
          id="contact-form"
          className="contact-page__section contact-page__form-section scroll-mt-28"
          aria-labelledby="contact-form-heading"
        >
          <div className="contact-page__form-layout">
            <header className="contact-page__form-intro">
              <p className={dt.metaLabel}>Get in touch</p>
              <h2 id="contact-form-heading" className="contact-page__section-title">
                Send us a message
              </h2>
              <p className={`${dt.body} contact-page__form-lede`}>
                Complete the form and our solutions team will respond within one business day.
                Enterprise accounts receive priority routing.
              </p>
            </header>

            <div className="dt-contact__form-panel contact-page__form-panel">
              {submitted ? (
                <div className="dt-contact__success" role="status">
                  <p className="dt-contact__success-title">Message received</p>
                  <p className={`dt-contact__success-text ${dt.body}`}>
                    Thank you for reaching out. A member of our team will respond within one
                    business day.
                  </p>
                </div>
              ) : (
                <form className="dt-contact__form contact-page__form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-page__form-row">
                    <div className="dt-contact__field">
                      <label htmlFor="contact-full-name" className="dt-contact__label">
                        Full Name
                      </label>
                      <input
                        id="contact-full-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="dt-contact__input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="dt-contact__field">
                      <label htmlFor="contact-company" className="dt-contact__label">
                        Company Name
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        className="dt-contact__input"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>

                  <div className="contact-page__form-row">
                    <div className="dt-contact__field">
                      <label htmlFor="contact-email" className="dt-contact__label">
                        Business Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="dt-contact__input"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="dt-contact__field">
                      <label htmlFor="contact-phone" className="dt-contact__label">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="dt-contact__input"
                        placeholder="(000) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="contact-page__form-row">
                    <div className="dt-contact__field">
                      <label htmlFor="contact-subject" className="dt-contact__label">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        className="dt-contact__input"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div className="dt-contact__field">
                      <label htmlFor="contact-service" className="dt-contact__label">
                        Service Interested In
                      </label>
                      <div className="dt-contact__select-wrap">
                        <select
                          id="contact-service"
                          name="service"
                          required
                          className="dt-contact__select"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {contactFormServices.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
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
                      placeholder="Tell us about your project, timeline, and requirements..."
                    />
                  </div>

                  <button type="submit" className="dt-contact__submit contact-page__submit">
                    Submit inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 3. Contact information */}
        <section className="contact-page__section" aria-labelledby="contact-info-heading">
          <header className="contact-page__section-header">
            <p className={dt.metaLabel}>Reach us directly</p>
            <h2 id="contact-info-heading" className="contact-page__section-title">
              Contact information
            </h2>
          </header>

          <ul className="contact-page__info-grid">
            {contactInfoCards.map((card) => {
              const Icon = infoIcons[card.id as keyof typeof infoIcons];
              return (
                <li key={card.id} className="contact-page__info-card">
                  <div className="contact-page__info-icon" aria-hidden>
                    <Icon />
                  </div>
                  <h3 className="contact-page__info-title">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="contact-page__info-line">
                      {line}
                    </p>
                  ))}
                  {"subline" in card && card.subline ? (
                    <p className="contact-page__info-subline">{card.subline}</p>
                  ) : null}
                  {"href" in card && card.href ? (
                    <Link href={card.href} className="contact-page__info-link">
                      {card.linkLabel}
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        {/* 4. Office locations */}
        <section className="contact-page__section" aria-labelledby="contact-locations-heading">
          <header className="contact-page__section-header">
            <p className={dt.metaLabel}>Our locations</p>
            <h2 id="contact-locations-heading" className="contact-page__section-title">
              Office locations
            </h2>
          </header>

          <ul className="contact-page__locations-grid">
            {contactOfficeLocations.map((location) => (
              <li key={location.id} className="contact-page__location-card">
                <div className="contact-page__location-icon" aria-hidden>
                  <GovernmentIcon />
                </div>
                <p className="contact-page__location-label">{location.label}</p>
                <h3 className="contact-page__location-region">{location.region}</h3>
                {location.lines.map((line) => (
                  <p key={line} className="contact-page__location-line">
                    {line}
                  </p>
                ))}
                <Link
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page__maps-btn"
                >
                  {location.mapsLabel}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Embedded map */}
        <section className="contact-page__section" aria-label="Map">
          <div className="contact-page__map-wrap">
            <iframe
              title={contactMapEmbed.title}
              src={contactMapEmbed.src}
              className="contact-page__map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* 6. Why contact us */}
        <section className="contact-page__section" aria-labelledby="contact-why-heading">
          <header className="contact-page__section-header contact-page__section-header--center">
            <p className={dt.metaLabel}>Why vCloud Tech</p>
            <h2 id="contact-why-heading" className="contact-page__section-title">
              Why contact us
            </h2>
          </header>

          <ul className="contact-page__why-grid">
            {contactWhyCards.map((card) => {
              const Icon = whyIcons[card.id as keyof typeof whyIcons];
              return (
                <li key={card.id} className="contact-page__why-card">
                  <div className="contact-page__why-icon" aria-hidden>
                    <Icon />
                  </div>
                  <h3 className="contact-page__why-title">{card.title}</h3>
                  <p className="contact-page__why-desc">{card.description}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 7. Final CTA */}
        <section className="contact-page__cta" aria-labelledby="contact-final-cta-heading">
          <div className="contact-page__cta-inner">
            <h2 id="contact-final-cta-heading" className="contact-page__cta-title">
              Ready to Transform Your IT Infrastructure?
            </h2>
            <p className="contact-page__cta-lede">
              Speak with our enterprise team about AI infrastructure, procurement, and managed
              technology programs tailored to your organization.
            </p>
            <div className="contact-page__cta-actions">
              <ButtonLink href="#contact-form" variant="ctaWhite" className="contact-page__btn-primary">
                Schedule Consultation
              </ButtonLink>
              <ButtonLink
                href={`mailto:${designTestContactInfo.email}`}
                variant="outlineOnNavy"
                className="contact-page__btn-secondary"
              >
                Contact Our Team
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
