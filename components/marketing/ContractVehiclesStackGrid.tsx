"use client";

import { type CSSProperties, startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { contractVehicleDetails } from "@/lib/marketing/contract-vehicle-details";
import { contractVehicles } from "@/lib/marketing/contract-vehicles";

import { ContractVehicleDetailStack } from "./ContractVehicleDetailStack";

import "./contract-vehicles-grid.css";
import "./contract-vehicles-stack.css";

type Props = {
  href?: string;
};

/**
 * Alternate contract vehicles block — same chips as the grid, but multi-contract
 * details open in a sticky stack scroller. Does not replace ContractVehiclesGrid.
 */
export function ContractVehiclesStackGrid({ href = "/contact" }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = contractVehicles.find((vehicle) => vehicle.id === selectedId);
  const selectedDetails =
    selectedId && selectedId in contractVehicleDetails
      ? contractVehicleDetails[selectedId as keyof typeof contractVehicleDetails]
      : undefined;

  useEffect(() => {
    if (!selectedId || !detailRef.current) return;

    const el = detailRef.current;
    // Wait for layout + fade-in paint so scroll doesn't fight the mount
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const topPad = 96;
      const bottomPad = 48;
      const needsNudge =
        rect.top < topPad || rect.bottom > window.innerHeight - bottomPad;

      if (needsNudge) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [selectedId]);

  const selectVehicle = (id: string | null) => {
    startTransition(() => {
      setSelectedId(id);
    });
  };

  return (
    <div className="cv-grid-wrap cv-stack-grid-wrap">
      <ul className="cv-grid" aria-label="Contracts — stack view">
        {contractVehicles.map((vehicle) => {
          const details = contractVehicleDetails[vehicle.id];

          if (details?.length) {
            const isActive = selectedId === vehicle.id;

            return (
              <li key={vehicle.id}>
                <button
                  type="button"
                  className={`cv-grid__chip${isActive ? " cv-grid__chip--active" : ""}`}
                  aria-expanded={isActive}
                  aria-controls={isActive ? `cv-stack-detail-${vehicle.id}` : undefined}
                  onClick={() => selectVehicle(isActive ? null : vehicle.id)}
                >
                  {vehicle.label}
                </button>
              </li>
            );
          }

          return (
            <li key={vehicle.id}>
              <Link href={href} className="cv-grid__chip">
                {vehicle.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {selectedVehicle && selectedDetails?.length ? (
        <div
          id={`cv-stack-detail-${selectedVehicle.id}`}
          ref={detailRef}
          className="cv-detail-anchor"
          style={{ ["--cv-stack-count" as string]: selectedDetails.length } as CSSProperties}
        >
          <ContractVehicleDetailStack
            title={selectedVehicle.label}
            details={selectedDetails}
            onClose={() => selectVehicle(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
