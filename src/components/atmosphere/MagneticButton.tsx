"use client";

/**
 * Magnetic button — cursor pulls the button toward itself within a
 * generous radius, then snaps back. Reduced-motion + keyboard focus
 * both disable the effect (button stays put). Shares the magnetic
 * primitive in @/lib/motion so the Nav CTA can use the same behaviour.
 */

import { type ReactNode } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "@/lib/motion";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  type = "button",
  disabled = false,
}: Props) {
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } = useMagnetic();

  // mouse-tracked glow (liquid hover diffusion). useMotionTemplate keeps
  // the gradient string reactive to gx/gy so the glow follows the cursor
  // instead of freezing at its render-time position.
  const primaryGlow = useMotionTemplate`radial-gradient(150px circle at ${gx}% ${gy}%, rgba(245, 241, 231, 0.32), transparent 70%)`;
  const ghostGlow = useMotionTemplate`radial-gradient(140px circle at ${gx}% ${gy}%, rgba(245, 241, 231, 0.22), transparent 70%)`;

  const baseClass =
    "relative inline-flex items-center gap-3 overflow-hidden font-medium tracking-wide";
  // Ported from the dashboard. Primary: the creek gradient pill (.dn-grad-btn,
  // moss → mid → deep) with a faint cream rim + Reed Cream label; hover lifts
  // it with a soft creek glow shadow. Ghost: frosted translucent glass
  // (.dn-glow-soft) — backdrop blur + cream hairline, brightening on hover.
  // Both gain the cursor sheen + magnetic lean from the motion layer below.
  const variantClass =
    variant === "primary"
      ? "btn-dark text-ink px-7 py-4 rounded-full font-semibold transition-colors duration-200"
      : "btn-frost text-ink-soft px-7 py-4 rounded-full transition-colors duration-200 hover:text-ink";

  const composed = `${baseClass} ${variantClass} ${className}`;

  const inner = (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: variant === "primary" ? primaryGlow : ghostGlow,
          opacity: hovered ? 1 : 0,
          transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <motion.span style={{ x: slx, y: sly }} className="relative z-10 inline-flex items-center gap-3">
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={composed}
        style={{ x: sx, y: sy }}
        {...handlers}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${composed} disabled:opacity-60 disabled:cursor-not-allowed`}
      style={{ x: sx, y: sy }}
      {...handlers}
    >
      {inner}
    </motion.button>
  );
}
