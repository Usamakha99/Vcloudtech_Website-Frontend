"use client";

import { type CSSProperties } from "react";

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
 * Multi-contract detail view — sticky stack scroller when more than one card.
 * Separate from ContractVehicleDetailTable (grid cards stay unchanged).
 */
export function ContractVehicleDetailStack({ title, details, onClose }: Props) {
  const multiple = details.length > 1;

  return (
    <div className="cv-stack" role="region" aria-label={`${title} contract details`}>
      <div className="cv-stack__header">
        <h3 className="cv-stack__title">{title}</h3>
        <button type="button" className="cv-stack__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      {multiple ? (
        <p className="cv-stack__hint">
          Scroll through {details.length} contracts — cards stack as you go
        </p>
      ) : null}

      <div
        className={multiple ? "cv-stack__runway scroll-stack-runway" : "cv-stack__single"}
        style={
          multiple
            ? ({ ["--cv-stack-count"]: details.length } as CSSProperties)
            : undefined
        }
      >
        {details.map((detail, index) => (
          <article
            key={detail.contractNumber}
            className={multiple ? "cv-stack__item scroll-stack-item" : "cv-stack__card"}
            style={
              multiple
                ? ({
                    ["--cv-stack-index"]: index,
                    zIndex: index + 1,
                  } as CSSProperties)
                : undefined
            }
            aria-label={`Contract ${detail.contractNumber}`}
          >
            <div className="cv-stack__card-inner">
              <header className="cv-stack__card-head">
                {multiple ? (
                  <p className="cv-stack__card-label">
                    <strong>
                      Contract {index + 1} of {details.length}
                    </strong>
                  </p>
                ) : null}
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
  );
}
