"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useIntroReady } from "@/components/intro/intro-context";
import { isMobileDevice } from "@/components/intro/intro-device";

export const HERO_SLIDES = [
  {
    src: "/images/hero-1.png",
    alt: "vCloud Tech reception area with branded feature wall and conference room",
    title: "Enterprise Cloud Infrastructure",
  },
  {
    src: "/images/hero-2.png",
    alt: "vCloud Tech open workspace with testing benches and VCLOUD TECH signage",
    title: "Cybersecurity & Managed Services",
  },
  {
    src: "/images/hero-3.png",
    alt: "vCloud Tech two-story office with mezzanine and server-ready workspaces",
    title: "IT Procurement & Solutions",
  },
  {
    src: "/images/hero-4.png",
    alt: "vCloud Tech reception and operations floor with VCLOUDTECH branding",
    title: "Scalable IT Operations & Support",
  }
] as const;

const INTERVAL_MS = 3000;

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroCarousel() {
  const introReady = useIntroReady();
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && isMobileDevice(),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    setMobile(isMobileDevice());
  }, []);

  const carouselActive = introReady || mobile;

  useEffect(() => {
    if (!carouselActive || paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [carouselActive, paused, slideCount]);

  return (
    <div
      className="hero-test-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="hero-test-carousel__viewport">
        <div className="hero-test-carousel__aspect" aria-hidden />
        <div className="hero-test-carousel__stage">
          <div
            className="hero-test-carousel__track"
            style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
            aria-live="polite"
          >
            {HERO_SLIDES.map((slide, index) => (
              <figure
                key={slide.src}
                className="hero-test-carousel__slide"
                aria-hidden={index !== activeIndex}
              >
                <div className="hero-test-carousel__media-wrap absolute inset-0">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 100vw, (max-width: 1280px) 100vw, 1280px"
                    className="hero-test-carousel__media"
                    priority={index === 0}
                  />
                </div>
                <div className="hero-test-carousel__scrim" aria-hidden />
              </figure>
            ))}
          </div>

          <button
            type="button"
            className="hero-test-carousel__arrow hero-test-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={goPrev}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="hero-test-carousel__arrow hero-test-carousel__arrow--next"
            aria-label="Next slide"
            onClick={goNext}
          >
            <ChevronRightIcon />
          </button>

          <div className="hero-test-carousel__dots" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                className={`hero-test-carousel__dot ${index === activeIndex ? "hero-test-carousel__dot--active" : ""}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
