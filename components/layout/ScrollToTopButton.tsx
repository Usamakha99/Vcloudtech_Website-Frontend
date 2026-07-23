"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "./scroll-to-top.css";

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Slow animated scroll covering the full page distance. */
function scrollToTopSlowly() {
  const start = getScrollY();
  if (start <= 0) return;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    window.scrollTo(0, 0);
    return;
  }

  const duration = Math.min(3000, Math.max(1600, start * 1.05));
  const startTime = performance.now();
  let frame = 0;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const y = start * (1 - easeInOutCubic(progress));
    window.scrollTo(0, y);
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    }
  };

  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(step);
}

/** Site-wide fixed control — slowly scrolls back to top. */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    function onScroll() {
      if (animatingRef.current) return;
      setVisible(getScrollY() > 240);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      className={`site-scroll-top${visible ? " is-visible" : ""}`}
      aria-label="Scroll slowly back to top"
      onClick={() => {
        animatingRef.current = true;
        scrollToTopSlowly();
        window.setTimeout(() => {
          animatingRef.current = false;
          setVisible(getScrollY() > 240);
        }, 3000);
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="site-scroll-top__icon">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>,
    document.body,
  );
}
