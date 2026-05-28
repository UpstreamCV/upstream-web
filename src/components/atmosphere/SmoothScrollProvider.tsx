"use client";

/**
 * SmoothScrollProvider — owns the single Lenis instance and wires it to
 * GSAP's ticker + ScrollTrigger so scrubbed animations stay in sync with
 * the virtualized scroll position.
 *
 * The exact contract (do not break):
 *   1. gsap.ticker drives lenis.raf — Lenis does not own its own loop.
 *   2. lenis.on('scroll', ScrollTrigger.update) so every pinned/scrubbed
 *      timeline sees fresh scroll math on the same tick.
 *   3. gsap.ticker.lagSmoothing(0) — otherwise GSAP will pause the ticker
 *      after a long frame and Lenis freezes mid-scroll.
 *   4. When prefers-reduced-motion is on, Lenis is constructed with
 *      smoothWheel=false / lerp=1 (effectively native scroll).
 */

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: Props) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      lerp: reduced ? 1 : 0.085,
      wheelMultiplier: 1.0,
      smoothWheel: !reduced,
      syncTouch: false,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Children's useGSAP fires before this provider's effect, so their
    // ScrollTriggers cached positions against the pre-Lenis scroller. Refresh
    // once Lenis is active, then again after a short beat to catch font/asset
    // layout shifts, and once on window load for very late assets.
    ScrollTrigger.refresh();
    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Per-section soft snap. Lenis Snap is velocity-aware, so it only
    // fires when the smooth-scroll settles within `distanceThreshold` of
    // a registered section. The debounce gives the user a beat to keep
    // scrolling past a section without being yanked back into it.
    let snap: Snap | null = null;
    let snapAddTimeout: number | null = null;
    if (!reduced) {
      snap = new Snap(lenis, {
        type: "proximity",
        duration: 0.7,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        distanceThreshold: "30%",
        debounce: 220,
      });
      // Wait one frame so the page tree is in the DOM, then register
      // every direct <section> child of <main> EXCEPT Act 06 (the final
      // CTA) — snapping into the CTA fold yanks the user out of the
      // scroll-to-the-footer flow.
      snapAddTimeout = window.setTimeout(() => {
        const sections = document.querySelectorAll<HTMLElement>(
          "main > section:not(#act-current)",
        );
        sections.forEach((section) => {
          snap?.addElement(section, { align: "start" });
        });
      }, 0);
    }

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (snapAddTimeout !== null) window.clearTimeout(snapAddTimeout);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      snap?.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
