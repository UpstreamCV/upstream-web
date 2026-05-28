"use client";

/**
 * Act 02 — The promise.
 *
 * Drenched Deep Creek. The brand wedge stated in two display-scale
 * paragraphs. No imagery, no dashboard. Glass marginalia at the
 * bottom-right carries the competitor-contrast line as a printed-book
 * margin note. The reader's job here is to read; this act is the
 * breath between hero and dashboard demo.
 */

import { motion } from "framer-motion";
import { ActShell } from "./ActShell";
import { MarginaliaPanel } from "./MarginaliaPanel";

export function Act02Promise() {
  return (
    <ActShell id="act-promise" index="02" kicker="the promise" drench="deep" phase={0}>
      <div className="shell relative z-10 flex min-h-[calc(100svh-160px)] flex-col justify-center pb-24 pt-12 md:pt-16">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Left rail — kicker echo for the act */}
          <div className="col-span-12 md:col-span-3 xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-32"
            >
              <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-faint md:text-[11px]">
                what we build
              </div>
              <div className="mt-3 h-[1px] w-12 bg-creek-moss/60" />
              <div className="mt-3 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
                reliability layer
                <br />
                for production CV
              </div>
            </motion.div>
          </div>

          {/* Prose at display scale */}
          <div className="col-span-12 md:col-span-9 xl:col-span-9 md:col-start-4">
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(28px, 3.6vw, 56px)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                maxWidth: "22ch",
                color: "rgba(245, 241, 231, 0.6)",
              }}
            >
              Most platforms help teams{" "}
              <em className="italic-accent">launch</em> computer vision.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="mt-5 font-display md:mt-6"
              style={{
                fontSize: "clamp(28px, 3.6vw, 56px)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                maxWidth: "22ch",
                color: "rgba(245, 241, 231, 0.6)",
              }}
            >
              Upstream helps teams{" "}
              <em className="italic-accent">trust</em> it once it&apos;s running.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="mt-10 max-w-[58ch] text-ink-soft md:mt-14 md:text-lg"
              style={{ lineHeight: 1.65 }}
            >
              The hard problem in CV isn&apos;t running a model. Countless
              platforms already do that. The hard problem is the day the model
              quietly stops working: a lens fogs, exposure shifts at golden
              hour, a tracker fragments in crowded scenes, a rule starts firing
              on shadows. Standard stacks treat those failures as someone
              else&apos;s problem. We treat them as the problem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="mt-12 grid grid-cols-12 items-end gap-x-8 gap-y-6 md:mt-16"
            >
              <div className="col-span-12 md:col-span-7">
                <p
                  className="font-display text-ink-soft"
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 22px)",
                    lineHeight: 1.45,
                    letterSpacing: "-0.012em",
                  }}
                >
                  The question Upstream is built to answer:
                  <span className="block mt-3 text-ink italic">
                    does it still work next Tuesday at 7 PM in February rain,
                    on the camera you actually have?
                  </span>
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 md:justify-self-end md:max-w-[320px]">
                <MarginaliaPanel kicker="competitor contrast" size="md">
                  <p
                    className="font-display text-[14.5px] text-ink-soft md:text-[15px]"
                    style={{ lineHeight: 1.5, letterSpacing: "-0.008em" }}
                  >
                    Datadog watches infrastructure. Sentry catches software
                    errors. Upstream watches whether your computer vision is
                    still telling the truth.
                  </p>
                </MarginaliaPanel>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ActShell>
  );
}
