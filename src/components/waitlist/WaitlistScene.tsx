"use client";

/**
 * Backdrop for the waitlist page — river video with the same color
 * treatment as the homepage hero. Mobile fallback to poster image.
 */

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/motion";

export function WaitlistScene() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // <768px swaps the video for the poster. SSR/first paint keeps the
  // video enabled (server snapshot false -> !false), matching the old
  // useState(true) initial.
  const enabled = !useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
  }, [enabled]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/river-splash-blur.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover scale-[1.04]"
        style={{ filter: "saturate(0.85) contrast(1.04)" }}
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
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(0.78) contrast(1.06) brightness(0.86)" }}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,20,8,0.05) 0%, rgba(13,20,8,0.25) 55%, rgba(13,20,8,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(52,76,44,0.45) 0%, rgba(52,76,44,0.18) 40%, rgba(15,24,9,0.7) 100%)",
        }}
      />
    </div>
  );
}
