"use client";

import Image from "next/image";

import { clientLogos } from "@/lib/design-test/client-logos";

/** Trusted-by clients — strategic-strip layout: dark heading + full-width white marquee. */
export function TrustedByClientsMarquee() {
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="tp__trusted-strip" aria-labelledby="trusted-clients-heading">
      <header className="tp__trusted-strip-header">
        <h3 id="trusted-clients-heading" className="tp__trusted-heading">
          Trusted <span className="tp__trusted-heading-accent">Clients</span>
        </h3>
      </header>

      <div className="tp__trusted-strip-white">
        <div className="tp__trusted-strip-marquee">
          <span className="tp__trusted-strip-fade tp__trusted-strip-fade--left" aria-hidden />
          <span className="tp__trusted-strip-fade tp__trusted-strip-fade--right" aria-hidden />

          <ul className="tp__trusted-strip-track">
            {marqueeLogos.map((client, index) => (
              <li key={`${client.src}-${index}`} className="tp__trusted-strip-logo-box">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={320}
                  height={120}
                  className="tp__trusted-strip-logo"
                  sizes="(max-width: 640px) 160px, 220px"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
