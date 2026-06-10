import type { ReactNode } from "react";

import { dt } from "@/components/design-test/design-test-theme";

type StackCard = {
  tag: string;
  title: string;
  description: string;
  icon: () => ReactNode;
};

const cards: StackCard[] = [
  {
    tag: "Cloud",
    title: "Cloud migration & modernization",
    description:
      "Assessment, landing zones, and workload moves with governance and rollback plans built in.",
    icon: CloudIcon,
  },
  {
    tag: "Security",
    title: "Cybersecurity & compliance",
    description:
      "Zero-trust alignment, tooling integration, and continuous hardening for enterprise risk profiles.",
    icon: ShieldIcon,
  },
  {
    tag: "Procurement",
    title: "Licensing & IT procurement",
    description:
      "Right-size software spend, simplify vendor contracts, and consolidate buying globally.",
    icon: CartIcon,
  },
  {
    tag: "Support",
    title: "Managed services & 24/7 ops",
    description:
      "Always-on monitoring, incident response, and platform engineering for your teams.",
    icon: HeadsetIcon,
  },
  {
    tag: "Strategy",
    title: "Solutions architecture",
    description:
      "Design reviews, reference architectures, and roadmaps from senior practitioners.",
    icon: CompassIcon,
  },
];

const STICKY_TOP = 88;
const STACK_GAP = 14;
const SCROLL_STEP = 300;
const OVERLAP = 92;
const RELEASE_SPACE = 130;

const stackShadows = [
  "0 10px 30px -12px rgba(0,0,0,0.45)",
  "0 14px 36px -12px rgba(0,0,0,0.5)",
  "0 18px 42px -12px rgba(0,0,0,0.55)",
  "0 22px 48px -12px rgba(0,0,0,0.58)",
  "0 26px 54px -12px rgba(0,0,0,0.62)",
] as const;

/** Premium scroll stack — layered glass cards with icons and depth. */
export function ScrollStackCardsSection() {
  const runwayHeight = (cards.length - 1) * SCROLL_STEP + RELEASE_SPACE;

  return (
    <section
      id="scroll-stack"
      className={`relative z-10 scroll-mt-14 py-14 sm:py-16 ${dt.sectionBorder}`}
      aria-labelledby="scroll-stack-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Scroll stack</p>
          <h2
            id="scroll-stack-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Capabilities that stack with your scroll
          </h2>
          <p className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed ${dt.headingSub}`}>
            Each layer adds depth — scroll down to stack, scroll up to unfold.
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
                <StackCard card={card} index={index} total={cards.length} />
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
  total: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const shadow = stackShadows[index] ?? stackShadows[stackShadows.length - 1];

  return (
    <article
      className="group/stack relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-black/70 via-black/55 to-orange-950/30 p-5 ring-1 ring-orange-400/10 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 sm:p-6"
      style={{ boxShadow: shadow, minHeight: "10.5rem" }}
    >
      {/* Ambient corner glow */}
      <span
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/15 blur-3xl transition-opacity duration-300 group-hover/stack:opacity-100"
        aria-hidden
      />

      {/* Top edge highlight */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
        aria-hidden
      />

      <div className="relative flex gap-4 sm:gap-5">
        <div className={`${dt.iconBox} h-11 w-11 shrink-0 sm:h-12 sm:w-12 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-[22px] sm:[&_svg]:w-[22px]`}>
          <card.icon />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <span className={dt.tag}>{card.tag}</span>
            <span className={dt.number}>{number}</span>
          </div>

          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
            {card.title}
          </h3>
          <p className={`mt-2 leading-relaxed ${dt.body}`}>{card.description}</p>
        </div>
      </div>

      {/* Stack depth bar */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-orange-950/40"
        aria-hidden
      >
        <span
          className="block h-full bg-gradient-to-r from-orange-600/80 to-orange-400/40 transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </article>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M7 18a4 4 0 01-1-7.87 5 5 0 019.9-1A3.5 3.5 0 0117 18H7z" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 14v-2a8 8 0 0116 0v2" strokeLinecap="round" />
      <path d="M4 14a2 2 0 002 2h1v-3H4zm16 0a2 2 0 01-2 2h-1v-3h3z" strokeLinejoin="round" />
      <path d="M10 19h4" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5L10 14l-2.5-2.5L12 10l2.5-0.5z" strokeLinejoin="round" />
    </svg>
  );
}
