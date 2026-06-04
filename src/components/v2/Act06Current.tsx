"use client";

/**
 * Act 06 — The current.
 *
 * The CTA fold. Uses the "river" drench so the fixed Act 01 river video
 * shows through a translucent dark overlay, softened by a backdrop-blur
 * applied to the section. The headline + CTA stay legible because the
 * overlay densifies toward the bottom. Fish anchored at the bottom-
 * right corner of the act (not centered behind the type). The headline
 * carries the italic accent on "current." and the CTA pair is offset
 * to the left — asymmetric on purpose.
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
        {/* Deep creek-mid pool blobs removed — Act 06 now reads against
            the base drench's linear gradient only. */}
        {/*
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 80% 90%, rgba(75, 129, 108, 0.35), transparent 65%), " +
              "radial-gradient(70% 60% at 0% 0%, rgba(52, 76, 44, 0.40), transparent 70%)",
          }}
        />
        */}

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
            // river video + drench show through so the fish reads as
            // part of the scene instead of a gray sticker.
            style={{ opacity: 0.45 }}
          />
        </motion.div>

        <div className="shell relative z-10 flex h-full flex-col pb-[max(env(safe-area-inset-bottom),28px)] pt-28 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline gap-3"
          >
            <span className="font-mono text-[11px] tracking-mono uppercase text-ink-mute">
              onboarding through 2026
            </span>
          </motion.div>

          {/* flex-1 wrapper centers the headline + CTA block in the
              vertical space below the kicker (used to be balanced by the
              footer strip below — now centered explicitly). */}
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
              We&apos;re onboarding a small group of facilities through 2026.
              If you run live CV and have a camera that&apos;s been silently
              lying to you, we&apos;d like to hear about it.
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
