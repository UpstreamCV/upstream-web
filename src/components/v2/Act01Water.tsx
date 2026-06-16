"use client";

/**
 * Act 01 — The water arrives.
 *
 * Full viewport. River footage edge-to-edge, FIXED to the viewport (z-index:-10)
 * so it stays pinned while the page scrolls; the middle acts' grey/orb zone
 * covers it and the current fold shows it again. No orbs/grain on the hero —
 * just the river, with a minimal bottom-fade for type legibility. Mobile /
 * reduced-motion swap the video for the poster still.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";

const POSTER = "/assets/river-splash-blur.jpg";
const VIDEO = "/assets/river.mp4";

export function Act01Water() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
  }, [enabled, reduced]);

  return (
    <section
      id="act-water"
      className="relative isolate flex h-[100svh] min-h-[680px] w-full overflow-hidden"
    >
      {/* River video / poster base — FIXED to the viewport (z-index:-10). */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: -10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover scale-[1.05]"
          style={{ filter: "saturate(0.7) contrast(1.05) brightness(0.78)" }}
        />
        {enabled && !reduced ? (
          <video
            ref={videoRef}
            src={VIDEO}
            poster={POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(0.68) contrast(1.06) brightness(0.76)" }}
          />
        ) : null}
      </div>

      {/* Type legibility comes from the video's brightness filter plus a
          minimal bottom-only dark fade (1/4 of viewport). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(15, 24, 9, 0.55) 60%, rgba(6, 10, 3, 0.9) 100%)",
        }}
      />

      {/* Section content — no top kicker, no marginalia. The headline is
          vertically centered over the fixed river video so the hero reads
          as balanced rather than bottom-heavy. */}
      <div className="shell relative z-10 flex h-full flex-col justify-center pb-[max(env(safe-area-inset-bottom),24px)] pt-28 md:pt-32">
        <div className="max-w-[1100px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { transition: { staggerChildren: 0 } },
              visible: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
            }}
          >
            <HeadlineLine size="sub">
              <span style={{ color: "rgba(245, 241, 231, 0.6)" }}>Start</span>
            </HeadlineLine>
            <HeadlineLine size="sub">
              <span style={{ color: "rgba(245, 241, 231, 0.6)" }}>trusting your</span>
            </HeadlineLine>
            <HeadlineLine size="hero">
              <span className="italic text-ink">streams.</span>
            </HeadlineLine>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
            className="mt-7 max-w-[52ch] md:text-lg"
            // Hero keeps its prior 70% paragraph opacity even though the
            // global --ink-soft token dropped to 60% — per the "secondary
            // text 60% except hero" directive, the hero stays untouched.
            style={{ lineHeight: 1.55, color: "rgba(245, 241, 231, 0.7)" }}
          >
            The pipeline behind your cameras — we catch the moment one
            stops telling the truth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
            className="mt-9 md:mt-10"
          >
            <MagneticButton href="/waitlist" variant="primary">
              Join the waitlist
              <span aria-hidden="true" className="font-mono text-sm">
                →
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-kicker uppercase text-ink-faint"
      >
        scroll
      </motion.div>
    </section>
  );
}

function HeadlineLine({
  size,
  children,
}: {
  size: "sub" | "hero";
  children: React.ReactNode;
}) {
  const cls =
    size === "hero"
      ? "block font-display leading-[0.92]"
      : "block font-display leading-[0.95]";
  const style =
    size === "hero"
      ? {
          fontSize: "clamp(56px, 16vw, 280px)",
          letterSpacing: "-0.05em",
          fontWeight: 700,
          paddingBottom: "0.06em",
        }
      : {
          fontSize: "clamp(28px, 4.8vw, 80px)",
          letterSpacing: "-0.03em",
          fontWeight: 700,
        };
  return (
    <motion.span
      className={cls}
      variants={{
        hidden: { y: "16%", opacity: 0, filter: "blur(6px)" },
        visible: {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      style={style}
    >
      {children}
    </motion.span>
  );
}

