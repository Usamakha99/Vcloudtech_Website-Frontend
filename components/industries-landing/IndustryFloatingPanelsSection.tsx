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
  },
  {
    id: "education",
    name: "Education",
    description:
      "Campus and district infrastructure built for the pace of modern learning environments.",
    image: publicAssets.industriesPage.education,
    href: "/services",
    placement: "edu",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "HIPAA-aware sourcing and clinical uptime for hospital systems and care networks.",
    image: publicAssets.industriesPage.healthcare,
    href: "/services",
    placement: "health",
  },
  {
    id: "financial",
    name: "Financial Services",
    description:
      "Resilient infrastructure for institutions where downtime is measured in real financial cost.",
    image: publicAssets.industriesPage.financial,
    href: "/services",
    placement: "finance",
  },
  {
    id: "public",
    name: "Public Sector",
    description:
      "Accountable IT outcomes for municipal and civic institutions that earn public trust.",
    image: publicAssets.industriesPage.publicSector,
    href: "/services",
    placement: "public",
  },
  {
    id: "commercial",
    name: "Commercial / Enterprise",
    description:
      "Enterprise-grade infrastructure for mid-market and global organizations scaling with confidence.",
    image: publicAssets.industriesPage.commercial,
    href: "/services",
    placement: "enterprise",
  },
] as const;

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
                      sizes="(max-width: 767px) 92vw, (max-width: 1099px) 44vw, 420px"
                    />
                    <span className="ind-panels__media-fade" aria-hidden />
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
