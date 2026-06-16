import Image from "next/image";
import Link from "next/link";
import { wdt } from "@/components/white-design-test/white-design-test-theme";

import { OrgMetricsRail } from "@/components/white-design-test/OrgMetricsRail";

import "@/components/design-test/about-us-section.css";
import "./white-about-us-section.css";

const INDUSTRIES_SERVE_ICONS = "/Industries We Serve Icons";

const industryServeSectors = [
  {
    name: "Government Agencies",
    detail:
      "Public sector solutions designed to improve efficiency, transparency, and service delivery.",
    image: `${INDUSTRIES_SERVE_ICONS}/1.png`,
    href: "/services",
  },
  {
    name: "Public sector",
    detail:
      "Technology solutions that strengthen communities and improve public service management.",
    image: `${INDUSTRIES_SERVE_ICONS}/2.png`,
    href: "/services",
  },
  {
    name: "Enterprise",
    detail: "Mid-market to global organizations with consolidated spend and managed operations.",
    image: `${INDUSTRIES_SERVE_ICONS}/3.png`,
    href: "/services",
  },
  {
    name: "Industries",
    detail: "Custom IT solutions for industries to streamline operations and drive smart growth.",
    image: `${INDUSTRIES_SERVE_ICONS}/4.png`,
    href: "/services",
  },
  {
    name: "Education",
    detail:
      "Empowering educational institutions with smart technology for better learning outcomes.",
    image: `${INDUSTRIES_SERVE_ICONS}/5.png`,
    href: "/services",
  },
  {
    name: "Healthcare",
    detail:
      "Modern digital solutions for hospitals and clinics to enhance patient care and operational efficiency.",
    image: `${INDUSTRIES_SERVE_ICONS}/6.png`,
    href: "/services",
  },
  {
    name: "Government",
    detail: "Federal, state, and local agencies with compliant procurement and secure deployment.",
    image: `${INDUSTRIES_SERVE_ICONS}/7.png`,
    href: "/services",
  },
] as const;

const credentials = [
  { acronym: "MBE", label: "Minority-owned business enterprise" },
  { acronym: "SBE", label: "Small business enterprise" },
  { acronym: "DBE", label: "Disadvantaged business enterprise" },
  { acronym: "ISO 9001", label: "Quality management certified" },
] as const;

/** The organization — minimal full-width editorial layout. */
export function AboutUsSnapshotSection() {
  return (
    <section
      id="about"
      className={`about-minimal relative z-20 scroll-mt-24 wdt-section--white py-14 sm:py-16 lg:py-20 ${wdt.sectionBorder}`}
      aria-labelledby="about-snapshot-heading"
    >
      <div className="about-minimal__inner">
        <header className="about-minimal__header about-minimal__header--center">
          <p className={wdt.badge}>The organization</p>
          <h2 id="about-snapshot-heading" className="about-minimal__headline">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              enterprise
            </span>{" "}
            scale.
          </h2>
          <p className={`about-minimal__lede ${wdt.headingSub}`}>
            A national IT solutions organization delivering procurement, licensing, and managed outcomes for teams that cannot afford guesswork.
          </p>
        </header>

        <div className="about-minimal__metrics">
          <OrgMetricsRail />
        </div>

        <div className="about-minimal__body">
          <div className="about-minimal__copy">
            <p className={wdt.metaLabel}>Organizational identity</p>
            <h3 className="about-minimal__subhead">Who we are</h3>
            <p className={`about-minimal__text ${wdt.body}`}>
              vCloud Tech is an enterprise IT solutions organization helping public and private
              sector teams procure, deploy, and manage technology — with the discipline expected of a
              long-term partner.
            </p>

            <div className="about-minimal__mission">
              <p className={wdt.metaLabel}>Mission</p>
              <p className="about-minimal__mission-text">
                Simplify complex IT buying and deliver trusted solutions that help teams move faster
                with confidence.
              </p>
            </div>

            <div className="about-minimal__credentials">
              <p className={wdt.metaLabel}>Certifications &amp; designations</p>
              <ul className="about-minimal__credentials-list">
                {credentials.map((cert) => (
                  <li key={cert.acronym} className="about-minimal__credential">
                    <span className="about-minimal__credential-acronym">{cert.acronym}</span>
                    <span className="about-minimal__credential-label">{cert.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="about-minimal__aside">
            <p className="about-minimal__aside-label">Business impact</p>
            <p className={`about-minimal__text ${wdt.body}`}>
              Faster procurement cycles, accountable vendor management, and infrastructure your
              stakeholders can defend.
            </p>
          </aside>
        </div>

        <IndustriesWeServeSection />

        <div className="about-minimal__cta-wrap">
          <Link href="/about" className="about-minimal__cta">
            Learn more about our organization
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function IndustriesWeServeSection() {
  return (
    <div className="about-enterprise__industry-image-grid about-enterprise__reveal about-enterprise__reveal--5 mt-10 sm:mt-12">
      <header className="about-enterprise__sectors-header about-enterprise__sectors-header--center">
        <div>
          <p className={wdt.badge}>Sectors</p>
          <h2 className="about-enterprise__sectors-headline">
            Industries we{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              serve
            </span>
          </h2>
        </div>
        <span className="about-enterprise__sectors-count" aria-hidden>
          {String(industryServeSectors.length).padStart(2, "0")}
        </span>
      </header>

      <ul className="about-enterprise__industry-image-grid-list mt-8 sm:mt-10">
        {industryServeSectors.map((sector, index) => (
          <li key={`${sector.name}-${index}`} className="about-enterprise__industry-image-grid-item">
            <IndustryServeCard sector={sector} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustryServeCard({
  sector,
}: {
  sector: (typeof industryServeSectors)[number];
}) {
  return (
    <article className="about-enterprise__industry-image-card group/image-card">
      <div className="about-enterprise__industry-image-visual">
        <div className="about-enterprise__industry-image-frame">
          <Image
            src={sector.image}
            alt={sector.name}
            fill
            className="about-enterprise__industry-image-asset"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 14vw"
          />
        </div>
      </div>

      <div className="about-enterprise__industry-image-body">
        <h3 className={`text-base font-semibold leading-snug tracking-tight ${wdt.heading}`}>
          {sector.name}
        </h3>
        <p className={`mt-2.5 flex-1 text-sm leading-relaxed ${wdt.body}`}>{sector.detail}</p>
        <Link href={sector.href} className="about-enterprise__industry-image-link mt-5">
          Explore solutions
          <IndustryServeArrowIcon />
        </Link>
      </div>
    </article>
  );
}

function IndustryServeArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 text-[#E55614] transition-transform duration-300 group-hover/image-card:translate-x-1"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
