"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { EASE } from "@/lib/motion";

const PRINCIPLES = [
  {
    n: "I",
    head: "Reliability is a product, not a metric.",
    body:
      "We do not ship a model and walk away. We ship the system that keeps the model honest after weather, dust, sun-angles, and Tuesday afternoons.",
  },
  {
    n: "II",
    head: "Own the whole pipeline.",
    body:
      "Ingest, inference, rules, events, review. The only way to explain a false alert at 03:14 is to own every layer it passed through.",
  },
  {
    n: "III",
    head: "Demos are the easy case.",
    body:
      "Every CV product works in the demo. We measure how the same rule holds up at the same camera six months later in February rain.",
  },
];

export function AboutPhilosophy() {
  return (
    <SectionShell
      kicker="how we think"
      headline={["Three things we", "refuse to compromise."]}
      headScale="lg"
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE.outQuint, delay: i * 0.12 }}
            className="col-span-12 md:col-span-4"
          >
            <div
              className="font-display italic text-accent-warm"
              style={{
                fontSize: "clamp(48px, 6vw, 96px)",
                lineHeight: 0.9,
                fontWeight: 300,
                }}
            >
              {p.n}
            </div>
            <h3
              className="mt-8 font-display text-ink"
              style={{
                fontSize: "clamp(22px, 1.8vw, 28px)",
                lineHeight: 1.18,
                letterSpacing: "-0.022em",
                fontWeight: 400,
              }}
            >
              {p.head}
            </h3>
            <p className="mt-4 text-ink-soft" style={{ lineHeight: 1.65 }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
