import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { publicAssets } from "@/lib/public-assets";

import "./industry-floating-panels.css";

type IndustryAssets = {
  networkBg: string;
  government: string;
  education: string;
  healthcare: string;
  financial: string;
  publicSector: string;
  commercial: string;
};

type IndustryFloatingPanelsProps = {
  id?: string;
  headingId?: string;
  assets: IndustryAssets;
  /** Bright / daylight artwork shown on card hover. */
  hoverAssets?: IndustryAssets;
  title?: string;
  /** Homepage mid-page: tighter top spacing (no nav-occupancy pad). */
  embedded?: boolean;
};

function buildIndustries(assets: IndustryAssets, hoverAssets?: IndustryAssets) {
  return [
    {
      id: "government",
      name: "Government",
      description:
        "Mission-critical infrastructure for federal, state, and local agencies with compliant procurement.",
      image: assets.government,
      hoverImage: hoverAssets?.government,
      href: "/services",
      placement: "gov",
    },
    {
      id: "education",
      name: "Education",
      description:
        "Campus and district infrastructure built for the pace of modern learning environments.",
      image: assets.education,
      hoverImage: hoverAssets?.education,
      href: "/services",
      placement: "edu",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description:
        "HIPAA-aware sourcing and clinical uptime for hospital systems and care networks.",
      image: assets.healthcare,
      hoverImage: hoverAssets?.healthcare,
      href: "/services",
      placement: "health",
    },
    {
      id: "financial",
      name: "Financial Services",
      description:
        "Resilient infrastructure for institutions where downtime is measured in real financial cost.",
      image: assets.financial,
      hoverImage: hoverAssets?.financial,
      href: "/services",
      placement: "finance",
    },
    {
      id: "public",
      name: "Public Sector",
      description:
        "Accountable IT outcomes for municipal and civic institutions that earn public trust.",
      image: assets.publicSector,
      hoverImage: hoverAssets?.publicSector,
      href: "/services",
      placement: "public",
    },
    {
      id: "commercial",
      name: "Commercial / Enterprise",
      description:
        "Enterprise-grade infrastructure for mid-market and global organizations scaling with confidence.",
      image: assets.commercial,
      hoverImage: hoverAssets?.commercial,
      href: "/services",
      placement: "enterprise",
    },
  ] as const;
}

function IndustryFloatingPanels({
  id = "industries-network",
  headingId = "industries-network-heading",
  assets,
  hoverAssets,
  title = "Industries We Serve",
  embedded = false,
}: IndustryFloatingPanelsProps) {
  const industries = buildIndustries(assets, hoverAssets);

  return (
    <section
      id={id}
      className={`ind-panels relative z-10 scroll-mt-24 ${embedded ? "ind-panels--embedded" : ""} ${dt.sectionBorder}`.trim()}
      aria-labelledby={headingId}
      data-nav-surface="dark"
    >
      <div className="ind-panels__inner">
        <header className="ind-panels__header">
          <DtScrollReveal>
            <p className={dt.badge}>Sectors</p>
            <h2 id={headingId} className="ind-panels__headline">
              {title}
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
              src={assets.networkBg}
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
                key={`${id}-${industry.id}`}
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
                      className="ind-panels__image ind-panels__image--base"
                      sizes="(max-width: 767px) 92vw, (max-width: 1099px) 44vw, 420px"
                    />
                    {industry.hoverImage ? (
                      <Image
                        src={industry.hoverImage}
                        alt=""
                        fill
                        quality={90}
                        className="ind-panels__image ind-panels__image--hover"
                        sizes="(max-width: 767px) 92vw, (max-width: 1099px) 44vw, 420px"
                      />
                    ) : null}
                    <span className="ind-panels__media-fade" aria-hidden />
                    <span className="ind-panels__media-fade-left" aria-hidden />
                  </div>

                  <div className="ind-panels__content">
                    <h3 className="ind-panels__title">{industry.name}</h3>
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

/** Night cards by default; daylight artwork on hover. Homepage uses tighter top spacing. */
export function IndustryFloatingPanelsSection({
  embedded = true,
}: {
  embedded?: boolean;
} = {}) {
  return (
    <IndustryFloatingPanels
      id="industries-network"
      headingId="industries-network-heading"
      assets={publicAssets.industriesPage}
      hoverAssets={publicAssets.industriesDaylight}
      title="Industries We Serve"
      embedded={embedded}
    />
  );
}

/** @deprecated Daylight-only variant — prefer hover swap on the main section. */
export function IndustryFloatingPanelsDaylightSection() {
  return (
    <IndustryFloatingPanels
      id="industries-network-daylight"
      headingId="industries-network-daylight-heading"
      assets={publicAssets.industriesDaylight}
      title="Industries We Serve"
    />
  );
}
