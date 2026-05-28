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

import type { SVGProps } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "@/lib/motion";
import { ActShell } from "./ActShell";

type ScenarioGlyph = "drift" | "funnel" | "blocked-lens";

interface Report {
  kicker: string;
  facility: string;
  glyph: ScenarioGlyph;
  headline: React.ReactNode;
  body: string;
  metrics: { k: string; v: string }[];
  spark: number[];
}

const REPORTS: Report[] = [
  {
    kicker: "scenario · drift event",
    facility: "cold-storage facility · 100+ cameras",
    glyph: "drift",
    headline: (
      <>
        When a facility&apos;s cameras drift in unison,{" "}
        <em className="italic-accent">Upstream can catch every one.</em>
      </>
    ),
    body: "Imagine a golden-hour exposure shift pulling p50 confidence below 0.75 on every dock-facing lens at once. Upstream is built to land that drift in your queue before the morning standup, so the cameras get re-tuned before the next shift starts paging.",
    metrics: [
      { k: "drift flagged", v: "every affected cam" },
      { k: "lead-time", v: "days, not hours" },
      { k: "stale alerts", v: "none during fix" },
    ],
    spark: [0.92, 0.91, 0.9, 0.88, 0.82, 0.71, 0.68, 0.64, 0.62, 0.61],
  },
  {
    kicker: "scenario · false alert audit",
    facility: "regional logistics hub",
    glyph: "funnel",
    headline: (
      <>
        Drop false alerts by reading the scene correctly,{" "}
        <em className="italic-accent">not by lowering thresholds.</em>
      </>
    ),
    body: "Imagine an old rule firing on every cast shadow near a gate. Replayed against the past 30 days of footage, a new rule can trim the false-positive load substantially without missing a single real PPE event — the review queue gets shorter, the operator gets their afternoon back.",
    metrics: [
      { k: "fp reduction", v: "double-digit %" },
      { k: "tp recovered", v: "no real events missed" },
      { k: "review queue", v: "smaller daily" },
    ],
    spark: [0.74, 0.72, 0.7, 0.65, 0.58, 0.51, 0.48, 0.44, 0.42, 0.4],
  },
  {
    kicker: "scenario · blocked lens",
    facility: "industrial yard",
    glyph: "blocked-lens",
    headline: (
      <>
        When a pallet wrap covers a camera for hours,{" "}
        <em className="italic-accent">Upstream can flag it in minutes.</em>
      </>
    ),
    body: "Silent failures are the worst kind: the camera is technically online, returning frames, returning nothing. Upstream is built to catch the entropy collapse before the next shift change, so blocked lenses get cleared instead of sitting unmonitored all night.",
    metrics: [
      { k: "time to flag", v: "minutes, not hours" },
      { k: "time to fix", v: "same shift" },
      { k: "missed alerts", v: "none during outage" },
    ],
    spark: [0.18, 0.17, 0.16, 0.15, 0.12, 0.08, 0.04, 0.02, 0.02, 0.02],
  },
];

/* ───────────────────────────────────────────────────────────────────────
   Scenario glyph chip — small hairline icon inside a rounded square,
   stationed near the kicker so each scenario carries a unique visual
   signature: a falling-edge curve for drift events, a funnel for false-
   alert audits, a blocked-lens for silent-camera scenarios.
   ──────────────────────────────────────────────────────────────────── */

const GLYPH_LABEL: Record<ScenarioGlyph, string> = {
  drift: "drift",
  funnel: "audit",
  "blocked-lens": "silent",
};

function ScenarioChip({ glyph }: { glyph: ScenarioGlyph }) {
  const Icon = GLYPHS[glyph];
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-md md:h-11 md:w-11"
        style={{
          background: "rgba(245, 241, 231, 0.04)",
          border: "1px solid rgba(245, 241, 231, 0.16)",
          color: "var(--ink-soft)",
        }}
      >
        <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </span>
      <span
        className="font-mono uppercase"
        style={{
          fontSize: "10px",
          letterSpacing: "0.22em",
          color: "var(--ink-soft)",
        }}
      >
        {GLYPH_LABEL[glyph]}
      </span>
    </div>
  );
}

const STROKE: Pick<
  SVGProps<SVGSVGElement>,
  "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin" | "fill"
> = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

function IconDriftEdge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* falling-edge curve with a small drop marker — drift event */}
      <path d="M3 7c3.5 0 5 1 7 3.5S15 17 21 17" />
      <path d="M18 14l3 3-3 3" opacity="0.6" />
      <circle cx="10" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFunnel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* funnel — false-positive filter */}
      <path d="M3 4h18l-7 8.5v6l-4 1.5v-7.5L3 4z" />
      <path d="M9 8h6" opacity="0.55" />
    </svg>
  );
}

function IconBlockedLens(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* camera lens with a slash — silent / blocked */}
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="2.5" opacity="0.6" />
      <path d="M5 19L19 5" strokeWidth="1.6" />
    </svg>
  );
}

const GLYPHS: Record<
  ScenarioGlyph,
  (props: SVGProps<SVGSVGElement>) => React.ReactNode
> = {
  drift: IconDriftEdge,
  funnel: IconFunnel,
  "blocked-lens": IconBlockedLens,
};

export function Act05Reports() {
  return (
    <ActShell id="act-reports" index="05" kicker="field reports" drench="base" phase={3}>
      <div className="shell relative z-10 pb-24 pt-12 md:pb-32 md:pt-16">
        {/* Section voice strip. Honest framing: the three reports below
            are illustrative scenarios, not actual production incidents.
            The "illustrative" pill makes that explicit so the operator
            reader doesn't mistake them for case-study claims. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 items-baseline gap-x-8 gap-y-4 border-b border-glass-stroke pb-8 md:pb-10"
        >
          <div className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-7">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-glass-stroke px-2.5 py-1 font-mono text-[9.5px] tracking-kicker uppercase text-ink-soft"
              style={{ background: "rgba(245, 241, 231, 0.04)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--ink-soft)" }}
              />
              illustrative
            </span>
            <p className="font-mono text-[10px] tracking-mono uppercase text-ink-mute">
              three scenarios · not actual incidents
            </p>
          </div>
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
  // Alternate left/right alignment for asymmetry inside each glass box,
  // but keep mobile predictable.
  const flip = index % 2 === 1;

  // Quiet magnetic pull on the whole report card + a soft reed-cream
  // blob that follows the pointer. Lower intensity than NavCta because
  // this is a 1000px-wide editorial surface, not a 100px CTA pill.
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } =
    useMagnetic<HTMLElement>({ outer: 0.018, inner: 0.008 });
  const blob = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(245, 241, 231, 0.07), transparent 70%)`;

  return (
    // Outer wrapper owns the scroll-in reveal so the magnetic transforms
    // on the article underneath don't collide with the entry animation.
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        ref={ref as React.RefObject<HTMLElement>}
        className="glass-pane relative overflow-hidden rounded-3xl p-7 md:p-12"
        style={{ x: sx, y: sy }}
        {...handlers}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: blob,
            opacity: hovered ? 1 : 0,
            transition: "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <motion.div
          className="relative z-10 grid grid-cols-12 items-start gap-x-8 gap-y-8"
          style={{ x: slx, y: sly }}
        >
        {/* Left rail: meta + sparkline */}
        <div
          className={`col-span-12 md:col-span-3 ${flip ? "md:order-2 md:col-start-10" : ""}`}
        >
        <div className="font-mono text-[10px] tracking-kicker uppercase text-ink">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="mt-3 h-[1px] w-10 bg-creek-moss/70" />
        <div className="mt-5 md:mt-6">
          <ScenarioChip glyph={r.glyph} />
        </div>
        <div className="mt-5 font-mono text-[10px] tracking-mono uppercase text-ink-soft">
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
        <div className="mt-8 border-t border-glass-stroke-2 pt-6 md:pt-7">
          {/* Honest framing: these aren't logged production numbers, they're
              the kind of outcomes Upstream is built to deliver in this
              scenario. The "illustrative" pill keeps that unambiguous. */}
          <div className="mb-4 flex items-center gap-2 md:mb-5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-glass-stroke px-2.5 py-1 font-mono text-[9px] tracking-kicker uppercase text-ink-soft md:text-[9.5px]"
              style={{ background: "rgba(245, 241, 231, 0.04)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--ink-soft)" }}
              />
              illustrative
            </span>
            <span className="font-mono text-[9px] tracking-mono uppercase text-ink-mute md:text-[10px]">
              what Upstream can deliver
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-6 md:gap-x-10">
            {r.metrics.map((m) => (
              <div key={m.k}>
                <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute md:text-[10px]">
                  {m.k}
                </div>
                <div
                  className="mt-1 font-display text-ink"
                  style={{
                    fontSize: "clamp(15px, 1.4vw, 20px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.014em",
                    fontWeight: 500,
                  }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        </motion.div>
      </motion.article>
    </motion.div>
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
