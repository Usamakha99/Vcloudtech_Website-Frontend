import { dt } from "@/components/design-test/design-test-theme";

type StackCard = {
  title: string;
  description: string;
  tag: string;
};

const cards: StackCard[] = [
  {
    tag: "Cloud",
    title: "Cloud migration & modernization",
    description:
      "Move workloads with a governed roadmap — assessment, landing zones, and cutover without disrupting operations.",
  },
  {
    tag: "Security",
    title: "Cybersecurity & compliance",
    description:
      "Zero-trust patterns, endpoint protection, and audit-ready controls aligned to your industry requirements.",
  },
  {
    tag: "Procurement",
    title: "Licensing & IT procurement",
    description:
      "Right-size software spend, simplify vendor contracts, and consolidate buying across your global footprint.",
  },
  {
    tag: "Support",
    title: "Managed services & 24/7 ops",
    description:
      "Always-on monitoring, incident response, and platform engineering so your teams focus on outcomes.",
  },
  {
    tag: "Strategy",
    title: "Solutions architecture",
    description:
      "Design sessions, proof-of-concepts, and partner-led roadmaps that connect business goals to technology.",
  },
];

const STICKY_TOP = 88;
const STACK_GAP = 14;
/** Scroll distance between each card stacking step (px) */
const SCROLL_STEP = 300;
/** Vertical overlap between consecutive cards (px) */
const OVERLAP = 96;
/** Space after last card so the stack releases before the next section */
const RELEASE_SPACE = 140;

/**
 * Scroll-driven sticky stack — cards overlap, stack together while scrolling down,
 * and spread apart again when scrolling back up into the section.
 */
export function ScrollStackCardsSection() {
  const runwayHeight =
    (cards.length - 1) * SCROLL_STEP + RELEASE_SPACE;

  return (
    <section
      id="scroll-stack"
      className={`relative z-10 scroll-mt-14 py-12 sm:py-16 ${dt.sectionBorder}`}
      aria-labelledby="scroll-stack-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Scroll stack</p>
          <h2
            id="scroll-stack-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Cards that stack as you scroll
          </h2>
          <p className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed ${dt.headingSub}`}>
            Scroll down — cards wrap into one pile. Scroll back up — they separate again.
          </p>
        </header>

        <div
          className="relative mt-10 sm:mt-14"
          style={{ minHeight: `${runwayHeight}px` }}
        >
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

  return (
    <article
      className={`relative overflow-visible px-6 py-6 transition-[transform,box-shadow,border-color] duration-300 sm:px-7 sm:py-7 ${dt.card}`}
      style={{
        minHeight: "11.5rem",
        transform: `translateX(${(index - (total - 1) / 2) * 4}px)`,
      }}
    >
      <span className={dt.cardTopLine} aria-hidden />

      <div className="flex items-start justify-between gap-4">
        <span className={dt.tag}>{card.tag}</span>
        <span className={dt.number}>{number}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
        {card.title}
      </h3>
      <p className={`mt-2.5 max-w-prose text-sm leading-relaxed ${dt.body}`}>{card.description}</p>

      {/* Stack depth cue — visible when cards overlap */}
      <span
        className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] text-white/20"
        aria-hidden
      >
        {index + 1}/{total}
      </span>
    </article>
  );
}
