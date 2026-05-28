"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { EASE } from "@/lib/motion";

export function AboutContact() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 90%, rgba(75,129,108,0.18), transparent 65%)",
        }}
      />
      <div className="shell relative">
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
              <span className="text-ink-mute">/ </span>get in touch
            </p>
            <div className="mt-7">
              <KineticHeadline
                scale="lg"
                lines={[
                  "If you run live CV",
                  "we'd like to hear from you.",
                ]}
              />
            </div>
          </div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE.outQuint, delay: 0.2 }}
            className="col-span-12 md:col-span-5"
          >
            <p className="max-w-[44ch] text-ink-soft" style={{ lineHeight: 1.65 }}>
              We onboard a small number of facilities per quarter. The fastest
              path is the waitlist; tell us what you have running and we'll
              follow up.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="/waitlist" variant="primary">
                Request access
                <span aria-hidden="true" className="font-mono text-sm">→</span>
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com/company/upstreamcomputervision"
                variant="ghost"
              >
                <span className="font-mono text-xs tracking-mono uppercase opacity-80">
                  LinkedIn
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
