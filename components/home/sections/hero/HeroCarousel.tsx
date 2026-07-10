"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { useIntroReady } from "@/components/intro/intro-context";
import { isMobileDevice } from "@/components/intro/intro-device";
import { publicAssets } from "@/lib/public-assets";

export const HERO_SLIDES = [
  {
    src: publicAssets.hero.slide1,
    alt: "vCloud Tech reception area with branded feature wall and conference room",
    title: "Infrastructure Built for What's Next",
    headline: "Infrastructure Built for What's Next",
    description:
      "Delivering the technology foundations modern organizations need to scale confidently, perform reliably, and innovate continuously.",
    primaryCta: { label: "Get free consultation", href: "/contact" },
    secondaryCta: { label: "Explore services", href: "/services" },
  },
  {
    src: publicAssets.hero.slide2,
    alt: "vCloud Tech open workspace with testing benches and VCLOUD TECH signage",
    title: "Confidence in Every Connection",
    headline: "Confidence in Every Connection",
    description:
      "Advanced cybersecurity, compliance, and risk management solutions engineered to protect your business at every level.",
    primaryCta: { label: "Get free consultation", href: "/contact" },
    secondaryCta: { label: "Explore services", href: "/services" },
  },
  {
    src: publicAssets.hero.slide3,
    alt: "vCloud Tech reception and operations floor with VCLOUDTECH branding",
    title: "Technology That Drives Business Outcomes",
    headline: "Technology That Drives Business Outcomes",
    description:
      "From strategic consulting to fully managed IT operations, we help organizations reduce complexity, increase efficiency, and accelerate innovation.",
    primaryCta: { label: "Schedule a Consultation", href: "/contact" },
    secondaryCta: { label: "Discover Services", href: "/services" },
  },
] as const;

const INTERVAL_MS = 5000;
const SLIDE_TRANSITION_MS = 550;

type HeroCarouselProps = {
  onActiveIndexChange?: (index: number) => void;
};

export function HeroCarousel({ onActiveIndexChange }: HeroCarouselProps = {}) {
  const introReady = useIntroReady();
  const [mobile] = useState(() => typeof window !== "undefined" && isMobileDevice());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  const pausedRef = useRef(false);
  const introReadyRef = useRef(introReady);
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);

  pausedRef.current = paused;
  onActiveIndexChangeRef.current = onActiveIndexChange;

  const autoplayEnabled = introReady || mobile;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    onActiveIndexChangeRef.current?.(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const wasReady = introReadyRef.current;
    introReadyRef.current = introReady;

    if (!wasReady && introReady) {
      setPaused(false);
      pausedRef.current = false;
      setActiveIndex(0);
    }
  }, [introReady]);

  useEffect(() => {
    if (!autoplayEnabled) return;

    let timeoutId: number | null = null;
    let cancelled = false;

    const scheduleNext = () => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        if (!pausedRef.current && document.visibilityState === "visible") {
          setActiveIndex((prev) => (prev + 1) % slideCount);
        }

        scheduleNext();
      }, INTERVAL_MS);
    };

    const startAutoplay = () => {
      if (cancelled) return;
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      scheduleNext();
    };

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(startAutoplay);
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && !cancelled) {
        startAutoplay();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [autoplayEnabled, slideCount]);

  return (
    <div
      className="hero-test-carousel"
      onPointerEnter={() => {
        setPaused(true);
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        setPaused(false);
        pausedRef.current = false;
      }}
    >
      <div className="hero-test-carousel__viewport">
        <div className="hero-test-carousel__aspect" aria-hidden />
        <div className="hero-test-carousel__stage">
          <div
            className="hero-test-carousel__track"
            style={{
              transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
              transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
            }}
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
