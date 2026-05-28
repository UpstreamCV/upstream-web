"use client";

/**
 * 1px line at the very top of the viewport whose scaleX is bound to
 * page scroll progress. Sits above content (z-50) but below nav (z-60).
 */

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 180,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(245, 241, 231, 0.6) 40%, rgba(245, 241, 231, 0.6) 60%, transparent 100%)",
      }}
    />
  );
}
