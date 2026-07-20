"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { dt } from "@/components/marketing/design-test-theme";
import { partnerLogoStripClass, strategicPartnerLogos } from "@/lib/marketing/partner-logos";

import "../partners/technology-partners.css";

const SPEED_NORMAL = 0.34;
const SPEED_SLOW = 0.07;

function StrategicPartnerLogoItems({ idPrefix }: { idPrefix: string }) {
  return strategicPartnerLogos.map((partner) => (
    <li key={`${idPrefix}-${partner.src}`} className="tp__trusted-strip-logo-box tp__trusted-strip-logo-box--equal">
      <div className="tp__strategic-strip-slot">
        <Image
          src={partner.src}
          alt={partner.name}
          fill
          className={`tp__strategic-strip-logo ${partnerLogoStripClass(partner.name)}`.trim()}
          sizes="(max-width: 640px) 160px, 200px"
        />
        <span className="tp__strategic-strip-name">{partner.name}</span>
      </div>
    </li>
  ));
}

function StrategicPartnerMarquee() {
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

      // Ease toward target speed so hover doesn’t jump logos
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;

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
    <div className="tp__trusted-strip-white" data-nav-surface="light">
      <div
        className="tp__trusted-strip-marquee tp__trusted-strip-marquee--strategic"
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
            <StrategicPartnerLogoItems idPrefix="a" />
          </ul>
          <ul className="tp__trusted-strip-track tp__trusted-strip-track--static" aria-hidden>
            <StrategicPartnerLogoItems idPrefix="b" />
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Strategic partners — dark heading + full-width white marquee (trusted-clients strip sizing). */
export function HomeSocialProofSection({ belowHero = false }: { belowHero?: boolean }) {
  if (belowHero) {
    return (
      <section
        className="relative z-30 tp__trusted-strip tp__trusted-strip--below-hero"
        aria-labelledby="strategic-partners-heading"
        data-nav-surface="dark"
      >
        <header className="tp__trusted-strip-header">
          <h2 id="strategic-partners-heading" className={`${dt.sectionHeadline} text-white`}>
            Strategic Partners
          </h2>
        </header>

        <StrategicPartnerMarquee />
      </section>
    );
  }

  return (
    <section
      className="relative z-30 mb-6 border-b border-t border-white/10 bg-[#041329] sm:mb-8"
      aria-label="Technology partners"
    >
      <StrategicPartnerMarquee />
    </section>
  );
}
