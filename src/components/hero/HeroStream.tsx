"use client";

/**
 * HeroStream — the opening scene.
 * River video + dark vignette + frosted glass headline.
 * No canvas overlays, no camera node markers.
 */

import { useEffect, useRef } from "react";

import { HeroVideoMask } from "./HeroVideoMask";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";
import { useReducedMotion } from "@/lib/motion";

export function HeroStream() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Mount-in entrance via CSS transitions — the only motion the Hero needs.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const els = root.querySelectorAll<HTMLElement>("[data-fade-in]");
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${
        200 + i * 90
      }ms, opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) ${200 + i * 90}ms`;
    });
    requestAnimationFrame(() => {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <div className="hero-river absolute inset-0 will-change-transform">
        <HeroVideoMask />
      </div>

      {/* dark vignette to ground the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 65% at 28% 60%, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(13,20,8,0.8) 80%, rgba(13,20,8,0.95) 100%)",
        }}
      />

      <div className="shell relative z-10 flex w-full flex-col justify-end pb-[12svh] pt-32">
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-8 xl:col-span-9">
            <p
              data-fade-in
              className="eyebrow hero-stripe mb-7"
            >
              production launch · q4 2026
            </p>

            <h1
              data-fade-in
              className="hero-headline font-display text-ink"
              style={{
                fontSize: "clamp(40px, 7.8vw, 124px)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                fontWeight: 600,
              }}
            >
              Live computer vision,<br />
              kept <em className="italic-accent">honest.</em>
            </h1>

            <p
              data-fade-in
              className="hero-sub mt-8 max-w-[58ch] text-ink-soft md:text-[19px]"
              style={{ lineHeight: 1.55 }}
            >
              Reliability-native infrastructure for live computer vision.
              Upstream runs the pipeline behind your cameras and tells you
              the moment a single one stops telling the truth.
            </p>

            <div data-fade-in className="hero-cta mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="/waitlist"
                variant="primary"
                ariaLabel="Request access to Upstream"
              >
                Request access
                <span aria-hidden="true" className="font-mono text-sm">
                  →
                </span>
              </MagneticButton>
              <MagneticButton href="#ingest" variant="ghost">
                <span className="font-mono text-xs tracking-mono uppercase opacity-80">
                  See the pipeline
                </span>
              </MagneticButton>
            </div>
          </div>

          <aside data-fade-in className="col-span-12 md:col-span-4 xl:col-span-3">
            <HeroLiveCard />
          </aside>
        </div>

        <HeroStripe />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function HeroLiveCard() {
  return (
    <div
      className="rounded-2xl border border-glass-stroke-2 p-5"
      style={{ background: "rgba(15, 24, 9, 0.88)" }}
    >
      <div className="flex items-center justify-between text-[10px] tracking-kicker uppercase font-mono text-ink-mute">
        <span>live · agent telemetry</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok" />
          ok
        </span>
      </div>

      <dl className="mt-4 space-y-3">
        <Stat
          k="agents online"
          v="38"
          hint="Cameras with a live Upstream agent currently connected."
        />
        <Stat
          k="p50 ingest → event"
          v="84ms"
          hint="Median time from a frame entering Upstream to a published event. Lower is faster."
        />
        <Stat
          k="drift score · 24h"
          v="0.04"
          hint="Compound score for exposure, focus, and confidence drift in the last 24 hours. Lower is more stable."
        />
        <Stat
          k="confidence p50"
          v="0.92"
          hint="Median detector confidence across observations in the window. 1.0 is certain."
        />
      </dl>

      <p className="mt-4 font-mono text-[9px] tracking-mono uppercase text-ink-faint leading-relaxed">
        lower drift = more stable · p50 = median across observations
      </p>
    </div>
  );
}

function Stat({ k, v, hint }: { k: string; v: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between border-t border-glass-stroke-2 pt-3 first:border-t-0 first:pt-0">
      <dt
        className="font-mono text-[10px] tracking-mono uppercase text-ink-mute"
        title={hint}
      >
        {k}
      </dt>
      <dd className="font-display text-lg font-medium text-ink" style={{ letterSpacing: "-0.02em" }}>
        {v}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STRIPE = [
  { k: "ingest", v: "RTSP · WebRTC · ONVIF" },
  { k: "inference", v: "YOLO · SAM · DETR · custom" },
  { k: "retention", v: "3y · frame + event" },
  { k: "deploy", v: "your VPC, our agents" },
] as const;

function HeroStripe() {
  return (
    <div className="hero-stripe mt-16 hidden md:block" data-fade-in>
      <div className="grid grid-cols-4 gap-6 border-t border-glass-stroke-2 pt-6">
        {STRIPE.map((s) => (
          <div key={s.k}>
            <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
              {s.k}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
