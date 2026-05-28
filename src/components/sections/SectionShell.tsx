"use client";

/**
 * Editorial section shell — common chrome: kicker number, kicker text,
 * KineticHeadline, optional lede. Subclasses provide the centerpiece.
 *
 * Composes asymmetric defaults — kicker on left col, headline spans
 * cols 1–9, lede sits in cols 5–11 offset down. Caller can override.
 */

import { type ReactNode } from "react";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";
import { RevealText } from "@/components/atmosphere/RevealText";

interface Props {
  id?: string;
  /** Optional. When omitted, the kicker stands alone with a leading slash. */
  index?: string;
  kicker: string;
  headline: (string | React.ReactNode)[];
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  headScale?: "xl" | "lg" | "md";
}

export function SectionShell({
  id,
  index,
  kicker,
  headline,
  lede,
  children,
  className = "",
  headScale = "lg",
}: Props) {
  return (
    <section id={id} className={`relative py-32 md:py-48 ${className}`}>
      <div className="shell">
        <header className="grid grid-cols-12 items-end gap-x-8 gap-y-8 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-3 xl:col-span-2">
            {index ? (
              <>
                <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                  <span className="text-ink-mute">/ </span>
                  {index}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-kicker uppercase text-ink-mute">
                  {kicker}
                </div>
              </>
            ) : (
              <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                <span className="text-ink-mute">/ </span>
                {kicker}
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-9 xl:col-span-9 md:col-start-4">
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

        {children}
      </div>
    </section>
  );
}
