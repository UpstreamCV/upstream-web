"use client";

/**
 * MarginaliaPanel — small floating glass card for metadata, captions,
 * IDs, timestamps. NOT a content container; the act prose lives outside
 * the panel. Used as marginalia (the printed-book idiom): annotation at
 * the edge of the act.
 *
 * Three sizes: xs (one-line ID strip), sm (kicker + 2-3 stats), md
 * (kicker + body line + 1 stat).
 *
 * `tone="warn"` swaps the hairline + adds a soft amber glow so the panel
 * reads as a reliability alert without restyling its content. Use it for
 * "at risk" / drift callouts.
 *
 * Cursor affordance: the panel uses the same magnetic + radial-blob
 * vocabulary as NavCta, but dialed down (outer 0.025, inner 0.01). The
 * whole panel drifts a few px toward the cursor, the inner text drifts
 * slightly less for parallax, and a soft reed-cream blob (or amber on
 * warn panels) follows the pointer position. Reduced-motion users get
 * the static panel without any of this.
 */

import type { ReactNode } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "@/lib/motion";

interface Props {
  size?: "xs" | "sm" | "md";
  kicker?: string;
  tone?: "default" | "warn";
  children: ReactNode;
  className?: string;
}

const PAD = {
  xs: "px-3.5 py-2",
  sm: "px-4 py-3 md:px-5 md:py-3.5",
  md: "px-5 py-4 md:px-6 md:py-5",
} as const;

export function MarginaliaPanel({
  size = "sm",
  kicker,
  tone = "default",
  children,
  className = "",
}: Props) {
  const isWarn = tone === "warn";
  // Glass recipe + warn tone live as CSS classes in globals.css.
  const paneClass = isWarn ? "marginalia-pane marginalia-pane-warn" : "marginalia-pane";

  // Quiet magnetic pull — about a third of NavCta's intensity so content
  // surfaces respond to the cursor without competing with the CTAs.
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } =
    useMagnetic<HTMLDivElement>({ outer: 0.025, inner: 0.01 });

  // Cursor-tracked blob. 360px radius gives a soft halo that fits the
  // marginalia panel widths; warn panels get an amber blob so the warn
  // semantic carries into the cursor affordance, default panels use
  // reed-cream.
  const blobColor = isWarn
    ? "rgba(232, 192, 107, 0.14)"
    : "rgba(245, 241, 231, 0.10)";
  const blob = useMotionTemplate`radial-gradient(360px circle at ${gx}% ${gy}%, ${blobColor}, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      className={`${paneClass} relative overflow-hidden rounded-2xl ${PAD[size]} ${className}`}
      style={{ x: sx, y: sy }}
      {...handlers}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: blob,
          opacity: hovered ? 1 : 0,
          transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <motion.div
        className="relative z-10 flex h-full w-full flex-col"
        style={{ x: slx, y: sly }}
      >
        {kicker ? (
          <div className="mb-1.5 font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
            {kicker}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col text-ink">{children}</div>
      </motion.div>
    </motion.div>
  );
}
