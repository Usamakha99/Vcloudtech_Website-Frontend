import Link from "next/link";
import type { ReactNode } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import { OrgMetricsRail } from "@/components/design-test/OrgMetricsRail";
import {
  EducationIcon,
  GovernmentIcon,
  HealthcareIcon,
  PublicSectorIcon,
  ServerIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./about-us-section.css";
const sectors: {
  name: string;
  detail: string;
  icon: SectionIcon;
}[] = [
  {
    name: "Government",
    detail: "Federal, state, and local agencies with compliant procurement and secure deployment.",
    icon: GovernmentIcon,
  },
  {
    name: "Education",
    detail: "K-12 districts and higher education with budget-smart licensing and campus rollouts.",
    icon: EducationIcon,
  },
  {
    name: "Healthcare",
    detail: "Hospital systems and care networks with HIPAA-aware sourcing and clinical uptime.",
    icon: HealthcareIcon,
  },
  {
    name: "Enterprise",
    detail: "Mid-market to global organizations with consolidated spend and managed operations.",
    icon: ServerIcon,
  },
  {
    name: "Public sector",
    detail: "Municipal and civic institutions with accountable IT outcomes stakeholders can trust.",
    icon: PublicSectorIcon,
  },
];

const industryStackZ = ["z-10", "z-20", "z-30", "z-40", "z-50"] as const;

const credentials = [
  { acronym: "MBE", label: "Minority-owned business enterprise" },
  { acronym: "SBE", label: "Small business enterprise" },
  { acronym: "DBE", label: "Disadvantaged business enterprise" },
  { acronym: "ISO 9001", label: "Quality management certified" },
] as const;

/** The organization — enterprise editorial bento layout. */
export function AboutUsSnapshotSection() {
  return (
    <section
      id="about"
      className={`about-enterprise relative z-20 scroll-mt-24 py-12 sm:py-16 lg:py-20 ${dt.sectionBorder}`}
      aria-labelledby="about-snapshot-heading"
    >
      <div className="about-enterprise__grid-bg" aria-hidden />
      <div className="about-enterprise__glow about-enterprise__glow--primary" aria-hidden />
      <div className="about-enterprise__glow about-enterprise__glow--secondary" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="about-enterprise__reveal about-enterprise__reveal--1 max-w-3xl">
          <p className={dt.badge}>The organization</p>
          <h2 id="about-snapshot-heading" className="about-enterprise__headline">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              enterprise
            </span>{" "}
            scale.
          </h2>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dt.headingSub}`}>
            A national IT solutions organization delivering procurement, licensing, and managed
            outcomes for teams that cannot afford guesswork.
          </p>
        </header>

        <div className="about-enterprise__bento mt-8 sm:mt-10">
          <article className="about-enterprise__manifesto about-enterprise__reveal about-enterprise__reveal--3 order-2 lg:order-none">
            <span className="about-enterprise__manifesto-accent" aria-hidden />
            <div className="p-6 sm:p-7 lg:p-8">
              <p className={dt.metaLabel}>Organizational identity</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Who we are
              </h3>
              <p className={`mt-4 text-sm leading-[1.8] sm:text-[15px] ${dt.body}`}>
                vCloud Tech is an enterprise IT solutions organization helping public and private
                sector teams procure, deploy, and manage technology — with the discipline expected
                of a long-term partner.
              </p>

              <blockquote className="mt-8 border-t border-white/10 pt-6">
                <p className={dt.metaLabel}>Mission</p>
                <p className="mt-3 text-lg font-medium leading-relaxed text-white sm:text-xl">
                  Simplify complex IT buying and deliver trusted solutions that help teams move
                  faster with confidence.
                </p>
              </blockquote>

              <div className="about-enterprise__credentials mt-8 border-t border-white/10 pt-6">
                <p className={dt.metaLabel}>Certifications &amp; designations</p>
                <ul className="about-enterprise__credentials-grid mt-4">
                  {credentials.map((cert) => (
                    <li key={cert.acronym}>
                      <div className="about-enterprise__credential">
                        <span className="about-enterprise__credential-acronym">{cert.acronym}</span>
                        <span className="about-enterprise__credential-label">{cert.label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-[#0F0F0F]/80 p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E55614]">
                  Business impact
                </p>
                <p className={`mt-2 text-sm leading-relaxed ${dt.body}`}>
                  Faster procurement cycles, accountable vendor management, and infrastructure your
                  stakeholders can defend.
                </p>
              </div>
            </div>
          </article>

          <div className="about-enterprise__side-stack about-enterprise__reveal about-enterprise__reveal--4 order-1 lg:order-none">
            <div className="about-enterprise__stat-card">
              <OrgMetricsRail />
            </div>
            <div className="about-enterprise__visual about-enterprise__visual--stretch">
              <FootprintVisual />
              <p className="about-enterprise__visual-label">Nationwide delivery footprint</p>
            </div>
          </div>
        </div>

        <SectorsRowSection />

        <div className="about-enterprise__reveal about-enterprise__reveal--5 mt-10 flex justify-center sm:mt-12">
          <Link href="/about" className="about-enterprise__cta">
            Learn more about our organization
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectorsRowSection() {
  return (
    <div className="about-enterprise__sectors-row about-enterprise__reveal about-enterprise__reveal--5 mt-10 sm:mt-12">
      <header className="about-enterprise__sectors-header">
        <div>
          <p className={dt.badge}>Sectors</p>
          <h2 className="about-enterprise__sectors-headline">
            Industries we{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              serve
            </span>
          </h2>
        </div>
        <span className="about-enterprise__sectors-count" aria-hidden>
          {String(sectors.length).padStart(2, "0")}
        </span>
      </header>

      <div className="mt-8 sm:mt-10">
        <ul className="hidden justify-center overflow-visible lg:flex">
          {sectors.map((sector, index) => (
            <li
              key={sector.name}
              className={`group relative shrink-0 transition-transform duration-300 hover:z-50 focus-within:z-50 ${industryStackZ[index] ?? industryStackZ[0]} ${index === 0 ? "ml-0" : "-ml-10 xl:-ml-12"}`}
            >
              <IndustryStrengthCard sector={sector} index={index} />
            </li>
          ))}
        </ul>

        <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto overflow-y-visible pb-4 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {sectors.map((sector, index) => (
            <li
              key={sector.name}
              className={`group relative w-[min(85vw,300px)] shrink-0 snap-center transition-transform duration-300 hover:z-50 focus-within:z-50 sm:w-[320px] ${industryStackZ[index] ?? industryStackZ[0]} ${index === 0 ? "ml-0" : "-ml-7 sm:-ml-8"}`}
            >
              <IndustryStrengthCard sector={sector} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IndustryStrengthCard({
  sector,
  index,
}: {
  sector: (typeof sectors)[number];
  index: number;
}) {
  const Icon = sector.icon;
  const number = String(index + 1).padStart(2, "0");
  const titleWords = sector.name.split(" ");

  return (
    <article className="about-enterprise__industry-card group/card">
      <span className="about-enterprise__industry-card-glow" aria-hidden />
      <span className="about-enterprise__industry-card-accent" aria-hidden />

      <div className="about-enterprise__industry-card-body flex flex-col px-6 py-7 sm:px-7 sm:py-8">
        <div className="relative flex items-start justify-between gap-4">
          <div className={dt.iconBoxCard}>
            <Icon />
          </div>
          <span className={dt.number}>{number}</span>
        </div>

        <div className="relative mt-7 flex flex-1 flex-col">
          <h3 className="flex flex-wrap gap-x-[0.3em] text-base font-semibold leading-[1.35] tracking-tight sm:text-lg">
            {titleWords.map((word, wordIndex) => (
              <RollingText
                key={`${word}-${wordIndex}`}
                slotHeight="1.35em"
                staggerMs={wordIndex * 28}
                top={<span className={dt.heading}>{word}</span>}
                bottom={<span className={dt.headingSub}>{word}</span>}
              />
            ))}
          </h3>

          <p className={`mt-3.5 flex-1 text-sm leading-[1.7] sm:text-[15px] ${dt.body}`}>
            {sector.detail}
          </p>
        </div>

        <Link
          href="/services"
          className={`relative mt-7 inline-flex items-center gap-2 text-[13px] font-medium ${dt.link}`}
        >
          Explore solutions
          <IndustryArrowIcon />
        </Link>
      </div>
    </article>
  );
}

type RollingTextProps = {
  top: ReactNode;
  bottom: ReactNode;
  slotHeight: string;
  className?: string;
  staggerMs?: number;
};

function RollingText({ top, bottom, slotHeight, className = "", staggerMs = 0 }: RollingTextProps) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`} style={{ height: slotHeight }}>
      <span
        className="block transition-transform duration-[0.32s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/card:-translate-y-1/2 group-focus-within/card:-translate-y-1/2 motion-reduce:transform-none"
        style={{ transitionDelay: `${staggerMs}ms` }}
      >
        <span className="block" style={{ minHeight: slotHeight }}>
          {top}
        </span>
        <span className="block" style={{ minHeight: slotHeight }}>
          {bottom}
        </span>
      </span>
    </span>
  );
}

function IndustryArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
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

function FootprintVisual() {
  return (
    <svg
      className="about-enterprise__footprint-svg"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="100" r="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="100" cy="100" r="52" stroke="rgba(229,86,20,0.2)" strokeWidth="1" strokeDasharray="4 6" />

      <g className="about-enterprise__orbit">
        <circle cx="100" cy="22" r="4" className="about-enterprise__node" fill="#E55614" />
        <circle cx="178" cy="100" r="4" className="about-enterprise__node about-enterprise__node--delay-1" fill="#E55614" />
        <circle cx="100" cy="178" r="4" className="about-enterprise__node about-enterprise__node--delay-2" fill="#E55614" />
        <circle cx="22" cy="100" r="4" className="about-enterprise__node about-enterprise__node--delay-3" fill="#E55614" />
      </g>

      <g className="about-enterprise__orbit about-enterprise__orbit--reverse">
        <circle cx="100" cy="48" r="3" fill="rgba(255,255,255,0.35)" />
        <circle cx="152" cy="100" r="3" fill="rgba(255,255,255,0.35)" />
        <circle cx="100" cy="152" r="3" fill="rgba(255,255,255,0.35)" />
        <circle cx="48" cy="100" r="3" fill="rgba(255,255,255,0.35)" />
      </g>

      <circle cx="100" cy="100" r="10" fill="rgba(229,86,20,0.25)" />
      <circle cx="100" cy="100" r="5" fill="#E55614" />
    </svg>
  );
}
