"use client";

import { useEffect, useRef } from "react";

export default function BgVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Observe the splash section, not the video itself: the video is
    // position: fixed so it's always intersecting the viewport, which would
    // make the observer fire isIntersecting=true forever and never pause.
    const splash = document.getElementById("splash");
    if (!splash) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    obs.observe(splash);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="bg-video"
      src="/assets/river.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
