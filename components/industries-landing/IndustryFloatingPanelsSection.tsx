import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { publicAssets } from "@/lib/public-assets";

import "./industry-floating-panels.css";

const industries = [
  {
    id: "government",
    name: "Government",
    description:
      "Mission-critical infrastructure for federal, state, and local agencies with compliant procurement.",
    image: publicAssets.industriesPage.government,
    href: "/services",
    placement: "gov",
    icon: "gov",
  },
  {
    id: "education",
    name: "Education",
    description:
      "Campus and district infrastructure built for the pace of modern learning environments.",
    image: publicAssets.industriesPage.education,
    href: "/services",
    placement: "edu",
    icon: "edu",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "HIPAA-aware sourcing and clinical uptime for hospital systems and care networks.",
    image: publicAssets.industriesPage.healthcare,
    href: "/services",
    placement: "health",
    icon: "health",
  },
  {
    id: "financial",
    name: "Financial Services",
    description:
      "Resilient infrastructure for institutions where downtime is measured in real financial cost.",
    image: publicAssets.industriesPage.financial,
    href: "/services",
    placement: "finance",
    icon: "finance",
  },
  {
    id: "public",
    name: "Public Sector",
    description:
      "Accountable IT outcomes for municipal and civic institutions that earn public trust.",
    image: publicAssets.industriesPage.publicSector,
    href: "/services",
    placement: "public",
    icon: "public",
  },
  {
    id: "commercial",
    name: "Commercial / Enterprise",
    description:
      "Enterprise-grade infrastructure for mid-market and global organizations scaling with confidence.",
    image: publicAssets.industriesPage.commercial,
    href: "/services",
    placement: "enterprise",
    icon: "enterprise",
  },
] as const;

function IndustryIcon({ type }: { type: (typeof industries)[number]["icon"] }) {
  const props = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "gov":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-5h6v5" />
          <path d="M9 10h.01M15 10h.01" />
        </svg>
      );
    case "edu":
      return (
        <svg {...props}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" />
          <path d="M22 10v6" />
        </svg>
      );
    case "health":
      return (
        <svg {...props}>
          <path d="M12 6v12" />
          <path d="M6 12h12" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M4 10h16v11H4z" />
          <path d="M8 10V7l4-3 4 3v3" />
          <path d="M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      );
    case "public":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V9l7-4 7 4v12" />
          <path d="M9 21v-6h6v6" />
          <path d="M5 13h14" />
        </svg>
      );
    case "enterprise":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V8h6v13" />
          <path d="M11 21V4h8v17" />
          <path d="M8 11h1M8 14h1M15 8h1M15 11h1M15 14h1" />
        </svg>
      );
    default:
      return null;
  }
}

/** Industry landing — premium floating glass panels over the network globe. */
export function IndustryFloatingPanelsSection() {
  return (
    <section
      id="industries-network"
      className={`ind-panels relative z-10 scroll-mt-24 ${dt.sectionBorder}`}
      aria-labelledby="industries-network-heading"
      data-nav-surface="dark"
    >
      <div className="ind-panels__inner">
        <header className="ind-panels__header">
          <DtScrollReveal>
            <p className={dt.badge}>Sectors</p>
            <h2 id="industries-network-heading" className="ind-panels__headline">
              Industries We Serve
            </h2>
            <p className="ind-panels__lede">
              Secure, connected infrastructure for the organizations that keep critical systems
              running nationwide.
            </p>
          </DtScrollReveal>
        </header>

        <div className="ind-panels__stage">
          <div className="ind-panels__globe-glow" aria-hidden />
          <div className="ind-panels__globe" aria-hidden>
            <Image
              src={publicAssets.industriesPage.networkBg}
              alt=""
              fill
              className="ind-panels__globe-image"
              sizes="(max-width: 1099px) 80vw, 48rem"
              priority={false}
            />
          </div>

          <ul className="ind-panels__list">
            {industries.map((industry, index) => (
              <li
                key={industry.id}
                className={`ind-panels__slot ind-panels__slot--${industry.placement}`}
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <article
                  className={`ind-panels__panel ind-panels__panel--${industry.placement}`}
                >
                  <div className="ind-panels__media">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      quality={90}
                      className="ind-panels__image"
                      sizes="(max-width: 767px) 92vw, (max-width: 1099px) 44vw, 380px"
                    />
                    <span className="ind-panels__media-fade" aria-hidden />
                  </div>

                  <div className="ind-panels__content">
                    <h3 className="ind-panels__title">
                      <span className="ind-panels__icon">
                        <IndustryIcon type={industry.icon} />
                      </span>
                      {industry.name}
                    </h3>
                    <div className="ind-panels__hover">
                      <p className="ind-panels__desc">{industry.description}</p>
                      <Link href={industry.href} className="ind-panels__cta">
                        Explore Industry
                        <span className="ind-panels__cta-arrow" aria-hidden>
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
