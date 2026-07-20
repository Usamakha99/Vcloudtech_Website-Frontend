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

/** Box-stack peek (back plate offset) — like stacked squares icon. */
const BOX_PEEK = 10;
/** How far a card travels down when peeled off the stack. */
const PEEL_Y = 140;
/** Slight horizontal drift while peeling (crossing motion). */
const PEEL_X = 36;

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

/**
 * Box-stack deck: all cards piled in one place.
 * Scroll down → front cards peel/cross downward; scroll up → restack.
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [peelProgress, setPeelProgress] = useState(0);

  const syncFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !multiple) return;

    const max = scroller.scrollHeight - scroller.clientHeight;
    if (max <= 0) {
      setActiveIndex(0);
      setPeelProgress(0);
      return;
    }

    const raw = scroller.scrollTop / max;
    const segments = Math.max(1, details.length - 1);
    const scaled = raw * segments;
    const index = Math.min(details.length - 1, Math.floor(scaled));
    const local = scaled - index;

    setActiveIndex(index);
    setPeelProgress(local);
  }, [multiple, details.length]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller || !multiple) return;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const segments = Math.max(1, details.length - 1);
      const target = segments === 0 ? 0 : (index / segments) * max;
      scroller.scrollTo({ top: target, behavior: "smooth" });
    },
    [multiple, details.length],
  );

  useEffect(() => {
    if (!multiple) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    syncFromScroll();
    scroller.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    return () => {
      scroller.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [multiple, details.length, syncFromScroll]);

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
            <p className="cv-stack__meta">
              {details.length} contracts · scroll to browse
            </p>
          ) : null}
        </div>
        <button type="button" className="cv-stack__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      {multiple ? (
        <>
          <div className="cv-stack__controls">
            <button
              type="button"
              className="cv-stack__nav-btn"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex <= 0 && peelProgress < 0.05}
              aria-label="Previous contract"
            >
              ↑
            </button>
            <div className="cv-stack__rail" aria-hidden>
              {details.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  className={`cv-stack__dot${index === activeIndex ? " cv-stack__dot--active" : ""}`}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Go to contract ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="cv-stack__nav-btn"
              onClick={() => scrollToIndex(Math.min(details.length - 1, activeIndex + 1))}
              disabled={activeIndex >= details.length - 1}
              aria-label="Next contract"
            >
              ↓
            </button>
          </div>

          <div className="cv-stack__deck-stage">
            <div
              className="cv-stack__deck"
              style={
                {
                  ["--cv-stack-count"]: details.length,
                  ["--cv-box-peek"]: `${BOX_PEEK}px`,
                } as CSSProperties
              }
            >
              {/* Decorative back frames — box-stack silhouette */}
              <span className="cv-stack__box-frame cv-stack__box-frame--2" aria-hidden />
              <span className="cv-stack__box-frame cv-stack__box-frame--1" aria-hidden />

              {details.map((detail, index) => {
                let layer: "under" | "front" | "peeling" | "gone" = "under";
                let tx = 0;
                let ty = 0;
                let scale = 1;

                if (index < activeIndex) {
                  layer = "gone";
                  tx = PEEL_X * (0.6 + (activeIndex - index) * 0.15);
                  ty = PEEL_Y * (1.15 + (activeIndex - index) * 0.2);
                  scale = 0.96;
                } else if (index === activeIndex) {
                  layer = peelProgress > 0.02 ? "peeling" : "front";
                  tx = PEEL_X * peelProgress;
                  ty = PEEL_Y * peelProgress;
                  scale = 1;
                } else {
                  layer = "under";
                  const depth = index - activeIndex;
                  tx = -BOX_PEEK * Math.min(depth, 2) * 0.35;
                  ty = -BOX_PEEK * Math.min(depth, 2) * 0.35;
                  scale = 1 - depth * 0.015;
                }

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
                    aria-hidden={
                      layer === "gone" || (layer === "under" && index !== activeIndex + 1)
                        ? true
                        : undefined
                    }
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
                      {layer === "front" ||
                      layer === "peeling" ||
                      index === activeIndex + 1 ? (
                        <StackDetailRows detail={detail} />
                      ) : (
                        <div className="cv-stack__card-blank" aria-hidden />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Invisible scroll runway drives peel progress */}
            <div
              ref={scrollerRef}
              className="cv-stack__scroll-drive"
              style={{ ["--cv-stack-count"]: details.length } as CSSProperties}
              tabIndex={0}
              aria-label="Scroll to browse contracts in the stack"
            >
              <div className="cv-stack__scroll-runway" />
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
