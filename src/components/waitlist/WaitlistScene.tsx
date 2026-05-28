"use client";

/**
 * Backdrop for the waitlist page — frosted plate over a slowed river
 * video (looped, lower opacity). Mobile fallback to poster image.
 */

import { useEffect, useRef, useState } from "react";

export function WaitlistScene() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setEnabled(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.55;
    v.play().catch(() => {});
  }, [enabled]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/river-splash-blur.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.65) brightness(0.7)" }}
      />
      {enabled ? (
        <video
          ref={videoRef}
          src="/assets/river.mp4"
          poster="/assets/river-splash-blur.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
          style={{ filter: "saturate(0.55) brightness(0.55) contrast(1.05)" }}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,20,8,0.55) 0%, rgba(13,20,8,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(52,76,44,0.45), rgba(15,24,9,0.85))",
        }}
      />
    </div>
  );
}
