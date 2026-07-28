import Image from "next/image";
import Link from "next/link";

import {
  nhEnterpriseAi,
  nhGlobal,
  nhGovernment,
  nhHero,
  nhIndustries,
  nhPartnersStrip,
  nhResources,
  nhSolutions,
  nhSuccess,
} from "@/lib/marketing/new-homepage-content";

function ArrowIcon() {
  return (
    <span aria-hidden className="inline-block translate-y-px">
      →
    </span>
  );
}

function SolutionIcon({ id, className = "nh-solutions__icon" }: { id: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    className,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "ai":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.5A3.5 3.5 0 0 0 7 18Z" />
        </svg>
      );
    case "cyber":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "infra":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="6" rx="1.2" />
          <rect x="4" y="14" width="16" height="6" rx="1.2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="1.5" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
  }
}

function IndustryIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    width: 22,
    height: 22,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "government":
      return (
        <svg {...common}>
          <path d="M4 20h16M6 20V10l6-4 6 4v10M9 20v-4h6v4" />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path d="M3 9l9-4 9 4-9 4L3 9Zm2 3v5l7 3 7-3v-5" />
        </svg>
      );
    case "healthcare":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
        </svg>
      );
    case "financial":
      return (
        <svg {...common}>
          <path d="M4 19h16M7 16V9m5 7V6m5 10v-4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 20h16M6 20V8l6-3 6 3v12M10 20v-5h4v5" />
        </svg>
      );
  }
}

export function NhHeroSection() {
  return (
    <section className="nh-hero" aria-labelledby="nh-hero-heading" data-nav-surface="dark">
      <div className="nh-hero__media" aria-hidden>
        <Image src={nhHero.image} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="nh-hero__scrim" aria-hidden />

      <div className="nh-hero__inner">
        <div>
          <h1 id="nh-hero-heading" className="nh-hero__title">
            {nhHero.title}
          </h1>
          <ul className="nh-hero__tags">
            {nhHero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="nh-hero__lede">{nhHero.lede}</p>
          <div className="nh-hero__actions">
            <Link href={nhHero.primaryCta.href} className="nh__btn nh__btn--primary">
              {nhHero.primaryCta.label} <ArrowIcon />
            </Link>
            <Link href={nhHero.secondaryCta.href} className="nh__btn nh__btn--ghost">
              {nhHero.secondaryCta.label} <ArrowIcon />
            </Link>
          </div>
        </div>

        <aside className="nh-hero__creds" aria-label="Credentials and partners">
          <p className="nh-hero__creds-label">Trusted credentials</p>
          <ul className="nh-hero__logos">
            {nhHero.credentials.map((item) => (
              <li key={item.label} className="nh-hero__logo">
                <Image src={item.src} alt={item.label} width={120} height={40} unoptimized />
              </li>
            ))}
          </ul>
          <ul className="nh-hero__certs">
            {nhHero.certLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function NhPartnersSection() {
  return (
    <section className="nh-partners" aria-labelledby="nh-partners-heading">
      <div className="nh__container">
        <div className="nh-partners__head">
          <h2 id="nh-partners-heading" className="nh-partners__title">
            {nhPartnersStrip.heading}
          </h2>
        </div>
        <div className="nh-partners__row">
          <ul className="nh-partners__logos">
            {nhPartnersStrip.logos.map((logo) => (
              <li key={logo.name}>
                <Image src={logo.src} alt={logo.name} width={120} height={40} unoptimized />
              </li>
            ))}
          </ul>
          <Link href={nhPartnersStrip.cta.href} className="nh__text-link">
            {nhPartnersStrip.cta.label} <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NhSolutionsSection() {
  return (
    <section className="nh__section" aria-labelledby="nh-solutions-heading">
      <div className="nh__container">
        <header className="nh__section-head">
          <h2 id="nh-solutions-heading" className="nh__section-title">
            {nhSolutions.heading}
          </h2>
        </header>
        <ul className="nh-solutions__grid">
          {nhSolutions.items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="nh-solutions__card">
                <div className="nh-solutions__media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="nh-solutions__body">
                  <SolutionIcon id={item.id} />
                  <h3 className="nh-solutions__name">{item.title}</h3>
                  <p className="nh-solutions__desc">{item.description}</p>
                  <span className="nh-solutions__more">
                    Learn more <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={nhSolutions.cta.href} className="nh__text-link nh__text-link--center">
          {nhSolutions.cta.label} <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

export function NhIndustriesSection() {
  return (
    <section className="nh__section nh__section--alt" aria-labelledby="nh-industries-heading">
      <div className="nh__container">
        <header className="nh__section-head">
          <h2 id="nh-industries-heading" className="nh__section-title">
            {nhIndustries.heading}
          </h2>
        </header>
        <ul className="nh-industries__list">
          {nhIndustries.items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="nh-industries__item">
                <span className="nh-industries__icon">
                  <IndustryIcon id={item.id} />
                </span>
                <span className="nh-industries__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NhGovernmentSection() {
  return (
    <section aria-labelledby="nh-gov-heading">
      <div className="nh-gov">
        <div className="nh-gov__media">
          <Image
            src={nhGovernment.image}
            alt={nhGovernment.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="nh-gov__copy">
          <p className="nh-gov__eyebrow">{nhGovernment.eyebrow}</p>
          <h2 id="nh-gov-heading" className="nh-gov__title">
            {nhGovernment.title}
          </h2>
          <p className="nh-gov__lede">{nhGovernment.lede}</p>
          <ul className="nh-gov__segments">
            {nhGovernment.segments.map((segment) => (
              <li key={segment.id} className="nh-gov__segment">
                <span className="nh-gov__segment-icon">
                  <IndustryIcon id="government" />
                </span>
                <span>{segment.label}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "1.35rem" }}>
            <Link href={nhGovernment.href} className="nh__text-link">
              Explore government solutions <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NhEnterpriseAiSection() {
  return (
    <section className="nh-ai" aria-labelledby="nh-ai-heading" data-nav-surface="dark">
      <div className="nh-ai__inner">
        <div>
          <h2 id="nh-ai-heading" className="nh-ai__title">
            {nhEnterpriseAi.title}
          </h2>
          <p className="nh-ai__lede">{nhEnterpriseAi.lede}</p>
          <Link href={nhEnterpriseAi.href} className="nh-ai__link">
            {nhEnterpriseAi.linkLabel} <ArrowIcon />
          </Link>
        </div>
        <ul className="nh-ai__caps">
          {nhEnterpriseAi.capabilities.map((cap) => (
            <li key={cap.id} className="nh-ai__cap">
              <SolutionIcon id="ai" className="nh-ai__cap-icon" />
              <span>{cap.label}</span>
            </li>
          ))}
          <li className="nh-ai__badge" aria-label={nhEnterpriseAi.badge}>
            {nhEnterpriseAi.badge}
          </li>
        </ul>
      </div>
    </section>
  );
}

export function NhSuccessSection() {
  return (
    <section className="nh__section" aria-labelledby="nh-success-heading">
      <div className="nh__container">
        <header className="nh__section-head nh__section-head--row">
          <h2 id="nh-success-heading" className="nh__section-title">
            {nhSuccess.heading}
          </h2>
          <Link href={nhSuccess.cta.href} className="nh__text-link">
            {nhSuccess.cta.label} <ArrowIcon />
          </Link>
        </header>

        <div className="nh-success__grid">
          {nhSuccess.stories.map((story) => (
            <Link key={story.id} href={story.href} className="nh-success__card">
              <div className="nh-success__media">
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="nh-success__body">
                <h3 className="nh-success__name">{story.title}</h3>
                <p className="nh-success__result">{story.result}</p>
                <span className="nh__text-link">
                  View case study <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}

          <blockquote className="nh-success__quote">
            <span className="nh-success__mark" aria-hidden>
              “
            </span>
            <p className="nh-success__quote-text">{nhSuccess.quote.text}</p>
            <footer className="nh-success__quote-meta">
              <strong>{nhSuccess.quote.name}</strong>
              {nhSuccess.quote.role}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function NhResourcesSection() {
  return (
    <section className="nh__section nh__section--alt" aria-labelledby="nh-resources-heading">
      <div className="nh__container">
        <header className="nh__section-head nh__section-head--row">
          <h2 id="nh-resources-heading" className="nh__section-title">
            {nhResources.heading}
          </h2>
        </header>

        <ul className="nh-resources__tabs" aria-label="Resource types">
          {nhResources.tabs.map((tab, index) => (
            <li key={tab}>
              <span className={`nh-resources__tab${index === 0 ? " is-active" : ""}`}>{tab}</span>
            </li>
          ))}
        </ul>

        <ul className="nh-resources__grid">
          {nhResources.items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="nh-resources__card">
                <div className="nh-resources__media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="nh-resources__body">
                  <span className={`nh-resources__tag nh-resources__tag--${item.tagTone}`}>
                    {item.tag}
                  </span>
                  <h3 className="nh-resources__name">{item.title}</h3>
                  <p className="nh-resources__desc">{item.description}</p>
                  <span className="nh__text-link">
                    {item.action} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NhGlobalSection() {
  return (
    <section className="nh-global" aria-labelledby="nh-global-heading" data-nav-surface="dark">
      <div className="nh-global__inner">
        <div>
          <h2 id="nh-global-heading" className="nh-global__title">
            {nhGlobal.heading}
          </h2>
          <p className="nh-global__lede">{nhGlobal.lede}</p>
          <ul className="nh-global__locations">
            {nhGlobal.locations.map((location) => (
              <li key={location.id} className="nh-global__location">
                <div className="nh-global__location-media">
                  <Image
                    src={location.image}
                    alt=""
                    fill
                    sizes="(max-width: 960px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <p>{location.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul className="nh-global__stats">
          {nhGlobal.stats.map((stat) => (
            <li key={stat.label} className="nh-global__stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
