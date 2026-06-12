import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import {
  HandshakeIcon,
  ShieldIcon,
  TeamIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./about-us-section.css";

const orgMetrics = [
  { value: "15+", label: "Years operating" },
  { value: "500+", label: "Organizations served" },
  { value: "50", label: "States & territories" },
] as const;

const orgValues: { title: string; description: string; icon: SectionIcon }[] = [
  {
    title: "Strategic partnership",
    description: "Long-term relationships built on trust — not one-off transactions.",
    icon: HandshakeIcon,
  },
  {
    title: "Operational discipline",
    description: "Governance, compliance, and documented delivery at enterprise scale.",
    icon: ShieldIcon,
  },
  {
    title: "Human-centered culture",
    description: "A motivated team invested in outcomes, not just outcomes on paper.",
    icon: TeamIcon,
  },
];

const sectors = [
  "Government",
  "Education",
  "Healthcare",
  "Enterprise",
  "Public sector",
] as const;

const credentials = ["MBE", "SBE", "DBE", "ISO 9001"] as const;

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
        {/* Editorial header + stat rail */}
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
          <header className="about-enterprise__reveal about-enterprise__reveal--1 lg:col-span-7">
            <p className={dt.badge}>The organization</p>
            <h2 id="about-snapshot-heading" className="about-enterprise__headline">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
                enterprise
              </span>{" "}
              scale.
            </h2>
            <p className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${dt.headingSub}`}>
              A national IT solutions organization delivering procurement, licensing, and managed
              outcomes for teams that cannot afford guesswork.
            </p>
          </header>

          <div className="about-enterprise__reveal about-enterprise__reveal--2 lg:col-span-5">
            <ul className="about-enterprise__stat-rail" aria-label="Organization metrics">
              {orgMetrics.map((metric) => (
                <li key={metric.label} className="about-enterprise__stat">
                  <p className="about-enterprise__stat-value">{metric.value}</p>
                  <p className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider sm:text-[11px] ${dt.statLabel}`}>
                    {metric.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bento grid — manifesto · visual · reach */}
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-12 lg:gap-5">
          <article className="about-enterprise__manifesto about-enterprise__reveal about-enterprise__reveal--3 lg:col-span-5">
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

              <p className={`mt-6 font-mono text-[11px] tracking-wide ${dt.statLabel}`}>
                {credentials.join("  ·  ")}
              </p>
            </div>
          </article>

          <div className="about-enterprise__visual about-enterprise__reveal about-enterprise__reveal--4 lg:col-span-4">
            <FootprintVisual />
            <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A1A1AA]">
              Nationwide delivery footprint
            </p>
          </div>

          <aside className="about-enterprise__reach about-enterprise__reveal about-enterprise__reveal--5 lg:col-span-3">
            <div>
              <p className={dt.metaLabel}>Sectors we serve</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <li key={sector}>
                    <span className="about-enterprise__sector">{sector}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0F0F0F]/80 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E55614]">
                Business impact
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${dt.body}`}>
                Faster procurement cycles, accountable vendor management, and infrastructure your
                stakeholders can defend.
              </p>
            </div>
          </aside>
        </div>

        {/* Operating principles */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
            <div>
              <p className={dt.metaLabel}>Operating principles</p>
              <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                How we earn enterprise trust
              </p>
            </div>
            <span className={`hidden text-xs sm:inline ${dt.statLabel}`}>03 pillars</span>
          </div>

          <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
            {orgValues.map((value) => (
              <li key={value.title}>
                <PrincipleCard value={value} />
              </li>
            ))}
          </ul>
        </div>

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

function PrincipleCard({
  value,
}: {
  value: { title: string; description: string; icon: SectionIcon };
}) {
  const Icon = value.icon;

  return (
    <article className="about-enterprise__principle group h-full">
      <span className="about-enterprise__principle-gradient" aria-hidden />
      <div className="about-enterprise__principle-inner flex h-full flex-col p-6 sm:p-7">
        <div className={dt.iconBoxCard}>
          <Icon />
        </div>
        <h4 className="mt-5 text-base font-semibold text-white sm:text-lg">{value.title}</h4>
        <p className={`mt-3 flex-1 text-sm leading-relaxed ${dt.body}`}>{value.description}</p>
        <span
          className="mt-5 inline-flex h-px w-8 bg-[#E55614]/60 transition-all duration-300 group-hover:w-14"
          aria-hidden
        />
      </div>
    </article>
  );
}

function FootprintVisual() {
  return (
    <svg
      className="h-44 w-44 sm:h-52 sm:w-52"
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
