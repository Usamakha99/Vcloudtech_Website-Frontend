"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
const FORWARD_Y = 108;
const FORWARD_X = 36;
const FORWARD_STEP = 10;
const STEP_MS = 420;

type Layer = "under" | "front" | "peeling" | "forward";

function layoutForOffset(offset: number, index: number, count: number) {
  let layer: Layer = "under";
  let tx = 0;
  let ty = 0;
  let scale = 1;
  let zIndex = count - index + 2;

  if (offset >= 1) {
    layer = "forward";
    const depth = Math.min(4, offset);
    tx = FORWARD_X + (depth - 1) * FORWARD_STEP * 0.35;
    ty = FORWARD_Y + (depth - 1) * FORWARD_STEP;
    scale = 0.97 - Math.min(0.04, (depth - 1) * 0.01);
    zIndex = Math.max(1, count - Math.floor(depth));
  } else if (offset > 0) {
    layer = "peeling";
    tx = FORWARD_X * offset;
    ty = FORWARD_Y * offset;
    scale = 1 - offset * 0.03;
    zIndex = count + 10;
  } else if (offset > -0.001) {
    layer = "front";
    zIndex = count + 5;
  } else {
    layer = "under";
    const depth = Math.min(2, -offset);
    tx = -BOX_PEEK * depth * 0.35;
    ty = -BOX_PEEK * depth * 0.35;
    scale = 1 - depth * 0.015;
    zIndex = count - index;
  }

  return {
    layer,
    zIndex,
    transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
  };
}

const StackDetailRows = memo(function StackDetailRows({
  detail,
}: {
  detail: ContractVehicleDetail;
}) {
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
});

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type IdBarProps = {
  details: ContractVehicleDetail[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const StackIdBar = memo(function StackIdBar({ details, activeIndex, onSelect }: IdBarProps) {
  return (
    <div className="cv-stack__id-bar" role="tablist" aria-label="Select contract by ID">
      {details.map((detail, index) => (
        <button
          key={`id-${detail.contractNumber}`}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          className={`cv-stack__id-chip${index === activeIndex ? " cv-stack__id-chip--active" : ""}`}
          onClick={() => onSelect(index)}
        >
          <span className="cv-stack__id-chip-n">{index + 1}</span>
          <span className="cv-stack__id-chip-id">{detail.contractNumber}</span>
        </button>
      ))}
    </div>
  );
});

/**
 * Card transforms are painted via DOM during rAF — React does not re-render
 * every frame (that was the hitch when the next card appeared).
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;
  const lastIndex = Math.max(0, details.length - 1);
  const count = details.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const wheelAccRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const paintCards = useCallback(
    (progress: number) => {
      const cards = cardRefs.current;
      for (let index = 0; index < count; index += 1) {
        const el = cards[index];
        if (!el) continue;
        const { layer, zIndex, transform } = layoutForOffset(progress - index, index, count);
        el.style.transform = transform;
        el.style.zIndex = String(zIndex);
        if (el.dataset.layer !== layer) {
          el.dataset.layer = layer;
        }
      }
    },
    [count],
  );

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (!multiple) return;
      const target = Math.max(0, Math.min(lastIndex, nextIndex));
      const from = progressRef.current;
      if (Math.abs(from - target) < 0.001) {
        setActiveIndex(target);
        paintCards(target);
        return;
      }

      setActiveIndex(target);

      if (animFrameRef.current != null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      const distance = Math.abs(target - from);
      const duration = Math.min(720, STEP_MS + Math.max(0, distance - 1) * 160);
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const value = from + (target - from) * easeInOutCubic(t);
        progressRef.current = value;
        paintCards(value);
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          progressRef.current = target;
          paintCards(target);
          animFrameRef.current = null;
        }
      };
      animFrameRef.current = requestAnimationFrame(tick);
    },
    [multiple, lastIndex, paintCards],
  );

  useLayoutEffect(() => {
    progressRef.current = 0;
    setActiveIndex(0);
    paintCards(0);
  }, [details.length, details[0]?.contractNumber, paintCards]);

  useEffect(() => {
    if (!multiple) return;
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".cv-stack__list")) {
        const list = target.closest(".cv-stack__list") as HTMLElement;
        const atTop = list.scrollTop <= 0;
        const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      event.preventDefault();
      if (wheelLockRef.current) return;

      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      wheelAccRef.current += delta;
      if (Math.abs(wheelAccRef.current) < 28) return;

      const direction = wheelAccRef.current > 0 ? 1 : -1;
      wheelAccRef.current = 0;
      wheelLockRef.current = true;

      const current = progressRef.current;
      const next =
        direction > 0
          ? Math.min(lastIndex, Math.floor(current + 0.001) + 1)
          : Math.max(0, Math.ceil(current - 0.001) - 1);

      goToIndex(next);

      window.setTimeout(() => {
        wheelLockRef.current = false;
        wheelAccRef.current = 0;
      }, STEP_MS + 80);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [multiple, lastIndex, goToIndex]);

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
      if (wheelLockRef.current || animFrameRef.current != null) return;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return;

      const current = progressRef.current;
      if (dy < 0) goToIndex(Math.min(lastIndex, Math.floor(current + 0.001) + 1));
      else goToIndex(Math.max(0, Math.ceil(current - 0.001) - 1));
    };

    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchend", onEnd);
    };
  }, [multiple, lastIndex, goToIndex]);

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
          {multiple ? <p className="cv-stack__meta">{details.length} contracts</p> : null}
        </div>
        <button type="button" className="cv-stack__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      {multiple ? (
        <>
          <StackIdBar details={details} activeIndex={activeIndex} onSelect={goToIndex} />

          <div className="cv-stack__controls">
            <button
              type="button"
              className="cv-stack__nav-btn"
              onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex <= 0}
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
              onClick={() => goToIndex(Math.min(lastIndex, activeIndex + 1))}
              disabled={activeIndex >= lastIndex}
              aria-label="Next contract"
            >
              ↓
            </button>
          </div>

          <div ref={stageRef} className="cv-stack__deck-stage">
            <div className="cv-stack__deck">
              {details.map((detail, index) => (
                <article
                  key={detail.contractNumber}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="cv-stack__card cv-stack__card--deck"
                  data-layer={index === 0 ? "front" : "under"}
                  aria-label={`Contract ${detail.contractNumber}`}
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
                    <StackDetailRows detail={detail} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="cv-stack__single">
          <article
            className="cv-stack__card cv-stack__card--deck"
            data-layer="front"
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
