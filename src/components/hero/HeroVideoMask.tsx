"use client";

/**
 * HeroVideoMask — river.mp4 with a soft-edge SVG mask. On viewports
 * <768px we swap the video element for the poster image entirely so
 * mobile doesn't pay the 19MB tax.
 *
 * Plays muted, looped, playsInline. preload="metadata" — the poster is
 * the LCP candidate.
 */

import { useEffect, useRef, useState } from "react";

const POSTER = "/assets/river-splash-blur.jpg";
const VIDEO = "/assets/river.mp4";

export function HeroVideoMask() {
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

  // Try to play after mount (some browsers gate autoplay until then)
  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
  }, [enabled]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Always render the poster as base. The video sits on top when enabled. */}
      {/* Using <img> instead of next/image keeps this rendering path simple — */}
      {/* the poster is the LCP candidate and we don't want next/image to defer it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-[1.04]"
        style={{ filter: "saturate(0.85) contrast(1.04)" }}
      />

      {enabled ? (
        <video
          ref={videoRef}
          src={VIDEO}
          poster={POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "saturate(0.78) contrast(1.06) brightness(0.86)",
            maskImage:
              "radial-gradient(120% 110% at 50% 35%, #000 55%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.4) 100%)",
            WebkitMaskImage:
              "radial-gradient(120% 110% at 50% 35%, #000 55%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      ) : null}

      {/* Color wash and bottom fade for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,20,8,0.05) 0%, rgba(13,20,8,0.25) 55%, rgba(13,20,8,0.85) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(52,76,44,0.45) 0%, rgba(52,76,44,0.18) 40%, rgba(15,24,9,0.7) 100%)",
        }}
      />
    </div>
  );
}
