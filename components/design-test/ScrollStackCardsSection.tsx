import type { ReactNode } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import {
  CartIcon,
  CloudIcon,
  CompassIcon,
  HeadsetIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

type StackCard = {
  tag: string;
  title: string;
  description: string;
  icon: SectionIcon;
  points: readonly [string, string, string, string];
};

const cards: StackCard[] = [
  {
    tag: "Cloud",
    title: "Cloud migration & modernization",
    description:
      "Assessment, landing zones, and workload moves with governance and rollback plans built in.",
    icon: CloudIcon,
    points: ["Assessment & readiness", "Landing zone design", "Workload migration", "Governance & rollback"],
  },
  {
    tag: "Security",
    title: "Cybersecurity & compliance",
    description:
      "Zero-trust alignment, tooling integration, and continuous hardening for enterprise risk profiles.",
    icon: ShieldIcon,
    points: ["Zero-trust alignment", "Tooling integration", "Continuous hardening", "Compliance reporting"],
  },
  {
    tag: "Procurement",
    title: "Licensing & IT procurement",
    description:
      "Right-size software spend, simplify vendor contracts, and consolidate buying globally.",
    icon: CartIcon,
    points: ["License optimization", "Vendor contracts", "Global consolidation", "Spend visibility"],
  },
  {
    tag: "Support",
    title: "Managed services & 24/7 ops",
    description:
      "Always-on monitoring, incident response, and platform engineering for your teams.",
    icon: HeadsetIcon,
    points: ["24/7 monitoring", "Incident response", "Platform engineering", "SLA escalation"],
  },
  {
    tag: "Strategy",
    title: "Solutions architecture",
    description:
      "Design reviews, reference architectures, and roadmaps from senior practitioners.",
    icon: CompassIcon,
    points: ["Design reviews", "Reference architectures", "Roadmap planning", "Senior practitioners"],
  },
];

const STICKY_TOP = 88;
const STACK_GAP = 14;
const SCROLL_STEP = 340;
const OVERLAP = 100;
const RELEASE_SPACE = 140;

const stackShadows = [
  "0 10px 30px -12px rgba(0,0,0,0.45)",
  "0 14px 36px -12px rgba(0,0,0,0.5)",
  "0 18px 42px -12px rgba(0,0,0,0.55)",
  "0 22px 48px -12px rgba(0,0,0,0.58)",
  "0 26px 54px -12px rgba(0,0,0,0.62)",
] as const;

/** Scroll stack — split blueprint visual + rolling title cards. */
export function ScrollStackCardsSection() {
  const runwayHeight = (cards.length - 1) * SCROLL_STEP + RELEASE_SPACE;
  const total = String(cards.length).padStart(2, "0");

  return (
    <section
      id="scroll-stack"
      className={`relative z-10 scroll-mt-14 py-14 sm:py-16 ${dt.sectionBorder}`}
      aria-labelledby="scroll-stack-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>What we do</p>
          <h2
            id="scroll-stack-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Enterprise capabilities across your IT lifecycle
          </h2>
          <p className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed ${dt.headingSub}`}>
            Cloud, security, procurement, support, and architecture — scroll to explore each layer.
          </p>
        </header>

        <div className="relative mt-10 sm:mt-12" style={{ minHeight: `${runwayHeight}px` }}>
          <ul className="relative flex flex-col pb-8">
            {cards.map((card, index) => (
              <li
                key={card.title}
                className="sticky motion-reduce:static"
                style={{
                  top: `${STICKY_TOP + index * STACK_GAP}px`,
                  zIndex: 10 + index,
                  marginTop: index === 0 ? 0 : `-${OVERLAP}px`,
                  marginBottom:
                    index === cards.length - 1
                      ? `${RELEASE_SPACE}px`
                      : `${SCROLL_STEP - OVERLAP}px`,
                }}
              >
                <StackCard card={card} index={index} total={total} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  card,
  index,
  total,
}: {
  card: StackCard;
  index: number;
  total: string;
}) {
  const step = String(index + 1).padStart(2, "0");
  const titleWords = card.title.split(" ");
  const shadow = stackShadows[index] ?? stackShadows[stackShadows.length - 1];

  return (
    <article
      className="group/stack relative overflow-hidden rounded-2xl border border-orange-500/20 bg-black/80 ring-1 ring-orange-400/10 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-orange-400/30 sm:rounded-3xl"
      style={{ boxShadow: shadow, minHeight: "13.5rem" }}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
        aria-hidden
      />

      <div className="grid lg:grid-cols-2">
        <StackCardVisual icon={card.icon} tag={card.tag} />

        <div className="relative flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
          <p className="font-mono text-xs font-medium tabular-nums tracking-widest text-orange-400">
            {step} / {total}
          </p>

          <h3 className="mt-4 flex flex-wrap gap-x-[0.28em] text-xl font-semibold leading-[1.3] tracking-tight sm:text-2xl">
            {titleWords.map((word, wordIndex) => (
              <RollingText
                key={`${word}-${wordIndex}`}
                slotHeight="1.3em"
                staggerMs={wordIndex * 28}
                top={<span className="text-white">{word}</span>}
                bottom={<span className="text-orange-300">{word}</span>}
              />
            ))}
          </h3>

          <p className={`mt-4 max-w-md text-sm leading-[1.75] sm:text-[15px] ${dt.body}`}>{card.description}</p>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-orange-500/10 pt-5">
            {card.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-orange-400/90" aria-hidden />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-orange-100/45 sm:text-[11px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-orange-950/40" aria-hidden>
        <span
          className="block h-full bg-gradient-to-r from-orange-600/80 to-orange-400/40"
          style={{ width: `${((index + 1) / cards.length) * 100}%` }}
        />
      </div>
    </article>
  );
}

/** Blueprint-style visual panel — orbital rings + relevant icon. */
function StackCardVisual({ icon: Icon, tag }: { icon: SectionIcon; tag: string }) {
  return (
    <div className="relative flex min-h-[11rem] items-center justify-center overflow-hidden border-b border-orange-500/10 bg-gradient-to-br from-black via-black to-orange-950/40 lg:min-h-[15rem] lg:border-b-0 lg:border-r lg:border-orange-500/10">
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12)_0%,transparent_65%)]"
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full text-orange-200/20"
        viewBox="0 0 400 320"
        fill="none"
        aria-hidden
      >
        <circle cx="200" cy="160" r="118" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <circle cx="200" cy="160" r="88" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="200" cy="160" r="58" stroke="currentColor" strokeWidth="0.5" opacity="0.65" />
        <ellipse cx="200" cy="160" rx="140" ry="42" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <ellipse cx="200" cy="160" rx="42" ry="130" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="118" y="98" width="164" height="124" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
        <path d="M80 160h240M200 60v200" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </svg>

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
          <span
            className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl transition-opacity duration-500 group-hover/stack:bg-orange-500/30"
            aria-hidden
          />
          <div
            className="relative flex h-full w-full items-center justify-center rounded-2xl border border-orange-400/25 bg-orange-500/10 text-orange-200 shadow-[0_0_40px_rgba(249,115,22,0.2)] ring-1 ring-orange-400/20 [&_svg]:h-9 [&_svg]:w-9 sm:[&_svg]:h-10 sm:[&_svg]:w-10"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          >
            <span className="flex items-center justify-center">
              <Icon />
            </span>
          </div>
        </div>
        <span className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-orange-300/50">
          {tag}
        </span>
      </div>
    </div>
  );
}

type RollingTextProps = {
  top: ReactNode;
  bottom: ReactNode;
  slotHeight: string;
  staggerMs?: number;
};

function RollingText({ top, bottom, slotHeight, staggerMs = 0 }: RollingTextProps) {
  return (
    <span className="inline-block overflow-hidden align-top" style={{ height: slotHeight }}>
      <span
        className="block transition-transform duration-[0.32s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/stack:-translate-y-1/2 group-focus-within/stack:-translate-y-1/2 motion-reduce:transform-none"
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
