"use client";

/**
 * Act 05 — Field reports.
 *
 * Three short scenario tiles in ONE ROW (was three viewport-scale editorial
 * blocks stacked vertically). Each tile is compact: a scenario glyph, a
 * one-line headline, a two-line body, a single key outcome stat, and a
 * sparkline. The section keeps its honest "A report, not a haystack /
 * illustrative" framing so the tiles don't read as logged production claims.
 */

import type { SVGProps } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { ActShell } from "./ActShell";
import { useMagnetic } from "@/lib/motion";

type ScenarioGlyph = "drift" | "funnel" | "blocked-lens";

interface Report {
  facility: string;
  glyph: ScenarioGlyph;
  headline: React.ReactNode;
  body: string;
  stat: { k: string; v: string };
  spark: number[];
}

const REPORTS: Report[] = [
  {
    facility: "cold-storage · 100+ cams",
    glyph: "drift",
    headline: (
      <>
        Catch a fleet-wide drift{" "}
        <em className="italic-accent">before standup.</em>
      </>
    ),
    body: "Golden-hour sun drops confidence on every dock lens at once. In your queue before the morning shift.",
    stat: { k: "lead-time", v: "days, not hours" },
    spark: [0.92, 0.91, 0.9, 0.88, 0.82, 0.71, 0.68, 0.64, 0.62, 0.61],
  },
  {
    facility: "regional logistics hub",
    glyph: "funnel",
    headline: (
      <>
        Cut false alerts{" "}
        <em className="italic-accent">without lowering the bar.</em>
      </>
    ),
    body: "Replay a noisy rule over 30 days of footage. Fewer false alerts, zero missed PPE events.",
    stat: { k: "fp reduction", v: "double-digit %" },
    spark: [0.74, 0.72, 0.7, 0.65, 0.58, 0.51, 0.48, 0.44, 0.42, 0.4],
  },
  {
    facility: "industrial yard",
    glyph: "blocked-lens",
    headline: (
      <>
        Flag a blocked lens{" "}
        <em className="italic-accent">in minutes.</em>
      </>
    ),
    body: "A wrapped camera, online but blind. We flag it before the next shift change.",
    stat: { k: "time to flag", v: "minutes, not hours" },
    spark: [0.18, 0.17, 0.16, 0.15, 0.12, 0.08, 0.04, 0.02, 0.02, 0.02],
  },
];

/* ───────────────────────────────────────────────────────────────────────
   Scenario glyph chip — small hairline icon inside a rounded square that
   gives each scenario a unique visual signature.
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
        className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
        style={{
          background: "rgba(245, 241, 231, 0.04)",
          border: "1px solid rgba(245, 241, 231, 0.16)",
          color: "var(--ink-soft)",
        }}
      >
        <Icon className="h-5 w-5" />
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
      <path d="M3 7c3.5 0 5 1 7 3.5S15 17 21 17" />
      <path d="M18 14l3 3-3 3" opacity="0.6" />
      <circle cx="10" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFunnel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      <path d="M3 4h18l-7 8.5v6l-4 1.5v-7.5L3 4z" />
      <path d="M9 8h6" opacity="0.55" />
    </svg>
  );
}

function IconBlockedLens(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
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
    <ActShell id="act-reports" index="05" kicker="field reports" drench="base" hideKicker phase={3}>
      <div className="shell relative z-10 pb-12 pt-28 md:pb-16 md:pt-32">
        {/* Section voice strip — honest framing: the three tiles below are
            illustrative scenarios, not logged production incidents. */}
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

        {/* Three short scenario tiles in one row. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {REPORTS.map((r, i) => (
            <ReportTile key={i} r={r} index={i} />
          ))}
        </div>
      </div>
    </ActShell>
  );
}

function ReportTile({ r, index }: { r: Report; index: number }) {
  // Same frosted-glass + magnetic pull + cursor-blob treatment as
  // MarginaliaPanel (lib/motion.ts → useMagnetic). The scroll-in entrance lives
  // on an outer wrapper so its y-animation doesn't fight the magnetic x/y
  // motion values on the card itself.
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } =
    useMagnetic<HTMLElement>({ outer: 0.025, inner: 0.01 });
  const blob = useMotionTemplate`radial-gradient(360px circle at ${gx}% ${gy}%, rgba(245, 241, 231, 0.10), transparent 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="h-full"
    >
      <motion.article
        ref={ref}
        {...handlers}
        style={{ x: sx, y: sy }}
        className="glass-pane relative flex h-full flex-col overflow-hidden rounded-3xl p-7 md:p-8"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: blob,
            opacity: hovered ? 1 : 0,
            transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <motion.div
          className="relative z-10 flex h-full w-full flex-col"
          style={{ x: slx, y: sly }}
        >
          <ScenarioChip glyph={r.glyph} />

          <h3
            className="mt-6 font-display"
            style={{
              fontSize: "clamp(20px, 1.7vw, 26px)",
              lineHeight: 1.14,
              letterSpacing: "-0.022em",
              fontWeight: 700,
              color: "rgba(245, 241, 231, 0.6)",
            }}
          >
            {r.headline}
          </h3>

          <p
            className="mt-3 text-ink-soft"
            style={{ fontSize: "14.5px", lineHeight: 1.55 }}
          >
            {r.body}
          </p>

          <div className="mt-auto pt-7">
            <Sparkline data={r.spark} />
            <div className="mt-4 flex items-baseline justify-between border-t border-glass-stroke-2 pt-4">
              <span className="font-mono text-[9.5px] tracking-mono uppercase text-ink-mute">
                {r.stat.k}
              </span>
              <span
                className="font-display text-ink"
                style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                {r.stat.v}
              </span>
            </div>
            <div className="mt-3 font-mono text-[9px] tracking-mono uppercase text-ink-faint">
              {r.facility}
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
