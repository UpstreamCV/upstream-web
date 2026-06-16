"use client";

/**
 * ActShell — full-viewport wrapper for the Confluence Sequence acts.
 * Each act fills 100svh (or more if pinned). Owns the drenched color
 * wash, the kicker, and the editorial gutters. Children compose the act
 * content inside .shell.
 *
 * The wash is now a TRANSLUCENT dark scrim (re-tinted to the dashboard's
 * charcoal model) so the fixed global <Atmosphere/> — drifting creek orbs +
 * film grain — reads through every section as one shared dark atmosphere.
 */

import type { ReactNode } from "react";

type Drench = "deep" | "mid" | "moss" | "base" | "river";

interface Props {
  id?: string;
  kicker: string;
  index?: string;
  drench: Drench;
  /** Allow the act to be taller than one viewport (used by pinned drift). */
  tall?: boolean;
  /** Hide the kicker (used by Act 01 which has its own anchored kicker). */
  hideKicker?: boolean;
  /**
   * Retained for API compatibility. Formerly pinned the drench via
   * `background-attachment: fixed`; the drench now always scrolls and the only
   * fixed layer is the global <Atmosphere/>, so this no longer has an effect.
   */
  fixedBg?: boolean;
  /**
   * Retained for API compatibility. Formerly offset each section's per-act
   * orb-drift animation; the orbs now live in the single global <Atmosphere/>,
   * so this no longer has an effect.
   */
  phase?: number;
  className?: string;
  children: ReactNode;
}

const WASH: Record<Drench, string> = {
  // Every drench is now a TRANSLUCENT dark scrim over the global <Atmosphere/>
  // layer (charcoal + drifting creek orbs + grain). Re-tinted to the dashboard
  // model: near-black, vertical, lighter at the top so the orbs glow through,
  // denser toward the bottom for type legibility. Section identity now comes
  // from content + the orbs drifting behind, not a per-act background hue.
  deep:  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.40) 100%)",
  mid:   "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.36) 100%)",
  moss:  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.38) 100%)",
  base:  "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.14) 55%, rgba(0,0,0,0.42) 100%)",
  // CTA fold (Act 06): a touch denser so the headline + buttons stay crisp
  // over the moving orbs. The river video used to show through here via the
  // old fixed backdrop; it now lives only in the hero, so orbs are the field.
  river: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.26) 55%, rgba(0,0,0,0.60) 100%)",
};


export function ActShell({
  id,
  kicker,
  index,
  drench,
  tall = false,
  hideKicker = false,
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        minHeight: tall ? undefined : "100svh",
        // Translucent scrim over the fixed global <Atmosphere/> (orbs + grain).
        // No backdrop-filter here: a full-viewport blur is a 60fps risk, so
        // blur stays reserved for small glass panels. The grain that used to
        // be faked per-act now lives once on .atmo-layer and reads through.
        background: WASH[drench],
        backgroundAttachment: "scroll",
      }}
    >
      {!hideKicker ? (
        <div className="shell relative z-10 pt-[max(env(safe-area-inset-top),18px)] md:pt-10">
          <div className="flex items-baseline gap-3 pt-24 md:pt-28">
            {index ? (
              <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-soft md:text-[11px]">
                <span className="text-ink-faint">/ </span>
                {index}
              </span>
            ) : null}
            <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute md:text-[11px]">
              {kicker}
            </span>
          </div>
        </div>
      ) : null}

      {children}
    </section>
  );
}
