"use client";

/**
 * RevealText — splits children (a string or array of strings, one per
 * line) into masked rows. Each row reveals on whileInView with a
 * 60ms stagger and an upward translate-y from 130%.
 *
 * Use for body copy and section ledes. For large headlines, use
 * KineticHeadline (scroll-bound) instead.
 */

import { motion, type Variants } from "framer-motion";
import { createElement, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface Props {
  children: ReactNode | ReactNode[];
  delay?: number;
  className?: string;
  as?: "p" | "h2" | "h3" | "div" | "span";
  stagger?: number;
}

const rowVariants: Variants = {
  hidden: { y: "130%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASE.outQuint,
      delay: i,
    },
  }),
};

export function RevealText({
  children,
  delay = 0,
  className = "",
  as = "p",
  stagger = 0.06,
}: Props) {
  const lines = Array.isArray(children) ? children : [children];

  return createElement(
    as,
    { className },
    lines.map((line, idx) => (
      <span
        key={idx}
        className="block overflow-hidden"
        style={{ paddingBottom: "0.22em", marginBottom: "-0.17em" }}
      >
        <motion.span
          className="block will-change-transform"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          custom={delay + idx * stagger}
          variants={rowVariants}
        >
          {line}
        </motion.span>
      </span>
    )),
  );
}
