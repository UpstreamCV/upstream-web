"use client";

import { useEffect, useRef } from "react";

export function SiteBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const orbs = Array.from(root.querySelectorAll<HTMLElement>(".site-orb"));
    const timers: ReturnType<typeof setTimeout>[] = [];
    const randomBetween = (low: number, high: number) =>
      low + Math.random() * (high - low);

    const move = (orb: HTMLElement) => {
      orb.style.transform = `translate3d(${randomBetween(-60, 60)}vw, ${randomBetween(-55, 55)}vh, 0) scale(${randomBetween(0.85, 1.3).toFixed(3)})`;
    };

    orbs.forEach((orb, index) => {
      const drift = () => {
        move(orb);
        timers.push(setTimeout(drift, randomBetween(14000, 26000)));
      };

      timers.push(setTimeout(drift, 200 + index * 350));
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div ref={ref} className="site-backdrop" aria-hidden="true">
      <span className="site-orb site-orb-one" />
      <span className="site-orb site-orb-two" />
      <span className="site-orb site-orb-three" />
      <span className="site-orb site-orb-four" />
      <span className="site-orb site-orb-five" />
    </div>
  );
}
