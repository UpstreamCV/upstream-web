"use client";

/**
 * Section 05 — Replay. Dashboard-embedded preview of the eventual
 * backtest viewer. White .dn-tile viewport + scrub + tracks, white
 * .dn-tile verdict-diff panel. "preview · roadmap" badge marks this as
 * future product (the reliability layer ships Q1 2027).
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

interface Ev {
  t: number;
  oldVerdict: "tp" | "fp" | "miss";
  newVerdict: "tp" | "fp" | "miss";
  label: string;
}

const EVENTS: Ev[] = [
  { t: 0.05, oldVerdict: "fp", newVerdict: "fp", label: "vehicle.idle" },
  { t: 0.12, oldVerdict: "fp", newVerdict: "tp", label: "person.no_vest" },
  { t: 0.22, oldVerdict: "tp", newVerdict: "tp", label: "ppe.violation" },
  { t: 0.30, oldVerdict: "fp", newVerdict: "tp", label: "person.no_vest" },
  { t: 0.38, oldVerdict: "fp", newVerdict: "miss", label: "shadow.flicker" },
  { t: 0.46, oldVerdict: "tp", newVerdict: "tp", label: "forklift.entry" },
  { t: 0.55, oldVerdict: "fp", newVerdict: "tp", label: "person.no_vest" },
  { t: 0.62, oldVerdict: "miss", newVerdict: "tp", label: "ppe.violation" },
  { t: 0.71, oldVerdict: "fp", newVerdict: "miss", label: "shadow.flicker" },
  { t: 0.79, oldVerdict: "tp", newVerdict: "tp", label: "vehicle.zone_breach" },
  { t: 0.87, oldVerdict: "fp", newVerdict: "tp", label: "person.no_vest" },
  { t: 0.95, oldVerdict: "tp", newVerdict: "tp", label: "ppe.violation" },
];

const tone = {
  tp: "#5fb869",
  fp: "#e8c06b",
  miss: "#9aa39a",
} as const;

export function ReplayScrubber() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [playhead, setPlayhead] = useState(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (reduced) {
        setPlayhead(1);
        return;
      }

      const tween = gsap.to(
        { p: 0 },
        {
          p: 1,
          ease: "none",
          onUpdate: function () {
            setPlayhead(this.targets()[0].p);
          },
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        },
      );

      return () => {
        tween.kill();
      };
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <section id="replay" ref={rootRef} className="relative pt-32 md:pt-48">
      <div className="shell">
        <SectionHeader
          index="05"
          kicker="replay"
          headline={["Backtest the change", "before it ships."]}
          lede="Every rule replays against the last 30 days of footage. See the diff before deploy: which alerts the new rule would have caught, which old false positives it silences."
        />
      </div>

      <DashboardPanel
        breadcrumb={["replay", "ppe_dwell"]}
        rightLabel="cam_dock_03 · 30d window · v3 → v4"
        preview
      >
        <div className="@container">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 @4xl:col-span-8">
              <ViewportTile playhead={playhead} />
            </div>
            <aside className="col-span-12 @4xl:col-span-4">
              <DiffTile />
            </aside>
          </div>
        </div>
      </DashboardPanel>

      <div className="shell pb-32 md:pb-48">
        <PanelCaption>
          Scroll to scrub the playhead across the past 30 days.
        </PanelCaption>
      </div>
    </section>
  );
}

function ViewportTile({ playhead }: { playhead: number }) {
  return (
    <div className="dn-tile flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2.5 font-mono text-[11px] text-[var(--dn-text-50)] md:px-5">
        <span>
          <span className="font-bold text-[var(--dn-text)]">cam_dock_03</span>
          <span className="opacity-50"> · </span>
          30d replay
          <span className="opacity-50"> · </span>
          ppe_dwell v3 → v4
        </span>
        <span className="text-[10px] uppercase tracking-wider">
          scroll to scrub
        </span>
      </div>

      {/* Dark replay frame */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 30%, #2a3e23 0%, #0d1408 80%)",
        }}
      >
        <svg
          viewBox="0 0 100 56"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <rect width="100" height="22" fill="#142010" />
          <rect y="22" width="100" height="34" fill="#0a1208" />
          <line
            x1="0"
            y1="22"
            x2="100"
            y2="22"
            stroke="rgba(245,241,231,0.06)"
            strokeWidth="0.2"
          />
          <rect x="8" y="14" width="36" height="22" fill="#28321f" />
          <rect
            x={58 + playhead * 18}
            y="34"
            width="7"
            height="18"
            fill="rgba(232,192,107,0.55)"
            rx="0.5"
          />
          <rect
            x={72 + playhead * 14}
            y="36"
            width="6.5"
            height="16"
            fill="rgba(232,192,107,0.5)"
            rx="0.5"
          />
          <polygon
            points="6,40 60,40 92,52 6,54"
            fill="rgba(200,217,182,0.16)"
            stroke="#c8d9b6"
            strokeWidth="0.3"
            strokeDasharray="1.2 0.8"
          />
        </svg>

        <div className="absolute inset-x-4 top-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/85">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur-sm"
            style={{ background: "rgba(13, 20, 8, 0.6)" }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: "#e8c06b" }}
            />
            replay · D-{Math.max(1, 30 - Math.floor(playhead * 30))}
          </span>
          <span
            className="rounded-full px-2 py-1 backdrop-blur-sm"
            style={{ background: "rgba(13, 20, 8, 0.6)" }}
          >
            {Math.floor(playhead * 30 * 24)}h elapsed
          </span>
        </div>
      </div>

      {/* Tracks + scrub bar on light surface */}
      <div className="px-4 pb-5 pt-4 md:px-5">
        <Track
          label="rule v3"
          events={EVENTS}
          pick={(e) => e.oldVerdict}
          playhead={playhead}
        />
        <div className="my-3 border-t border-black/10" />
        <Track
          label="rule v4"
          events={EVENTS}
          pick={(e) => e.newVerdict}
          playhead={playhead}
        />

        <div className="relative mt-6 h-1 rounded-full bg-[rgba(10,15,6,0.1)]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#5fb869]"
            style={{ width: `${playhead * 100}%` }}
          />
          <div
            className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border border-white shadow"
            style={{
              left: `${playhead * 100}%`,
              background: "var(--dn-text)",
            }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
          <span>30d ago</span>
          <span>now</span>
        </div>
      </div>
    </div>
  );
}

function Track({
  label,
  events,
  pick,
  playhead,
}: {
  label: string;
  events: Ev[];
  pick: (e: Ev) => "tp" | "fp" | "miss";
  playhead: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
        <span className="font-bold text-[var(--dn-text)]">{label}</span>
        <span>{events.length} events</span>
      </div>
      <div className="relative mt-2 h-8 rounded-md border border-black/10 bg-[rgba(10,15,6,0.04)]">
        {events.map((e, i) => {
          const active = e.t <= playhead;
          const v = pick(e);
          return (
            <span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                left: `${e.t * 100}%`,
                opacity: active ? 1 : 0.3,
                background: tone[v],
                width: v === "miss" ? 6 : 10,
                height: v === "miss" ? 6 : 14,
                borderRadius: v === "miss" ? 999 : 2,
                boxShadow: active && v !== "miss" ? `0 0 10px ${tone[v]}55` : "none",
              }}
              title={e.label}
            />
          );
        })}
      </div>
    </div>
  );
}

function DiffTile() {
  return (
    <div className="dn-tile flex h-full flex-col p-5 md:p-6">
      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
        verdict diff · v3 → v4
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Diff k="true positives" v="+8" tone="up" />
        <Diff k="false positives" v="−14" tone="up" />
        <Diff k="missed events" v="±0" tone="flat" />
        <Diff k="alerts / day" v="−34%" tone="up" />
      </div>

      <div className="mt-5 space-y-2.5 border-t border-black/10 pt-4">
        <LegendRow tone="tp" label="true positive · real event, caught" />
        <LegendRow tone="fp" label="false positive · silenced by v4" />
        <LegendRow tone="miss" label="miss · known gap, tracked" />
      </div>

      <div className="mt-5 rounded-lg border border-black/10 bg-[rgba(10,15,6,0.03)] p-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--dn-text-50)]">
          ship verdict
        </div>
        <div className="mt-1.5 text-[13px] font-bold leading-snug text-[var(--dn-text)]">
          Below the false-positive budget. Cleared to deploy across bay_*
          and dock_*.
        </div>
      </div>
    </div>
  );
}

function Diff({
  k,
  v,
  tone: t,
}: {
  k: string;
  v: string;
  tone: "up" | "down" | "flat";
}) {
  const color =
    t === "up"
      ? "#3f7d4e"
      : t === "flat"
        ? "var(--dn-text-50)"
        : "#c0473b";
  return (
    <div className="rounded-lg border border-black/10 bg-white p-2.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--dn-text-50)]">
        {k}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[14px] font-bold text-[var(--dn-text)]">
          {v}
        </span>
        <span style={{ color }} aria-hidden="true">
          {t === "up" ? "↑" : t === "flat" ? "·" : "↓"}
        </span>
      </div>
    </div>
  );
}

function LegendRow({
  tone: t,
  label,
}: {
  tone: "tp" | "fp" | "miss";
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--dn-text-70)]">
      <span
        className="inline-block"
        style={{
          background: tone[t],
          width: t === "miss" ? 6 : 10,
          height: t === "miss" ? 6 : 12,
          borderRadius: t === "miss" ? 999 : 2,
        }}
      />
      {label}
    </div>
  );
}
