"use client";

/**
 * Act 04 — Drift, kept visible.
 *
 * Drenched Streambank Moss. Pinned for ~150vh. The drift visualization
 * lives as water-level lines (literal river metaphor) rather than a
 * dashboard chart: three lanes (exposure, focus, confidence p50) flow
 * across a 14-day window, each rendered as a surface line with a filled
 * reflection underneath. The confidence lane drops at day 10 — the
 * divergence — and a fish silhouette breaches at the moment the line
 * dips. Glass marginalia slides up with the cause attribution.
 *
 * This act is the brand heart. The metaphor (water level = signal
 * reliability) reinforces the product idea instead of decorating it.
 */

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/motion";
import { ActShell } from "./ActShell";
import { MarginaliaPanel } from "./MarginaliaPanel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Lane {
  k: string;
  /** Hex color of the surface line. */
  color: string;
  /** 14 daily readings, normalized 0..1 (1 = surface, 0 = bed). */
  data: number[];
}

const LANES: Lane[] = [
  {
    k: "exposure",
    color: "#F5F1E7", // Reed Cream — steady
    data: [0.86, 0.84, 0.85, 0.83, 0.82, 0.84, 0.85, 0.84, 0.83, 0.82, 0.84, 0.85, 0.84, 0.83],
  },
  {
    k: "focus",
    color: "#B6AE87", // Moss-bright — steady
    data: [0.78, 0.79, 0.78, 0.77, 0.78, 0.77, 0.78, 0.79, 0.78, 0.77, 0.78, 0.78, 0.77, 0.78],
  },
  {
    k: "confidence p50",
    color: "#5FB869", // Signal Bright — this is the lane that DROPS
    data: [0.92, 0.91, 0.92, 0.91, 0.90, 0.90, 0.89, 0.88, 0.86, 0.82, 0.74, 0.68, 0.61, 0.55],
  },
];

const DIVERGENCE_DAY = 10; // 0-indexed; visually around day 10 of 14

export function Act04Drift() {
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
            end: "+=120%",
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

  const dayIdx = Math.min(13, Math.floor(progress * 14));
  const dayLabel = `D-${14 - dayIdx}`;
  const calloutOn = progress > DIVERGENCE_DAY / 14;
  const fishOn = progress > (DIVERGENCE_DAY + 1) / 14;
  const needleX = 4 + progress * 92;

  return (
    <ActShell
      id="act-drift"
      index="04"
      kicker="drift, kept visible"
      drench="moss"
      hideKicker
      tall
      fixedBg={false}
      phase={2}
      className="!min-h-[100svh]"
    >
      <div
        ref={rootRef}
        className="relative"
        style={{ minHeight: "100vh" }}
      >
        <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
          <div className="shell relative z-10 flex h-full flex-col pt-28 pb-10 md:pt-32 md:pb-14">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] tracking-kicker uppercase text-ink">
                <span className="text-ink-faint">/ </span>04
              </span>
              <span className="font-mono text-[11px] tracking-kicker uppercase text-ink-soft">
                drift, kept visible
              </span>
              <span className="ml-auto font-mono text-[11px] tracking-mono uppercase text-ink-mute">
                cam_bay_07 · 14d · {dayLabel}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-12 items-end gap-x-8 gap-y-6 md:mt-10">
              <h2
                className="col-span-12 font-display md:col-span-9"
                style={{
                  fontSize: "clamp(32px, 5.4vw, 80px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                  fontWeight: 700,
                  color: "rgba(245, 241, 231, 0.6)",
                }}
              >
                The water level drops <em className="italic-accent">before</em>
                <br />
                the pager goes off.
              </h2>
              <p
                className="col-span-12 max-w-[44ch] text-ink-soft md:col-span-3 md:justify-self-end md:text-right"
                style={{ lineHeight: 1.55 }}
              >
                Three signals per camera. The same model that ran cleanly all
                summer can fall off a cliff the day the sun moves.
              </p>
            </div>

            {/* The water-level chart */}
            <div className="relative mt-10 flex-1 md:mt-12">
              <div className="relative h-full w-full overflow-visible">
                <svg
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    {LANES.map((lane, li) => (
                      <linearGradient
                        key={lane.k}
                        id={`drift-fill-${li}`}
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={lane.color} stopOpacity="0.32" />
                        <stop offset="100%" stopColor={lane.color} stopOpacity="0" />
                      </linearGradient>
                    ))}
                  </defs>

                  {/* horizontal hairlines for tone */}
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={5 + i * 17}
                      x2="100"
                      y2={5 + i * 17}
                      stroke="rgba(245,241,231,0.06)"
                      strokeWidth="0.12"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* divergence vertical */}
                  <line
                    x1={4 + (DIVERGENCE_DAY / 13) * 92}
                    x2={4 + (DIVERGENCE_DAY / 13) * 92}
                    y1="2"
                    y2="58"
                    stroke="rgba(232,192,107,0.55)"
                    strokeWidth="0.18"
                    strokeDasharray="1.4 1.6"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* lanes — paths only; labels render as HTML below so
                      the text doesn't warp with preserveAspectRatio="none". */}
                  {LANES.map((lane, li) => {
                    const baseY = 14 + li * 15;
                    const surface = lanePath(lane.data, baseY, 7);
                    const reflection = `${surface} L 100 ${baseY + 9} L 0 ${baseY + 9} Z`;
                    const isConfidence = lane.k === "confidence p50";
                    return (
                      <g key={lane.k}>
                        <path d={reflection} fill={`url(#drift-fill-${li})`} />
                        <path
                          d={surface}
                          fill="none"
                          stroke={lane.color}
                          strokeWidth={isConfidence ? "0.45" : "0.32"}
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          style={{
                            filter:
                              isConfidence && calloutOn
                                ? "drop-shadow(0 0 4px rgba(232,192,107,0.7))"
                                : "none",
                            transition: "filter 600ms ease",
                          }}
                        />
                      </g>
                    );
                  })}

                  {/* needle */}
                  <line
                    x1={needleX}
                    x2={needleX}
                    y1="2"
                    y2="58"
                    stroke="rgba(245,241,231,0.9)"
                    strokeWidth="0.22"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={needleX} cy="2" r="0.7" fill="#F5F1E7" />
                </svg>

                {/* Lane labels — HTML overlay positioned by %; text renders
                    at native proportions instead of being stretched by the
                    SVG viewBox. */}
                <div className="pointer-events-none absolute inset-0">
                  {LANES.map((lane, li) => {
                    const baseY = 14 + li * 15;
                    const labelY = baseY - 2;
                    return (
                      <div
                        key={lane.k}
                        className="absolute font-mono text-[9px] uppercase tracking-[0.18em] md:text-[10px]"
                        style={{
                          left: "0.5%",
                          bottom: `${((60 - labelY) / 60) * 100}%`,
                          color: "rgba(245, 241, 231, 0.62)",
                        }}
                      >
                        {lane.k.toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                {/* Day label following the needle */}
                <div
                  className="pointer-events-none absolute -top-1 -translate-x-1/2 font-mono text-[10px] tracking-kicker uppercase text-ink"
                  style={{ left: `${needleX}%` }}
                >
                  {dayLabel}
                </div>

                {/* Time axis */}
                <div className="absolute inset-x-0 bottom-0 flex justify-between pt-2 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
                  <span>14 days ago</span>
                  <span>{calloutOn ? "drift event" : "—"}</span>
                  <span>today</span>
                </div>

                {/* Fish breach at divergence */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{
                    left: `${4 + (DIVERGENCE_DAY / 13) * 92 - 6}%`,
                    bottom: "44%",
                    width: "12%",
                    aspectRatio: "1 / 1",
                    opacity: fishOn ? 0.6 : 0,
                    transform: fishOn
                      ? "translateY(0) rotate(-12deg)"
                      : "translateY(20px) rotate(-12deg)",
                    transition:
                      "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                    filter: "saturate(0.5) brightness(1.1)",
                  }}
                >
                  <Image
                    src="/assets/UpstreamFish.png"
                    alt=""
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>

                {/* Divergence callout — glass marginalia that slides in */}
                <div
                  className="pointer-events-none absolute right-2 top-2 max-w-[300px] transition-all duration-700 md:right-4 md:top-4"
                  style={{
                    opacity: calloutOn ? 1 : 0,
                    transform: calloutOn ? "translateY(0)" : "translateY(14px)",
                  }}
                >
                  <MarginaliaPanel kicker="drift event · cam_bay_07" size="md">
                    <p
                      className="font-display text-ink"
                      style={{
                        fontSize: "clamp(15px, 1.3vw, 18px)",
                        lineHeight: 1.35,
                        letterSpacing: "-0.012em",
                        fontWeight: 500,
                      }}
                    >
                      Confidence p50 fell from 0.88 to 0.61 over four days.
                    </p>
                    <div className="mt-3 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
                      cause · sun-angle shift, golden-hour exposure
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-x-3 border-t border-glass-stroke-2 pt-3">
                      <Stat k="lead time" v="3.2d" />
                      <Stat k="alerts" v="0" />
                      <Stat k="status" v="at risk" amber />
                    </div>
                  </MarginaliaPanel>
                </div>
              </div>
            </div>

            <p className="mt-6 font-mono text-[10px] tracking-mono uppercase text-ink-mute md:mt-8">
              scroll to scrub the window · lower confidence = less to trust
            </p>
          </div>
        </div>
      </div>
    </ActShell>
  );
}

function Stat({ k, v, amber = false }: { k: string; v: string; amber?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute">{k}</div>
      <div
        className={`mt-0.5 font-display ${amber ? "text-signal-warn" : "text-ink"}`}
        style={{ fontSize: "14px", letterSpacing: "-0.018em", fontWeight: 500 }}
      >
        {v}
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
