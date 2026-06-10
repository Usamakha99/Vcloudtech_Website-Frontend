import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import {
  HandshakeIcon,
  ShieldIcon,
  TeamIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

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
  "Government agencies",
  "School districts",
  "Higher education",
  "Healthcare",
  "Enterprise",
] as const;

const certifications = ["MBE", "SBE", "DBE", "ISO 9001"] as const;

/** Organizational blueprint — mission, footprint, values, and credentials at org level. */
export function AboutUsSnapshotSection() {
  return (
    <section
      id="about"
      className={`relative z-20 scroll-mt-14 py-14 sm:py-16 lg:py-20 ${dt.sectionBorder}`}
      aria-labelledby="about-snapshot-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>The organization</p>
          <h2
            id="about-snapshot-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight"
          >
            Built for enterprise. Rooted in people.
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${dt.headingSub}`}>
            A national IT solutions organization — structure, mission, and operating principles at a glance.
          </p>
        </header>

        <div className={`relative mt-10 sm:mt-12 ${dt.aboutOrgShell}`}>
          <span
            className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-orange-600/8 blur-3xl"
            aria-hidden
          />
          <span className={dt.cardTopLine} aria-hidden />

          <div className="relative p-4 sm:p-5 lg:p-6">
            {/* Org blueprint: identity + footprint */}
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-5 lg:items-stretch">
              <article className={`lg:col-span-3 ${dt.aboutOrgCell}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
                  Organizational identity
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white sm:text-xl">Who we are</h3>
                <p className={`mt-3 text-sm leading-[1.75] sm:text-[15px] ${dt.body}`}>
                  vCloud Tech is an enterprise IT solutions organization helping public and private sector teams
                  procure, deploy, and manage technology — with the discipline expected of a long-term partner.
                </p>

                <div className="mt-6 border-t border-orange-500/10 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
                    Mission statement
                  </p>
                  <p className="mt-3 text-base font-medium leading-relaxed text-orange-100/85 sm:text-lg">
                    To simplify complex IT buying and deliver trusted solutions that help teams move faster with
                    confidence.
                  </p>
                </div>
              </article>

              <ul className="grid grid-cols-3 gap-3 lg:col-span-2 lg:grid-cols-1 lg:gap-4">
                {orgMetrics.map((metric) => (
                  <li key={metric.label} className={dt.aboutOrgMetric}>
                    <p className={`text-xl font-bold tabular-nums tracking-tight sm:text-2xl lg:text-3xl ${dt.statValue}`}>
                      {metric.value}
                    </p>
                    <p
                      className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider sm:text-[11px] ${dt.statLabel}`}
                    >
                      {metric.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizational values */}
            <div className="mt-3 sm:mt-4">
              <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/80 sm:mb-4">
                Operating principles
              </p>
              <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {orgValues.map((value) => (
                  <li key={value.title}>
                    <OrgValueCard value={value} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Reach + credentials — org-level strip */}
            <div className={`mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4`}>
              <div className={dt.aboutOrgCell}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
                  Sectors we serve
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {sectors.map((sector) => (
                    <li key={sector}>
                      <span className={dt.tag}>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={dt.aboutOrgCell}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
                  Organizational credentials
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <li key={cert}>
                      <span className={dt.certPill}>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center sm:mt-12">
          <Link
            href="/about"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition duration-300 hover:gap-2.5 ${dt.link}`}
          >
            Learn more about our organization
            <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

function OrgValueCard({
  value,
}: {
  value: { title: string; description: string; icon: SectionIcon };
}) {
  return (
    <article className={`flex h-full flex-col ${dt.aboutOrgCell} ${dt.cardHover}`}>
      <div className={dt.iconBoxCard}>
        <value.icon />
      </div>
      <h4 className="mt-4 text-sm font-semibold leading-snug text-white">{value.title}</h4>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-orange-100/55">{value.description}</p>
    </article>
  );
}
