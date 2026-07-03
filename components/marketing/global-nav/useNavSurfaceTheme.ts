"use client";

import { type RefObject, useEffect, useState } from "react";

export type NavSurface = "light" | "dark";

function readSurfaceAtNav(header: HTMLElement): NavSurface {
  const rect = header.getBoundingClientRect();
  const y = Math.min(rect.bottom + 2, window.innerHeight - 1);
  const sampleXs = [
    rect.left + rect.width * 0.25,
    rect.left + rect.width * 0.5,
    rect.left + rect.width * 0.75,
  ];

  for (const rawX of sampleXs) {
    const x = Math.min(Math.max(rawX, 0), window.innerWidth - 1);
    let node = document.elementFromPoint(x, y);

    while (node) {
      const surface = node.getAttribute("data-nav-surface");
      if (surface === "light") return "light";
      if (surface === "dark") break;
      node = node.parentElement;
    }
  }

  return "dark";
}

/** Switches navbar theme based on the section directly beneath it while scrolling. */
export function useNavSurfaceTheme(headerRef: RefObject<HTMLElement | null>) {
  const [surface, setSurface] = useState<NavSurface>("dark");

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const header = headerRef.current;
      if (!header) return;
      const next = readSurfaceAtNav(header);
      setSurface((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headerRef]);

  return surface;
}
