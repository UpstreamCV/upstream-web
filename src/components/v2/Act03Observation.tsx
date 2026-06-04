"use client";

/**
 * Act 03 — The observation.
 *
 * Drenched River Mid. ONE big camera viewport on the left, playing a
 * real YOLO11L warehouse clip with bounding-box overlays driven by the
 * sibling /upstream-demo project's frame-by-frame detections JSON. As
 * the video plays, an rAF loop reads currentTime, snaps to the nearest
 * source frame (6 fps), and updates the bbox state — boxes follow the
 * tracked people exactly because they were produced from the same video.
 *
 * Boxes and labels are rendered as HTML elements positioned by % of the
 * native 640×360 coordinate space; nothing here uses SVG, so the boxes
 * stay sharp at any viewport width.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { ActShell } from "./ActShell";
import { MarginaliaPanel } from "./MarginaliaPanel";

const VIDEO_URL = "/assets/demo-warehouse.mp4";
const DETECTIONS_URL = "/assets/demo-warehouse-detections.json";
const NATIVE_W = 640;
const NATIVE_H = 360;
// The source video has timecode burn-in on the top and bottom edges that
// we don't want on the demo. The viewport container uses aspect-[16/7]
// (wider than the source 16:9), so `object-cover` on the <video> scales
// it to fill width and crops ~40 native px from top and bottom. The bbox
// y-coordinates remap against the same visible band so the overlays stay
// aligned with the people in the cropped video.
const CROP_TOP_NATIVE_PX = 40;
const CROP_BOTTOM_NATIVE_PX = 40;
const VISIBLE_NATIVE_H = NATIVE_H - CROP_TOP_NATIVE_PX - CROP_BOTTOM_NATIVE_PX;
// Detections below this confidence are rendered as "likely false positive"
// — amber instead of cream, with an "audit?" suffix. The threshold is set
// so that ≥ 25% of the source detections cross it (p25 of the JSON's
// confidence distribution sits at 0.535), which is the visual story we
// want: detection isn't perfect, and the audit layer is the thing that
// catches the lies.
const FP_CONF_THRESHOLD = 0.55;

interface Bbox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

interface Detection {
  track_id: number;
  class_name: string;
  confidence: number;
  bbox: Bbox;
}

interface Frame {
  frame: number;
  detections: Detection[];
}

interface DetectionsData {
  video: {
    width: number;
    height: number;
    fps: number;
    total_frames: number;
    duration_seconds: number;
  };
  frames: Frame[];
}

export function Act03Observation() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const dataRef = useRef<DetectionsData | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);

  // Fetch the detections JSON once on mount.
  useEffect(() => {
    let cancelled = false;
    fetch(DETECTIONS_URL)
      .then((r) => r.json())
      .then((json: DetectionsData) => {
        if (cancelled) return;
        dataRef.current = json;
        setDetections(json.frames[0]?.detections ?? []);
      })
      .catch(() => {
        // Silent — the viewport stays as the bare video without boxes.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Per-frame sync: rAF watches the video's currentTime and pushes new
  // detections to state ONLY when the source-frame index changes (6 fps),
  // so React doesn't re-render 60× per second.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    const tick = () => {
      const data = dataRef.current;
      if (data) {
        const fps = data.video.fps;
        const total = data.video.total_frames;
        const idx = Math.min(total - 1, Math.max(0, Math.floor(video.currentTime * fps)));
        if (idx !== lastFrameRef.current) {
          lastFrameRef.current = idx;
          setDetections(data.frames[idx]?.detections ?? []);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Best-effort autoplay (browsers gate this until loadeddata sometimes).
  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      void video.play().catch(() => {});
    };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });
  }, [reduced]);

  return (
    <ActShell
      id="act-observation"
      index="03"
      kicker="the observation"
      drench="mid"
      hideKicker
      phase={1}
    >
      <div className="shell relative z-10 pb-24 pt-28 md:pb-32 md:pt-32">
        <div className="grid grid-cols-12 items-stretch gap-x-6 gap-y-8 md:gap-x-10">
          {/* Big viewport — real demo video + JSON-driven bbox overlays.
              Spans the full width of the act so the demo is the visual
              anchor; the two marginalia panels stack underneath. */}
          <div className="col-span-12">
            <div
              className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl"
              style={{
                background: "#060a03",
                border: "1px solid rgba(245, 241, 231, 0.10)",
                boxShadow:
                  "0 40px 90px -40px rgba(0, 0, 0, 0.85), 0 1px 0 rgba(255, 255, 255, 0.04) inset",
              }}
            >
              {/* The actual demo footage from upstream-demo */}
              <video
                ref={videoRef}
                src={VIDEO_URL}
                autoPlay={!reduced}
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Bounding-box overlays — HTML positioned by % of the
                  source 640×360 frame. Track id stays stable so React
                  can keep the same DOM nodes across frames; the position
                  values just change inline. Detections whose confidence
                  falls below FP_CONF_THRESHOLD render amber instead of
                  cream — Upstream's audit flagging them as likely false
                  positive. About a quarter of the source detections sit
                  in that band, so the reader sees amber boxes appearing
                  and disappearing as the model gets less sure. */}
              <div className="pointer-events-none absolute inset-0">
                {detections.map((det) => {
                  const left = (det.bbox.x1 / NATIVE_W) * 100;
                  // Remap y to the visible band of the cropped video so the
                  // boxes track the people, not the (now-hidden) full frame.
                  const top =
                    ((det.bbox.y1 - CROP_TOP_NATIVE_PX) / VISIBLE_NATIVE_H) * 100;
                  const width = (det.bbox.width / NATIVE_W) * 100;
                  const height = (det.bbox.height / VISIBLE_NATIVE_H) * 100;
                  const isLikelyFP = det.confidence < FP_CONF_THRESHOLD;
                  const borderColor = isLikelyFP
                    ? "rgba(232, 192, 107, 0.95)"
                    : "rgba(245, 241, 231, 0.95)";
                  const labelBg = isLikelyFP ? "#E8C06B" : "#F5F1E7";
                  const labelText = isLikelyFP ? "#1a1207" : "#0a0f06";
                  return (
                    <div
                      key={det.track_id}
                      className="absolute"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        width: `${width}%`,
                        height: `${height}%`,
                        border: `2px solid ${borderColor}`,
                        borderRadius: "3px",
                        boxShadow: isLikelyFP
                          ? "0 0 0 1px rgba(10, 15, 6, 0.55), inset 0 0 0 1px rgba(10, 15, 6, 0.25), 0 0 16px rgba(232, 192, 107, 0.32)"
                          : "0 0 0 1px rgba(10, 15, 6, 0.55), inset 0 0 0 1px rgba(10, 15, 6, 0.25)",
                      }}
                    >
                      <div
                        className="absolute left-0 whitespace-nowrap font-mono text-[9px] leading-none md:text-[10px]"
                        style={{
                          top: "-18px",
                          background: labelBg,
                          color: labelText,
                          padding: "3px 5px 2px",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                        }}
                      >
                        person · trk_{det.track_id.toString().padStart(2, "0")} · {det.confidence.toFixed(2)}
                        {isLikelyFP ? " · audit?" : ""}
                      </div>
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
                live · yolo11l · cam_dock_03
              </div>

              {/* ID strip — bottom; obs count + audit-flagged count come
                  from the current frame so the reader sees the telemetry
                  pair update as the boxes change color above. */}
              <div className="absolute inset-x-4 bottom-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                <span>
                  640×360 · h264 · 6 fps
                  <span className="text-ink-mute"> · </span>
                  {detections.length} obs
                  {(() => {
                    const flagged = detections.filter(
                      (d) => d.confidence < FP_CONF_THRESHOLD,
                    ).length;
                    if (flagged === 0) return null;
                    return (
                      <>
                        <span className="text-ink-mute"> · </span>
                        <span style={{ color: "var(--accent-amber)" }}>
                          {flagged} flagged
                        </span>
                      </>
                    );
                  })()}
                </span>
                <span className="text-ink-mute">zone_a · loading_lane</span>
              </div>
            </div>
          </div>

          {/* Marginalia — two panels side by side underneath the video
              (stack on mobile). Both panels share the row height via
              `h-full`; the shorter panel just gets extra bottom padding
              instead of being padded with fabricated stats. */}
          <div className="col-span-12 flex md:col-span-6">
            <MarginaliaPanel
              kicker="observation · live"
              size="md"
              className="flex h-full w-full flex-col"
            >
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
                YOLO11L running on a real warehouse clip. Each box is a
                tracked person; the trk_id and confidence are pulled from
                the same JSON the model produced. Every observation is
                timestamped and versioned end to end.
              </p>
            </MarginaliaPanel>
          </div>

          <div className="col-span-12 flex md:col-span-6">
            <MarginaliaPanel
              kicker="reliability finding · cam_dock_03"
              size="md"
              tone="warn"
              className="flex h-full w-full flex-col"
            >
              <div className="flex items-baseline gap-2 font-mono text-[10px] tracking-mono uppercase">
                <span className="text-signal-warn">at risk</span>
                <span className="text-ink-faint">·</span>
                <span className="text-ink-mute">missed detections · jitter</span>
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
                Some people further from the camera aren&apos;t being detected
                at all. Other tracks are jittering, bboxes flickering and
                track ids flipping every few frames as bodies overlap.
              </p>
              <div className="mt-auto grid grid-cols-3 gap-x-3 border-t border-glass-stroke-2 pt-3">
                <Stat k="model" v="yolo11l" />
                <Stat k="conf min" v="0.15" />
                <Stat k="iou" v="0.5" />
              </div>
            </MarginaliaPanel>
          </div>
        </div>

        {/* Three-stage inline ribbons — rendered statically (no scroll-in
            animation) so they appear with the video + marginalia instead
            of waiting for the ribbon itself to scroll into view. */}
        <div
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
        </div>
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
