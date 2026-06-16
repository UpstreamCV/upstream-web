"use client";

/**
 * Act 06 — The current.
 *
 * The CTA fold. The pinned hero river video (fixed, z-index:-10) shows through
 * here too; this fold adds film grain over it and a dark scrim that densifies
 * toward the bottom so the headline + CTA stay legible. Fish anchored at the
 * bottom-right corner of the act (not centered behind the type). The headline
 * carries the italic accent on "current." and the CTA pair is offset to the
 * left — asymmetric on purpose.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";
import { ActShell } from "./ActShell";

export function Act06Current() {
  return (
    <ActShell
      id="act-current"
      index="06"
      kicker="step into the current"
      drench="river"
      hideKicker
      phase={4}
    >
      <div className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        {/* The pinned hero river video (fixed, z-index:-10) shows through here.
            The ActShell "river" drench above already darkens toward the bottom
            for legibility; this fold adds a slight backdrop blur to soften the
            footage, with film grain crisp on top (no second scrim — that was
            double-darkening the river). */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          {/* Slight blur over the river footage. backdrop-filter softens only
              what shows through this fold (the fixed video behind it), not the
              hero. The grain layer below paints on top and stays crisp. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />
          <div className="film-grain absolute inset-0" aria-hidden="true" />
        </div>

        {/* Fish, anchored bottom-right and rotated into the corner */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 60, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -10 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -bottom-12 -right-12 md:-bottom-20 md:-right-24"
          style={{
            width: "min(80vw, 720px)",
            height: "min(80vw, 720px)",
          }}
        >
          <Image
            src="/assets/UpstreamFish.png"
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 720px"
            className="object-contain"
            // Render the fish as a semi-transparent overlay of the
            // source artwork rather than a flat white silhouette. The
            // river video + grain show through so the fish reads as
            // part of the scene instead of a gray sticker.
            style={{ opacity: 0.45 }}
          />
        </motion.div>

        <div className="shell relative z-10 flex h-full flex-col pb-[max(env(safe-area-inset-bottom),28px)] pt-28 md:pt-32">
          {/* flex-1 wrapper centers the headline + CTA block in the
              vertical space. */}
          <div className="flex flex-1 flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[18ch] font-display"
              style={{
                fontSize: "clamp(56px, 11vw, 180px)",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                fontWeight: 700,
                color: "rgba(245, 241, 231, 0.6)",
              }}
            >
              Step into the <em className="italic-accent">current.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mt-8 max-w-[52ch] text-ink-soft md:mt-10 md:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              We&apos;re onboarding a few facilities through 2026. If a camera
              has been lying to you, we want to hear about it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 md:mt-12"
            >
              <MagneticButton href="/waitlist" variant="primary">
                Waitlist Now
                <span aria-hidden="true" className="font-mono text-sm">
                  →
                </span>
              </MagneticButton>
              <MagneticButton href="/about" variant="ghost">
                <span className="font-mono text-xs tracking-mono uppercase opacity-80">
                  Read the philosophy
                </span>
              </MagneticButton>
            </motion.div>
          </div>

        </div>
      </div>
    </ActShell>
  );
}
