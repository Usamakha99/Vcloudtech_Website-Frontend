"use client";

import Link from "next/link";
import { useState } from "react";

import { contractVehicleDetails } from "@/lib/marketing/contract-vehicle-details";
import { contractVehicles } from "@/lib/marketing/contract-vehicles";

import { ContractVehicleDetailTable } from "./ContractVehicleDetailTable";

import "./contract-vehicles-grid.css";

type ContractVehiclesGridProps = {
  href?: string;
};

/** Contract vehicle chips — opens detail table when data exists, otherwise links out. */
export function ContractVehiclesGrid({ href = "/contact" }: ContractVehiclesGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedVehicle = contractVehicles.find((vehicle) => vehicle.id === selectedId);
  const selectedDetails =
    selectedId && selectedId in contractVehicleDetails
      ? contractVehicleDetails[selectedId as keyof typeof contractVehicleDetails]
      : undefined;

  return (
    <div className="cv-grid-wrap">
      <ul className="cv-grid" aria-label="Contract vehicles">
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
                  aria-controls={isActive ? `cv-detail-${vehicle.id}` : undefined}
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
        <div id={`cv-detail-${selectedVehicle.id}`}>
          <ContractVehicleDetailTable
            title={selectedVehicle.label}
            details={selectedDetails}
            onClose={() => setSelectedId(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
