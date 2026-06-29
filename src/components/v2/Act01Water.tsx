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

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

const POSTER = "/assets/river-splash-blur.jpg";
const VIDEO = "/assets/river.mp4";

// Shared "warm-white card" treatment for the hero's paired CTA + credential.
// Both render as the same rounded box: Reed Cream fill (never pure #fff, per
// the No-Pure-White rule), 1px inset highlight + soft ambient lift. Equal
// height comes from items-stretch on their flex row.
const CARD_CLASS = "inline-flex items-center rounded-2xl px-5 py-3 md:px-6 md:py-3.5";
const CARD_STYLE: React.CSSProperties = {
  background: "#F5F1E7",
  boxShadow:
    "0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 24px 55px -28px rgba(0, 0, 0, 0.7)",
};

export function Act01Water() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();

  // The river video plays on every viewport, including mobile — `muted` +
  // `playsInline` satisfy mobile autoplay policies. Only reduced-motion falls
  // back to the poster still.
  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
  }, [reduced]);

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
        {!reduced ? (
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
          {/* Partner credential + primary CTA as two matching warm-white
              cards, side by side ("Backed by" left, CTA right). Equal height
              via items-stretch; they wrap to stacked rows on narrow viewports. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
            className="mt-9 flex flex-wrap items-stretch gap-3 md:mt-10 md:gap-4"
          >
            <div className={`${CARD_CLASS} gap-3.5 md:gap-4`} style={CARD_STYLE}>
              <span
                className="font-mono text-[10px] uppercase tracking-kicker md:text-[11px]"
                style={{ color: "rgba(15, 24, 9, 0.55)" }}
              >
                Backed by
              </span>
              <span
                aria-hidden="true"
                className="h-8 w-px"
                style={{ background: "rgba(15, 24, 9, 0.14)" }}
              />
              <Image
                src="/assets/NV_Inception_Program.png"
                alt="NVIDIA Inception Program"
                width={1080}
                height={458}
                className="h-9 w-auto md:h-10"
              />
            </div>

            <Link
              href="/waitlist"
              className={`${CARD_CLASS} group gap-3 transition-transform duration-300 hover:-translate-y-0.5`}
              style={CARD_STYLE}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-kicker md:text-xs"
                style={{ color: "rgba(15, 24, 9, 0.92)" }}
              >
                Join the waitlist
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-sm transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ color: "rgba(15, 24, 9, 0.92)" }}
              >
                →
              </span>
            </Link>
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

