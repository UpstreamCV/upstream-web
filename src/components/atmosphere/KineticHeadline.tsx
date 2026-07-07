"use client";

/**
 * KineticHeadline — large editorial display headline whose individual
 * lines reveal from below. Uses Satoshi with -0.035em tracking. Wrap
 * accent words in <em> — italic Satoshi with --accent color via the
 * .display em CSS rule.
 *
 * Reveals immediately on mount AND re-reveals if it scrolls back into
 * view. Uses IntersectionObserver + a useEffect mount fallback so the
 * above-the-fold case never gets stuck hidden.
 */

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, useReducedMotion } from "@/lib/motion";

interface Props {
  lines: (string | React.ReactNode)[];
  className?: string;
  scale?: "xl" | "lg" | "md";
}

const lineVariants: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.05,
      ease: EASE.outQuint,
      delay: 0.08 + i * 0.09,
    },
  }),
};

const sizeMap = {
  xl: "text-[clamp(40px,7vw,108px)] leading-[1.0]",
  lg: "text-[clamp(32px,5.2vw,80px)] leading-[1.02]",
  md: "text-[clamp(24px,3.2vw,52px)] leading-[1.08]",
};

export function KineticHeadline({ lines, className = "", scale = "xl" }: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);
  // Reduced motion renders the final state immediately, no observer needed.
  const visible = shown || reduced;

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    // The observer delivers the initial intersection state asynchronously on
    // observe(), so already-in-view headlines still fire without a
    // synchronous getBoundingClientRect fast-path.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <h2
      ref={ref}
      className={`display font-display font-semibold ${sizeMap[scale]} text-ink ${className}`}
      style={{ letterSpacing: "-0.035em" }}
    >
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.22em", marginBottom: "-0.18em" }}
        >
          <motion.span
            className="block will-change-transform"
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            custom={idx}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
