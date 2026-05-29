"use client";

/**
 * Section 04 — Drift (brand heart). Pinned for ~150vh. Scrubbed needle
 * moves across a 14-day window over three lanes (exposure, focus, p50
 * confidence). At the divergence point the confidence lane glows and a
 * callout slides up.
 *
 * Dashboard-embedded preview of the reliability layer's drift monitor.
 * The pinned chart now renders as a white .dn-tile inside the full-bleed
 * dn-demo panel; the "preview · roadmap" chip in the breadcrumb marks
 * this as future product (no drift detection ships today per
 * docs/product-overview.md §9).
 */

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  DashboardPanel,
  LegendDot,
  PanelCaption,
  SectionHeader,
} from "@/components/sections/CameraIngestRibbon";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Light-theme lane colors (rendered on the white .dn-tile chart body).
const LANES = [
  {
    k: "exposure",
    color: "#5fb869",
    data: [0.62, 0.6, 0.61, 0.59, 0.58, 0.6, 0.61, 0.6, 0.59, 0.58, 0.6, 0.61, 0.6, 0.59],
  },
  {
    k: "focus",
    color: "#c8a04a",
    data: [0.78, 0.79, 0.78, 0.77, 0.78, 0.77, 0.78, 0.79, 0.78, 0.77, 0.78, 0.78, 0.77, 0.78],
  },
  {
    k: "confidence p50",
    color: "#1c2a17",
    data: [0.92, 0.91, 0.92, 0.91, 0.9, 0.9, 0.89, 0.88, 0.86, 0.82, 0.74, 0.68, 0.61, 0.55],
  },
];

const DIVERGENCE_DAY = 10;

export function DriftTimeline() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      if (reduced) {
        setProgress(1);
        return;
      }

      const tween = gsap.to(
        { p: 0 },
        {
          p: 1,
          ease: "none",
          onUpdate: function () {
            setProgress(this.targets()[0].p);
          },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=100%",
            scrub: 0.6,
            pin,
            pinSpacing: true,
          },
        },
      );

      return () => {
        tween.kill();
      };
    },
    { dependencies: [reduced], scope: rootRef },
  );

  const needleX = 4 + progress * 92;
  const dayLabel = `D-${Math.max(1, 14 - Math.floor(progress * 14))}`;
  const calloutOn = progress > DIVERGENCE_DAY / 14;

  return (
    <section
      id="drift"
      ref={rootRef}
      className="relative"
      style={{ minHeight: "100vh" }}
    >
      <div ref={pinRef} className="relative h-screen w-full">
        <div className="absolute inset-0 flex flex-col pt-20 pb-6">
          <div className="shell">
            <SectionHeader
              index="04"
              kicker="drift"
              headline={[
                "Drift detected",
                "before it costs you.",
              ]}
              lede="The same model that ran cleanly all summer can fall off a cliff the day the sun moves. We watch every camera's signal decay (exposure, focus, p50 confidence), and flag the divergence before your pager does."
              headScale="lg"
            />
          </div>

          <DashboardPanel
            breadcrumb={["drift", "cam_bay_07"]}
            rightLabel={`14d window · ${dayLabel}`}
            preview
          >
            <ChartTile
              needleX={needleX}
              dayLabel={dayLabel}
              calloutOn={calloutOn}
            />
          </DashboardPanel>

          <div className="shell">
            <PanelCaption>
              Scroll to scrub the 14-day window.
            </PanelCaption>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartTile({
  needleX,
  dayLabel,
  calloutOn,
}: {
  needleX: number;
  dayLabel: string;
  calloutOn: boolean;
}) {
  return (
    <div className="dn-tile overflow-hidden">
      {/* Chart header — title + small status dot (callout card carries the detail) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-4 py-3 md:px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
            drift monitor · 14d window
          </p>
          <p className="mt-0.5 text-sm font-bold text-[var(--dn-text)]">
            cam_bay_07
          </p>
        </div>
        <span
          aria-hidden={!calloutOn}
          aria-label={calloutOn ? "drift active" : undefined}
          className={`inline-block h-2 w-2 rounded-full transition-opacity ${
            calloutOn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "#e8c06b",
            boxShadow: "0 0 0 4px rgba(232,192,107,0.2)",
          }}
        />
      </div>

      {/* Chart canvas */}
      <div className="relative px-3 pt-6 pb-3 md:px-6">
        <div className="relative h-[240px] overflow-visible rounded-lg border border-black/10 bg-[rgba(10,15,6,0.02)] md:h-[280px]">
          <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* horizontal guides */}
            {[0.25, 0.5, 0.75].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y * 50}
                x2="100"
                y2={y * 50}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="0.15"
                strokeDasharray="0.4 1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* lanes */}
            {LANES.map((lane, li) => {
              const baseY = 12 + li * 12;
              const isConfidence = lane.k === "confidence p50";
              return (
                <g key={lane.k}>
                  <path
                    d={lanePath(lane.data, baseY, 4)}
                    fill="none"
                    stroke={lane.color}
                    strokeWidth="0.32"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      filter:
                        isConfidence && calloutOn
                          ? "drop-shadow(0 0 5px rgba(232,192,107,0.65))"
                          : "none",
                    }}
                  />
                  <path
                    d={`${lanePath(lane.data, baseY, 4)} L 100 ${baseY + 6} L 0 ${baseY + 6} Z`}
                    fill={`${lane.color}14`}
                  />
                  <text
                    x="1.5"
                    y={baseY - 2}
                    fontFamily="var(--font-mono)"
                    fontSize="1.6"
                    fill="rgba(10, 15, 6, 0.55)"
                  >
                    {lane.k}
                  </text>
                </g>
              );
            })}

            {/* divergence marker */}
            <line
              x1={4 + (DIVERGENCE_DAY / 13) * 92}
              x2={4 + (DIVERGENCE_DAY / 13) * 92}
              y1="6"
              y2="46"
              stroke="rgba(232,192,107,0.7)"
              strokeWidth="0.18"
              strokeDasharray="1 1"
              vectorEffect="non-scaling-stroke"
            />

            {/* needle */}
            <line
              x1={needleX}
              x2={needleX}
              y1="2"
              y2="48"
              stroke="rgba(10, 15, 6, 0.85)"
              strokeWidth="0.22"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={needleX}
              cy="2"
              r="0.7"
              fill="rgba(10, 15, 6, 0.95)"
            />
          </svg>

          {/* needle label */}
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text)]"
            style={{ left: `${needleX}%` }}
          >
            {dayLabel}
          </div>

          {/* divergence callout — light card on white chart */}
          <div
            className={`pointer-events-none absolute top-12 left-1/2 max-w-[min(240px,calc(100vw-32px))] -translate-x-1/2 rounded-lg border bg-white p-3.5 shadow-md transition-all duration-700 md:left-[62%] md:translate-x-0 ${
              calloutOn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              borderColor: "rgba(232, 192, 107, 0.5)",
              boxShadow:
                "0 18px 40px -20px rgba(232,192,107,0.45), 0 1px 0 rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "#8a6612" }}
            >
              drift event · cam_bay_07
            </div>
            <div className="mt-1.5 text-[13px] font-bold leading-snug text-[var(--dn-text)]">
              Confidence p50 fell from 0.88 → 0.61 over four days.
            </div>
            <div className="mt-2 font-mono text-[10px] text-[var(--dn-text-50)]">
              cause: sun-angle shift · golden hour exposure
            </div>
          </div>
        </div>

        {/* time axis below the chart */}
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-mono text-[var(--dn-text-50)]">
          <span>D-14</span>
          <span>today</span>
        </div>

        {/* lane legend below the chart */}
        <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
          <LegendDot color={LANES[0].color}>{LANES[0].k}</LegendDot>
          <LegendDot color={LANES[1].color}>{LANES[1].k}</LegendDot>
          <LegendDot color={LANES[2].color}>{LANES[2].k}</LegendDot>
        </div>

        <p className="mt-3 font-mono text-[10px] text-[var(--dn-text-50)] leading-relaxed">
          Lower confidence = model accuracy dropping. Amber line marks divergence.
        </p>
      </div>
    </div>
  );
}

function lanePath(data: number[], baseY: number, amp: number) {
  const n = data.length;
  const stepX = 100 / (n - 1);
  return data
    .map((v, i) => {
      const x = i * stepX;
      const y = baseY + (1 - v) * amp;
      if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      const prevX = (i - 1) * stepX;
      const cx = (prevX + x) / 2;
      return `C ${cx.toFixed(2)} ${(baseY + (1 - data[i - 1]) * amp).toFixed(2)}, ${cx.toFixed(2)} ${y.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}
