import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import { GlassCard } from "@/components/design-test/GlassCard";
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
      <span className="about-enterprise__sectors-glow" aria-hidden />
      <span className="about-enterprise__sectors-scan" aria-hidden />

      <header className="about-enterprise__sectors-header">
        <div>
          <p className={dt.metaLabel}>Industries we serve</p>
         
        </div>
        <span className="about-enterprise__sectors-count" aria-hidden>
          {String(sectors.length).padStart(2, "0")}
        </span>
      </header>

      <ul className="about-enterprise__sectors-tiles grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
        {sectors.map((sector, index) => (
          <li key={sector.name} className="h-full">
            <GlassCard delay={(index + 1) as 1 | 2 | 3 | 4 | 5} className="group h-full">
              <IndustryGlassCard sector={sector} index={index} />
            </GlassCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustryGlassCard({
  sector,
  index,
}: {
  sector: (typeof sectors)[number];
  index: number;
}) {
  const Icon = sector.icon;

  return (
    <div className="about-enterprise__industry-card flex h-full min-h-[15.5rem] flex-col p-5 sm:min-h-[16.5rem] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className={dt.iconBoxCard}>
          <Icon />
        </div>
        <span className={dt.number}>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h4 className="mt-5 text-base font-semibold leading-snug text-white sm:text-lg">
        {sector.name}
      </h4>
      <p className={`mt-2.5 flex-1 text-sm leading-relaxed ${dt.body}`}>{sector.detail}</p>

      <Link
        href="/services"
        className="about-enterprise__industry-cta mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-[#E55614]"
      >
        Explore solutions
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </div>
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
