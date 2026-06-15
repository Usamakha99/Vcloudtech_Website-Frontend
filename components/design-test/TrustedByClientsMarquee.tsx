"use client";

import Image from "next/image";

import { clientLogos } from "@/lib/design-test/client-logos";

/** Trusted-by client seals — white minimal cards on infinite marquee. */
export function TrustedByClientsMarquee() {
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="tp__trusted" aria-label="Trusted by">
      <p className="tp__trusted-label">Trusted by</p>
      <div className="tp__trusted-track">
        <ul className="tp__trusted-marquee">
          {marqueeLogos.map((client, index) => (
            <li key={`${client.src}-${index}`} className="tp__trusted-card">
              <Image
                src={client.src}
                alt={client.name}
                width={52}
                height={52}
                className="tp__trusted-img"
                sizes="52px"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
