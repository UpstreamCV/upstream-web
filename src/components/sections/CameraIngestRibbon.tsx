"use client";

/**
 * Section 01 — Ingest. Dashboard-embedded fleet view. Drops SectionShell
 * so the dashboard panel can go full-bleed (a dramatic light-on-dark
 * separation that signals "you've stepped into the product"). Shell-
 * bound header sits above, caption sits below.
 *
 * Tile chrome mirrors upstream-dashboard/src/components/dashboard-next/
 * camera-card.tsx: dark image area, name + colored status, mono spec row.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { RevealText } from "@/components/atmosphere/RevealText";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type TileStatus = "streaming" | "idle" | "error" | "disabled";

interface Tile {
  id: string;
  scene: string;
  status: TileStatus;
  spec: string;
}

const STATUS_COLOR: Record<TileStatus, string> = {
  streaming: "#5fb869",
  idle: "#9aa39a",
  error: "#e15a4c",
  disabled: "#9aa39a",
};

const STATUS_LABEL: Record<TileStatus, string> = {
  streaming: "#3f7d4e",
  idle: "var(--dn-text-50)",
  error: "#c0473b",
  disabled: "var(--dn-text-50)",
};

const TILES: Tile[] = [
  { id: "cam_dock_03", scene: "dock", status: "streaming", spec: "1920×1080 · 30 fps · h264" },
  { id: "cam_yard_12", scene: "yard", status: "streaming", spec: "1280×720 · 25 fps · h264" },
  { id: "cam_bay_07",  scene: "bay",  status: "error",     spec: "session timeout · retry 02:14" },
  { id: "cam_gate_01", scene: "gate", status: "streaming", spec: "1920×1080 · 30 fps · h265" },
  { id: "cam_lane_19", scene: "lane", status: "streaming", spec: "1920×1080 · 30 fps · h264" },
  { id: "cam_ramp_04", scene: "ramp", status: "streaming", spec: "1920×1080 · 30 fps · h264" },
  { id: "cam_lot_22",  scene: "lot",  status: "disabled",  spec: "stream paused by operator" },
  { id: "cam_vest_05", scene: "vest", status: "streaming", spec: "1280×720 · 25 fps · h264" },
  { id: "cam_dock_11", scene: "dock", status: "streaming", spec: "1920×1080 · 30 fps · h264" },
  { id: "cam_yard_18", scene: "yard", status: "idle",      spec: "awaiting heartbeat" },
  { id: "cam_exit_02", scene: "exit", status: "streaming", spec: "1920×1080 · 30 fps · h265" },
  { id: "cam_load_09", scene: "lane", status: "streaming", spec: "1280×720 · 25 fps · h264" },
];

export function CameraIngestRibbon() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const root = rootRef.current;
      if (!root) return;
      const tiles = gsap.utils.toArray<HTMLElement>(".ingest-tile");

      gsap.fromTo(
        tiles,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: { each: 0.04, from: "random" },
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <section id="ingest" ref={rootRef} className="relative pt-32 md:pt-48">
      <div className="shell">
        <SectionHeader
          index="01"
          kicker="ingest"
          headline={["Every frame,", "every camera,", "surfaced."]}
          lede="The pipeline begins at the lens. RTSP, WebRTC, ONVIF. We meet the camera where it lives, and from that moment on every frame leaves a trace."
        />
      </div>

      {/* Full-bleed dashboard panel — light-theme island. */}
      <DashboardPanel
        breadcrumb={["cameras"]}
        rightLabel={`fleet · ${TILES.length} cameras`}
      >
        <div className="@container">
          <div className="grid grid-cols-2 gap-3 @sm:grid-cols-3 @md:grid-cols-4 @md:gap-4 @2xl:grid-cols-6">
            {TILES.map((t) => (
              <CameraTile key={t.id} {...t} />
            ))}
          </div>
        </div>

        <div className="@container mt-6 md:mt-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-white/80 @md:grid-cols-4">
          <LegendDot
            color={STATUS_COLOR.streaming}
            hint="Camera is actively pushing frames to the agent."
          >
            streaming
          </LegendDot>
          <LegendDot
            color={STATUS_COLOR.idle}
            hint="Camera is connected but not currently streaming."
          >
            idle
          </LegendDot>
          <LegendDot
            color={STATUS_COLOR.disabled}
            hint="Stream paused by operator."
          >
            disabled
          </LegendDot>
          <LegendDot
            color={STATUS_COLOR.error}
            hint="Connection lost or session timeout."
          >
            error
          </LegendDot>
          </div>
        </div>
      </DashboardPanel>

      <div className="shell pb-32 md:pb-48">
        <PanelCaption>
          Every connected camera, refreshed every 5 seconds.
        </PanelCaption>
      </div>
    </section>
  );
}

/* --------------------------- shared chrome --------------------------- */

export function SectionHeader({
  index,
  kicker,
  headline,
  lede,
  headScale = "lg",
}: {
  index: string;
  kicker: string;
  headline: (string | React.ReactNode)[];
  lede?: React.ReactNode;
  headScale?: "xl" | "lg" | "md";
}) {
  return (
    <header className="mb-16 grid grid-cols-12 items-end gap-x-8 gap-y-8 md:mb-20">
      <div className="col-span-12 md:col-span-3 xl:col-span-2">
        <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
          <span className="text-ink-mute">/ </span>
          {index}
        </div>
        <div className="mt-2 font-mono text-[11px] tracking-kicker uppercase text-ink-mute">
          {kicker}
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 md:col-start-4 xl:col-span-9">
        <KineticHeadline lines={headline} scale={headScale} />
        {lede ? (
          <div className="mt-7 max-w-[58ch]">
            <RevealText
              className="text-ink-soft text-base md:text-lg leading-relaxed"
              delay={0.2}
            >
              {lede}
            </RevealText>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function DashboardPanel({
  breadcrumb,
  rightLabel,
  preview = false,
  children,
}: {
  breadcrumb: string[];
  rightLabel: React.ReactNode;
  /** Adds a "preview · roadmap" badge marking the surface as future product. */
  preview?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="dn-demo relative w-full py-10 md:py-14"
      style={{
        // The Equal Confluence Rule — Deep Creek, River Mid, Streambank Moss
        // all glance into the panel. River Mid carries the body (the moving
        // water the tiles float on); Deep Creek washes in from the top-left
        // corner; Streambank Moss highlights the bottom-right. Overall
        // midtone is kept close to the previous single-mid-creek value so
        // small text on white .dn-tiles still clears WCAG AA against it.
        background:
          "radial-gradient(60% 100% at 0% 0%, rgba(52, 76, 44, 0.5), transparent 60%), " +
          "radial-gradient(55% 90% at 100% 100%, rgba(129, 118, 75, 0.20), transparent 65%), " +
          "linear-gradient(180deg, #3a5a48 0%, #2f4a3c 100%)",
      }}
    >
      <div className="shell">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-white/85 md:mb-6">
          <span className="inline-flex items-center gap-3">
            <span>
              {breadcrumb.map((seg, i) => (
                <span key={i}>
                  {seg}
                  {i < breadcrumb.length - 1 ? (
                    <span className="text-white/50"> / </span>
                  ) : null}
                </span>
              ))}
            </span>
            {preview ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-2 py-0.5 text-[9px] text-white/85">
                <span
                  aria-hidden="true"
                  className="inline-block h-1 w-1 rounded-full"
                  style={{
                    background: "#e8c06b",
                    boxShadow: "0 0 0 2px rgba(232,192,107,0.25)",
                  }}
                />
                preview · roadmap
              </span>
            ) : null}
          </span>
          <span className="text-white/75">{rightLabel}</span>
        </div>

        {children}
      </div>
    </div>
  );
}

export function PanelCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-10 max-w-[62ch] text-center font-mono text-[11px] uppercase tracking-wider text-ink-mute leading-relaxed md:mt-12">
      {children}
    </p>
  );
}

/* --------------------------- tile components --------------------------- */

function CameraTile({ id, scene, status, spec }: Tile) {
  const dotColor = STATUS_COLOR[status];
  const labelColor = STATUS_LABEL[status];

  return (
    <article className="ingest-tile dn-tile flex flex-col overflow-hidden">
      {/* Dark video frame. Mirrors the dashboard's aspect-video
          thumbnail placeholder, tinted to the project's dark forest
          tone since we're rendering a synthetic scene inside. */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0e1808]">
        <Scene name={scene} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 2px, rgba(245,241,231,0.05) 2px 3px)",
            mixBlendMode: "overlay",
            opacity: 0.55,
          }}
        />
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 inline-block rounded-full"
          style={{
            width: 7,
            height: 7,
            background: dotColor,
            boxShadow: `0 0 0 3px ${dotColor}33`,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 p-3 md:p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-[12px] font-bold leading-tight md:text-[13px]">
            {id}
          </h3>
          <span
            className="shrink-0 font-mono text-[10px] font-bold capitalize"
            style={{ color: labelColor }}
          >
            {status}
          </span>
        </div>
        <p className="truncate font-mono text-[10px] text-[var(--dn-text-50)]">
          {spec}
        </p>
      </div>
    </article>
  );
}

export function LegendDot({
  color,
  children,
  hint,
}: {
  color: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2" title={hint}>
      <span
        aria-hidden="true"
        className="inline-block rounded-full"
        style={{
          width: 6,
          height: 6,
          background: color,
          boxShadow: `0 0 0 3px ${color}33`,
        }}
      />
      {children}
    </span>
  );
}

/* --------------------------- scene per tile --------------------------- */

function Scene({ name }: { name: string }) {
  const fill = "rgba(245,241,231,0.07)";
  const accent = "rgba(200,217,182,0.22)";

  return (
    <svg
      viewBox="0 0 100 75"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d2c14" />
          <stop offset="100%" stopColor="#0a0f06" />
        </linearGradient>
      </defs>
      <rect width="100" height="75" fill="#142010" />
      <rect y="42" width="100" height="33" fill="url(#floor)" />
      <line
        x1="0"
        y1="42"
        x2="100"
        y2="42"
        stroke="rgba(245,241,231,0.08)"
        strokeWidth="0.3"
      />

      {name === "dock" && (
        <>
          <rect x="14" y="34" width="38" height="20" fill={fill} stroke={accent} strokeWidth="0.3" />
          <rect x="58" y="44" width="20" height="14" fill={fill} />
          <circle cx="22" cy="56" r="2" fill={accent} />
          <circle cx="44" cy="56" r="2" fill={accent} />
        </>
      )}
      {name === "yard" && (
        <>
          <rect x="10" y="36" width="22" height="22" fill={fill} />
          <rect x="38" y="40" width="18" height="18" fill={fill} />
          <rect x="62" y="44" width="28" height="14" fill={fill} />
        </>
      )}
      {name === "bay" && (
        <polygon
          points="20,40 80,40 70,58 30,58"
          fill={fill}
          stroke={accent}
          strokeWidth="0.3"
        />
      )}
      {name === "gate" && (
        <>
          <rect x="46" y="20" width="2" height="40" fill={accent} />
          <rect x="52" y="20" width="2" height="40" fill={accent} />
          <rect x="30" y="30" width="40" height="2" fill={fill} />
        </>
      )}
      {name === "lane" && (
        <>
          <polygon points="40,40 60,40 80,72 20,72" fill={fill} />
          <line
            x1="50"
            y1="40"
            x2="50"
            y2="72"
            stroke={accent}
            strokeDasharray="2 2"
            strokeWidth="0.5"
          />
        </>
      )}
      {name === "ramp" && (
        <polygon
          points="10,55 90,40 90,65 10,65"
          fill={fill}
          stroke={accent}
          strokeWidth="0.3"
        />
      )}
      {name === "lot" && (
        <>
          {/* disabled — heavy haze */}
          <rect width="100" height="75" fill="rgba(60,80,30,0.18)" />
          <rect x="20" y="30" width="60" height="30" fill="rgba(80,60,40,0.4)" />
        </>
      )}
      {name === "vest" && (
        <>
          <rect x="40" y="40" width="6" height="20" fill={accent} rx="1" />
          <rect x="60" y="42" width="6" height="18" fill={fill} rx="1" />
        </>
      )}
      {name === "exit" && (
        <>
          <rect x="38" y="28" width="24" height="34" fill={fill} stroke={accent} strokeWidth="0.3" />
          <rect x="46" y="36" width="8" height="26" fill="rgba(214,193,137,0.2)" />
        </>
      )}
    </svg>
  );
}
