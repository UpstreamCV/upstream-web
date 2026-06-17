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
    // The hero snap is desktop-only and intentionally gentle. On a coarse
    // pointer or a narrow viewport we skip snapping entirely — it fought touch
    // flicks and read as a "scroll lock" on phones; mobile gets plain native
    // scrolling (Lenis already leaves touch scroll alone via syncTouch:false).
    const noSnap =
      reduced ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    if (!noSnap) {
      snap = new Snap(lenis, {
        // `proximity` only snaps when the hero is already close to settled, so
        // it never yanks the reader back from further down the page. A small
        // distanceThreshold + longer debounce make the pull subtle and easy to
        // scroll past.
        type: "proximity",
        duration: 0.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        distanceThreshold: "18%",
        debounce: 260,
      });
      // Only the hero (Act 01) is a snap target. Every other section runs
      // its own scroll choreography (Act 04 is GSAP-pinned, Act 05 stages
      // its glass cards via whileInView, Act 06 flows into the footer),
      // and snap was fighting those flows.
      snapAddTimeout = window.setTimeout(() => {
        const hero = document.querySelector<HTMLElement>(
          "main > section#act-water",
        );
        if (hero) snap?.addElement(hero, { align: "start" });
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
