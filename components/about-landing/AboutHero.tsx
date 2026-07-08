"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { aboutPageHero } from "@/lib/marketing/about-page-content";

/** Crossfade window before end — avoids hard loop cut / jerk. */
const CROSSFADE_MS = 700;

/** Full-width hero — left copy, seamless looping background video, two-line title. */
export function AboutHero() {
  const primaryRef = useRef<HTMLVideoElement>(null);
  const secondaryRef = useRef<HTMLVideoElement>(null);
  const activeIndexRef = useRef(0);
  const swapLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const swapTo = useCallback((nextIndex: 0 | 1) => {
    if (swapLockRef.current || activeIndexRef.current === nextIndex) return;
    swapLockRef.current = true;

    const incoming = nextIndex === 0 ? primaryRef.current : secondaryRef.current;
    const outgoing = nextIndex === 0 ? secondaryRef.current : primaryRef.current;
    if (!incoming || !outgoing) {
      swapLockRef.current = false;
      return;
    }

    incoming.currentTime = 0;
    void incoming.play().catch(() => {
      /* autoplay policies — still keep timeline moving via timers */
    });

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    window.setTimeout(() => {
      outgoing.pause();
      outgoing.currentTime = 0;
      swapLockRef.current = false;
    }, CROSSFADE_MS + 80);
  }, []);

  useEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!primary || !secondary) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      primary.pause();
      secondary.pause();
      return;
    }

    void primary.play().catch(() => {});

    let frameId = 0;

    const tick = () => {
      const active = activeIndexRef.current === 0 ? primary : secondary;
      const duration = active.duration;

      if (Number.isFinite(duration) && duration > 0) {
        const remainingMs = (duration - active.currentTime) * 1000;
        if (remainingMs <= CROSSFADE_MS && !swapLockRef.current) {
          swapTo(activeIndexRef.current === 0 ? 1 : 0);
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [swapTo]);

  return (
    <header id="hero" className="about-page__hero" aria-labelledby="about-page-heading">
      <div className="about-page__hero-media" aria-hidden>
        <video
          ref={primaryRef}
          className={`about-page__hero-image${activeIndex === 0 ? " is-active" : ""}`}
          src={aboutPageHero.video}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={secondaryRef}
          className={`about-page__hero-image${activeIndex === 1 ? " is-active" : ""}`}
          src={aboutPageHero.video}
          muted
          playsInline
          preload="auto"
        />
        <div className="about-page__hero-overlay" />
      </div>

      <div className="about-page__hero-inner">
        <div className="about-page__hero-content">
          <h1 id="about-page-heading" className="about-page__hero-title">
            <span className="about-page__hero-title-line">{aboutPageHero.titleLines[0]}</span>
            <span className="about-page__hero-title-line">{aboutPageHero.titleLines[1]}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
        </div>
      </div>
    </header>
  );
}
