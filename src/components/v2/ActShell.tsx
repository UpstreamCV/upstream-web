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

type Drench = "deep" | "mid" | "moss" | "base";

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
    "radial-gradient(calc(120% * var(--o1s)) calc(70% * var(--o1s)) at var(--o1x) var(--o1y), rgb(75 129 108 / calc(0.40 * var(--o1a))), transparent 55%), " +
    "radial-gradient(calc(80% * var(--o2s)) calc(90% * var(--o2s)) at var(--o2x) var(--o2y), rgb(129 118 75 / calc(0.24 * var(--o2a))), transparent 65%), " +
    "linear-gradient(180deg, #3d5731 0%, #1c2a17 55%, #0f1809 100%)",
  // River Mid dominant. Moss washes in from the top center, Deep Creek
  // anchors the bottom-right, the linear descent goes from brighter mid
  // (top) → mid (middle) → deep creek (bottom). Same recipe as moss.
  mid:
    "radial-gradient(calc(120% * var(--o1s)) calc(70% * var(--o1s)) at var(--o1x) var(--o1y), rgb(129 118 75 / calc(0.36 * var(--o1a))), transparent 55%), " +
    "radial-gradient(calc(70% * var(--o2s)) calc(80% * var(--o2s)) at var(--o2x) var(--o2y), rgb(52 76 44 / calc(0.42 * var(--o2a))), transparent 65%), " +
    "linear-gradient(180deg, #557f6d 0%, #2e5045 50%, #1c2a17 100%)",
  // Streambank Moss dominant. Warm gold-green field; deep creek at the top
  // grounding it; river mid pooling at the bottom-left.
  moss:
    "radial-gradient(calc(100% * var(--o1s)) calc(80% * var(--o1s)) at var(--o1x) var(--o1y), rgb(52 76 44 / calc(0.55 * var(--o1a))), transparent 55%), " +
    "radial-gradient(calc(60% * var(--o2s)) calc(70% * var(--o2s)) at var(--o2x) var(--o2y), rgb(75 129 108 / calc(0.30 * var(--o2a))), transparent 65%), " +
    "linear-gradient(180deg, #5d563a 0%, #3f3a26 100%)",
  // Riverbed base. River Mid washes in from the top, Moss anchors the
  // bottom-left, the linear descent ends near pitch. Same recipe as moss.
  base:
    "radial-gradient(calc(120% * var(--o1s)) calc(80% * var(--o1s)) at var(--o1x) var(--o1y), rgb(75 129 108 / calc(0.28 * var(--o1a))), transparent 55%), " +
    "radial-gradient(calc(80% * var(--o2s)) calc(70% * var(--o2s)) at var(--o2x) var(--o2y), rgb(129 118 75 / calc(0.16 * var(--o2a))), transparent 65%), " +
    "linear-gradient(180deg, #1a2613 0%, #0f1809 55%, #060a03 100%)",
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
  return (
    <section
      id={id}
      className={`drift-orbs relative isolate overflow-hidden ${className}`}
      style={{
        minHeight: tall ? undefined : "100svh",
        background: WASH[drench],
        backgroundAttachment: fixedBg ? "fixed" : "scroll",
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
