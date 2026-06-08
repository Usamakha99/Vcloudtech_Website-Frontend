"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_STORAGE_KEY = "vcloudtech-intro-video-seen";

type IntroVideoSplashProps = {
  /** Path under /public, e.g. `/intro/intro.webm` */
  src?: string;
  poster?: string;
  /** When true, intro only plays once per browser tab session. */
  playOncePerSession?: boolean;
  storageKey?: string;
};

type Phase = "checking" | "playing" | "exiting" | "hidden";

/**
 * Full-screen intro video on first homepage load.
 * Drop your file at `public/intro/intro.webm` (or pass a custom `src`).
 */
export function IntroVideoSplash({
  src = "/intro/intro.webm",
  poster,
  playOncePerSession = true,
  storageKey = DEFAULT_STORAGE_KEY,
}: IntroVideoSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("checking");

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setPhase("hidden");
      return;
    }

    if (playOncePerSession) {
      try {
        if (sessionStorage.getItem(storageKey) === "1") {
          setPhase("hidden");
          return;
        }
      } catch {
        /* continue */
      }
    }

    setPhase("playing");
  }, [playOncePerSession, storageKey]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "exiting") return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = phase === "playing" ? "hidden" : prev;

    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      /* autoplay blocked — user can press Skip or tap play if controls shown */
    });
  }, [phase]);

  if (phase === "hidden") return null;

  if (phase === "checking") {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-[#1B224B]"
        aria-hidden
      />
    );
  }

  const fading = phase === "exiting";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#1B224B] transition-opacity duration-500 ${
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B224B]/40 via-transparent to-[#1B224B]/20" />

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
