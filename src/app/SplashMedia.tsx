"use client";

import { useEffect, useRef } from "react";

const PARALLAX_FACTOR = 0.5;

export default function SplashMedia() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let scheduled = false;

    const apply = () => {
      scheduled = false;
      const rect = el.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      el.style.transform = `translate3d(0, ${scrolled * PARALLAX_FACTOR}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="splash-media" ref={wrapperRef}>
      <video
        className="splash-video"
        src="/assets/river.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <video
        className="splash-video splash-video-blur"
        src="/assets/river.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
