import Image from "next/image";
import Link from "next/link";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { dt } from "@/components/marketing/design-test-theme";
import { SERVICES_GRID_ITEMS } from "@/components/services/ServicesGrid";
import { publicAssets } from "@/lib/public-assets";

import "./ai-data-center-orbital.css";

const ICONS = publicAssets.services.solutionIcons;

type OrbitItem = (typeof SERVICES_GRID_ITEMS)[number] & { iconSrc: string };

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

function OrbitCard({
  item,
  side,
  slot,
}: {
  item: OrbitItem;
  side: "left" | "right";
  slot: "top" | "mid" | "bot";
}) {
  return (
    <li className={`ai-orbit__card ai-orbit__card--${side} ai-orbit__card--${slot}`}>
      <span className="ai-orbit__connector" aria-hidden />
      <Link href={item.href} className="ai-orbit__card-inner">
        <span className="ai-orbit__icon-wrap" aria-hidden>
          <Image
            src={item.iconSrc}
            alt=""
            width={128}
            height={128}
            className="ai-orbit__icon-img"
            sizes="80px"
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
            <p className={dt.badge}>Solutions</p>
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
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
