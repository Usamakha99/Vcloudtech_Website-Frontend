"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import type { ContractVehicleDetail } from "@/lib/marketing/contract-vehicle-details";

import "./contract-vehicles-stack.css";

type Props = {
  title: string;
  details: ContractVehicleDetail[];
  onClose: () => void;
};

const detailRows: { key: keyof ContractVehicleDetail; label: string; prominent?: boolean }[] = [
  { key: "contractNumber", label: "Contract No", prominent: true },
  { key: "contractHolder", label: "Contract holder" },
  { key: "region", label: "Region" },
  { key: "manufacturers", label: "Manufacturers / publishers" },
  { key: "description", label: "Description" },
  { key: "term", label: "Term" },
];

const BOX_PEEK = 8;
/** Peel travel — kept modest so cards stay inside the stage on all viewports. */
const PEEL_Y = 96;
const PEEL_X = 28;
const STEP_MS = 380;

function StackDetailRows({ detail }: { detail: ContractVehicleDetail }) {
  return (
    <dl className="cv-stack__list">
      {detailRows.map((row) => (
        <div
          key={row.key}
          className={`cv-stack__row${row.prominent ? " cv-stack__row--prominent" : ""}`}
        >
          <dt>{row.label}</dt>
          <dd>{detail[row.key]}</dd>
        </div>
      ))}
    </dl>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Box-stack contract browser: one card at a time via scroll/swipe/buttons.
 * Discrete steps (no invisible scroll runway) — avoids live jerk and keeps
 * card content fully scrollable on the last page.
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;
  const lastIndex = Math.max(0, details.length - 1);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const activeIndex = Math.min(lastIndex, Math.max(0, Math.round(progress)));

  const applyProgress = useCallback(
    (value: number) => {
      const next = Math.min(lastIndex, Math.max(0, value));
      progressRef.current = next;
      setProgress(next);
    },
    [lastIndex],
  );

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (!multiple) return;
      const target = Math.max(0, Math.min(lastIndex, nextIndex));
      const from = progressRef.current;
      if (Math.abs(from - target) < 0.001) return;

      if (animFrameRef.current != null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      // Long jump (ID chips): land directly — no intermediate flash
      if (Math.abs(target - from) > 1.05) {
        applyProgress(target);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / STEP_MS);
        applyProgress(from + (target - from) * easeOutCubic(t));
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          applyProgress(target);
          animFrameRef.current = null;
        }
      };
      animFrameRef.current = requestAnimationFrame(tick);
    },
    [multiple, lastIndex, applyProgress],
  );

  // Wheel / trackpad: one card per gesture (no continuous scroll mapping = no jerk)
  useEffect(() => {
    if (!multiple) return;
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      // Let the open card's detail list scroll when content overflows
      if (target?.closest(".cv-stack__list")) {
        const list = target.closest(".cv-stack__list") as HTMLElement;
        const atTop = list.scrollTop <= 0;
        const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      event.preventDefault();
      if (wheelLockRef.current || animFrameRef.current != null) return;

      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 10) return;

      wheelLockRef.current = true;
      const current = Math.round(progressRef.current);
      if (delta > 0) goToIndex(current + 1);
      else goToIndex(current - 1);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, STEP_MS + 60);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [multiple, goToIndex]);

  // Touch swipe: up = next, down = previous
  useEffect(() => {
    if (!multiple) return;
    const stage = stageRef.current;
    if (!stage) return;

    let startX = 0;
    let startY = 0;

    const onStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
      startY = event.touches[0]?.clientY ?? 0;
    };

    const onEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return;

      const current = Math.round(progressRef.current);
      if (dy < 0) goToIndex(current + 1);
      else goToIndex(current - 1);
    };

    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchend", onEnd);
    };
  }, [multiple, goToIndex]);

  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
    if (animFrameRef.current != null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, [details.length, details[0]?.contractNumber]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current != null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      className={`cv-stack cv-stack--deck${multiple ? " cv-stack--multi" : ""}`}
      role="region"
      aria-label={`${title} contract details`}
    >
      <div className="cv-stack__header">
        <div className="cv-stack__header-copy">
          <p className="cv-stack__eyebrow">Contract</p>
          <h3 className="cv-stack__title">{title}</h3>
          {multiple ? (
            <p className="cv-stack__meta">{details.length} contracts</p>
          ) : null}
        </div>
        <button type="button" className="cv-stack__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      {multiple ? (
        <>
          <div className="cv-stack__id-bar" role="tablist" aria-label="Select contract by ID">
            {details.map((detail, index) => (
              <button
                key={`id-${detail.contractNumber}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={`cv-stack__id-chip${index === activeIndex ? " cv-stack__id-chip--active" : ""}`}
                onClick={() => goToIndex(index)}
              >
                <span className="cv-stack__id-chip-n">{index + 1}</span>
                <span className="cv-stack__id-chip-id">{detail.contractNumber}</span>
              </button>
            ))}
          </div>

          <div className="cv-stack__controls">
            <button
              type="button"
              className="cv-stack__nav-btn"
              onClick={() => goToIndex(Math.round(progressRef.current) - 1)}
              disabled={progress <= 0.02}
              aria-label="Previous contract"
            >
              ↑
            </button>
            <p className="cv-stack__controls-label" aria-live="polite">
              {activeIndex + 1} / {details.length}
            </p>
            <button
              type="button"
              className="cv-stack__nav-btn"
              onClick={() => goToIndex(Math.round(progressRef.current) + 1)}
              disabled={progress >= lastIndex - 0.02}
              aria-label="Next contract"
            >
              ↓
            </button>
          </div>

          <div ref={stageRef} className="cv-stack__deck-stage">
            <div
              className="cv-stack__deck"
              style={{ ["--cv-stack-count"]: details.length } as CSSProperties}
            >
              {details.map((detail, index) => {
                const offset = progress - index;
                let layer: "under" | "front" | "peeling" | "gone" = "under";
                let tx = 0;
                let ty = 0;
                let scale = 1;
                let zIndex = details.length - index + 2;

                if (offset >= 1) {
                  layer = "gone";
                  tx = PEEL_X;
                  ty = PEEL_Y;
                  scale = 0.96;
                  zIndex = 0;
                } else if (offset > 0.001) {
                  layer = "peeling";
                  tx = PEEL_X * offset;
                  ty = PEEL_Y * offset;
                  scale = 1;
                  zIndex = details.length + 10;
                } else if (offset > -0.001) {
                  layer = "front";
                  tx = 0;
                  ty = 0;
                  scale = 1;
                  zIndex = details.length + 5;
                } else {
                  layer = "under";
                  const depth = Math.min(2, -offset);
                  tx = -BOX_PEEK * depth * 0.35;
                  ty = -BOX_PEEK * depth * 0.35;
                  scale = 1 - depth * 0.015;
                  zIndex = details.length - index;
                }

                const showContent =
                  layer === "front" ||
                  layer === "peeling" ||
                  (layer === "under" && offset > -1.15);

                return (
                  <article
                    key={detail.contractNumber}
                    className={`cv-stack__card cv-stack__card--deck cv-stack__card--${layer}`}
                    style={
                      {
                        zIndex,
                        transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                      } as CSSProperties
                    }
                    aria-label={`Contract ${detail.contractNumber}`}
                    aria-hidden={layer === "gone" ? true : undefined}
                  >
                    <div className="cv-stack__card-inner">
                      <header className="cv-stack__card-head">
                        <p className="cv-stack__card-label">
                          <strong>
                            Contract {index + 1} of {details.length}
                          </strong>
                        </p>
                        <h4 className="cv-stack__card-number">
                          <strong>{detail.contractNumber}</strong>
                        </h4>
                      </header>
                      {showContent ? (
                        <StackDetailRows detail={detail} />
                      ) : (
                        <div className="cv-stack__card-blank" aria-hidden />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="cv-stack__single">
          <article
            className="cv-stack__card cv-stack__card--deck"
            aria-label={`Contract ${details[0]?.contractNumber}`}
          >
            <div className="cv-stack__card-inner">
              <header className="cv-stack__card-head">
                <h4 className="cv-stack__card-number">
                  <strong>{details[0]?.contractNumber}</strong>
                </h4>
              </header>
              {details[0] ? <StackDetailRows detail={details[0]} /> : null}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
