"use client";

/**
 * Section 07 — Delta CTA. Full-bleed dark plate, UpstreamFish.png faint
 * behind frosted glass, single magnetic CTA to /waitlist.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { EASE } from "@/lib/motion";

export function DeltaCta() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(110% 80% at 50% 55%, #3f5a34 0%, #344c2c 45%, #1c2a17 100%)",
      }}
    >
      {/* Top edge transition — the matte field-reports surface tapers into the green pool */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,24,9,0.9) 0%, rgba(15,24,9,0.4) 55%, transparent 100%)",
        }}
      />

      {/* Fish lives in the water now — stronger presence, less filter */}
      <motion.div
        aria-hidden="true"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.22 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE.outQuint }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(85vw, 920px)",
          height: "min(85vw, 920px)",
          filter: "blur(0.3px)",
        }}
      >
        <Image
          src="/assets/UpstreamFish.png"
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, 920px"
          className="object-contain"
          style={{
            filter: "saturate(0.55) brightness(1.5)",
            opacity: 0.75,
          }}
        />
      </motion.div>

      {/* frosted plate */}
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
            <span className="text-ink-mute">/ </span>07 · get on the water
          </p>

          <div className="mt-8">
            <KineticHeadline
              lines={["Step into", "the current."]}
              scale="xl"
              className="text-center"
            />
          </div>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE.outQuint, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[58ch] text-ink-soft md:text-lg"
          >
            We&apos;re onboarding a small group of facilities through 2026. If you
            run live CV and have a camera that&apos;s been silently lying to you,
            we&apos;d like to hear about it.
          </motion.p>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE.outQuint, delay: 0.42 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="/waitlist" variant="primary">
              Request access
              <span aria-hidden="true" className="font-mono text-sm">
                →
              </span>
            </MagneticButton>
            <MagneticButton href="/about" variant="ghost">
              <span className="font-mono text-xs tracking-mono uppercase opacity-80">
                Meet the team
              </span>
            </MagneticButton>
          </motion.div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
            <span>production launch · q4 2026</span>
            <span className="opacity-40">/</span>
            <span>upstream vision, inc.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
