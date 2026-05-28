"use client";

/**
 * ActShell — full-viewport wrapper for the Confluence Sequence acts.
 * Each act fills 100svh (or more if pinned). Owns the drenched color
 * wash, the kicker, and the editorial gutters. Children compose the act
 * content inside .shell.
 *
 * The wash is a layered radial+linear gradient keyed to the dominant
 * primary (deep / mid / moss). It is opaque enough that the body
 * background's radial-creek-glow does NOT bleed through.
 */

import type { ReactNode } from "react";

type Drench = "deep" | "mid" | "moss" | "base" | "river";

interface Props {
  id?: string;
  kicker: string;
  index?: string;
  drench: Drench;
  /** Allow the act to be taller than one viewport (used by pinned drift). */
  tall?: boolean;
  /** Hide the kicker (used by Act 01 which has its own anchored kicker). */
  hideKicker?: boolean;
  /**
   * When true (default), the drench background is pinned to the viewport via
   * `background-attachment: fixed`, so content scrolls over a static field.
   * Acts that own intricate inner chrome (Act 03's dashboard tile, etc.)
   * read better when the bg scrolls with the section instead.
   */
  fixedBg?: boolean;
  /**
   * Each act passes a unique non-negative integer so its orb-drift animation
   * runs with a distinct duration AND offset. Without this every section
   * drifts in lockstep; with it each background reads as independent.
   */
  phase?: number;
  className?: string;
  children: ReactNode;
}

const WASH: Record<Drench, string> = {
  // Deep Creek dominant. River Mid washes in from the top center, Moss
  // anchors the bottom-left, the linear descent goes from lighter creek
  // (top) → deep creek (mid) → near-black (bottom). Same recipe as moss.
  deep:
    // "radial-gradient(120% 70% at var(--o1x) var(--o1y), rgba(75, 129, 108, 0.40), rgba(75, 129, 108, 0) 55%), " +
    // "radial-gradient(80% 90% at var(--o2x) var(--o2y), rgba(129, 118, 75, 0.24), rgba(129, 118, 75, 0) 65%), " +
    "linear-gradient(180deg, #3d5731 0%, #1c2a17 55%, #0f1809 100%)",
  // River Mid dominant. Moss washes in from the top center, Deep Creek
  // anchors the bottom-right, the linear descent goes from brighter mid
  // (top) → mid (middle) → deep creek (bottom). Same recipe as moss.
  mid:
    // "radial-gradient(120% 70% at var(--o1x) var(--o1y), rgba(129, 118, 75, 0.36), rgba(129, 118, 75, 0) 55%), " +
    // "radial-gradient(70% 80% at var(--o2x) var(--o2y), rgba(52, 76, 44, 0.42), rgba(52, 76, 44, 0) 65%), " +
    "linear-gradient(180deg, #557f6d 0%, #2e5045 50%, #1c2a17 100%)",
  // Streambank Moss dominant. Warm gold-green field; deep creek at the top
  // grounding it; river mid pooling at the bottom-left.
  moss:
    // "radial-gradient(100% 80% at var(--o1x) var(--o1y), rgba(52, 76, 44, 0.55), rgba(52, 76, 44, 0) 55%), " +
    // "radial-gradient(60% 70% at var(--o2x) var(--o2y), rgba(75, 129, 108, 0.30), rgba(75, 129, 108, 0) 65%), " +
    // Mid moss palette — gently darkening from the warm top so the
    // chart strokes and amber markers stay legible without the bottom
    // collapsing toward black.
    "linear-gradient(180deg, #3f3a26 0%, #2a2418 55%, #1e1a12 100%)",
  // Riverbed base. River Mid washes in from the top, Moss anchors the
  // bottom-left. The linear descent stays dark and earth-toned but no
  // longer collapses to near-black at the bottom — keeps the lower
  // sections (Act 05 Reports, Act 06 Current) legible without losing
  // the brand's riverbed weight.
  base:
    // "radial-gradient(120% 80% at var(--o1x) var(--o1y), rgba(75, 129, 108, 0.28), rgba(75, 129, 108, 0) 55%), " +
    // "radial-gradient(80% 70% at var(--o2x) var(--o2y), rgba(129, 118, 75, 0.16), rgba(129, 118, 75, 0) 65%), " +
    "linear-gradient(180deg, #1f2e1c 0%, #182419 55%, #12190f 100%)",
  // River-through-overlay. A translucent dark gradient that lets the
  // fixed Act 01 river video peek through — combined with the
  // backdrop-filter blur applied to the section (see ActShell below).
  // The top stays open (~20% black-green tint) so the water reads as
  // motion, the bottom is denser (~75%) so the CTA + headline still
  // hold contrast over moving footage.
  river:
    "linear-gradient(180deg, rgba(15, 24, 9, 0.20) 0%, rgba(15, 24, 9, 0.50) 55%, rgba(6, 10, 3, 0.78) 100%)",
};


export function ActShell({
  id,
  kicker,
  index,
  drench,
  tall = false,
  hideKicker = false,
  fixedBg = true,
  phase = 0,
  className = "",
  children,
}: Props) {
  // Unique duration AND negative delay per phase so neighbouring sections
  // never sit at the same point in the drift cycle.
  const animationDuration = `${24 + phase * 1.7}s`;
  const animationDelay = `-${phase * 5.3}s`;
  // River drench is the only translucent surface — it carries a backdrop
  // blur so the fixed Act 01 video softens behind the headline + CTA.
  // The other drenches stay opaque, so backdrop-filter would be wasted.
  const isRiver = drench === "river";
  return (
    <section
      id={id}
      className={`drift-orbs relative isolate overflow-hidden ${className}`}
      style={{
        minHeight: tall ? undefined : "100svh",
        background: WASH[drench],
        // background-attachment: fixed on a translucent surface would
        // glue the gradient to the viewport AND prevent backdrop-filter
        // from reading through to the underlying video. River uses
        // scroll so the overlay flows with content and the blur sees
        // the actual page background (the fixed river video).
        backgroundAttachment: isRiver ? "scroll" : fixedBg ? "fixed" : "scroll",
        backdropFilter: isRiver ? "blur(8px) saturate(115%)" : undefined,
        WebkitBackdropFilter: isRiver ? "blur(8px) saturate(115%)" : undefined,
        animationDuration,
        animationDelay,
      }}
    >
      {/* Subtle grain so the drench reads as a surface, not a flat fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,241,231,0.6) 1px, transparent 1.2px)",
          backgroundSize: "3px 3px",
        }}
      />

      {!hideKicker ? (
        <div className="shell relative z-10 pt-[max(env(safe-area-inset-top),18px)] md:pt-10">
          <div className="flex items-baseline gap-3 pt-24 md:pt-28">
            {index ? (
              <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-soft md:text-[11px]">
                <span className="text-ink-faint">/ </span>
                {index}
              </span>
            ) : null}
            <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute md:text-[11px]">
              {kicker}
            </span>
          </div>
        </div>
      ) : null}

      {children}
    </section>
  );
}
