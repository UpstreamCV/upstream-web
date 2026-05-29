/**
 * Shared motion vocabulary.
 * Keep easings, durations, the reduced-motion gate, and the magnetic-pull
 * primitive in one place so every animated surface speaks the same language.
 */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const EASE = {
  outQuint: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutCubic: [0.65, 0, 0.35, 1] as const,
} as const;

export const DURATION = {
  fast: 0.32,
  base: 0.6,
  slow: 1.1,
  veryslow: 1.8,
} as const;

/**
 * Single source of truth for reduced-motion awareness.
 *
 * Listens to `prefers-reduced-motion: reduce` and returns a boolean that
 * components can branch on. SSR returns `false` so the first paint
 * matches the most common case; the hook will flip after hydration if
 * the user actually prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Coarse-pointer awareness — true on touch devices (phones, most
 * tablets). Used by useMagnetic to no-op cursor-tracking on devices
 * where there is no hover cursor anyway; the listeners do nothing on
 * touch and cost paint every frame, so skipping them removes idle work.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: coarse)");
    setCoarse(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return coarse;
}

/** Stagger helper for masked reveals. */
export function stagger(children: number, base = 0.06): number[] {
  return Array.from({ length: children }, (_, i) => i * base);
}

/**
 * Magnetic-pull primitive — used by every cursor-tracking surface so
 * they all behave identically. Returns:
 *   - ref:     attach to the element being magnetised
 *   - sx, sy:  spring-smoothed translate of the WHOLE element toward cursor
 *   - slx, sly: spring-smoothed translate of an INNER span (subtle parallax)
 *   - gx, gy:  cursor position inside the element, 0..100 (for radial glow)
 *   - hovered: pointer is over the element
 *   - handlers: spread onto the element (onMouseMove / Enter / Leave / Focus / Blur)
 *
 * The default intensity (outer 0.08, inner 0.03) is calibrated for CTAs
 * like NavCta. Content surfaces (glass text boxes, marginalia cards)
 * pass a lower `outer` / `inner` so the magnet feels present but quiet.
 *
 * Generic over the element type so callers don't need an extra cast.
 */
interface MagneticOptions {
  /** Outer translate multiplier — fraction of the cursor-to-center delta
   *  applied to the whole element. CTAs use 0.08; content surfaces 0.025–0.04. */
  outer?: number;
  /** Inner translate multiplier — fraction applied to the inner motion span
   *  for parallax. CTAs use 0.03; content surfaces ~0.012. */
  inner?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
) {
  const { outer = 0.08, inner = 0.03 } = options;
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 280, mass: 0.4 });
  const sy = useSpring(y, { damping: 18, stiffness: 280, mass: 0.4 });

  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const slx = useSpring(lx, { damping: 22, stiffness: 320, mass: 0.5 });
  const sly = useSpring(ly, { damping: 22, stiffness: 320, mass: 0.5 });

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const onMouseMove = (e: MouseEvent) => {
    if (reduced || coarse || focused) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const radius = Math.max(rect.width, rect.height) * 0.9;
    const dist = Math.hypot(dx, dy);
    const pull = Math.max(0, 1 - dist / (radius * 2));
    x.set(dx * outer * pull);
    y.set(dy * outer * pull);
    lx.set(dx * inner * pull);
    ly.set(dy * inner * pull);
    gx.set(((e.clientX - rect.left) / rect.width) * 100);
    gy.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    lx.set(0);
    ly.set(0);
    setHovered(false);
  };

  const handlers = {
    onMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: reset,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return { ref, sx, sy, slx, sly, gx, gy, hovered, handlers };
}
