"use client";

import { useEffect, useRef } from "react";

/**
 * Atmosphere — the grey/grainy/orb layer: five heavily-blurred creek-color orbs
 * drift over a charcoal base with a faint film grain (ported from the
 * upstream-dashboard ShellBackdrop). It is OPAQUE.
 *
 * variant="fixed" (default): a fixed, full-viewport background — used on pages
 *   without the river (e.g. /about, /waitlist, 404).
 * variant="zone": a STICKY layer pinned to the viewport while its parent (the
 *   homepage's middle-acts wrapper) is on screen — so the dark/orb background
 *   stays FIXED (orbs drifting in place), like the river, while the acts scroll
 *   over it, then scrolls out before the current fold. No fade, no toggle.
 *
 * Drift: a tiny controller hands each orb a fresh random target every several
 * seconds; the long CSS transition on `.atmo-orb` eases each move. Targets are
 * bounded so each orb's CENTER stays within ~the viewport (never more than EDGE
 * past an edge) — a large part of every orb is therefore always on screen, even
 * mid-drift. Honors prefers-reduced-motion (orbs rest at their CSS anchors,
 * controller idle).
 */
export function Atmosphere({ variant = "fixed" }: { variant?: "fixed" | "zone" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const orbs = Array.from(root.querySelectorAll<HTMLElement>(".atmo-orb"));
    const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Keep each orb's CENTER within a bounded band of the layer (≈ the
    // viewport) so a large part of every orb is always on screen — the center
    // never drifts more than EDGE past an edge. offsetLeft/offsetWidth read the
    // UNTRANSFORMED anchor box (offset* ignores transforms), so picking the
    // target relative to that stays correct across repeated moves and resizes.
    const EDGE = 0.1;
    const move = (el: HTMLElement) => {
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent) return; // hidden orb (mobile drops orbs 4–5)
      const restX = el.offsetLeft + el.offsetWidth / 2;
      const restY = el.offsetTop + el.offsetHeight / 2;
      const dx = Math.round(rand(-EDGE, 1 + EDGE) * parent.clientWidth - restX);
      const dy = Math.round(rand(-EDGE, 1 + EDGE) * parent.clientHeight - restY);
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${rand(0.85, 1.3).toFixed(3)})`;
    };

    orbs.forEach((el, i) => {
      const loop = () => {
        move(el);
        timers.push(setTimeout(loop, rand(14000, 26000)));
      };
      timers.push(setTimeout(loop, 200 + i * 350));
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div
      ref={ref}
      className={variant === "zone" ? "atmo-layer atmo-layer-zone" : "atmo-layer"}
      aria-hidden="true"
    >
      <span className="atmo-orb atmo-orb-1" />
      <span className="atmo-orb atmo-orb-2" />
      <span className="atmo-orb atmo-orb-3" />
      <span className="atmo-orb atmo-orb-4" />
      <span className="atmo-orb atmo-orb-5" />
    </div>
  );
}
