"use client";

/**
 * Act 05 — Field reports.
 *
 * Drenched riverbed base. Three case studies, each a viewport-scale
 * moment rather than a card in a grid. Editorial pull-quote treatment.
 * Reports flow vertically; each owns ~85svh of vertical real estate,
 * separated by a thin hairline. The first report carries the section
 * voice "A report, not a haystack." in its own intro strip.
 */

import { motion } from "framer-motion";
import { ActShell } from "./ActShell";

interface Report {
  kicker: string;
  facility: string;
  headline: React.ReactNode;
  body: string;
  metrics: { k: string; v: string }[];
  spark: number[];
}

const REPORTS: Report[] = [
  {
    kicker: "drift event · jan 14",
    facility: "midwest cold storage · 124 cameras",
    headline: (
      <>
        Eight cameras drifted on the same afternoon.{" "}
        <em className="italic-accent">We caught all eight.</em>
      </>
    ),
    body: "A golden-hour exposure shift took p50 confidence below 0.75 on every dock-facing lens at the same facility. Drift events on all eight were in the queue before the morning standup.",
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
    headline: (
      <>
        A 34% drop in alerts, not by lowering thresholds.{" "}
        <em className="italic-accent">By reading shadows correctly.</em>
      </>
    ),
    body: "The old rule fired on every cast shadow near gate_01. The new rule, replayed against the past 30 days, dropped 34% of alerts without missing a single real PPE event.",
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
    headline: (
      <>
        A pallet wrap covered cam_lot_22 for fourteen hours.{" "}
        <em className="italic-accent">We told them in fifteen minutes.</em>
      </>
    ),
    body: "Silent failures are the worst kind. The camera was technically online, returning frames, returning nothing. The entropy collapse showed up before the next shift change.",
    metrics: [
      { k: "time to flag", v: "14 min" },
      { k: "time to fix", v: "1h 22m" },
      { k: "missed alerts", v: "0" },
    ],
    spark: [0.18, 0.17, 0.16, 0.15, 0.12, 0.08, 0.04, 0.02, 0.02, 0.02],
  },
];

export function Act05Reports() {
  return (
    <ActShell id="act-reports" index="05" kicker="field reports" drench="base" phase={3}>
      <div className="shell relative z-10 pb-24 pt-12 md:pb-32 md:pt-16">
        {/* Section voice strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 items-baseline gap-x-8 gap-y-4 border-b border-glass-stroke pb-8 md:pb-10"
        >
          <p className="col-span-12 font-mono text-[10px] tracking-mono uppercase text-ink-mute md:col-span-7">
            three cases · edited from real production debug sessions
          </p>
          <div
            className="col-span-12 font-display md:col-span-5 md:text-right"
            style={{
              fontSize: "clamp(16px, 1.2vw, 20px)",
              letterSpacing: "-0.012em",
              lineHeight: 1.4,
              color: "rgba(245, 241, 231, 0.6)",
            }}
          >
            A report, <span className="italic-accent">not a haystack.</span>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col gap-24 md:mt-20 md:gap-32">
          {REPORTS.map((r, i) => (
            <ReportBlock key={i} r={r} index={i} />
          ))}
        </div>
      </div>
    </ActShell>
  );
}

function ReportBlock({ r, index }: { r: Report; index: number }) {
  // Alternate left/right alignment for asymmetry, but keep mobile predictable.
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-12 items-start gap-x-8 gap-y-8"
    >
      {/* Left rail: meta + sparkline */}
      <div
        className={`col-span-12 md:col-span-3 ${flip ? "md:order-2 md:col-start-10" : ""}`}
      >
        <div className="font-mono text-[10px] tracking-kicker uppercase text-ink">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="mt-3 h-[1px] w-10 bg-creek-moss/70" />
        <div className="mt-4 font-mono text-[10px] tracking-mono uppercase text-ink-soft">
          {r.kicker}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
          {r.facility}
        </div>
        <Sparkline data={r.spark} className="mt-6" />
      </div>

      {/* Right rail: headline + body + stats */}
      <div
        className={`col-span-12 md:col-span-9 ${flip ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}
      >
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 56px)",
            lineHeight: 1.06,
            letterSpacing: "-0.028em",
            fontWeight: 700,
            maxWidth: "22ch",
            color: "rgba(245, 241, 231, 0.6)",
          }}
        >
          {r.headline}
        </h3>
        <p
          className="mt-6 max-w-[58ch] text-ink-soft md:text-lg"
          style={{ lineHeight: 1.6 }}
        >
          {r.body}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-x-6 border-t border-glass-stroke-2 pt-6 md:gap-x-10 md:pt-7">
          {r.metrics.map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute md:text-[10px]">
                {m.k}
              </div>
              <div
                className="mt-1 font-display text-ink"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 28px)",
                  letterSpacing: "-0.018em",
                  fontWeight: 500,
                }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Sparkline({ data, className = "" }: { data: number[]; className?: string }) {
  const n = data.length;
  const stepX = 100 / (n - 1);
  const d = data
    .map((v, i) => {
      const x = i * stepX;
      const y = 24 - v * 18;
      return i === 0 ? `M ${x} ${y}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 26"
      preserveAspectRatio="none"
      className={`h-12 w-full ${className}`}
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#B6AE87" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B6AE87" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L 100 24 L 0 24 Z`} fill="url(#spark-fill)" />
      <path
        d={d}
        fill="none"
        stroke="#B6AE87"
        strokeWidth="0.6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
