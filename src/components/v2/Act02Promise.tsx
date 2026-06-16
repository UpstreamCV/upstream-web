"use client";

/**
 * Act 02 — The promise.
 *
 * Drenched Deep Creek. The brand wedge stated in two display-scale
 * paragraphs followed by TWO stacked marquees showing the same live
 * stream of CV pipeline calls. The top lane is "most platforms ·
 * launch" — every call passes as "delivered", uniform and neutral. The
 * bottom lane is "upstream · trust" — same call stream, but the
 * misfires are flagged inline: camera-side telemetry catches (exposure,
 * lens, scene baseline) and audit-model disagreements highlighted in
 * amber. Two perspectives on the same stream; the wedge is which
 * observations you can make about it. Glass marginalia at the bottom
 * carries the competitor-contrast line as a printed-book margin note.
 */

import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { ActShell } from "./ActShell";
import { MarginaliaPanel } from "./MarginaliaPanel";

export function Act02Promise() {
  return (
    <ActShell id="act-promise" index="02" kicker="the promise" drench="deep" hideKicker phase={0}>
      <div className="shell relative z-10 flex min-h-[calc(100svh-160px)] flex-col justify-center pb-24 pt-28 md:pt-32">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Left rail — kicker echo for the act */}
          <div className="col-span-12 md:col-span-3 xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-32"
            >
              <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-faint md:text-[11px]">
                what we build
              </div>
              <div className="mt-3 h-[1px] w-12 bg-creek-moss/60" />
              <div className="mt-3 font-mono text-[10px] tracking-mono uppercase text-ink-mute">
                reliability layer
                <br />
                for production CV
              </div>
            </motion.div>
          </div>

          {/* Prose at display scale + call-stream comparison */}
          <div className="col-span-12 md:col-span-9 xl:col-span-9 md:col-start-4">
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(24px, 5vw, 56px)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                maxWidth: "22ch",
                color: "rgba(245, 241, 231, 0.6)",
              }}
            >
              Most platforms help teams{" "}
              <em className="italic-accent">launch</em> computer vision.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="mt-5 font-display md:mt-6"
              style={{
                fontSize: "clamp(24px, 5vw, 56px)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                maxWidth: "22ch",
                color: "rgba(245, 241, 231, 0.6)",
              }}
            >
              Upstream helps teams{" "}
              <em className="italic-accent">trust</em>{" "}it once it&apos;s running.
            </motion.p>
          </div>

          {/* Call-stream comparison — pulled out of the text column and broken
              out FULL-BLEED so the two scrolling lanes take up most of the
              screen width. It's a col-span-12 grid item (centered in the shell),
              so `left:50% / translateX(-50%) / w-screen` recenters it on the
              viewport. */}
          <div className="relative left-1/2 col-span-12 w-screen -translate-x-1/2 px-[clamp(20px,4vw,56px)]">
            <StreamComparison />
          </div>

          {/* Closing — the question, centered, with the competitor-contrast
              note beneath it. */}
          <div className="col-span-12 mt-2 flex flex-col items-center text-center md:mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display"
              style={{ maxWidth: "min(92vw, 760px)" }}
            >
              <span
                className="block text-ink-soft"
                style={{ fontSize: "clamp(14px, 1.2vw, 17px)", letterSpacing: "0.01em" }}
              >
                The question we answer:
              </span>
              <span
                className="mt-4 block italic text-ink"
                style={{
                  fontSize: "clamp(26px, 3.6vw, 50px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                does it still work next Tuesday at 7 PM in February rain, on the
                camera you actually have?
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mt-12 w-full max-w-[440px] text-left"
            >
              <MarginaliaPanel kicker="competitor contrast" size="md">
                <p
                  className="font-display text-[14.5px] text-ink-soft md:text-[15px]"
                  style={{ lineHeight: 1.5, letterSpacing: "-0.008em" }}
                >
                  Datadog watches infrastructure. Sentry catches software
                  errors. Upstream watches whether your computer vision still
                  tells the truth.
                </p>
              </MarginaliaPanel>
            </motion.div>
          </div>
        </div>
      </div>
    </ActShell>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   Stream comparison — TWO stacked marquees fed by the same call list.
   The top strip ("most platforms · launch") renders every call as a
   uniform "delivered" event. The bottom strip ("upstream · trust")
   renders the same calls, but the ones tagged with a `catch` light up
   amber and surface the reason inline (camera telemetry or audit-model
   disagreement). Both strips share the same animation duration so a
   given call sits at the same horizontal position in both lanes; the
   reader's eye slides down to see what the second strip noticed.
   ──────────────────────────────────────────────────────────────────── */

type CallType = "inference" | "detection" | "alert" | "trigger";
type CatchKind =
  // chain-held path: the detection was wrong / suspect, so the downstream
  // trigger and alert get held one after the other.
  | "suspect_detection"
  | "trigger_held"
  | "alert_held"
  // audit-fired path: prod's inference missed something, audit catches the
  // detection and then fires the rest of the chain on its own.
  | "missed_detection"
  | "audit_trigger"
  | "audit_alert";

/**
 * A Call carries TWO renderings: what most platforms surface ("launch")
 * and what Upstream surfaces ("trust"). For clean calls the renderings
 * are identical; for misfires they diverge — same underlying event, two
 * different stories about it. The catch field controls whether the
 * trust strip lights amber and which footer copy it uses.
 */
interface Call {
  camera: string;
  time: string;
  launch: { type: CallType; label: string; meta: string };
  /** When present, the trust lane renders this label/meta instead of
   *  launch's, and the card switches to amber. */
  trust?: { type: CallType; label: string; meta: string };
  catchKind?: CatchKind;
  /** Footer line on the trust lane when caught. Defaults to a label
   *  derived from catchKind if omitted. */
  trustFooter?: string;
}

/**
 * Pipeline narrative for the stream:
 *   inference (every frame) → detection (when something is found) →
 *   trigger (when the detection is interesting) → alert (downstream)
 *
 * The stream is laid out as FOUR narrative blocks of three cards each
 * (the full chain), separated by single inference breaths so the eye
 * can read each event distinctly:
 *
 *   BLOCK 1: wrong detection caught   — launch fires the chain, trust
 *                                       catches the detection as suspect
 *                                       and holds the trigger + alert.
 *   inference (breath)
 *   BLOCK 2: clean chain (no catch)   — production detection was right;
 *                                       both lanes render identical
 *                                       cards and both end "delivered".
 *                                       Demonstrates Upstream doesn't
 *                                       flag detections that work.
 *   inference (breath)
 *   BLOCK 3: missed detection caught  — launch keeps inferencing and
 *                                       never detects; trust's audit
 *                                       notices the detection and runs
 *                                       the trigger + alert itself.
 *   inference (breath)
 *   BLOCK 4: camera-side catch        — launch fires the chain, trust
 *                                       catches the detection as suspect
 *                                       because exposure was off, holds
 *                                       the trigger + alert.
 *
 * Each block stays on a single camera so the chain is legible as a
 * continuity, and the inference breath uses a different camera to
 * signal "new event coming."
 */
const STREAM: Call[] = [
  // ═══════════════════════════════════════════════════════════════
  // BLOCK 1 — Wrong detection. Launch fires detection → trigger →
  // alert in three ticks. Trust catches the detection as suspect on
  // the first card; the chain on trust is held for the next two.
  // ═══════════════════════════════════════════════════════════════
  {
    camera: "cam_03",
    time: "14:02:18",
    launch: { type: "detection", label: "detection", meta: "person · 0.42" },
    trust: { type: "detection", label: "suspect detection", meta: "audit · 14% diff vs ref" },
    catchKind: "suspect_detection",
    trustFooter: "audit · review queue · chain held",
  },
  {
    camera: "cam_03",
    time: "14:02:19",
    launch: { type: "trigger", label: "trigger", meta: "person_loitering" },
    trust: { type: "trigger", label: "trigger held", meta: "preceding detection suspect" },
    catchKind: "trigger_held",
    trustFooter: "not fired · waiting on review",
  },
  {
    camera: "cam_03",
    time: "14:02:20",
    launch: { type: "alert", label: "alert", meta: "person_loitering" },
    trust: { type: "alert", label: "alert held", meta: "no trigger propagated" },
    catchKind: "alert_held",
    trustFooter: "not propagated · operator review",
  },

  // ─── inference breath ───
  {
    camera: "yard_02",
    time: "14:02:24",
    launch: { type: "inference", label: "inference", meta: "6 dets" },
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCK 2 — Clean chain (no catch). The production model's
  // detection was legitimate, so the chain fires on launch AND on
  // trust the same way. Both lanes render identical cards. The point:
  // Upstream doesn't second-guess detections that work — it stays out
  // of the way when prod is right.
  // ═══════════════════════════════════════════════════════════════
  {
    camera: "cam_lot_22",
    time: "14:02:25",
    launch: { type: "detection", label: "detection", meta: "vehicle · 0.88" },
  },
  {
    camera: "cam_lot_22",
    time: "14:02:26",
    launch: { type: "trigger", label: "trigger", meta: "vehicle_entry" },
  },
  {
    camera: "cam_lot_22",
    time: "14:02:27",
    launch: { type: "alert", label: "alert", meta: "vehicle_entry" },
  },

  // ─── inference breath ───
  {
    camera: "perimeter_01",
    time: "14:02:31",
    launch: { type: "inference", label: "inference", meta: "12 dets" },
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCK 3 — Missed detection. Launch's model returns 0 dets and
  // keeps inferencing across three ticks (nothing happens on the
  // production side). Trust's audit notices a person was in frame
  // and runs the trigger + alert that prod skipped.
  // ═══════════════════════════════════════════════════════════════
  {
    camera: "dock_07",
    time: "14:02:35",
    launch: { type: "inference", label: "inference", meta: "0 dets" },
    trust: { type: "detection", label: "detection noticed", meta: "audit · 1 person seen" },
    catchKind: "missed_detection",
    trustFooter: "audit · prod model missed",
  },
  {
    camera: "dock_07",
    time: "14:02:36",
    launch: { type: "inference", label: "inference", meta: "0 dets" },
    trust: { type: "trigger", label: "trigger", meta: "person_present" },
    catchKind: "audit_trigger",
    trustFooter: "audit-fired · prod silent",
  },
  {
    camera: "dock_07",
    time: "14:02:37",
    launch: { type: "inference", label: "inference", meta: "0 dets" },
    trust: { type: "alert", label: "alert", meta: "person_present" },
    catchKind: "audit_alert",
    trustFooter: "audit-fired · operator notified",
  },

  // ─── inference breath ───
  {
    camera: "gate_01",
    time: "14:02:41",
    launch: { type: "inference", label: "inference", meta: "8 dets" },
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCK 4 — Camera-side catch. Detection fires under bad exposure;
  // launch propagates the chain to trigger + alert. Trust catches the
  // camera-side telemetry (−2.3 EV) on the detection and holds the
  // chain — same outcome as block 1 but caught for a different reason.
  // ═══════════════════════════════════════════════════════════════
  {
    camera: "entry_w",
    time: "14:02:44",
    launch: { type: "detection", label: "detection", meta: "person · 0.55" },
    trust: { type: "detection", label: "suspect detection", meta: "camera · exposure -2.3 EV" },
    catchKind: "suspect_detection",
    trustFooter: "camera · count likely skewed",
  },
  {
    camera: "entry_w",
    time: "14:02:45",
    launch: { type: "trigger", label: "trigger", meta: "person_loitering" },
    trust: { type: "trigger", label: "trigger held", meta: "preceding detection suspect" },
    catchKind: "trigger_held",
    trustFooter: "not fired · camera issue",
  },
  {
    camera: "entry_w",
    time: "14:02:46",
    launch: { type: "alert", label: "alert", meta: "person_loitering" },
    trust: { type: "alert", label: "alert held", meta: "no trigger propagated" },
    catchKind: "alert_held",
    trustFooter: "not propagated · camera issue",
  },
];

// Marquee styles live inline rather than in globals.css so the keyframe
// and the mask travel with this component — guarantees the animation
// ships regardless of dev-server CSS cache state.
const MARQUEE_CSS = `
@keyframes act02-marquee-x {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.act02-marquee-track {
  animation: act02-marquee-x var(--marquee-duration, 80s) linear infinite;
  will-change: transform;
}
.act02-marquee-mask {
  -webkit-mask-image: linear-gradient(to right, transparent 0, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent 100%);
}
@media (prefers-reduced-motion: reduce) {
  .act02-marquee-track { animation: none; }
}
`;

function StreamComparison() {
  const callsCount = STREAM.length;
  const caughtCount = STREAM.filter((c) => c.catchKind).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      aria-label="Two-lane call-stream comparison: most platforms vs. Upstream observing the same calls"
    >
      <style>{MARQUEE_CSS}</style>

      <StreamStrip lane="launch" callsCount={callsCount} />

      {/* The connective tissue between strips — a faint hairline plus a
          mono callout so the visual relationship reads as "same calls,
          different observation" rather than "two separate things." */}
      <div className="my-6 flex items-center gap-3 md:my-7">
        <div className="h-[1px] flex-1 bg-ink-faint" />
        <span className="font-mono text-[9.5px] tracking-mono uppercase text-ink-mute">
          same calls · different observation
        </span>
        <div className="h-[1px] flex-1 bg-ink-faint" />
      </div>

      <StreamStrip lane="trust" callsCount={callsCount} caughtCount={caughtCount} />

      {/* Pending-review annotation — sits under the trust strip to name
          what the amber cards mean: catches are held in a queue waiting
          for an operator to confirm or dismiss before anything fires
          downstream. */}
      <div className="mt-3 md:mt-4">
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "9.5px",
            letterSpacing: "0.18em",
            color: "var(--accent-amber)",
          }}
        >
          {caughtCount} events held · waiting for operator review
        </span>
      </div>
    </motion.div>
  );
}

interface StreamStripProps {
  lane: "launch" | "trust";
  callsCount: number;
  caughtCount?: number;
}

function StreamStrip({ lane, callsCount, caughtCount = 0 }: StreamStripProps) {
  const isTrust = lane === "trust";
  const tally = isTrust
    ? `${caughtCount} caught · ${callsCount} calls`
    : `${callsCount} calls · all delivered`;

  return (
    <div>
      {/* Strip header — just the tally, right-aligned. The lead/verb
          labels read as visual noise once the divider between strips
          ("same stream · different observation") plus the amber-under-
          trust annotation already mark which lane is which. */}
      <div className="mb-4 flex items-baseline justify-end md:mb-5">
        <span className="font-mono text-[9.5px] tracking-mono uppercase text-ink-faint">
          {tally}
        </span>
      </div>

      {/* Marquee. The track is rendered twice; translateX(-50%) on the
          inner element loops seamlessly because the duplicate sits flush
          after the original. Both strips share the same duration so a
          given call holds the same horizontal position in both lanes. */}
      <div
        className="act02-marquee-mask relative overflow-hidden"
        style={{ ["--marquee-duration" as string]: "80s" }}
      >
        <div className="act02-marquee-track flex w-max gap-2.5 md:gap-4">
          {[0, 1].map((copyIdx) => (
            <div key={copyIdx} className="flex shrink-0 gap-2.5 md:gap-4">
              {STREAM.map((call, i) => (
                <StreamCard
                  key={`${copyIdx}-${i}`}
                  call={call}
                  lane={lane}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StreamCardProps {
  call: Call;
  lane: "launch" | "trust";
}

function StreamCard({ call, lane }: StreamCardProps) {
  const isCaught = lane === "trust" && Boolean(call.catchKind);
  // Pick the rendering for this lane. Trust uses the override if present;
  // otherwise both lanes show the same launch rendering.
  const view = lane === "trust" && call.trust ? call.trust : call.launch;
  const Icon = TYPE_ICONS[view.type];

  // Tone tokens. The card fill is the dashboard's solid near-black tile
  // (.dn-tile = #161616) — an opaque dark-gray tile that reads cleanly over the
  // drifting orbs, matching the Triage / Fleet Overview tiles. Because it's
  // opaque there's no backdrop-filter (nothing shows through to blur). Caught
  // cards keep the amber border + glow as the "held for review" signal.
  const borderColor = isCaught
    ? "rgba(232, 192, 107, 0.55)"
    : "rgba(255, 255, 255, 0.06)";
  const iconStroke = isCaught
    ? "rgba(232, 192, 107, 0.42)"
    : "rgba(75, 129, 108, 0.28)";
  const iconGlow = isCaught
    ? "rgba(232, 192, 107, 0.10)"
    : "rgba(75, 129, 108, 0.10)";
  const iconColor = isCaught ? "var(--accent-amber)" : "var(--creek-mid)";

  return (
    <div
      className="flex w-[clamp(220px,72vw,260px)] shrink-0 flex-col gap-3 rounded-xl px-4 py-3.5 md:w-[268px] md:px-5 md:py-4"
      style={{
        // Solid dark-gray dashboard tile fill (.dn-tile) + the tile's shadow
        // (inset top highlight + soft drop shadow). Caught cards layer the amber
        // ring/glow over the same shadow.
        background: "#161616",
        border: `1px solid ${borderColor}`,
        boxShadow: isCaught
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(232,192,107,0.08), 0 20px 40px -22px rgba(232,192,107,0.35)"
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px -30px rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex items-start gap-3 md:gap-3.5">
        <div
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md md:h-10 md:w-10"
          style={{
            background: iconGlow,
            border: `1px solid ${iconStroke}`,
            color: iconColor,
          }}
        >
          <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="truncate font-mono uppercase text-ink"
            style={{ fontSize: "11.5px", letterSpacing: "0.12em" }}
          >
            {view.label} · {call.camera}
          </div>
          <div
            className="mt-1 truncate font-mono uppercase"
            style={{
              fontSize: "9.5px",
              letterSpacing: "0.16em",
              color: "var(--ink-mute)",
            }}
          >
            {call.time} · {view.meta}
          </div>
        </div>
      </div>

      {/* Footer — outcome line. On the trust lane the catch is named in
          operator-grade language; on the launch lane every call (caught
          or not) reads as plain "delivered" because that's what most
          platforms surface. */}
      <div className="flex items-center gap-2 border-t border-ink-faint/40 pt-2.5">
        <span
          aria-hidden
          className="inline-block shrink-0"
          style={{
            width: isCaught ? 7 : 5,
            height: isCaught ? 7 : 5,
            borderRadius: 999,
            background: isCaught
              ? "var(--accent-amber)"
              : "var(--creek-mid)",
            boxShadow: isCaught
              ? "0 0 10px var(--accent-amber), 0 0 0 3px rgba(232, 192, 107, 0.10)"
              : undefined,
          }}
        />
        <span
          className="truncate font-mono uppercase"
          style={{
            fontSize: "9.5px",
            letterSpacing: "0.18em",
            color: isCaught ? "var(--accent-amber)" : "var(--ink-mute)",
          }}
        >
          {isCaught
            ? call.trustFooter ?? FOOTER_FALLBACK[call.catchKind ?? "suspect_detection"]
            : "delivered"}
        </span>
      </div>
    </div>
  );
}

const FOOTER_FALLBACK: Record<CatchKind, string> = {
  suspect_detection: "audit · review queue",
  trigger_held: "held · preceding suspect",
  alert_held: "not propagated · review",
  missed_detection: "audit · noticed",
  audit_trigger: "audit-fired · prod silent",
  audit_alert: "audit-fired · operator notified",
};

/* ───────────────────────────────────────────────────────────────────────
   Icons — hairline line drawings for the three call types. No fills.
   ──────────────────────────────────────────────────────────────────── */

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

function IconInference(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* function-call brackets with a dot at the center — a model call */}
      <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconDetection(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* corner-cut bounding box around a smaller inner rectangle */}
      <path d="M5 5h3M5 5v3M19 5h-3M19 5v3M5 19h3M5 19v-3M19 19h-3M19 19v-3" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="0.75" opacity="0.55" />
    </svg>
  );
}

function IconAlert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* chevron rising to the right — an outbound event */}
      <path d="M4 17l5-5-5-5" opacity="0.7" />
      <path d="M11 17l5-5-5-5" />
      <path d="M18 17l3-3" opacity="0.45" />
    </svg>
  );
}

function IconTrigger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} {...props}>
      {/* lightning bolt — a fired rule/trigger */}
      <path d="M13 3 L5 14 H11 L9 21 L19 9 H13 Z" />
    </svg>
  );
}

const TYPE_ICONS: Record<CallType, (props: SVGProps<SVGSVGElement>) => React.ReactNode> = {
  inference: IconInference,
  detection: IconDetection,
  alert: IconAlert,
  trigger: IconTrigger,
};
