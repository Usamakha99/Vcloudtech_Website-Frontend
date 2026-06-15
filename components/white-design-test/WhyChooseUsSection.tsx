"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { wdt } from "@/components/white-design-test/white-design-test-theme";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HeadsetIcon,
  RocketIcon,
  ShieldIcon,
  HandshakeIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import { TransformationPathLoop } from "@/components/design-test/TransformationPathLoop";

import "./white-why-choose-us.css";

type UspItem = {
  title: string;
  headline: string;
  description: string;
  icon: SectionIcon;
  proofPoints: readonly string[];
};

const uspItems: UspItem[] = [
  {
    title: "Faster procurement",
    headline: "Quote cycles in hours — not weeks",
    description:
      "Enterprise sourcing with documented approvals, vendor accountability, and procurement teams that move at the speed of your roadmap.",
    icon: RocketIcon,
    proofPoints: [
      "Consolidated vendor management",
      "Audit-ready procurement trails",
      "Dedicated account teams",
    ],
  },
  {
    title: "Enterprise security",
    headline: "Governance built into every engagement",
    description:
      "Security and compliance are not add-ons — they are embedded in how we source, deploy, and support your technology stack.",
    icon: ShieldIcon,
    proofPoints: [
      "Zero-trust aligned delivery",
      "Compliance reporting support",
      "Vendor risk accountability",
    ],
  },
  {
    title: "Nationwide scale",
    headline: "One partner from coast to coast",
    description:
      "Warehouse operations, field teams, and logistics that give enterprise buyers confidence their rollout will land everywhere it needs to.",
    icon: HandshakeIcon,
    proofPoints: [
      "50 states & territories",
      "National warehouse network",
      "Consistent service standards",
    ],
  },
  {
    title: "Always-on support",
    headline: "Engineers when it matters most",
    description:
      "24/7 operations with escalation paths, SLA-backed response, and humans who understand your environment — not a ticket black hole.",
    icon: HeadsetIcon,
    proofPoints: [
      "24/7 monitoring & response",
      "Direct engineer escalation",
      "99.9% uptime commitment",
    ],
  },
];

/** Why choose us — enterprise trust showcase with journey and interactive USPs. */
export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const [activeUsp, setActiveUsp] = useState(0);
  const [glow, setGlow] = useState({ x: 50, y: 35, visible: false });
  const [mounted, setMounted] = useState(false);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const journeyInView = useInView(journeyRef, { once: true, margin: "-60px" });

  const animateIn = mounted && sectionInView;
  const journeyActive = mounted && journeyInView;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, visible: true });
  }, []);

  const active = uspItems[activeUsp];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className={`why-choose relative scroll-mt-24 wdt-section--gray py-14 sm:py-18 lg:py-24 ${wdt.sectionBorder}`}
      aria-labelledby="why-choose-us-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setGlow((g) => ({ ...g, visible: false }))}
    >
      <div className="why-choose__grid-bg" aria-hidden />
      <div
        className="why-choose__glow"
        aria-hidden
        style={{
          left: `${glow.x}%`,
          top: `${glow.y}%`,
          opacity: glow.visible ? 1 : 0.35,
        }}
      />
      <div className="why-choose__glow why-choose__glow--secondary" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <motion.header
            className="lg:col-span-5"
            initial={false}
            animate={animateIn ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={animateIn ? undefined : { opacity: 0, y: 20 }}
          >
            <p className={wdt.badge}>Why choose us</p>
            <h2 id="why-choose-us-heading" className="why-choose__headline mt-5">
              Built for teams that{" "}
              <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
                cannot afford guesswork
              </span>
            </h2>
            <p className={`mt-5 max-w-md text-base leading-relaxed ${wdt.headingSub}`}>
              vCloud Tech combines procurement discipline, security governance, and nationwide
              operations — so enterprise IT leaders get outcomes they can defend.
            </p>
          </motion.header>
        </div>

        <div ref={journeyRef} className="why-choose__journey mt-10 sm:mt-12">
          <p className={`mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] ${wdt.metaLabel}`}>
            Your transformation path
          </p>
          <TransformationPathLoop active={journeyActive} />
        </div>

        <div className="why-choose__usp">
          <div className="why-choose__usp-rail" role="tablist" aria-label="Why vCloud Tech">
            <p className={`mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${wdt.metaLabel}`}>
              What sets us apart
            </p>
            {uspItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={activeUsp === index}
                aria-controls="why-choose-usp-panel"
                id={`why-choose-tab-${index}`}
                className={`why-choose__usp-tab ${activeUsp === index ? "is-active" : ""}`}
                onClick={() => setActiveUsp(index)}
                onMouseEnter={() => setActiveUsp(index)}
              >
                <span className="why-choose__usp-tab-rail" aria-hidden />
                <span className="why-choose__usp-tab-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="why-choose__usp-tab-title">{item.title}</span>
                <span className="why-choose__usp-tab-arrow" aria-hidden>
                  →
                </span>
              </button>
            ))}
          </div>

          <div
            id="why-choose-usp-panel"
            role="tabpanel"
            aria-labelledby={`why-choose-tab-${activeUsp}`}
            className="why-choose__usp-stage"
          >
            <span className="why-choose__usp-stage-line" aria-hidden />
            <span className="why-choose__usp-stage-glow" aria-hidden />
            <span className="why-choose__usp-stage-scan" aria-hidden />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                className="why-choose__usp-stage-inner"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={wdt.iconBoxCard}>
                    <ActiveIcon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                  </div>
                  <span className={wdt.number}>{String(activeUsp + 1).padStart(2, "0")}</span>
                </div>

                <p className={`mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E55614]`}>
                  {active.title}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#111A45] sm:text-2xl">
                  {active.headline}
                </h3>
                <p className={`mt-4 max-w-lg text-sm leading-relaxed sm:text-[15px] ${wdt.body}`}>
                  {active.description}
                </p>

                <ul className="why-choose__usp-proof-list">
                  {active.proofPoints.map((point) => (
                    <li key={point} className="why-choose__usp-proof-item">
                      <span className="why-choose__usp-proof-dot" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
