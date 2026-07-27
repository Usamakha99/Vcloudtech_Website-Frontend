"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
 * Paths dock flush to the card edge (x=0 / x=200) and land on the globe.
 * All rows use the same swoop style; mid bows gently into the equator.
 * viewBox 0 0 200 120
 */
const CONNECTOR_PATHS: Record<OrbitSide, Record<OrbitSlot, string>> = {
  left: {
    top: "M 0 0 C 70 8, 145 48, 198 112",
    mid: "M 0 60 C 70 40, 145 40, 198 60",
    bot: "M 0 120 C 70 112, 145 72, 198 8",
  },
  right: {
    top: "M 200 0 C 130 8, 55 48, 2 112",
    mid: "M 200 60 C 130 40, 55 40, 2 60",
    bot: "M 200 120 C 130 112, 55 72, 2 8",
  },
};

const CONNECTOR_ENDS: Record<OrbitSide, Record<OrbitSlot, { x: number; y: number }>> = {
  left: { top: { x: 198, y: 112 }, mid: { x: 198, y: 60 }, bot: { x: 198, y: 8 } },
  right: { top: { x: 2, y: 112 }, mid: { x: 2, y: 60 }, bot: { x: 2, y: 8 } },
};

const PULSE_DELAYS: Record<OrbitSide, Record<OrbitSlot, string>> = {
  left: { top: "0s", mid: "0.45s", bot: "0.9s" },
  right: { top: "0.2s", mid: "0.65s", bot: "1.1s" },
};

function OrbitCard({
  item,
  side,
  slot,
  onActivate,
  onDeactivate,
  isActive,
}: {
  item: OrbitItem;
  side: OrbitSide;
  slot: OrbitSlot;
  onActivate: () => void;
  onDeactivate: () => void;
  isActive: boolean;
}) {
  const path = CONNECTOR_PATHS[side][slot];
  const end = CONNECTOR_ENDS[side][slot];
  const pulseDelay = PULSE_DELAYS[side][slot];

  return (
    <li
      className={`ai-orbit__card ai-orbit__card--${side} ai-orbit__card--${slot}${
        isActive ? " ai-orbit__card--active" : ""
      }`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
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
  const [previewItem, setPreviewItem] = useState<OrbitItem | null>(null);
  const [previewSlot, setPreviewSlot] = useState<OrbitSlot | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const activate = (item: OrbitItem, slot: OrbitSlot) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setPreviewItem(item);
    setPreviewSlot(slot);
    setPreviewVisible(true);
  };

  const deactivate = () => {
    setPreviewVisible(false);
    /* Keep content mounted through fade-out so hide doesn't jerk */
    hideTimerRef.current = setTimeout(() => {
      setPreviewItem(null);
      setPreviewSlot(null);
      hideTimerRef.current = null;
    }, 280);
  };

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
            {LEFT_ITEMS.map((item, i) => {
              const slot = (["top", "mid", "bot"] as const)[i];
              return (
                <OrbitCard
                  key={item.href}
                  item={item}
                  side="left"
                  slot={slot}
                  isActive={previewVisible && previewItem?.href === item.href}
                  onActivate={() => activate(item, slot)}
                  onDeactivate={deactivate}
                />
              );
            })}
          </ul>

          <div className="ai-orbit__globe-wrap" aria-hidden={!previewVisible}>
            <div className="ai-orbit__globe-occluder" />
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

            <div
              className={[
                "ai-orbit__globe-preview",
                previewVisible ? "ai-orbit__globe-preview--visible" : "",
                previewSlot ? `ai-orbit__globe-preview--${previewSlot}` : "ai-orbit__globe-preview--mid",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-live="polite"
            >
              {previewItem ? (
                <>
                  <p className="ai-orbit__globe-preview-title">{previewItem.title}</p>
                  <p className="ai-orbit__globe-preview-desc">{previewItem.description}</p>
                  {previewItem.bullets && previewItem.bullets.length > 0 ? (
                    <ul className="ai-orbit__globe-preview-list">
                      {previewItem.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>

          <ul className="ai-orbit__col ai-orbit__col--right" aria-label="AI solutions right">
            {RIGHT_ITEMS.map((item, i) => {
              const slot = (["top", "mid", "bot"] as const)[i];
              return (
                <OrbitCard
                  key={item.href}
                  item={item}
                  side="right"
                  slot={slot}
                  isActive={previewVisible && previewItem?.href === item.href}
                  onActivate={() => activate(item, slot)}
                  onDeactivate={deactivate}
                />
              );
            })}
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
