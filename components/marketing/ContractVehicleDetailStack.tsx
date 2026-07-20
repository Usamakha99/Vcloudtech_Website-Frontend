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

const BOX_PEEK = 10;
const PEEL_Y = 140;
const PEEL_X = 36;
/** Adjacent step duration (ms). */
const STEP_MS = 320;
/** Long jump (skip cards) — quick settle, no middle-card flash. */
const JUMP_MS = 180;

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

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Continuous stack progress: 0 = first card front, N-1 = last card front.
 * Scroll and buttons drive the same value — no snap/jerk between systems.
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;
  const lastIndex = Math.max(0, details.length - 1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const drivingRef = useRef<"scroll" | "button" | null>(null);
  const [progress, setProgress] = useState(0);

  const activeIndex = Math.min(lastIndex, Math.max(0, Math.round(progress)));

  const applyProgress = useCallback((value: number) => {
    const next = Math.min(lastIndex, Math.max(0, value));
    progressRef.current = next;
    setProgress(next);
  }, [lastIndex]);

  const syncScrollerToProgress = useCallback(
    (value: number, smooth: boolean) => {
      const scroller = scrollerRef.current;
      if (!scroller || !multiple) return;
      const max = scroller.scrollHeight - scroller.clientHeight;
      if (max <= 0) return;
      const top = lastIndex === 0 ? 0 : (value / lastIndex) * max;
      if (smooth) {
        scroller.scrollTo({ top, behavior: "smooth" });
      } else {
        scroller.scrollTop = top;
      }
    },
    [multiple, lastIndex],
  );

  const syncProgressFromScroll = useCallback(() => {
    if (drivingRef.current === "button") return;
    const scroller = scrollerRef.current;
    if (!scroller || !multiple) return;

    const max = scroller.scrollHeight - scroller.clientHeight;
    if (max <= 0) return;

    drivingRef.current = "scroll";
    const raw = Math.min(1, Math.max(0, scroller.scrollTop / max));
    applyProgress(raw * lastIndex);
    // release on next frame so button clicks aren't blocked forever
    requestAnimationFrame(() => {
      if (drivingRef.current === "scroll") drivingRef.current = null;
    });
  }, [multiple, lastIndex, applyProgress]);

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

      drivingRef.current = "button";
      const distance = Math.abs(target - from);

      // Jumping across cards (e.g. 1 → 4): land directly — no flash of #2/#3
      if (distance > 1.05) {
        applyProgress(target);
        syncScrollerToProgress(target, false);
        window.setTimeout(() => {
          drivingRef.current = null;
        }, JUMP_MS);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / STEP_MS);
        const eased = easeInOutCubic(t);
        const value = from + (target - from) * eased;
        applyProgress(value);
        syncScrollerToProgress(value, false);

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          applyProgress(target);
          syncScrollerToProgress(target, false);
          animFrameRef.current = null;
          drivingRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [multiple, lastIndex, applyProgress, syncScrollerToProgress],
  );

  useEffect(() => {
    if (!multiple) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    syncProgressFromScroll();
    scroller.addEventListener("scroll", syncProgressFromScroll, { passive: true });
    window.addEventListener("resize", syncProgressFromScroll);
    return () => {
      scroller.removeEventListener("scroll", syncProgressFromScroll);
      window.removeEventListener("resize", syncProgressFromScroll);
      if (animFrameRef.current != null) cancelAnimationFrame(animFrameRef.current);
    };
  }, [multiple, details.length, syncProgressFromScroll]);

  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
    drivingRef.current = null;
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = 0;
  }, [details.length, details[0]?.contractNumber]);

  return (
    <div
      className={`cv-stack cv-stack--deck${multiple ? " cv-stack--multi" : ""}`}
      role="region"
      aria-label={`${title} contract details`}
    >
      <div className="cv-stack__header">
        <div className="cv-stack__header-copy">
          <p className="cv-stack__eyebrow">Contract vehicle</p>
          <h3 className="cv-stack__title">{title}</h3>
          {multiple ? (
            <p className="cv-stack__meta">{details.length} contracts · scroll to browse</p>
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

          <div className="cv-stack__deck-stage">
            <div
              className="cv-stack__deck"
              style={{ ["--cv-stack-count"]: details.length } as CSSProperties}
            >
              <span className="cv-stack__box-frame cv-stack__box-frame--2" aria-hidden />
              <span className="cv-stack__box-frame cv-stack__box-frame--1" aria-hidden />

              {details.map((detail, index) => {
                const offset = progress - index;
                let layer: "under" | "front" | "peeling" | "gone" = "under";
                let tx = 0;
                let ty = 0;
                let scale = 1;

                if (offset >= 1) {
                  layer = "gone";
                  tx = PEEL_X;
                  ty = PEEL_Y;
                  scale = 0.96;
                } else if (offset > 0.001) {
                  layer = "peeling";
                  tx = PEEL_X * offset;
                  ty = PEEL_Y * offset;
                  scale = 1;
                } else if (offset > -0.001) {
                  layer = "front";
                  tx = 0;
                  ty = 0;
                  scale = 1;
                } else {
                  layer = "under";
                  const depth = Math.min(2, -offset);
                  tx = -BOX_PEEK * depth * 0.35;
                  ty = -BOX_PEEK * depth * 0.35;
                  scale = 1 - depth * 0.015;
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
                        zIndex: details.length - index + 2,
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

            <div
              ref={scrollerRef}
              className="cv-stack__scroll-drive"
              style={{ ["--cv-stack-count"]: details.length } as CSSProperties}
              tabIndex={0}
              aria-label="Scroll to browse contracts in the stack"
            >
              <div
                className="cv-stack__scroll-runway"
                style={{ height: `${Math.max(2, details.length) * 120}%` }}
              />
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
