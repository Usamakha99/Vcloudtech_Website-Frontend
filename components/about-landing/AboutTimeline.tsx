"use client";

import { useEffect, useRef } from "react";

import type { aboutJourney } from "@/lib/design-test/about-page-content";

type Milestone = (typeof aboutJourney.milestones)[number];

type Props = {
  milestones: readonly Milestone[];
};

/** Horizontal journey timeline with scroll-snap. */
export function AboutTimeline({ milestones }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || milestones.length < 2) return;

    let frame = 0;
    let direction = 1;
    let paused = false;

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    const tick = () => {
      if (!paused && track.scrollWidth > track.clientWidth) {
        track.scrollLeft += direction * 0.35;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 1) direction = -1;
        if (track.scrollLeft <= 1) direction = 1;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, [milestones.length]);

  return (
    <div className="about-page__timeline-wrap">
      <div ref={trackRef} className="about-page__timeline-track" tabIndex={0} role="list">
        {milestones.map((milestone, index) => (
          <article
            key={milestone.id}
            className="about-page__timeline-card"
            role="listitem"
            aria-label={`${milestone.year}: ${milestone.description}`}
          >
            <span className="about-page__timeline-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="about-page__timeline-year">{milestone.year}</h3>
            <p className="about-page__timeline-desc">{milestone.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
