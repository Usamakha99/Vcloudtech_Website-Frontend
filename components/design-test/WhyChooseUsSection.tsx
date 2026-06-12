import { dt } from "@/components/design-test/design-test-theme";
import { GlassCard } from "@/components/design-test/GlassCard";
import {
  HeadsetIcon,
  RocketIcon,
  ShieldIcon,
  HandshakeIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

const stats = [
  { value: "500+", label: "Clients served" },
  { value: "15+", label: "Years in business" },
  { value: "50", label: "States served" },
  { value: "99.9%", label: "Uptime SLA" },
] as const;

const benefits: { title: string; description: string; icon: SectionIcon }[] = [
  {
    title: "Faster procurement",
    description: "Quote cycles measured in hours — not weeks of back-and-forth.",
    icon: RocketIcon,
  },
  {
    title: "Enterprise security",
    description: "Governance, compliance, and vendor accountability built in.",
    icon: ShieldIcon,
  },
  {
    title: "Nationwide scale",
    description: "Warehouse operations and teams that deliver coast to coast.",
    icon: HandshakeIcon,
  },
  {
    title: "Always-on support",
    description: "Engineers and account teams when your systems matter most.",
    icon: HeadsetIcon,
  },
];

/** Why choose us — USP stats + transparent benefit cards. */
export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Why choose us</p>
          <h2
            id="why-choose-us-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            USP highlights
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${dt.headingSub}`}>
            Enterprise IT teams choose vCloud Tech for accountable sourcing, real operations, and
            measurable outcomes.
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
          {stats.map((item, index) => (
            <li key={item.label}>
              <GlassCard delay={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="px-4 py-5 text-center sm:px-5 sm:py-6">
                  <p className="text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
                    {item.value}
                  </p>
                  <p className={`mt-1.5 text-[11px] font-medium uppercase tracking-wider sm:text-xs ${dt.statLabel}`}>
                    {item.label}
                  </p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:gap-5">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <GlassCard delay={(index + 1) as 1 | 2 | 3 | 4}>
                  <div className="flex gap-4 p-5 sm:p-6">
                    <div className={dt.iconBoxSm}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className={`mt-2 text-sm leading-relaxed ${dt.body}`}>{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
