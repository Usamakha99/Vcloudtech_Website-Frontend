"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_STORAGE_KEY = "vcloudtech-intro-video-seen";
const AUTO_SKIP_MS = 12_000;

type IntroVideoSplashProps = {
  /** Path under /public, e.g. `/intro/intro.webm` */
  src?: string;
  poster?: string;
  /** When true, intro only plays once per browser tab session. */
  playOncePerSession?: boolean;
  storageKey?: string;
  /** Skip intro on phones / coarse pointers (avoids fullscreen blocking mobile UI). */
  skipOnMobile?: boolean;
};

type Phase = "idle" | "playing" | "exiting" | "hidden";

function shouldSkipIntro(storageKey: string, playOncePerSession: boolean, skipOnMobile: boolean) {
  if (typeof window === "undefined") return true;

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

/**
 * Full-screen intro video on first load (desktop-friendly).
 * Skips on mobile by default — fullscreen overlay blocks touch UI when autoplay fails.
 */
export function IntroVideoSplash({
  src = "/intro/loader-intro.mp4",
  poster,
  playOncePerSession = true,
  storageKey = DEFAULT_STORAGE_KEY,
  skipOnMobile = false,
}: IntroVideoSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  const finish = useCallback(() => {
    if (playOncePerSession) {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* private browsing */
      }
    }
    setPhase("exiting");
    window.setTimeout(() => setPhase("hidden"), 500);
  }, [playOncePerSession, storageKey]);

  useEffect(() => {
    if (shouldSkipIntro(storageKey, playOncePerSession, skipOnMobile)) {
      setPhase("hidden");
      return;
    }

    setPhase("playing");
  }, [playOncePerSession, storageKey, skipOnMobile]);

  useEffect(() => {
    if (phase !== "playing") return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeoutId = window.setTimeout(finish, AUTO_SKIP_MS);

    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(timeoutId);
    };
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "playing") return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      finish();
    });
  }, [phase, finish]);

  if (phase === "hidden" || phase === "idle") return null;

  const fading = phase === "exiting";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome video"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/30 via-transparent to-[#0F0F0F]/15" />

      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:right-6 sm:top-6"
      >
        Skip
      </button>
    </div>
  );
}
