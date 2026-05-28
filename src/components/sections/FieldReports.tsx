"use client";

/**
 * Section 06 — Field Reports. Grammar-break section: no SectionShell
 * kicker/headline/lede chrome above the cards. The first card carries
 * the section voice in its top-strip (eyebrow + "A report, not a
 * haystack." signature line). Two smaller cards stack below.
 */

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface Report {
  kicker: string;
  facility: string;
  headline: string;
  body: string;
  metrics: { k: string; v: string }[];
  spark: number[];
}

const REPORTS: Report[] = [
  {
    kicker: "drift event · jan 14",
    facility: "midwest cold storage · 124 cameras",
    headline: "Eight cameras drifted on the same afternoon. Upstream caught all eight.",
    body:
      "A golden-hour exposure shift took p50 confidence below 0.75 on every dock-facing lens at the same facility. We had drift events on all eight in the queue before the morning standup.",
    metrics: [
      { k: "drift flagged", v: "8 / 124" },
      { k: "mean lead-time", v: "3.2 days" },
      { k: "alerts before resolve", v: "0" },
    ],
    spark: [0.92, 0.91, 0.9, 0.88, 0.82, 0.71, 0.68, 0.64, 0.62, 0.61],
  },
  {
    kicker: "false alert audit · feb 03",
    facility: "regional logistics hub",
    headline: "A 34% drop in alerts. Not by lowering thresholds; by reading shadows correctly.",
    body:
      "The old rule fired on every cast shadow near gate_01. The new rule, replayed against the past 30 days, dropped 34% of alerts without missing a single real PPE event.",
    metrics: [
      { k: "fp reduction", v: "−34%" },
      { k: "tp recovered", v: "+12%" },
      { k: "review queue", v: "22 → 14 / day" },
    ],
    spark: [0.74, 0.72, 0.7, 0.65, 0.58, 0.51, 0.48, 0.44, 0.42, 0.4],
  },
  {
    kicker: "blocked lens · mar 22",
    facility: "industrial yard, pacific NW",
    headline: "A pallet wrap covered cam_lot_22 for fourteen hours. We told them in fifteen minutes.",
    body:
      "Silent failures are the worst kind. Camera was technically online, returning frames, returning nothing. Upstream noticed the entropy collapse and paged operations before the next shift change.",
    metrics: [
      { k: "time to flag", v: "14 min" },
      { k: "time to fix", v: "1h 22m" },
      { k: "missed alerts", v: "0" },
    ],
    spark: [0.18, 0.17, 0.16, 0.15, 0.12, 0.08, 0.04, 0.02, 0.02, 0.02],
  },
];

export function FieldReports() {
  const [anchor, ...rest] = REPORTS;

  return (
    <section id="reports" className="relative py-32 md:py-48">
      <div className="shell">
        <AnchorCard report={anchor} />

        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-12 md:gap-8">
          <Card
            report={rest[0]}
            span="md:col-span-7"
            delay={0.1}
          />
          <Card
            report={rest[1]}
            span="md:col-span-5 md:mt-16"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

function AnchorCard({ report }: { report: Report }) {
  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl border border-glass-stroke-2 bg-creek-dark/55 p-8 md:p-14"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE.outQuint }}
    >
      {/* Section voice — replaces the SectionShell kicker/headline/lede chrome */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-glass-stroke-2 pb-6 md:pb-8">
        <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
          field reports · 3 cases · edited from real production debug sessions
        </div>
        <div
          className="font-display text-ink-soft"
          style={{
            fontSize: "clamp(15px, 1.2vw, 19px)",
            fontWeight: 400,
            letterSpacing: "-0.018em",
          }}
        >
          A report,{" "}
          <span className="italic text-accent">not a haystack.</span>
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
          {report.kicker}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
          {report.facility}
        </div>

        <h3
          className="mt-6 font-display text-ink"
          style={{
            fontSize: "clamp(28px, 3.2vw, 52px)",
            lineHeight: 1.08,
            letterSpacing: "-0.024em",
            fontWeight: 500,
          }}
        >
          {report.headline}
        </h3>

        <p
          className="mt-6 text-ink-soft text-base md:text-lg"
          style={{ lineHeight: 1.6, maxWidth: "62ch" }}
        >
          {report.body}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-glass-stroke-2 pt-6 md:gap-6">
          {report.metrics.map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute md:text-[10px]">
                {m.k}
              </div>
              <div
                className="mt-1 font-display text-ink"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 28px)",
                }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>

        <Sparkline data={report.spark} />
      </div>
    </motion.article>
  );
}

function Card({
  report,
  span,
  delay,
}: {
  report: Report;
  span: string;
  delay: number;
}) {
  return (
    <motion.article
      className={`col-span-12 ${span} relative overflow-hidden rounded-2xl border border-glass-stroke-2 bg-creek-dark/55 p-7 md:p-10`}
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE.outQuint, delay }}
    >
      <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
        {report.kicker}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
        {report.facility}
      </div>

      <h3
        className="mt-6 font-display text-ink"
        style={{
          fontSize: "clamp(22px, 2vw, 30px)",
          lineHeight: 1.1,
          letterSpacing: "-0.022em",
          fontWeight: 400,
        }}
      >
        {report.headline}
      </h3>

      <p className="mt-5 text-ink-soft" style={{ lineHeight: 1.6 }}>
        {report.body}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-glass-stroke-2 pt-5">
        {report.metrics.map((m) => (
          <div key={m.k}>
            <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute">
              {m.k}
            </div>
            <div
              className="mt-1 font-display text-ink"
              style={{
                fontSize: "clamp(15px, 1.4vw, 20px)",
              }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <Sparkline data={report.spark} />
    </motion.article>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const n = data.length;
  const stepX = 100 / (n - 1);
  const d = data
    .map((v, i) => {
      const x = i * stepX;
      const y = 22 - v * 18;
      return i === 0 ? `M ${x} ${y}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="mt-6 h-12 w-full">
      <path
        d={d}
        fill="none"
        stroke="rgba(200,217,182,0.8)"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
      <path d={`${d} L 100 22 L 0 22 Z`} fill="rgba(200,217,182,0.08)" />
    </svg>
  );
}
