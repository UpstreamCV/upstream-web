"use client";

/**
 * MarginaliaPanel — small floating glass card for metadata, captions,
 * IDs, timestamps. NOT a content container; the act prose lives outside
 * the panel. Used as marginalia (the printed-book idiom): annotation at
 * the edge of the act.
 *
 * Three sizes: xs (one-line ID strip), sm (kicker + 2-3 stats), md
 * (kicker + body line + 1 stat).
 */

import type { ReactNode } from "react";

interface Props {
  size?: "xs" | "sm" | "md";
  kicker?: string;
  children: ReactNode;
  className?: string;
}

const PAD = {
  xs: "px-3.5 py-2",
  sm: "px-4 py-3 md:px-5 md:py-3.5",
  md: "px-5 py-4 md:px-6 md:py-5",
} as const;

export function MarginaliaPanel({ size = "sm", kicker, children, className = "" }: Props) {
  return (
    <div
      className={`glass-pane-2 rounded-2xl ${PAD[size]} ${className}`}
      style={{
        background: "rgba(245, 241, 231, 0.05)",
        border: "1px solid rgba(245, 241, 231, 0.10)",
        backdropFilter: "blur(18px) saturate(135%)",
        WebkitBackdropFilter: "blur(18px) saturate(135%)",
      }}
    >
      {kicker ? (
        <div className="mb-1.5 font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
          {kicker}
        </div>
      ) : null}
      <div className="text-ink">{children}</div>
    </div>
  );
}
