"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { IntroReadyProvider } from "@/components/intro/intro-context";

export const INTRO_STORAGE_KEY = "vcloudtech-intro-video-seen";

const INTRO_MAX_MS = 6_000;
const EXIT_FADE_MS = 500;

type IntroGateProps = {
  children: ReactNode;
  src?: string;
  poster?: string;
  playOncePerSession?: boolean;
  storageKey?: string;
  skipOnMobile?: boolean;
};

type Phase = "pending" | "playing" | "exiting" | "done";

function shouldSkipIntro(storageKey: string, playOncePerSession: boolean, skipOnMobile: boolean) {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  if (skipOnMobile) {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (coarse || narrow) return true;
  }

  if (playOncePerSession) {
    try {
      if (sessionStorage.getItem(storageKey) === "1") return true;
    } catch {
      /* continue */
    }
  }

  return false;
}

function releaseIntroBlock() {
  document.documentElement.classList.remove("intro-pending");
}

/**
 * Blocks site content until the intro video finishes (first visit per session).
 * Pair with the inline script in root layout so content stays hidden before hydration.
 */
export function IntroGate({
  children,
  src = "/intro/loader-intro.mp4",
  poster,
  playOncePerSession = false,
  storageKey = INTRO_STORAGE_KEY,
  skipOnMobile = false,
}: IntroGateProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>("pending");

  const clearIntroTimeout = useCallback(() => {
    if (introTimeoutRef.current !== null) {
      window.clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    clearIntroTimeout();

    if (playOncePerSession) {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* private browsing */
      }
    }

    setPhase("exiting");

    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      releaseIntroBlock();
      setPhase("done");
    }, EXIT_FADE_MS);
  }, [clearIntroTimeout, playOncePerSession, storageKey]);

  const beginIntroTimer = useCallback(() => {
    clearIntroTimeout();
    introTimeoutRef.current = window.setTimeout(finish, INTRO_MAX_MS);
  }, [clearIntroTimeout, finish]);

  useEffect(() => {
    if (shouldSkipIntro(storageKey, playOncePerSession, skipOnMobile)) {
      releaseIntroBlock();
      setPhase("done");
      return;
    }

    setPhase("playing");
  }, [playOncePerSession, storageKey, skipOnMobile]);

  useEffect(() => {
    if (phase !== "playing") return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (!video) return () => {
      document.body.style.overflow = prev;
      clearIntroTimeout();
    };

    beginIntroTimer();

    const tryPlay = () => {
      video.currentTime = 0;
      void video.play().catch(() => {
        /* Keep overlay up for full 6s even if autoplay is blocked */
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        tryPlay();
      };
      video.addEventListener("canplay", onCanPlay, { once: true });
    }

    return () => {
      document.body.style.overflow = prev;
      clearIntroTimeout();
    };
  }, [phase, beginIntroTimer, clearIntroTimeout]);

  useEffect(
    () => () => {
      clearIntroTimeout();
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    },
    [clearIntroTimeout],
  );

  const introReady = phase === "done";
  const showOverlay = !introReady;
  const fading = phase === "exiting";
  const siteHidden = !introReady;

  return (
    <IntroReadyProvider ready={introReady}>
      <div
        id="site-content"
        className={siteHidden ? "hidden" : "contents"}
        aria-hidden={siteHidden}
      >
        {children}
      </div>

      {showOverlay ? (
        <div
          id="intro-splash"
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] transition-opacity duration-500 ${
            fading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome video"
        >
          {phase === "playing" || phase === "exiting" ? (
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              src={src}
              poster={poster}
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <div className="h-full w-full bg-[#0F0F0F]" aria-hidden />
          )}

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
