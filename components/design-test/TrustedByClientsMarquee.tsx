"use client";

import Image from "next/image";

import { clientLogos } from "@/lib/design-test/client-logos";

/** Trusted-by clients — single background rail with infinite logo marquee. */
export function TrustedByClientsMarquee() {
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="tp__trusted tp__trusted--full" aria-labelledby="trusted-clients-heading">
      <div className="tp__subsection-inner">
        <h3 id="trusted-clients-heading" className="tp__trusted-heading">
          Trusted <span className="tp__trusted-heading-accent">Clients</span>
        </h3>

        <div className="tp__trusted-rail">
          <span className="tp__trusted-rail-fade tp__trusted-rail-fade--left" aria-hidden />
          <span className="tp__trusted-rail-fade tp__trusted-rail-fade--right" aria-hidden />

          <div className="tp__trusted-track">
            <ul className="tp__trusted-marquee">
              {marqueeLogos.map((client, index) => (
                <li key={`${client.src}-${index}`} className="tp__trusted-logo-item">
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={400}
                    height={160}
                    className="tp__trusted-logo"
                    sizes="(max-width: 640px) 220px, 400px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
