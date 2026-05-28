"use client";

import { motion } from "framer-motion";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { EASE } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-44 pb-28 md:pt-56 md:pb-40">
      {/* faint river overlay top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-30"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(75,129,108,0.55), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.outQuint }}
          className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm"
        >
          <span className="text-ink-mute">/ </span>about · the team
        </motion.p>

        <div className="mt-10 max-w-5xl">
          <KineticHeadline
            scale="xl"
            lines={[
              "We are building",
              "the substrate under",
              "live computer vision.",
            ]}
          />
        </div>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE.outQuint, delay: 0.3 }}
          className="mt-10 max-w-[64ch] text-ink-soft md:text-lg"
          style={{ lineHeight: 1.6 }}
        >
          The hardest part of running CV in the real world isn't the model.
          It's the day the model stops working and nobody notices. We are
          three operators who got tired of stitched-together stacks and a
          pager that lied to us. Upstream is the system we wished we'd
          had.
        </motion.p>
      </div>
    </section>
  );
}
