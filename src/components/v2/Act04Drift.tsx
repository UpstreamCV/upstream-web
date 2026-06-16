"use client";

/**
 * Act 04 — Drift, kept visible.
 *
 * Mirrors the dashboard home: a "Fleet Overview" tile (every camera sorted
 * Healthy / Review / Critical, charted over the last 24h) spanning the left
 * half, and a "Triage" tile on the right listing the few alerts that actually
 * need attention. The divergence is visible here before it reaches a pager.
 *
 * Illustrative sample data — there is no fleet-health / alerts endpoint wired
 * to the marketing site, so the series + rows are deterministic fakes (pure +
 * seedless, identical SSR + client) and the chart is labelled "Illustrative".
 */

import { motion } from "framer-motion";
import { ActShell } from "./ActShell";

// Status triad — matches the dashboard Fleet Overview / Triage (red / orange /
// green) so the graph reads as the same product surface.
const RED = "#f94b4b"; // critical
const ORANGE = "#ff8f57"; // needs review
const GREEN = "#48c84a"; // healthy

const HOURS = 24; // 24h of hourly points (+ the current point)

// Deterministic fake series: a smooth wave around `base` (peak deviation
// `amp`), clamped ≥ 0. Pure + seedless (no Math.random / no Date) so SSR and
// client render identically — no hydration mismatch.
function fakeSeries(base: number, amp: number, phase: number): number[] {
  const n = HOURS + 1;
  return Array.from({ length: n }, (_, i) => {
    const wave =
      Math.sin(i * 0.55 + phase) * 0.6 + Math.sin(i * 0.23 + phase * 1.7) * 0.4;
    return Math.max(0, Math.round(base + wave * amp));
  });
}

function niceMax(v: number): number {
  if (v <= 5) return 5;
  if (v <= 10) return 10;
  const step = v <= 50 ? 5 : v <= 100 ? 10 : 25;
  return Math.ceil(v / step) * step;
}

const Y_DIVISIONS = 5;
function yTicks(maxY: number): number[] {
  const step = maxY / Y_DIVISIONS;
  return Array.from({ length: Y_DIVISIONS + 1 }, (_, i) => maxY - i * step);
}

interface Series {
  key: string;
  color: string;
  count: number;
  points: number[];
}

const SERIES: Series[] = [
  { key: "Critical", color: RED, count: 2, points: fakeSeries(2, 1.5, 0.4) },
  { key: "Review", color: ORANGE, count: 6, points: fakeSeries(6, 2.6, 2.1) },
  { key: "Healthy", color: GREEN, count: 28, points: fakeSeries(28, 4, 3.7) },
];

interface TriageItem {
  sev: "Critical" | "Review";
  color: string;
  title: string;
  time: string;
  message: string;
  cam: string;
  loc: string;
}

const TRIAGE: TriageItem[] = [
  {
    sev: "Critical",
    color: RED,
    title: "Blocked lens",
    time: "14m",
    message: "Online, but returning a flat, empty image.",
    cam: "dock_cam_03",
    loc: "cold-storage · Dock B",
  },
  {
    sev: "Review",
    color: ORANGE,
    title: "Confidence drift",
    time: "2h",
    message: "Confidence drifted 0.92 → 0.68 over six hours.",
    cam: "gate_cam_07",
    loc: "logistics hub · North Gate",
  },
  {
    sev: "Review",
    color: ORANGE,
    title: "Exposure spike",
    time: "20m",
    message: "Golden-hour backlight saturating the lens; quality at 0.58.",
    cam: "yard_cam_11",
    loc: "industrial yard · Yard 2",
  },
];

export function Act04Drift() {
  return (
    <ActShell
      id="act-drift"
      index="04"
      kicker="drift, kept visible"
      drench="moss"
      hideKicker
      phase={2}
    >
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-28 md:pb-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 items-end gap-x-8 gap-y-6"
        >
          <h2
            className="col-span-12 font-display md:col-span-8"
            style={{
              fontSize: "clamp(32px, 5vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              color: "rgba(245, 241, 231, 0.6)",
            }}
          >
            Your fleet&apos;s health, <em className="italic-accent">hour by hour.</em>
          </h2>
          <p
            className="col-span-12 max-w-[46ch] text-ink-soft md:col-span-4 md:justify-self-end md:text-right"
            style={{ lineHeight: 1.55 }}
          >
            Every camera sorted healthy, needs-review, or critical. You see
            drift start here — before it reaches your pager.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-12 lg:grid-cols-2"
        >
          <FleetTile />
          <TriageTile />
        </motion.div>
      </div>
    </ActShell>
  );
}

/* ── Fleet Overview ─────────────────────────────────────────────────── */

function FleetTile() {
  return (
    <div className="tile-dark flex flex-col rounded-3xl p-6 md:p-8">
      <header className="flex items-baseline justify-between gap-3">
        <h3
          className="font-display text-ink"
          style={{ fontSize: "clamp(18px, 1.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Fleet Overview
        </h3>
        <span className="font-mono text-[10px] tracking-mono uppercase text-ink-mute">
          Last 24 hours
        </span>
      </header>

      <div
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full px-5 py-3"
        style={{ background: "rgba(245, 241, 231, 0.04)" }}
      >
        <LegendItem color={RED} count={2} label="Critical" kind="alert" />
        <LegendItem color={ORANGE} count={6} label="Review" kind="alert" />
        <LegendItem color={GREEN} count={28} label="Healthy" kind="check" />
      </div>

      <FleetHealthChart lines={SERIES} />
    </div>
  );
}

function LegendItem({
  color,
  count,
  label,
  kind,
}: {
  color: string;
  count: number;
  label: string;
  kind: "alert" | "check";
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
        style={{ background: color }}
      >
        {kind === "check" ? <CheckGlyph /> : <AlertGlyph />}
      </span>
      <span className="font-display text-[15px] font-semibold text-ink">
        {count} <span className="font-medium text-ink-soft">{label}</span>
      </span>
    </span>
  );
}

function AlertGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 7v6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.5" fill="#fff" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-rolled SVG line+area chart (no chart library) — the viewBox is stretched
// to the plot box (preserveAspectRatio="none"); vector-effect="non-scaling-stroke"
// keeps line/grid widths constant despite the non-uniform scale.
function FleetHealthChart({ lines }: { lines: Series[] }) {
  const n = lines[0]?.points.length ?? 0;
  const maxY = niceMax(Math.max(1, ...lines.flatMap((l) => l.points)));
  const ticks = yTicks(maxY);
  const VW = 100;
  const VH = 100;
  const PAD = 6;
  const x = (i: number) => (n <= 1 ? 0 : (i / (n - 1)) * VW);
  const y = (v: number) => PAD + (1 - v / maxY) * (VH - PAD * 2);
  const areaD = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join("") +
    `L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z`;

  return (
    <div
      className="relative mt-5 flex flex-1 flex-col gap-2 rounded-2xl p-4 md:p-5"
      style={{ background: "rgba(245, 241, 231, 0.03)" }}
    >
      <span className="pointer-events-none absolute right-4 top-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
        Illustrative
      </span>

      <div className="flex flex-1 gap-2" style={{ minHeight: "clamp(190px, 26vh, 300px)" }}>
        {/* y scale — evenly spaced ticks, each aligned to its gridline */}
        <div className="relative w-7 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-faint">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 leading-none"
              style={{ top: `${y(t)}%` }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* plot */}
        <div className="relative min-w-0 flex-1">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <defs>
              {lines.map((l, idx) => (
                <linearGradient key={idx} id={`fleet-grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: l.color, stopOpacity: 0.28 }} />
                  <stop offset="100%" style={{ stopColor: l.color, stopOpacity: 0 }} />
                </linearGradient>
              ))}
            </defs>

            {ticks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={VW}
                y1={y(t)}
                y2={y(t)}
                stroke="rgba(245,241,231,0.08)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {[...lines.keys()].reverse().map((idx) => (
              <path key={`area-${idx}`} d={areaD(lines[idx].points)} fill={`url(#fleet-grad-${idx})`} />
            ))}

            {lines.map((l, idx) => (
              <polyline
                key={idx}
                points={l.points.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
                fill="none"
                stroke={l.color}
                strokeWidth={2.25}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="flex justify-between pl-9 font-mono text-[10px] uppercase tracking-mono text-ink-faint">
        <span>24h ago</span>
        <span>18h</span>
        <span>12h</span>
        <span>6h</span>
        <span>Now</span>
      </div>
    </div>
  );
}

/* ── Triage ─────────────────────────────────────────────────────────── */

function TriageTile() {
  return (
    <div className="tile-dark flex flex-col rounded-3xl p-6 md:p-8">
      <header className="flex items-baseline justify-between gap-3">
        <h3
          className="font-display text-ink"
          style={{ fontSize: "clamp(18px, 1.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Triage{" "}
          <span className="font-mono text-[11px] tracking-mono uppercase text-ink-mute">
            what needs attention
          </span>
        </h3>
        <span className="font-mono text-[10px] tracking-mono uppercase text-ink-mute">
          {TRIAGE.length} open
        </span>
      </header>

      <ul className="mt-2 flex flex-col divide-y divide-glass-stroke-2">
        {TRIAGE.map((item) => (
          <TriageRow key={item.cam} item={item} />
        ))}
      </ul>

      <TriageBanner />
    </div>
  );
}

function TriageRow({ item }: { item: TriageItem }) {
  const glow = `color-mix(in srgb, ${item.color} 55%, transparent)`;
  return (
    <li className="flex items-center gap-4 py-4">
      {/* Camera snapshot — severity-bordered + glowing; image-icon placeholder
          (no fleet-level snapshot endpoint on the marketing site). */}
      <div
        className="relative grid aspect-[16/10] w-20 shrink-0 place-items-center overflow-hidden rounded-lg md:w-24"
        style={{
          border: `2px solid ${item.color}`,
          boxShadow: `0 0 16px ${glow}`,
          background: "rgba(245, 241, 231, 0.06)",
        }}
      >
        <ImageGlyph className="h-6 w-6 text-ink-faint" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className="shrink-0 rounded px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-mono"
            style={{
              background: `color-mix(in srgb, ${item.color} 20%, transparent)`,
              color: item.color,
            }}
          >
            {item.sev}
          </span>
          <span className="min-w-0 truncate font-display text-[14px] font-semibold text-ink">
            {item.title}
          </span>
          <span className="shrink-0 text-[11px] text-ink-faint">· {item.time}</span>
        </div>
        <p className="line-clamp-2 text-[12px] text-ink-mute" style={{ lineHeight: 1.5 }}>
          {item.message}
        </p>
        <div className="font-mono text-[9px] tracking-mono uppercase text-ink-faint">
          {item.cam} · {item.loc}
        </div>
      </div>

      <span className="shrink-0 self-center rounded-full border border-glass-stroke bg-glass-bg px-3.5 py-1.5 font-mono text-[10px] tracking-mono uppercase text-ink-soft">
        Review
      </span>
    </li>
  );
}

function TriageBanner() {
  return (
    <div
      className="mt-4 flex items-center gap-3 rounded-2xl px-5 py-3.5"
      style={{
        background: "rgba(245, 241, 231, 0.04)",
        border: `1px solid color-mix(in srgb, ${GREEN} 45%, transparent)`,
      }}
    >
      <ShieldGlyph className="h-7 w-7 shrink-0" style={{ color: GREEN }} />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-ink">
          We&rsquo;re only showing what needs your attention.
        </p>
        <p className="text-[12px] text-ink-mute">
          The rest were handled automatically.
        </p>
      </div>
    </div>
  );
}

function ImageGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M3 17l5-4 4 3 3-2 6 5" />
    </svg>
  );
}

function ShieldGlyph({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
