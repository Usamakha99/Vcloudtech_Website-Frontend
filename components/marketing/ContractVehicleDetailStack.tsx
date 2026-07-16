"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

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
 * Multi-contract detail view — internal sticky stack scroller when more than one card.
 * Separate from ContractVehicleDetailTable (grid cards stay unchanged).
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!multiple) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const items = scroller.querySelectorAll<HTMLElement>(".cv-stack__item");
      if (!items.length) return;

      const top = scroller.scrollTop + 24;
      let next = 0;
      items.forEach((item, index) => {
        if (item.offsetTop <= top) next = index;
      });
      setActiveIndex(next);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [multiple, details.length]);

  return (
    <div
      className={`cv-stack${multiple ? " cv-stack--multi" : ""}`}
      role="region"
      aria-label={`${title} contract details`}
    >
      <div className="cv-stack__header">
        <div className="cv-stack__header-copy">
          <p className="cv-stack__eyebrow">Contract vehicle</p>
          <h3 className="cv-stack__title">{title}</h3>
          {multiple ? (
            <p className="cv-stack__meta">{details.length} contracts in this vehicle</p>
          ) : null}
        </div>
        <button type="button" className="cv-stack__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      {multiple ? (
        <div className="cv-stack__rail" aria-hidden>
          {details.map((_, index) => (
            <span
              key={`dot-${index}`}
              className={`cv-stack__dot${index === activeIndex ? " cv-stack__dot--active" : ""}`}
            />
          ))}
        </div>
      ) : null}

      {multiple ? (
        <div
          ref={scrollerRef}
          className="cv-stack__scroller"
          style={{ ["--cv-stack-count"]: details.length } as CSSProperties}
        >
          <div className="cv-stack__runway">
            {details.map((detail, index) => (
              <article
                key={detail.contractNumber}
                className="cv-stack__item"
                style={
                  {
                    ["--cv-stack-index"]: index,
                    zIndex: index + 1,
                  } as CSSProperties
                }
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
      ) : (
        <div className="cv-stack__single">
          <article className="cv-stack__card" aria-label={`Contract ${details[0]?.contractNumber}`}>
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
