import Image from "next/image";
import Link from "next/link";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { dt } from "@/components/marketing/design-test-theme";
import { SERVICES_GRID_ITEMS } from "@/components/services/ServicesGrid";
import { publicAssets } from "@/lib/public-assets";

import "./ai-data-center-orbital.css";

const ICONS = publicAssets.services.solutionIcons;

type OrbitItem = (typeof SERVICES_GRID_ITEMS)[number] & { iconSrc: string };
type OrbitSlot = "top" | "mid" | "bot";
type OrbitSide = "left" | "right";

/**
 * Design image 1 order + Solution icons by visual meaning:
 * Left: AI chip (6), shield (4), power/server (2)
 * Right: racks (5), router (3), lifecycle (1)
 */
const LEFT_ITEMS: readonly OrbitItem[] = [
  { ...SERVICES_GRID_ITEMS[0], iconSrc: ICONS.aiProcurement },
  { ...SERVICES_GRID_ITEMS[3], iconSrc: ICONS.cybersecurity },
  { ...SERVICES_GRID_ITEMS[4], iconSrc: ICONS.powerInfrastructure },
];

const RIGHT_ITEMS: readonly OrbitItem[] = [
  { ...SERVICES_GRID_ITEMS[1], iconSrc: ICONS.dataCenterHardware },
  { ...SERVICES_GRID_ITEMS[2], iconSrc: ICONS.networking },
  { ...SERVICES_GRID_ITEMS[5], iconSrc: ICONS.lifecycleManagement },
];

/**
 * Mid = flat line into the globe equator. Top/bot cards sit above/below the sphere,
 * so their lines swoop gently down/up to land on the globe's upper/lower flank
 * (viewBox 0 0 200 120).
 */
const CONNECTOR_PATHS: Record<OrbitSide, Record<OrbitSlot, string>> = {
  left: {
    top: "M 4 8 C 80 14, 150 44, 194 110",
    mid: "M 4 60 C 70 54, 130 54, 196 60",
    bot: "M 4 112 C 80 106, 150 76, 194 10",
  },
  right: {
    top: "M 196 8 C 120 14, 50 44, 6 110",
    mid: "M 196 60 C 130 54, 70 54, 4 60",
    bot: "M 196 112 C 120 106, 50 76, 6 10",
  },
};

const CONNECTOR_ENDS: Record<OrbitSide, Record<OrbitSlot, { x: number; y: number }>> = {
  left: { top: { x: 194, y: 110 }, mid: { x: 196, y: 60 }, bot: { x: 194, y: 10 } },
  right: { top: { x: 6, y: 110 }, mid: { x: 4, y: 60 }, bot: { x: 6, y: 10 } },
};

const PULSE_DELAYS: Record<OrbitSide, Record<OrbitSlot, string>> = {
  left: { top: "0s", mid: "0.45s", bot: "0.9s" },
  right: { top: "0.2s", mid: "0.65s", bot: "1.1s" },
};

function OrbitCard({
  item,
  side,
  slot,
}: {
  item: OrbitItem;
  side: OrbitSide;
  slot: OrbitSlot;
}) {
  const path = CONNECTOR_PATHS[side][slot];
  const end = CONNECTOR_ENDS[side][slot];
  const pulseDelay = PULSE_DELAYS[side][slot];

  return (
    <li className={`ai-orbit__card ai-orbit__card--${side} ai-orbit__card--${slot}`}>
      <span className="ai-orbit__connector" aria-hidden>
        <svg
          className="ai-orbit__connector-svg"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="ai-orbit__connector-path" d={path} />
          <circle className="ai-orbit__connector-endpoint" r="3.2" cx={end.x} cy={end.y} />
          <circle className="ai-orbit__connector-pulse" r="2.4" cx="0" cy="0">
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              path={path}
              begin={pulseDelay}
              calcMode="linear"
            />
          </circle>
        </svg>
        <span className="ai-orbit__connector-card-node" />
      </span>
      <Link href={item.href} className="ai-orbit__card-inner">
        <span className="ai-orbit__icon-wrap" aria-hidden>
          <Image
            src={item.iconSrc}
            alt=""
            width={128}
            height={128}
            className="ai-orbit__icon-img"
            sizes="96px"
          />
        </span>
        <span className="ai-orbit__card-copy">
          <span className="ai-orbit__card-title">{item.title}</span>
          <span className="ai-orbit__card-rule" aria-hidden />
        </span>
      </Link>
    </li>
  );
}

/** Circular / orbital AI Data Center Solution section (homepage). */
export function AiDataCenterOrbitalSection() {
  return (
    <section
      id="solutions"
      className={`ai-orbit ${dt.sectionBorder}`}
      aria-labelledby="ai-orbit-heading"
      data-nav-surface="dark"
    >
      <div className="ai-orbit__inner">
        <header className="ai-orbit__header">
          <DtScrollReveal>
            <p className={`${dt.badge} ai-orbit__badge`}>Solutions</p>
            <h2 id="ai-orbit-heading" className="ai-orbit__headline">
              AI Data Center Solution
            </h2>
            <p className="ai-orbit__lede">
              Empowering enterprises with AI Data Center Solutions designed to deliver performance,
              reliability, and scalability across every stage of the infrastructure lifecycle.
            </p>
          </DtScrollReveal>
        </header>

        <div className="ai-orbit__stage">
          <ul className="ai-orbit__col ai-orbit__col--left" aria-label="AI solutions left">
            {LEFT_ITEMS.map((item, i) => (
              <OrbitCard
                key={item.href}
                item={item}
                side="left"
                slot={(["top", "mid", "bot"] as const)[i]}
              />
            ))}
          </ul>

          <div className="ai-orbit__globe-wrap" aria-hidden>
            <div className="ai-orbit__globe-vignette" />
            <div className="ai-orbit__globe-glow" />
            <div className="ai-orbit__globe">
              <Image
                src={publicAssets.services.aiDataCenterGlobe}
                alt=""
                fill
                className="ai-orbit__globe-img"
                sizes="(max-width: 1023px) 94vw, 44rem"
                priority={false}
              />
            </div>
          </div>

          <ul className="ai-orbit__col ai-orbit__col--right" aria-label="AI solutions right">
            {RIGHT_ITEMS.map((item, i) => (
              <OrbitCard
                key={item.href}
                item={item}
                side="right"
                slot={(["top", "mid", "bot"] as const)[i]}
              />
            ))}
          </ul>
        </div>

        <div className="ai-orbit__cta-wrap">
          <Link href="/solutions" className="ai-orbit__cta">
            View all solutions
            <span className="ai-orbit__cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
