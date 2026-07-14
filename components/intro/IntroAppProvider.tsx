"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { IntroReadyProvider } from "@/components/intro/intro-context";
import { isMobileDevice } from "@/components/intro/intro-device";
import { publicAssets } from "@/lib/public-assets";

const INTRO_MAX_MS = 15_000;
const EXIT_FADE_MS = 280;

function isHomePath(pathname: string) {
  return pathname === "/";
}

function setIntroPending(active: boolean) {
  document.documentElement.classList.toggle("intro-pending", active);
}

function setIntroSkipMobile(active: boolean) {
  document.documentElement.classList.toggle("intro-skip-mobile", active);
}

type Phase = "off" | "playing" | "exiting";

/**
 * Phones (≤767px): no intro. Desktop home (/): 6s intro overlay before site is usable.
 */
export function IntroAppProvider({
  children,
  src = publicAssets.intro.loaderVideo,
}: {
  children: ReactNode;
  src?: string;
}) {
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("off");

  const clearIntroTimeout = useCallback(() => {
    if (introTimeoutRef.current !== null) {
      window.clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    clearIntroTimeout();
    // Reveal the home carousel under the overlay immediately so the exit
    // fade doesn't flash the page theme color (`#041329`).
    setIntroPending(false);
    setIntroReady(true);
    document.body.style.overflow = "";
    setPhase("exiting");

    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setPhase("off");
    }, EXIT_FADE_MS);
  }, [clearIntroTimeout]);

  const dismissIntro = useCallback(() => {
    clearIntroTimeout();
    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    document.body.style.overflow = "";
    setIntroPending(false);
    setIntroReady(true);
    setPhase("off");
  }, [clearIntroTimeout]);

  useEffect(() => {
    if (!isHome) {
      dismissIntro();
      return;
    }

    if (isMobileDevice()) {
      setIntroSkipMobile(true);
      setIntroPending(false);
      setIsMobile(true);
      setIntroReady(true);
      setPhase("off");
      return;
    }

    setIntroSkipMobile(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroPending(false);
      setIsMobile(false);
      setIntroReady(true);
      setPhase("off");
      return;
    }

    setIsMobile(false);
    setIntroReady(false);
    setIntroPending(true);
    setPhase("playing");
  }, [isHome, dismissIntro]);

  useEffect(() => {
    if (!isHome || isMobile || phase !== "playing") return;

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
  }, [isHome, isMobile, phase, clearIntroTimeout, finish]);

  useEffect(
    () => () => {
      clearIntroTimeout();
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      document.body.style.overflow = "";
      setIntroPending(false);
    },
    [clearIntroTimeout],
  );

  const showSplash = isHome && !isMobile && phase !== "off";
  const fading = phase === "exiting";

  return (
    <IntroReadyProvider ready={introReady}>
      <div id="site-content" className="min-h-full flex flex-col">
        {children}
      </div>

      {showSplash ? (
        <div
          id="intro-splash"
          className={`intro-splash-desktop fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] transition-opacity duration-300 ${
            fading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome video"
        >
          <video
            key={src}
            ref={videoRef}
            className="h-full w-full object-contain"
            src={src}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finish}
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
