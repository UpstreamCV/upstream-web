"use client";

/**
 * Section 03 — Rules. Dashboard-embedded preview of what the rule
 * composer will look like once the reliability layer ships (Q1 2027,
 * per docs/product-overview.md §9). White .dn-tile editor + .dn-tile
 * preview inside the full-bleed dashboard panel. The "preview · roadmap"
 * chip in the breadcrumb marks this as future product.
 */

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  DashboardPanel,
  PanelCaption,
  SectionHeader,
} from "@/components/sections/CameraIngestRibbon";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const RULE_LINES: { tokens: { c?: string; t: string }[] }[] = [
  { tokens: [{ c: "k", t: "rule" }, { t: " " }, { c: "n", t: "ppe_dwell" }, { c: "p", t: ":" }] },
  { tokens: [{ c: "i", t: "  version" }, { c: "p", t: ":" }, { t: " " }, { c: "v", t: "v4" }] },
  { tokens: [{ c: "i", t: "  scope" }, { c: "p", t: ":" }] },
  { tokens: [{ c: "i", t: "    cameras" }, { c: "p", t: ":" }, { t: " " }, { c: "v", t: "[ dock_*, bay_* ]" }] },
  { tokens: [{ c: "i", t: "    zone" }, { c: "p", t: ":" }, { t: " " }, { c: "v", t: "loading_lane" }] },
  { tokens: [{ c: "i", t: "  when" }, { c: "p", t: ":" }] },
  { tokens: [{ c: "i", t: "    person.enters" }, { c: "p", t: "(" }, { c: "v", t: "loading_lane" }, { c: "p", t: ")" }] },
  { tokens: [{ c: "i", t: "    AND " }, { c: "i", t: "no_vest_confidence" }, { c: "p", t: " > " }, { c: "v", t: "0.78" }] },
  { tokens: [{ c: "i", t: "    AND " }, { c: "i", t: "dwell_seconds" }, { c: "p", t: " > " }, { c: "v", t: "4" }] },
  { tokens: [{ c: "i", t: "  fire" }, { c: "p", t: ":" }, { t: " " }, { c: "v", t: "event.ppe_violation" }] },
  { tokens: [{ c: "c", t: "  # backtest 30d: +12% TP, -34% FP" }] },
];

// Light-theme syntax tokens (rendered on the white .dn-tile editor body).
const tokenColor: Record<string, string> = {
  k: "text-[#3f7d4e]",
  n: "text-[var(--dn-text)] font-bold",
  i: "text-[var(--dn-text-70)]",
  v: "text-[#8a6612]",
  p: "text-[var(--dn-text-50)]",
  c: "text-[var(--dn-text-50)] italic",
};

export function RuleComposer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [linesVisible, setLinesVisible] = useState(0);
  const [polygonProgress, setPolygonProgress] = useState(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (reduced) {
        setLinesVisible(RULE_LINES.length);
        setPolygonProgress(1);
        return;
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 65%",
        once: true,
        onEnter: () => {
          const interval = setInterval(() => {
            setLinesVisible((n) => {
              if (n >= RULE_LINES.length) {
                clearInterval(interval);
                return n;
              }
              return n + 1;
            });
          }, 180);

          gsap.to(
            { p: 0 },
            {
              p: 1,
              duration: RULE_LINES.length * 0.18,
              ease: "power2.inOut",
              onUpdate: function () {
                setPolygonProgress(this.targets()[0].p);
              },
            },
          );
        },
      });
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <section id="rules" ref={rootRef} className="relative pt-32 md:pt-48">
      <div className="shell">
        <SectionHeader
          index="03"
          kicker="rules"
          headline={["Rules are", "code.", "Not buttons."]}
          lede="Every rule is a versioned file. Backtest it against the past 30 days, see the diff in alert volume per camera, and ship the change with a verdict on its false-positive budget."
        />
      </div>

      <DashboardPanel
        breadcrumb={["rules", "ppe_dwell"]}
        rightLabel="v4 · git diff +12 −3"
        preview
      >
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 lg:col-span-7">
            <EditorTile linesVisible={linesVisible} />
          </div>
          <aside className="col-span-12 lg:col-span-5">
            <PreviewTile polygonProgress={polygonProgress} />
          </aside>
        </div>
      </DashboardPanel>

      <div className="shell pb-32 md:pb-48">
        <PanelCaption>
          Backtest, ship, and rollback as versioned config.
        </PanelCaption>
      </div>
    </section>
  );
}

function EditorTile({ linesVisible }: { linesVisible: number }) {
  return (
    <div className="dn-tile overflow-hidden">
      {/* Editor chrome: traffic-light glyphs + file path + ship status */}
      <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2.5 md:px-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e15a4c]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8c06b]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5fb869]/70" />
        </div>
        <div className="truncate font-mono text-[11px] text-[var(--dn-text-50)]">
          rules/ppe_dwell.yaml
        </div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#3f7d4e]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: "#5fb869",
              boxShadow: "0 0 0 3px rgba(95,184,105,0.22)",
            }}
          />
          backtest passing
        </div>
      </div>

      {/* Code body — light bg, syntax-tinted monospace */}
      <pre className="m-0 overflow-x-auto bg-white px-5 py-5 font-mono text-[12.5px] leading-[1.85] md:px-6">
        {RULE_LINES.map((line, idx) => (
          <span
            key={idx}
            className={`block transition-opacity duration-300 ${
              idx < linesVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="select-none pr-4 text-[10px] text-[var(--dn-text-50)] opacity-50">
              {String(idx + 1).padStart(2, "0")}
            </span>
            {line.tokens.map((t, i) => (
              <span
                key={i}
                className={t.c ? tokenColor[t.c] : "text-[var(--dn-text)]"}
              >
                {t.t}
              </span>
            ))}
            {idx === linesVisible - 1 && idx < RULE_LINES.length - 1 ? (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[#5fb869]" />
            ) : null}
          </span>
        ))}
      </pre>
    </div>
  );
}

function PreviewTile({ polygonProgress }: { polygonProgress: number }) {
  return (
    <div className="dn-tile flex h-full flex-col overflow-hidden">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2.5 md:px-5">
        <div className="font-mono text-[11px] text-[var(--dn-text-50)]">
          rule preview · zone shown live
        </div>
        <div className="font-mono text-[11px] font-bold text-[var(--dn-text)]">
          v4
        </div>
      </div>

      {/* Dark camera frame inside the white tile (Section 01 pattern). */}
      <div
        className="relative aspect-[5/4] w-full overflow-hidden bg-[#0e1808]"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="rule-floor" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1f3018" />
              <stop offset="100%" stopColor="#080d05" />
            </linearGradient>
          </defs>
          <rect width="100" height="48" fill="#142010" />
          <rect y="48" width="100" height="52" fill="url(#rule-floor)" />
          <line
            x1="0"
            y1="48"
            x2="100"
            y2="48"
            stroke="rgba(245,241,231,0.08)"
            strokeWidth="0.3"
          />
          <rect x="10" y="36" width="36" height="22" fill="#28321f" />
          <PolygonZone progress={polygonProgress} />
          <rect x="58" y="62" width="8" height="22" fill="rgba(232,192,107,0.55)" rx="1" />
          <rect x="72" y="64" width="7" height="20" fill="rgba(232,192,107,0.45)" rx="1" />
        </svg>

        <div className="absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/80">
          <span>
            {polygonProgress < 0.99 ? "drawing zone…" : "loading_lane · armed"}
          </span>
          <span>cam_bay_07</span>
        </div>
      </div>

      {/* Backtest stats footer */}
      <div className="grid grid-cols-3 gap-3 p-4 md:p-5">
        <Backtest k="alerts / day" v="22 → 14" trend="down" />
        <Backtest k="true positive" v="+12%" trend="up" />
        <Backtest k="false positive" v="−34%" trend="down" />
      </div>
    </div>
  );
}

function PolygonZone({ progress }: { progress: number }) {
  const total = 280;
  const offset = total * (1 - progress);

  return (
    <g>
      <polygon
        points="8,60 60,60 92,88 8,92"
        fill={`rgba(200, 217, 182, ${0.04 + progress * 0.18})`}
        stroke="#c8d9b6"
        strokeWidth="0.45"
        strokeDasharray={total}
        strokeDashoffset={offset}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x="10"
        y="68"
        fill="#c8d9b6"
        fontFamily="var(--font-mono)"
        fontSize="2"
        opacity={progress > 0.6 ? 1 : 0}
        style={{ transition: "opacity 400ms ease" }}
      >
        ZONE_A · loading_lane
      </text>
    </g>
  );
}

function Backtest({
  k,
  v,
  trend,
}: {
  k: string;
  v: string;
  trend: "up" | "down";
}) {
  // For these metrics, both "up" and "down" can be improvements; encode the
  // metric's good-direction as green (#3f7d4e) and adverse as amber.
  // Here all three current values are improvements, so the arrow stays green.
  return (
    <div className="rounded-lg border border-black/10 bg-white p-2.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--dn-text-50)]">
        {k}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[14px] font-bold text-[var(--dn-text)]">
          {v}
        </span>
        <span className="text-[#3f7d4e]" aria-hidden="true">
          {trend === "up" ? "↑" : "↓"}
        </span>
      </div>
    </div>
  );
}
