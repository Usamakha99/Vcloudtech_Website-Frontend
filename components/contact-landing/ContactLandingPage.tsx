"use client";

import Image from "next/image";
import Link from "next/link";

import {
  HandshakeIcon,
  RocketIcon,
  ServerIcon,
  SolutionsIcon,
} from "@/components/icons/section-icons";
import { dt } from "@/components/marketing/design-test-theme";
import { HomeContactForm } from "@/components/home/sections/contact/HomeContactForm";
import {
  contactOfficeLocations,
  contactPageHero,
  contactWhyCards,
} from "@/lib/marketing/contact-page-content";
import "./contact-landing.css";

const whyIcons = {
  experts: ServerIcon,
  partners: HandshakeIcon,
  response: RocketIcon,
  solutions: SolutionsIcon,
} as const;

/** Premium enterprise contact page — hero, form, locations, and why cards. */
export function ContactLandingPage() {
  return (
    <div className="contact-page" data-nav-surface="dark">
      {/* 1. Hero — full-width banner, left copy (reference layout) */}
      <section id="hero" className="contact-page__hero" aria-labelledby="contact-page-heading">
        <div className="contact-page__hero-media" aria-hidden>
          <Image
            src={contactPageHero.image}
            alt=""
            width={1920}
            height={800}
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

            <div className="dt-contact__form-panel contact-page__form-panel dt-contact__form-panel--minimal">
              <HomeContactForm submitClassName="contact-page__submit" />
            </div>
          </div>
        </section>

        {/* 3. Why contact us */}
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
                <div
                  className={`contact-page__location-media contact-page__location-media--${location.id}`}
                  aria-hidden
                >
                  <Image
                    src={location.image}
                    alt=""
                    fill
                    priority={false}
                    className="contact-page__location-media-img"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="contact-page__location-scrim" aria-hidden />
                <div className="contact-page__location-copy">
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
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
