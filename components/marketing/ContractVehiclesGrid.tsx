import Link from "next/link";

import { contractVehicles } from "@/lib/marketing/contract-vehicles";

import "./contract-vehicles-grid.css";

type ContractVehiclesGridProps = {
  href?: string;
};

/** Clickable contract vehicle chips — shared on homepage + contracts page. */
export function ContractVehiclesGrid({ href = "/contact" }: ContractVehiclesGridProps) {
  return (
    <ul className="cv-grid" aria-label="Contract vehicles">
      {contractVehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <Link href={href} className="cv-grid__chip">
            {vehicle.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
