import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { publicAssets } from "@/lib/public-assets";

import "./industries-network.css";

const industries = [
  {
    id: "government",
    name: "Government",
    description:
      "Mission-critical infrastructure for federal, state, and local agencies with compliant procurement.",
    image: publicAssets.industries.government,
    href: "/services",
    placement: "gov",
  },
  {
    id: "education",
    name: "Education",
    description:
      "Campus and district infrastructure built for the pace of modern learning environments.",
    image: publicAssets.industries.education,
    href: "/services",
    placement: "edu",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "HIPAA-aware sourcing and clinical uptime for hospital systems and care networks.",
    image: publicAssets.industries.healthcare,
    href: "/services",
    placement: "health",
  },
  {
    id: "financial",
    name: "Financial Services",
    description:
      "Resilient infrastructure for institutions where downtime is measured in real financial cost.",
    image: publicAssets.industries.financial,
    href: "/services",
    placement: "finance",
  },
  {
    id: "public",
    name: "Public Sector",
    description:
      "Accountable IT outcomes for municipal and civic institutions that earn public trust.",
    image: publicAssets.industries.publicSector,
    href: "/services",
    placement: "public",
  },
  {
    id: "commercial",
    name: "Commercial / Enterprise",
    description:
      "Enterprise-grade infrastructure for mid-market and global organizations scaling with confidence.",
    image: publicAssets.industries.commercial,
    href: "/services",
    placement: "enterprise",
  },
] as const;

/** Premium floating industry cards around a global network globe — homepage test. */
export function HomeIndustriesNetworkSection() {
  return (
    <section
      id="industries-network"
      className={`ind-net relative z-10 scroll-mt-24 ${dt.sectionBorder}`}
      aria-labelledby="industries-network-heading"
      data-nav-surface="dark"
    >
      <div className="ind-net__inner">
        <header className="ind-net__header">
          <DtScrollReveal>
            <p className={dt.badge}>Sectors</p>
            <h2 id="industries-network-heading" className="ind-net__headline">
              Industries We{" "}
              <span className="ind-net__headline-accent">Serve</span>
            </h2>
            <p className="ind-net__lede">
              Secure, connected infrastructure for the organizations that keep critical systems
              running nationwide.
            </p>
          </DtScrollReveal>
        </header>

        <div className="ind-net__stage">
          <div className="ind-net__globe" aria-hidden>
            <div className="ind-net__globe-glow" />
            <div className="ind-net__globe-sphere">
              <GlobeSvg />
            </div>
            <div className="ind-net__globe-pulse" />
          </div>

          <svg className="ind-net__links" viewBox="0 0 1000 720" aria-hidden>
            <g className="ind-net__links-group">
              <path className="ind-net__link" d="M500 120 C500 220, 500 280, 500 360" />
              <path className="ind-net__link" d="M220 220 C320 260, 400 300, 500 360" />
              <path className="ind-net__link" d="M780 220 C680 260, 600 300, 500 360" />
              <path className="ind-net__link" d="M220 500 C320 440, 400 400, 500 360" />
              <path className="ind-net__link" d="M500 600 C500 520, 500 440, 500 360" />
              <path className="ind-net__link" d="M780 500 C680 440, 600 400, 500 360" />
            </g>
          </svg>

          <ul className="ind-net__cards">
            {industries.map((industry, index) => (
              <li
                key={industry.id}
                className={`ind-net__card-slot ind-net__card-slot--${industry.placement}`}
                style={{ animationDelay: `${0.12 + index * 0.1}s` }}
              >
                <article className={`ind-net__card ind-net__card--${industry.placement}`}>
                  <div className="ind-net__card-media">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      className="ind-net__card-image"
                      sizes="(max-width: 767px) 90vw, (max-width: 1099px) 40vw, 280px"
                    />
                  </div>
                  <div className="ind-net__card-body">
                    <h3 className="ind-net__card-title">{industry.name}</h3>
                    <p className="ind-net__card-desc">{industry.description}</p>
                    <Link href={industry.href} className="ind-net__card-cta">
                      Explore Industry
                      <span className="ind-net__card-cta-arrow" aria-hidden>
                        →
                      </span>
                    </Link>
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

function GlobeSvg() {
  return (
    <svg className="ind-net__globe-svg" viewBox="0 0 400 400" fill="none" aria-hidden>
      <circle cx="200" cy="200" r="148" className="ind-net__globe-ring" />
      <ellipse cx="200" cy="200" rx="148" ry="54" className="ind-net__globe-lat" />
      <ellipse cx="200" cy="200" rx="148" ry="98" className="ind-net__globe-lat" />
      <ellipse cx="200" cy="200" rx="55" ry="148" className="ind-net__globe-lon" />
      <ellipse cx="200" cy="200" rx="105" ry="148" className="ind-net__globe-lon" />
      <path
        className="ind-net__globe-arc"
        d="M70 160 C120 120, 170 110, 220 130 C270 150, 310 170, 340 210"
      />
      <path
        className="ind-net__globe-arc"
        d="M80 250 C130 280, 190 300, 250 285 C300 275, 330 250, 345 220"
      />
      {[
        [118, 140],
        [200, 98],
        [286, 138],
        [94, 210],
        [200, 200],
        [310, 208],
        [130, 270],
        [220, 288],
        [290, 258],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" className="ind-net__globe-node" />
      ))}
    </svg>
  );
}
