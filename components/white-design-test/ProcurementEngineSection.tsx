"use client";

import Link from "next/link";
import { wdt, wdtCta } from "@/components/white-design-test/white-design-test-theme";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";


import {
  CartIcon,
  CloudIcon,
  HeadsetIcon,
  RocketIcon,
  ShieldIcon,
} from "@/components/icons/section-icons";

import "./white-platform-ecosystem.css";

const ecosystemNodes = [
  {
    id: "hardware",
    title: "IT Hardware & Procurement",
    detail:
      "Source laptops, servers, networking, and electronics — request quotes and buy through our enterprise marketplace.",
    href: "/procurement",
    x: 50,
    y: 11,
    icon: CartIcon,
    tag: "Procurement",
  },
  {
    id: "ai",
    title: "AI Marketplace",
    detail: "Discover, evaluate, and deploy AI agents and solutions for real business outcomes.",
    href: "/solutions/data-ai",
    x: 81,
    y: 21,
    icon: AiIcon,
    tag: "Marketplace",
  },
  {
    id: "security",
    title: "Cybersecurity",
    detail: "Zero-trust architecture, compliance alignment, and continuous threat protection.",
    href: "/solutions/cybersecurity",
    x: 81,
    y: 79,
    icon: ShieldIcon,
    tag: "Services",
  },
  {
    id: "cloud",
    title: "Cloud Services",
    detail: "Migration, modernization, and resilient multi-cloud operations at enterprise scale.",
    href: "/solutions/cloud-infrastructure",
    x: 50,
    y: 89,
    icon: CloudIcon,
    tag: "Services",
  },
  {
    id: "devops",
    title: "DevOps Solutions",
    detail: "CI/CD pipelines, infrastructure automation, and accelerated release velocity.",
    href: "/services",
    x: 19,
    y: 79,
    icon: RocketIcon,
    tag: "Services",
  },
  {
    id: "managed",
    title: "Managed IT Services",
    detail: "24/7 operations, monitoring, and expert support for mission-critical systems.",
    href: "/services",
    x: 19,
    y: 21,
    icon: HeadsetIcon,
    tag: "Services",
  },
] as const;

const activityFeed = [
  { tag: "Procurement", event: "Enterprise quote request — 120-unit laptop rollout" },
  { tag: "AI", event: "New AI agent listed — document intelligence suite" },
  { tag: "Cloud", event: "Migration assessment scheduled for enterprise tenant" },
  { tag: "Security", event: "Posture review completed — compliance report ready" },
] as const;

const ringPath = "M 50 11 L 81 21 L 81 79 L 50 89 L 19 79 L 19 21 Z";

/** V Cloud Tech unified platform ecosystem — marketplaces + services. */
export function ProcurementEngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 40, visible: false });
  const [mounted, setMounted] = useState(false);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const animateIn = mounted && isInView;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform-ecosystem"
      className={`vc-ecosystem scroll-mt-24 wdt-section--white py-14 sm:py-16 lg:py-24 ${wdt.sectionBorder}`}
      aria-labelledby="platform-ecosystem-heading"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, visible: false }))}
    >
      <div className="vc-ecosystem__grid-bg" aria-hidden />
      <div
        className="vc-ecosystem__cursor-glow"
        aria-hidden
        style={{
          left: `${glow.x}%`,
          top: `${glow.y}%`,
          opacity: glow.visible ? 1 : 0,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="max-w-3xl"
          initial={false}
          animate={animateIn ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={wdt.badge}>Platform ecosystem</p>
          <h2 id="platform-ecosystem-heading" className="vc-ecosystem__headline mt-5">
            One platform.{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Every technology layer.
            </span>
          </h2>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${wdt.headingSub}`}>
            V Cloud Tech is a unified technology platform — procurement and marketplaces to source
            IT hardware and AI solutions, plus expert services to deploy, secure, and run your
            stack. One partner for buying, building, and operating enterprise technology.
          </p>
        </motion.header>

        <motion.ul
          className="vc-ecosystem__pillars mt-8 sm:mt-10"
          aria-label="How V Cloud Tech works"
          initial={false}
          animate={animateIn ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <li className="vc-ecosystem__pillar">
            <span className="vc-ecosystem__pillar-index">01</span>
            <span className="vc-ecosystem__pillar-title">Procure</span>
            <span className="vc-ecosystem__pillar-desc">
              Hardware marketplace, quotes, and IT sourcing
            </span>
          </li>
          <li className="vc-ecosystem__pillar">
            <span className="vc-ecosystem__pillar-index">02</span>
            <span className="vc-ecosystem__pillar-title">Discover</span>
            <span className="vc-ecosystem__pillar-desc">
              AI agents and solutions marketplace
            </span>
          </li>
          <li className="vc-ecosystem__pillar">
            <span className="vc-ecosystem__pillar-index">03</span>
            <span className="vc-ecosystem__pillar-title">Operate</span>
            <span className="vc-ecosystem__pillar-desc">
              Cloud, security, DevOps, and managed IT
            </span>
          </li>
        </motion.ul>

        <motion.div
          className="vc-ecosystem__stage mt-8 sm:mt-10"
          initial={false}
          animate={animateIn ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="vc-ecosystem__stage-line" aria-hidden />

          <div className="vc-ecosystem__stage-inner">
            <div className="vc-ecosystem__canvas" aria-label="V Cloud Tech service ecosystem">
              <div className="vc-ecosystem__scene">
                <EcosystemSvg active={animateIn} />

                <div className="vc-ecosystem__hub">
                  <span className="vc-ecosystem__hub-brand">V Cloud Tech</span>
                  <p className="vc-ecosystem__hub-title">Procurement · Marketplaces · Services</p>
                </div>

                <div className="vc-ecosystem__nodes">
                  {ecosystemNodes.map((node, i) => (
                    <EcosystemNode key={node.id} node={node} index={i} active={animateIn} />
                  ))}
                </div>
              </div>

              <div className="vc-ecosystem__stack">
                {ecosystemNodes.map((node) => (
                  <EcosystemStackCard key={node.id} node={node} />
                ))}
              </div>
            </div>

            <ActivityPanel active={animateIn} />
          </div>
        </motion.div>

        <motion.div
          className="vc-ecosystem__vision"
          initial={false}
          animate={animateIn ? { opacity: 1 } : undefined}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="vc-ecosystem__vision-badge">Roadmap</span>
          <p className={`text-sm leading-relaxed ${wdt.body}`}>
            <span className="font-medium text-[#111A45]">Today:</span> procurement through our hardware
            marketplace and sourcing team — quotes, catalog search, and enterprise IT buying.{" "}
            <span className="font-medium text-[#111A45]">Coming soon:</span> a unified procurement
            engine with automated approvals, vendor workflows, and spend analytics across the
            platform.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center"
          initial={false}
          animate={animateIn ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Link
            href="/procurement"
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold text-white shadow-lg shadow-[#E55614]/20 transition duration-300 ${wdtCta.bg} ${wdtCta.bgHover}`}
          >
            Start procurement
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/solutions"
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#111A45/10] bg-white px-8 text-sm font-semibold text-[#111A45] transition duration-300 hover:border-[#E55614]/40 hover:bg-[#E55614]/5`}
          >
            Explore services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ActivityPanel({ active }: { active: boolean }) {
  return (
    <div className="vc-ecosystem__activity">
      <div className="vc-ecosystem__activity-header">
        <span className="vc-ecosystem__activity-live">Platform activity</span>
        <span className={`text-[10px] font-mono ${wdt.statLabel}`}>ECO-LIVE</span>
      </div>
      <ul className="vc-ecosystem__activity-list">
        {activityFeed.map((item, i) => (
          <motion.li
            key={item.event}
            className="vc-ecosystem__activity-item"
            initial={false}
            animate={active ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.32 + i * 0.09, duration: 0.45 }}
          >
            <span className="vc-ecosystem__activity-tag">{item.tag}</span>
            <span className="text-xs leading-snug text-[#111A45]">{item.event}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function EcosystemSvg({ active }: { active: boolean }) {
  const hubPaths = ecosystemNodes.map((n) => `M ${n.x} ${n.y} L 50 50`);

  return (
    <svg
      className="vc-ecosystem__canvas-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <path d={ringPath} className="vc-ecosystem__path" />
      {hubPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          className={`vc-ecosystem__path vc-ecosystem__path--hub ${
            active && i % 2 === 0 ? "vc-ecosystem__path--active" : ""
          }`}
        />
      ))}
      {active && (
        <>
          <circle r="1.1" className="vc-ecosystem__particle">
            <animateMotion dur="9s" repeatCount="indefinite" path={ringPath} />
          </circle>
          <circle r="0.85" className="vc-ecosystem__particle" opacity="0.75">
            <animateMotion dur="5.5s" repeatCount="indefinite" path={hubPaths[0]} />
          </circle>
          <circle r="0.85" className="vc-ecosystem__particle" opacity="0.75">
            <animateMotion dur="6s" repeatCount="indefinite" path={hubPaths[3]} begin="1.2s" />
          </circle>
        </>
      )}
    </svg>
  );
}

function EcosystemNode({
  node,
  index,
  active,
}: {
  node: (typeof ecosystemNodes)[number];
  index: number;
  active: boolean;
}) {
  const Icon = node.icon;

  return (
    <motion.div
      className="vc-ecosystem__node"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={false}
      animate={active ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay: 0.28 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={node.href} className="vc-ecosystem__node-card">
        <span className="vc-ecosystem__node-shine" aria-hidden />
        <span className="vc-ecosystem__node-icon">
          <Icon />
        </span>
        <span className="vc-ecosystem__node-title">{node.title}</span>
        <span className="vc-ecosystem__node-detail">{node.detail}</span>
      </Link>
    </motion.div>
  );
}

function EcosystemStackCard({ node }: { node: (typeof ecosystemNodes)[number] }) {
  const Icon = node.icon;

  return (
    <Link href={node.href} className="vc-ecosystem__node-card">
      <span className="vc-ecosystem__node-shine" aria-hidden />
      <div className="flex items-start gap-3">
        <span className="vc-ecosystem__node-icon">
          <Icon />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#E55614]">{node.tag}</p>
          <p className="mt-1 text-sm font-semibold text-[#111A45]">{node.title}</p>
          <p className={`mt-1 text-xs ${wdt.body}`}>{node.detail}</p>
        </div>
      </div>
    </Link>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h6M9 12h4M9 15h6" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
