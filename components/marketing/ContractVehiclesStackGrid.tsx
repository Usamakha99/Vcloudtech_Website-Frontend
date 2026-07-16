"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
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

    const frame = window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedId]);

  return (
    <div className="cv-grid-wrap cv-stack-grid-wrap">
      <ul className="cv-grid" aria-label="Contract vehicles — stack view">
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
                  onClick={() => setSelectedId(isActive ? null : vehicle.id)}
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
            onClose={() => setSelectedId(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
