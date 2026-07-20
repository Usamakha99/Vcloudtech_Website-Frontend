"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { clientLogos } from "@/lib/marketing/client-logos";

/** Match Strategic Partners strip motion — clients run slower. */
const SPEED_NORMAL = 0.16;
const SPEED_SLOW = 0.05;

function TrustedClientLogoItems({ idPrefix }: { idPrefix: string }) {
  return clientLogos.map((client) => (
    <li
      key={`${idPrefix}-${client.src}`}
      className="tp__trusted-strip-logo-box tp__trusted-strip-logo-box--clients"
    >
      <div className="tp__trusted-strip-slot">
        <Image
          src={client.src}
          alt={client.name}
          fill
          className="tp__trusted-strip-logo"
          sizes="(max-width: 640px) 160px, 220px"
        />
        <span className="tp__trusted-strip-name">{client.name}</span>
      </div>
    </li>
  ));
}

/** Trusted-by clients — same hover slow + zoom behavior as Strategic Partners. */
export function TrustedByClientsMarquee() {
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(SPEED_NORMAL);
  const targetSpeedRef = useRef(SPEED_NORMAL);
  const rafRef = useRef<number | null>(null);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      group.style.transform = "none";
      return;
    }

    const measure = () => {
      const firstTrack = group.querySelector<HTMLElement>(".tp__trusted-strip-track--static");
      halfWidthRef.current = firstTrack?.offsetWidth ?? group.scrollWidth / 2;
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);

    let last = performance.now();

    const tick = (now: number) => {
      const dtMs = Math.min(32, now - last);
      last = now;

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.1;

      const half = halfWidthRef.current;
      if (half > 0) {
        offsetRef.current -= speedRef.current * dtMs;
        if (offsetRef.current <= -half) {
          offsetRef.current += half;
        }
        group.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="tp__trusted-strip" aria-labelledby="trusted-clients-heading">
      <header className="tp__trusted-strip-header">
        <h3 id="trusted-clients-heading" className="tp__trusted-heading">
          Our Trusted Clients
        </h3>
      </header>

      <div className="tp__trusted-strip-white" data-nav-surface="light">
        <div
          className="tp__trusted-strip-marquee tp__trusted-strip-marquee--clients"
          onPointerEnter={() => {
            targetSpeedRef.current = SPEED_SLOW;
          }}
          onPointerLeave={() => {
            targetSpeedRef.current = SPEED_NORMAL;
          }}
        >
          <span className="tp__trusted-strip-fade tp__trusted-strip-fade--left" aria-hidden />
          <span className="tp__trusted-strip-fade tp__trusted-strip-fade--right" aria-hidden />

          <div ref={groupRef} className="tp__strategic-marquee-group tp__strategic-marquee-group--js">
            <ul className="tp__trusted-strip-track tp__trusted-strip-track--static">
              <TrustedClientLogoItems idPrefix="a" />
            </ul>
            <ul className="tp__trusted-strip-track tp__trusted-strip-track--static" aria-hidden>
              <TrustedClientLogoItems idPrefix="b" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
