"use client";

/**
 * Act 03 — The observation.
 *
 * Drenched River Mid. ONE big camera viewport on the left, drawing
 * detection overlays as the act scrolls into view. Glass marginalia
 * on the right with cam metadata + reliability finding. Below: three
 * inline ribbon labels (ingest · inference · rules) — the consolidated
 * pipeline summary that the old site spread across three separate
 * full-bleed dashboard sections.
 *
 * The viewport is NOT a white .dn-tile here. The dashboard quote stays
 * dark and drenched so the river-mid wash carries through. Only ONE
 * dashboard moment in the new sequence, and it has its own visual
 * language.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { ActShell } from "./ActShell";
import { MarginaliaPanel } from "./MarginaliaPanel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
  tone: "primary" | "warn";
}

const BOXES: Box[] = [
  { x: 8, y: 38, w: 36, h: 26, label: "truck", conf: 0.97, tone: "primary" },
  { x: 56, y: 64, w: 8, h: 22, label: "person", conf: 0.92, tone: "primary" },
  { x: 71, y: 66, w: 7.5, h: 20, label: "person · no_vest", conf: 0.88, tone: "warn" },
  { x: 36, y: 78, w: 16, h: 10, label: "pallet", conf: 0.84, tone: "primary" },
  { x: 12, y: 12, w: 14, h: 8, label: "forklift", conf: 0.79, tone: "primary" },
];

const TONE = {
  primary: "#F5F1E7", // Reed Cream — high-contrast box on River Mid drench
  warn: "#E8C06B",    // Signal Amber — risk-flag callout
} as const;

export function Act03Observation() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const svg = svgRef.current;
      if (!svg) return;

      const paths = svg.querySelectorAll<SVGPathElement>(".obs-box");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.22,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.fromTo(
        ".obs-label",
        { y: 6, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.22,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <ActShell
      id="act-observation"
      index="03"
      kicker="the observation"
      drench="mid"
      phase={1}
    >
      <div ref={rootRef} className="shell relative z-10 pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="grid grid-cols-12 items-stretch gap-x-6 gap-y-8 md:gap-x-10">
          {/* Big viewport */}
          <div className="col-span-12 lg:col-span-8">
            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 30%, #2a3e23 0%, #0d1408 80%)",
                border: "1px solid rgba(245, 241, 231, 0.10)",
                boxShadow:
                  "0 40px 90px -40px rgba(0, 0, 0, 0.85), 0 1px 0 rgba(255, 255, 255, 0.04) inset",
              }}
            >
              {/* Scene backdrop (loading bay) */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="obs-floor" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1f3018" />
                    <stop offset="100%" stopColor="#080d05" />
                  </linearGradient>
                </defs>
                <rect width="100" height="42" fill="#142010" />
                <rect y="42" width="100" height="58" fill="url(#obs-floor)" />
                <line
                  x1="0"
                  y1="42"
                  x2="100"
                  y2="42"
                  stroke="rgba(245,241,231,0.1)"
                  strokeWidth="0.25"
                />
                {/* Truck silhouette */}
                <rect x="8" y="38" width="36" height="26" fill="#2c3a22" />
                <rect x="10" y="32" width="22" height="8" fill="#283518" />
                <circle cx="16" cy="64" r="3" fill="#0a0f06" />
                <circle cx="38" cy="64" r="3" fill="#0a0f06" />
                {/* People */}
                <rect x="56" y="64" width="8" height="22" fill="#2b3a22" rx="0.6" />
                <rect x="71" y="66" width="7.5" height="20" fill="#2b3a22" rx="0.6" />
                {/* Pallet */}
                <rect x="36" y="78" width="16" height="10" fill="#4a3e2a" />
                {/* Forklift roof */}
                <rect x="12" y="12" width="14" height="8" fill="#2a3520" />
              </svg>

              {/* Overlay (scroll-drawn). Boxes stay in SVG so the
                  stroke-dashoffset draw-in animation works; labels are
                  rendered as HTML below so the text doesn't warp with
                  the SVG's preserveAspectRatio="none". */}
              <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {BOXES.map((b, i) => {
                  const stroke = TONE[b.tone];
                  return (
                    <path
                      key={i}
                      className="obs-box"
                      d={`M ${b.x} ${b.y} L ${b.x + b.w} ${b.y} L ${b.x + b.w} ${b.y + b.h} L ${b.x} ${b.y + b.h} Z`}
                      fill="none"
                      stroke={stroke}
                      strokeWidth="0.35"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {/* Detection labels — HTML overlay positioned by %; text
                  renders at its native proportions instead of being
                  stretched by the SVG viewBox. */}
              <div className="pointer-events-none absolute inset-0">
                {BOXES.map((b, i) => {
                  const stroke = TONE[b.tone];
                  return (
                    <div
                      key={i}
                      className="obs-label absolute whitespace-nowrap font-mono text-[9px] leading-none opacity-0 motion-reduce:opacity-100 md:text-[10px]"
                      style={{
                        left: `${b.x}%`,
                        bottom: `${100 - b.y}%`,
                        background: stroke,
                        color: "#0a0f06",
                        padding: "3px 5px 2px",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {b.label} · {b.conf.toFixed(2)}
                    </div>
                  );
                })}
              </div>

              {/* Live ribbon */}
              <div
                className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink"
                style={{
                  background: "rgba(13, 20, 8, 0.65)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal-ok"
                />
                live · cam_dock_03
              </div>

              {/* ID strip — bottom */}
              <div className="absolute inset-x-4 bottom-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                <span>1920×1080 · h264 · 4000 kbps</span>
                <span className="text-ink-mute">zone_a · loading_lane</span>
              </div>
            </div>
          </div>

          {/* Marginalia + finding */}
          <div className="col-span-12 flex flex-col gap-5 lg:col-span-4">
            <MarginaliaPanel kicker="observation · just now" size="md">
              <p
                className="font-display text-ink"
                style={{
                  fontSize: "clamp(20px, 2vw, 28px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.018em",
                  fontWeight: 500,
                }}
              >
                One frame becomes one observation: class, box, confidence,
                track id.
              </p>
              <p className="mt-3 text-[13px] text-ink-soft" style={{ lineHeight: 1.55 }}>
                Bring the detector you already trust. YOLO, SAM, DETR, anything
                custom. We run it on the stream and timestamp every box, every
                confidence, every track.
              </p>
            </MarginaliaPanel>

            <MarginaliaPanel kicker="reliability finding · cam_dock_03" size="md">
              <div className="flex items-baseline gap-2 font-mono text-[10px] tracking-mono uppercase">
                <span className="text-signal-warn">at risk</span>
                <span className="text-ink-faint">·</span>
                <span className="text-ink-mute">ppe · low-light</span>
              </div>
              <p
                className="mt-2 font-display text-ink"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 19px)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.012em",
                  fontWeight: 400,
                }}
              >
                Two no-vest detections in five frames. Confidence p50 dropped
                from 0.92 to 0.78 since 18:40.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-x-3 border-t border-glass-stroke-2 pt-3">
                <Stat k="conf p50" v="0.78" />
                <Stat k="alerts" v="2" />
                <Stat k="dwell" v="11s" />
              </div>
            </MarginaliaPanel>
          </div>
        </div>

        {/* Three-stage inline ribbons — replaces the old ingest/inference/rules sections */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-glass-stroke pt-12 md:mt-20 md:grid-cols-3 md:pt-14"
        >
          <Stage
            n="01"
            title="ingest"
            body="RTSP, WebRTC, ONVIF. We meet the camera where it lives and validate every session against expected codec, resolution, FPS, and bitrate."
            spec="srt · h264 / h265 · 30 fps"
          />
          <Stage
            n="02"
            title="inference"
            body="Your model on our runtime. Every detection carries a track id, a confidence, and the exact model version that produced it. Versioned end to end."
            spec="yolo · sam · detr · custom"
          />
          <Stage
            n="03"
            title="rules"
            body="Versioned files, not buttons. Backtest against thirty days of footage before deploy. See the alert diff per camera. Ship with a verdict on the false-positive budget."
            spec="versioned · backtested"
          />
        </motion.div>
      </div>
    </ActShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-mono uppercase text-ink-mute">{k}</div>
      <div
        className="mt-0.5 font-display text-ink"
        style={{ fontSize: "16px", letterSpacing: "-0.02em", fontWeight: 500 }}
      >
        {v}
      </div>
    </div>
  );
}

function Stage({ n, title, body, spec }: { n: string; title: string; body: string; spec: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 font-mono text-[10px] tracking-kicker uppercase">
        <span className="text-ink">{n}</span>
        <span className="text-ink-faint">/</span>
        <span className="text-ink-soft">{title}</span>
      </div>
      <p
        className="mt-5 text-ink-soft"
        style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "38ch" }}
      >
        {body}
      </p>
      <div className="mt-5 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
        {spec}
      </div>
    </div>
  );
}
