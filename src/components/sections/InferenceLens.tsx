"use client";

/**
 * Section 02 — Inference. Grammar-break section: the dashboard panel
 * leads full-bleed, the headline / lede / caption sit below in the
 * shell. Both demo tiles (viewport + observations) live INSIDE the
 * dashboard panel so the light-on-dark separation is a single moment.
 *
 *   - Viewport tile mirrors latest-frame-card-next.tsx (dark image area
 *     with a mono metadata strip underneath).
 *   - Observations tile mirrors recent-observations-panel-next.tsx
 *     (mono uppercase headers, Time / Class / Conf / Track columns).
 *
 * Overlay colors come from upstream-dashboard/src/lib/perception/
 * overlay-helpers.ts: box #5fb869, line #e8c06b, ROI #c8d9b6.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { RevealText } from "@/components/atmosphere/RevealText";
import {
  DashboardPanel,
  PanelCaption,
} from "@/components/sections/CameraIngestRibbon";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const OVERLAY = {
  box: "#5fb869",
  line: "#e8c06b",
  roiStroke: "#c8d9b6",
  roiFill: "rgba(200, 217, 182, 0.16)",
} as const;

interface BoxObs {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
  tone: "box" | "line";
}

const BOXES: BoxObs[] = [
  { x: 6, y: 32, w: 38, h: 28, label: "truck", conf: 0.97, tone: "box" },
  { x: 58, y: 64, w: 8, h: 22, label: "person", conf: 0.92, tone: "box" },
  { x: 73, y: 66, w: 7.5, h: 20, label: "person", conf: 0.88, tone: "box" },
  { x: 36, y: 78, w: 16, h: 12, label: "pallet", conf: 0.84, tone: "line" },
  { x: 12, y: 12, w: 14, h: 8, label: "forklift", conf: 0.79, tone: "line" },
];

export function InferenceLens() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion();
  const [streamIdx, setStreamIdx] = useState(0);

  useGSAP(
    () => {
      if (reduced) return;
      const lens = lensRef.current;
      if (!lens) return;

      const paths = lens.querySelectorAll<SVGPathElement>(".lens-box");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.3,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.fromTo(
        ".lens-conf",
        { y: 6, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.18,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope: rootRef },
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setStreamIdx((i) => (i + 1) % BOXES.length), 1400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section id="inference" ref={rootRef} className="relative pt-32 md:pt-48">
      {/* Tiny pre-header marker — keeps a beat between sections without
          repeating the full kicker / headline / lede chrome. */}
      <div className="shell mb-8 md:mb-10">
        <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
          <span className="text-accent-warm">/ 02</span>
          <span className="opacity-50"> · </span>
          inference · observations
        </div>
      </div>

      <DashboardPanel
        breadcrumb={["cameras", "cam_dock_03"]}
        rightLabel="live · 30 fps"
      >
        <div className="@container">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 @4xl:col-span-8">
              <ViewportTile lensRef={lensRef} />
            </div>
            <aside className="col-span-12 @4xl:col-span-4">
              <ObservationsTile activeIdx={streamIdx} reduced={reduced} />
            </aside>
          </div>
        </div>
      </DashboardPanel>

      <div className="shell pb-32 md:pb-48">
        <div className="mt-12 grid grid-cols-12 items-start gap-6 md:mt-16 md:gap-10">
          <div className="col-span-12 lg:col-span-9">
            <KineticHeadline
              scale="lg"
              lines={["Detections,", "not guesses."]}
            />
            <div className="mt-7 max-w-[58ch]">
              <RevealText
                className="text-ink-soft text-base md:text-lg leading-relaxed"
                delay={0.2}
              >
                Bring the detector you trust. YOLO, SAM, DETR, anything
                custom. We run it on the ingested stream and timestamp every
                box, every confidence, every track id.
              </RevealText>
            </div>
          </div>
        </div>

        <PanelCaption>
          Every frame becomes one observation: class, box, confidence, track id.
        </PanelCaption>
      </div>
    </section>
  );
}

function ViewportTile({
  lensRef,
}: {
  lensRef: React.RefObject<SVGSVGElement | null>;
}) {
  return (
    <div className="dn-tile overflow-hidden">
      <div
        className="relative aspect-[16/10] w-full"
        style={{
          background: "radial-gradient(70% 60% at 50% 30%, #2a3e23 0%, #0d1408 80%)",
        }}
      >
        <SceneBackdrop />

        <svg
          ref={lensRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {BOXES.map((b, i) => {
            const stroke = b.tone === "line" ? OVERLAY.line : OVERLAY.box;
            return (
              <g key={i}>
                <path
                  className="lens-box"
                  d={`M ${b.x} ${b.y} L ${b.x + b.w} ${b.y} L ${b.x + b.w} ${b.y + b.h} L ${b.x} ${b.y + b.h} Z`}
                  fill="none"
                  stroke={stroke}
                  strokeWidth="0.3"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  x={b.x - 0.4}
                  y={b.y - 4}
                  width={b.label.length * 1.3 + 8}
                  height={3.4}
                  fill={stroke}
                  className="lens-conf"
                />
                <text
                  x={b.x + 0.5}
                  y={b.y - 1.4}
                  fontFamily="var(--font-mono)"
                  fontSize="1.8"
                  fill="#0a0f06"
                  className="lens-conf"
                >
                  {b.label} · {b.conf.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/85 backdrop-blur-sm"
            style={{ background: "rgba(13, 20, 8, 0.6)" }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: OVERLAY.box }}
            />
            inference · live
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 font-mono text-[11px] text-[var(--dn-text-50)] md:px-5">
        <span>
          <span className="font-bold text-[var(--dn-text)]">cam_dock_03</span>
          <span className="opacity-50"> · </span>
          1920×1080 h264
          <span className="opacity-50"> · </span>
          4000 kbps
          <span className="opacity-50"> · </span>
          zone_a / loading_lane
        </span>
        <span>captured · now</span>
      </div>
    </div>
  );
}

function SceneBackdrop() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="lens-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1f3018" />
          <stop offset="100%" stopColor="#080d05" />
        </linearGradient>
      </defs>
      <rect width="100" height="42" fill="#142010" />
      <rect y="42" width="100" height="58" fill="url(#lens-floor)" />
      <line
        x1="0"
        y1="42"
        x2="100"
        y2="42"
        stroke="rgba(245,241,231,0.1)"
        strokeWidth="0.3"
      />
      <rect x="6" y="32" width="38" height="28" fill="#28321f" />
      <rect x="58" y="60" width="9" height="28" fill="#2b3a22" />
      <rect x="73" y="62" width="8" height="26" fill="#2b3a22" />
      <rect x="36" y="78" width="16" height="10" fill="#4a3e2a" />
      <polygon
        points="8,60 60,60 92,88 8,92"
        fill={OVERLAY.roiFill}
        stroke={OVERLAY.roiStroke}
        strokeWidth="0.3"
        strokeDasharray="2 1"
      />
    </svg>
  );
}

function ObservationsTile({
  activeIdx,
  reduced,
}: {
  activeIdx: number;
  reduced: boolean;
}) {
  return (
    <div className="dn-tile flex h-full flex-col p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
            recent observations
          </p>
          <p className="mt-1 text-xs text-[var(--dn-text-50)]">
            {BOXES.length} shown · zone_a
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: OVERLAY.box }}
          />
          live: on
        </span>
      </div>

      <div className="mt-4 flex-1 overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
              <th className="py-3 pr-3 font-normal md:py-2" title="Frame offset from the start of the window.">Time</th>
              <th className="py-3 pr-3 font-normal md:py-2">Class</th>
              <th className="py-3 pr-3 font-normal md:py-2" title="Detector confidence (0 to 1). Higher is more certain.">Conf</th>
              <th className="py-3 font-normal md:py-2" title="Stable identifier assigned to one object across frames.">Track</th>
            </tr>
          </thead>
          <tbody>
            {BOXES.map((b, i) => {
              const active = !reduced && activeIdx === i;
              return (
                <tr
                  key={i}
                  className={`border-b border-black/5 transition-opacity last:border-b-0 ${
                    active ? "opacity-100" : "opacity-65"
                  }`}
                >
                  <td className="whitespace-nowrap py-3 pr-3 align-top font-mono text-[11px] text-[var(--dn-text-50)] md:py-2">
                    +{i * 38}ms
                  </td>
                  <td className="py-3 pr-3 align-top font-mono text-[13px] font-bold text-[var(--dn-text)] md:py-2">
                    {b.label}
                  </td>
                  <td className="py-3 pr-3 align-top font-mono text-[13px] tabular-nums text-[var(--dn-text)] md:py-2">
                    <CountUp value={b.conf} active={active} />
                  </td>
                  <td className="py-3 align-top font-mono text-[11px] text-[var(--dn-text-50)] md:py-2">
                    trk_{Math.floor(700 + i * 37)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Mini k="frames seen" v="843" />
        <Mini k="observations" v="1.2k" />
        <Mini k="agents" v="38" />
      </div>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--dn-text-50)]">
        {k}
      </div>
      <div className="mt-0.5 font-display text-[18px] font-bold leading-none text-[var(--dn-text)]">
        {v}
      </div>
    </div>
  );
}

function CountUp({ value, active }: { value: number; active: boolean }) {
  const mv = useMotionValue(value * 0.9);
  const display = useTransform(mv, (v) => v.toFixed(2));
  useEffect(() => {
    if (!active) return;
    const c = animate(mv, value, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [active, mv, value]);
  return <motion.span style={{ color: "currentColor" }}>{display}</motion.span>;
}
