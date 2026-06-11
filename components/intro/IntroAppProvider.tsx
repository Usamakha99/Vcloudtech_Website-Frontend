"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { IntroReadyProvider } from "@/components/intro/intro-context";
import { isMobileDevice } from "@/components/intro/intro-device";

const INTRO_MAX_MS = 6_000;
const EXIT_FADE_MS = 500;

function releaseIntroBlock({ mobile = false } = {}) {
  document.documentElement.classList.remove("intro-pending");
  if (mobile) {
    document.documentElement.classList.add("intro-skip-mobile");
  }
}

type Phase = "off" | "playing" | "exiting";

/**
 * Mobile-first: site always visible on phones. Desktop intro is a fixed overlay only.
 */
export function IntroAppProvider({
  children,
  src = "/intro/loader-intro.mp4",
}: {
  children: ReactNode;
  src?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  /** Default true — never block phones while JS loads */
  const [isMobile, setIsMobile] = useState(true);
  const [introReady, setIntroReady] = useState(true);
  const [phase, setPhase] = useState<Phase>("off");

  const clearIntroTimeout = useCallback(() => {
    if (introTimeoutRef.current !== null) {
      window.clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    clearIntroTimeout();
    setPhase("exiting");

    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      releaseIntroBlock();
      document.documentElement.classList.remove("intro-skip-mobile");
      setPhase("off");
      setIntroReady(true);
    }, EXIT_FADE_MS);
  }, [clearIntroTimeout]);

  useEffect(() => {
    if (isMobileDevice()) {
      releaseIntroBlock({ mobile: true });
      setIsMobile(true);
      setIntroReady(true);
      setPhase("off");
      return;
    }

    releaseIntroBlock();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsMobile(false);
      setIntroReady(true);
      setPhase("off");
      return;
    }

    document.documentElement.classList.remove("intro-skip-mobile");
    setIsMobile(false);
    setIntroReady(false);
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (isMobile || phase !== "playing") return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    clearIntroTimeout();
    introTimeoutRef.current = window.setTimeout(finish, INTRO_MAX_MS);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => {
        /* Timer still controls duration */
      });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      clearIntroTimeout();
    };
  }, [isMobile, phase, clearIntroTimeout, finish]);

  useEffect(
    () => () => {
      clearIntroTimeout();
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      document.body.style.overflow = "";
    },
    [clearIntroTimeout],
  );

  const showSplash = !isMobile && phase !== "off";
  const fading = phase === "exiting";

  return (
    <IntroReadyProvider ready={introReady}>
      <div id="site-content" className="min-h-full flex flex-col">
        {children}
      </div>

      {showSplash ? (
        <div
          id="intro-splash"
          className={`intro-splash-desktop fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] transition-opacity duration-500 ${
            fading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome video"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src={src}
            muted
            playsInline
            preload="auto"
          />

          {phase === "playing" ? (
            <button
              type="button"
              onClick={finish}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:right-6 sm:top-6"
            >
              Skip
            </button>
          ) : null}
        </div>
      ) : null}
    </IntroReadyProvider>
  );
}
