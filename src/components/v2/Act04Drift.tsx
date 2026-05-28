"use client";

/**
 * Act 04 — Drift, kept visible.
 *
 * Drenched moss (Streambank Moss color token). The section scrolls
 * normally; the needle auto-sweeps once (0 → 1) when the section enters
 * the viewport, then stops. After that the handle is manual-only: users
 * grab it to scrub (cursor + touch + keyboard ←/→/Home/End). If the user
 * grabs the handle DURING the first sweep, the sweep pauses and resumes
 * from where they left off — but only until it reaches 1, after which
 * the chart stays where the user puts it.
 *
 * Three signal lanes (exposure, focus, confidence p50) span a 14-day
 * window. Each lane carries its OWN anomaly visible in the data: an
 * exposure dip at D-11, a focus sag from D-10 onward, and the confidence
 * drop from D-7. As the needle passes each event day, that lane's marker
 * dot appears, the lane line glows, and the matching alert card lights
 * up.
 *
 * Implementation notes:
 *   - Lane paths stay in SVG so the curves stretch with viewport.
 *   - Dots — both event markers and the needle head — render as HTML
 *     elements positioned by %, so they stay circular instead of being
 *     stretched into ellipses by the SVG's preserveAspectRatio="none".
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useReducedMotion, useMagnetic } from "@/lib/motion";
import { ActShell } from "./ActShell";

interface Lane {
  k: string;
  /** Hex color of the surface line. */
  color: string;
  /** 14 daily readings, normalized 0..1 (1 = surface, 0 = bed). */
  data: number[];
}

// Each lane reads HIGH when healthy and DROPS during its anomaly window —
// the chart shape literally is the alert. Lane colors are picked for
// hue separation (warm amber → sun yellow → signal green) so the three
// curves remain legible when they cross.
const LANES: Lane[] = [
  {
    k: "exposure",
    color: "#F4A847", // Striking amber/orange — light/sun association
    // Brief dip at D-11/D-10: backlight saturated the lens, quality
    // bottomed at 0.58 for two windows, then recovered.
    data: [0.93, 0.92, 0.93, 0.62, 0.58, 0.92, 0.93, 0.92, 0.93, 0.92, 0.93, 0.92, 0.93, 0.92],
  },
  {
    k: "focus",
    color: "#F0D85B", // Sun yellow — distinct mid-hue between amber and green
    // Steady decline from D-10 onward: sharpness sags as the lens fouls.
    data: [0.88, 0.87, 0.88, 0.86, 0.80, 0.70, 0.60, 0.50, 0.42, 0.36, 0.30, 0.24, 0.20, 0.16],
  },
  {
    k: "confidence p50",
    color: "#5FB869", // Signal Bright — the brand's confident green
    // Drop from D-8: p50 collapses 0.92 → 0.12 over six days.
    data: [0.92, 0.91, 0.92, 0.91, 0.90, 0.89, 0.82, 0.72, 0.60, 0.48, 0.36, 0.26, 0.18, 0.12],
  },
];

interface Event {
  laneIdx: number;
  day: number;
  label: string;
  body: string;
}

const EVENTS: Event[] = [
  {
    laneIdx: 0,
    day: 3,
    label: "exposure dipped",
    body: "Backlight saturated the lens between 18:40 and 19:10. Quality bottomed at 0.58 for two windows.",
  },
  {
    laneIdx: 1,
    day: 5,
    label: "focus declining",
    body: "Sharpness sagging since D-10. Likely lens fouling — schedule a clean before it hits zero.",
  },
  {
    laneIdx: 2,
    day: 7,
    label: "confidence drop",
    body: "p50 fell 0.92 → 0.72 in two days, still falling. Cause: sun-angle shift on the dock-facing lens.",
  },
];

const AMBER = "#E8C06B";
// Vertical amp used by lanePath. Higher = more dramatic drops on screen.
// 9 keeps the three lanes from colliding inside the viewBox 0..60.
const AMP = 9;

// Seconds for the one-shot auto-sweep to traverse 0 → 1, eased.
const SWEEP_SECONDS = 5;

// easeInOutCubic — slow start, fast middle, slow end. The same curve
// scroll-driven animations use to feel "physical" rather than mechanical.
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function Act04Drift() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  // Starts at 0; auto-sweeps to 1 once when the section enters the
  // viewport, then becomes manual-only.
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const playedRef = useRef(false);
  const reduced = useReducedMotion();

  const updateFromX = (clientX: number) => {
    const el = chartRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setProgress(p);
  };

  const onHandleDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Any user interaction aborts the auto-sweep permanently — the
    // handle becomes manual-only from this point on.
    playedRef.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromX(e.clientX);
  };
  const onHandleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromX(e.clientX);
  };
  const onHandleUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onHandleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 1 / 13;
    if (e.key === "ArrowLeft") {
      setProgress((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setProgress((p) => Math.min(1, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setProgress(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setProgress(1);
      e.preventDefault();
    }
  };

  // While dragging, pin cursor + suppress text selection on the body.
  // Both persist even when the pointer leaves the small handle target
  // during a fast drag, and both restore cleanly on release.
  useEffect(() => {
    if (!dragging) return;
    const prevCursor = document.body.style.cursor;
    const prevUserSelect = document.body.style.userSelect;
    const prevWebkitUserSelect = document.body.style.webkitUserSelect;
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    return () => {
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevUserSelect;
      document.body.style.webkitUserSelect = prevWebkitUserSelect;
    };
  }, [dragging]);

  // Reduced-motion users see the fully-scrubbed end state immediately
  // and skip the sweep entirely.
  useEffect(() => {
    if (reduced) {
      playedRef.current = true;
      setProgress(1);
    }
  }, [reduced]);

  // Trigger the one-shot sweep when the section comes into view. We
  // disconnect after the first hit so re-entering doesn't replay it.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || playedRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-sweep loop — runs once when the section first enters view.
  // Time-based easing means progress = ease(elapsed / SWEEP_SECONDS), so
  // the needle accelerates into the middle of the window and decelerates
  // into "today". Any drag interaction sets playedRef.current = true,
  // which causes this effect (re-run on dragging-change) to bail.
  useEffect(() => {
    if (!inView || dragging || reduced || playedRef.current) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1000 / SWEEP_SECONDS);
      setProgress(easeInOutCubic(t));
      if (t >= 1) {
        playedRef.current = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, dragging, reduced]);

  const dayIdx = Math.min(13, Math.floor(progress * 14));
  const dayLabel = `D-${14 - dayIdx}`;
  const needleX = 4 + progress * 92;

  // Each event activates when the needle has passed its day. Lanes glow
  // independently based on their own event status.
  const eventsActive = EVENTS.map((e) => progress > e.day / 13);
  const laneActiveByIdx = LANES.map((_, li) => {
    const idx = EVENTS.findIndex((e) => e.laneIdx === li);
    return idx >= 0 ? eventsActive[idx] : false;
  });

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
        <div className="relative h-screen w-full overflow-hidden">
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
                Confidence slips <em className="italic-accent">before</em>
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

            {/* The signal-lane chart */}
            <div className="relative mt-8 flex-1 md:mt-10">
              <div ref={chartRef} className="relative h-full w-full overflow-visible">
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
                      stroke="rgba(245,241,231,0.10)"
                      strokeWidth="0.12"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* lanes — paths only; dots and labels are HTML below so
                      they don't warp with preserveAspectRatio="none". */}
                  {LANES.map((lane, li) => {
                    const baseY = 14 + li * 15;
                    const surface = lanePath(lane.data, baseY, AMP);
                    const reflection = `${surface} L 100 ${baseY + AMP + 1} L 0 ${baseY + AMP + 1} Z`;
                    const active = laneActiveByIdx[li];
                    return (
                      <g key={lane.k}>
                        <path d={reflection} fill={`url(#drift-fill-${li})`} />
                        <path
                          d={surface}
                          fill="none"
                          stroke={lane.color}
                          strokeWidth={active ? "0.55" : "0.35"}
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          style={{
                            filter: active
                              ? "drop-shadow(0 0 4px rgba(232,192,107,0.7))"
                              : "none",
                            transition:
                              "filter 600ms ease, stroke-width 600ms ease",
                          }}
                        />
                      </g>
                    );
                  })}

                  {/* Per-event vertical guide lines, scoped to each lane.
                      Stretching is in the line's own direction (vertical),
                      so visible warping is minimal — these stay in SVG. */}
                  {EVENTS.map((event, i) => {
                    const x = 4 + (event.day / 13) * 92;
                    const baseY = 14 + event.laneIdx * 15;
                    return (
                      <line
                        key={i}
                        x1={x}
                        x2={x}
                        y1={baseY - 1.5}
                        y2={baseY + AMP + 1}
                        stroke="rgba(232,192,107,0.6)"
                        strokeWidth="0.18"
                        strokeDasharray="1.2 1.4"
                        vectorEffect="non-scaling-stroke"
                        style={{
                          opacity: eventsActive[i] ? 1 : 0,
                          transition: "opacity 600ms ease",
                        }}
                      />
                    );
                  })}

                  {/* Needle line is rendered in the transform-locked
                      group below alongside the handle — so the two can
                      never desync (see NeedleGroup wrapper). */}
                </svg>

                {/* HTML overlays — anything circular goes here so the
                    chart's preserveAspectRatio="none" doesn't squash dots
                    into ellipses. */}
                <div className="pointer-events-none absolute inset-0">
                  {/* Per-event data-point dots */}
                  {EVENTS.map((event, i) => {
                    const x = 4 + (event.day / 13) * 92;
                    const baseY = 14 + event.laneIdx * 15;
                    const dataPointY =
                      baseY + (1 - LANES[event.laneIdx].data[event.day]) * AMP;
                    return (
                      <div
                        key={i}
                        className="absolute h-2.5 w-2.5 rounded-full transition-opacity duration-700 md:h-3 md:w-3"
                        style={{
                          left: `${x}%`,
                          top: `${(dataPointY / 60) * 100}%`,
                          transform: "translate(-50%, -50%)",
                          background: AMBER,
                          opacity: eventsActive[i] ? 1 : 0,
                          boxShadow:
                            "0 0 0 4px rgba(232, 192, 107, 0.22), 0 0 12px rgba(232, 192, 107, 0.4)",
                        }}
                      />
                    );
                  })}

                  {/* Static needle head dot removed — the draggable
                      handle below now sits at the top of the needle and
                      serves as the visible "head". */}
                </div>

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
                          color: "rgba(245, 241, 231, 0.88)",
                        }}
                      >
                        {lane.k.toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                {/* NeedleGroup — vertical line + draggable handle live
                    inside this wrapper as siblings. Only the wrapper
                    moves (one translate3d on a GPU layer); the line
                    and handle have static positions inside it, so they
                    are rigidly locked together no matter how often
                    `needleX` updates.

                    `inset: 0` makes the wrapper reliably span the full
                    chart area (more robust than `height: 100%` through
                    a flex-1 chain); `translate3d(${needleX}%, …)`
                    translates by a percentage of the wrapper's own
                    width, which equals the chart width — so the bar
                    lands at needleX% of the chart with no JS-measured
                    sizes. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{
                    transform: `translate3d(${needleX}%, 0, 0)`,
                    willChange: "transform",
                  }}
                >
                  {/* Needle line — kept as a sub-SVG so the stroke
                      preserves the same hairline look it had inside
                      the main chart SVG. Static content; only the
                      wrapper transforms. */}
                  <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 1 60"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "1px",
                      height: "100%",
                      overflow: "visible",
                      transform: "translateX(-0.5px)",
                    }}
                  >
                    <line
                      x1="0.5"
                      x2="0.5"
                      y1="2"
                      y2="58"
                      stroke="rgba(245,241,231,0.9)"
                      strokeWidth="0.22"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Draggable handle — sits at the top of the needle
                      line and serves as its visible head. Arrows hint
                      the affordance; the handle is a slider for a11y
                      and supports keyboard nav (←/→/Home/End). */}
                  <div
                    className={`absolute flex select-none touch-none items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/35 bg-glass-bg px-2.5 py-1 backdrop-blur-md transition-[border-color,box-shadow] duration-200 hover:border-ink/55 focus-visible:border-ink/70 focus-visible:outline-none ${
                      dragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    style={{
                      top: `${(2 / 60) * 100}%`,
                      left: 0,
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "auto",
                      boxShadow: dragging
                        ? "0 0 0 3px rgba(245,241,231,0.10), 0 6px 18px -8px rgba(0,0,0,0.6)"
                        : "0 4px 12px -8px rgba(0,0,0,0.5)",
                    }}
                    role="slider"
                    aria-label="Scrub the 14-day drift window"
                    aria-valuemin={0}
                    aria-valuemax={13}
                    aria-valuenow={dayIdx}
                    aria-valuetext={dayLabel}
                    tabIndex={0}
                    onPointerDown={onHandleDown}
                    onPointerMove={onHandleMove}
                    onPointerUp={onHandleUp}
                    onPointerCancel={onHandleUp}
                    onKeyDown={onHandleKey}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] leading-none text-ink-soft"
                    >
                      ‹
                    </span>
                    <span
                      className="inline-block text-center font-mono text-[10px] tracking-kicker uppercase text-ink"
                      style={{ minWidth: "3.6ch" }}
                    >
                      {dayLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] leading-none text-ink-soft"
                    >
                      ›
                    </span>
                  </div>
                </div>

                {/* Per-event alert cards positioned next to their dots.
                    Each card hugs its event's data-point with a small
                    horizontal offset; cards whose dot sits in the right
                    half of the chart flip to the left so they don't
                    overflow the chart container. */}
                {EVENTS.map((event, i) => {
                  const dotX = 4 + (event.day / 13) * 92;
                  const baseY = 14 + event.laneIdx * 15;
                  const dotY =
                    ((baseY +
                      (1 - LANES[event.laneIdx].data[event.day]) * AMP) /
                      60) *
                    100;
                  const placeRight = dotX < 60;
                  return (
                    <div
                      key={i}
                      className="pointer-events-none absolute z-10 w-[min(70vw,240px)]"
                      style={{
                        left: `${dotX}%`,
                        top: `${dotY}%`,
                        transform: placeRight
                          ? "translate(14px, -80%)"
                          : "translate(calc(-100% - 14px), -80%)",
                      }}
                    >
                      <EventCard
                        event={event}
                        lane={LANES[event.laneIdx]}
                        active={eventsActive[i]}
                      />
                    </div>
                  );
                })}

                {/* Time axis */}
                <div className="absolute inset-x-0 bottom-0 flex justify-between pt-2 font-mono text-[10px] tracking-mono uppercase text-ink-soft">
                  <span>14 days ago</span>
                  <span>today</span>
                </div>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10px] tracking-mono uppercase text-ink-soft md:mt-5">
              drag the marker to scrub the window · each lane carries its own anomaly
            </p>
          </div>
        </div>
      </div>
    </ActShell>
  );
}

function EventCard({
  event,
  lane,
  active,
}: {
  event: Event;
  lane: Lane;
  active: boolean;
}) {
  // Same quiet magnetic recipe MarginaliaPanel uses — small outer pull,
  // smaller inner pull for parallax, amber cursor blob so the warn
  // semantic carries into the hover affordance. When the card is hidden
  // the magnetic still binds, but pointer-events handled below ensure
  // the cursor can't grab an invisible card.
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } =
    useMagnetic<HTMLDivElement>({ outer: 0.025, inner: 0.01 });
  const blob = useMotionTemplate`radial-gradient(280px circle at ${gx}% ${gy}%, rgba(232, 192, 107, 0.14), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border p-4 transition-[opacity,border-color,box-shadow] duration-700 md:p-5"
      style={{
        background: "rgba(245, 241, 231, 0.05)",
        borderColor: active
          ? "rgba(232, 192, 107, 0.5)"
          : "rgba(245, 241, 231, 0.10)",
        backdropFilter: "blur(18px) saturate(135%)",
        WebkitBackdropFilter: "blur(18px) saturate(135%)",
        opacity: active ? 1 : 0,
        // Magnetic transforms compose with the inactive-state lift via
        // translateY done in motion.div's style.y below.
        x: sx,
        y: sy,
        pointerEvents: active ? "auto" : "none",
        boxShadow: active
          ? "0 20px 44px -22px rgba(232, 192, 107, 0.4), 0 1px 0 rgba(255,255,255,0.06) inset"
          : "0 1px 0 rgba(255,255,255,0.04) inset",
      }}
      {...handlers}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: blob,
          opacity: hovered && active ? 1 : 0,
          transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <motion.div
        className="relative z-10"
        style={{ x: slx, y: sly }}
      >
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{
                background: active ? AMBER : "rgba(245, 241, 231, 0.3)",
                boxShadow: active ? "0 0 0 3px rgba(232, 192, 107, 0.20)" : "none",
              }}
            />
            <span
              className="font-mono text-[10px] tracking-kicker uppercase"
              style={{
                color: active ? AMBER : "rgba(245, 241, 231, 0.5)",
              }}
            >
              {event.label}
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-mono uppercase text-ink-faint">
            D-{14 - event.day} · {lane.k}
          </span>
        </div>
        <p
          className="text-[12px] text-ink md:text-[12.5px]"
          style={{ lineHeight: 1.55, opacity: active ? 1 : 0.75 }}
        >
          {event.body}
        </p>
      </motion.div>
    </motion.div>
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
