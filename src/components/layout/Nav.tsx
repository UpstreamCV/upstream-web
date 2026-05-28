"use client";

/**
 * Nav — sticky at top. Transparent over the hero, becomes frosted
 * after ~80px of scroll. Small upstream-logo-white.png mark on the left,
 * editorial mono nav on the right, a magnetic Request-access CTA on the
 * far right (same cursor-tracking pattern as MagneticButton).
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "@/lib/motion";

const NAV = [
  { href: "/#act-observation", label: "Pipeline" },
  { href: "/#act-drift", label: "Drift" },
  { href: "/#act-reports", label: "Field" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[40]"
    >
      <div className="shell">
        <div
          className={`pointer-events-auto mt-4 flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "border-glass-stroke bg-base-2/65 backdrop-blur-2xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)]"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Upstream home"
          >
            <Image
              src="/assets/upstream-logo-white.png"
              alt=""
              width={32}
              height={32}
              priority
              className="transition-transform duration-500 group-hover:translate-x-0.5"
            />
            <span
              className="font-display text-lg tracking-tight text-ink"
              style={{
                fontWeight: 700,
              }}
            >
              Upstream
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-mono text-[11px] tracking-mono uppercase text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <NavCta href="/waitlist" />
        </div>
      </div>
    </motion.header>
  );
}

/**
 * Nav CTA — same magnetic-pull + cursor-tracked glow as MagneticButton,
 * sized for the nav (px-4 py-1.5, 12px) and styled as a glass pill that
 * lights up on hover rather than flipping color.
 */
function NavCta({ href }: { href: string }) {
  const { ref, sx, sy, slx, sly, gx, gy, hovered, handlers } = useMagnetic();
  const glow = useMotionTemplate`radial-gradient(160px circle at ${gx}% ${gy}%, rgba(245, 241, 231, 0.16), transparent 65%)`;

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-glass-stroke bg-glass-bg px-4 py-1.5 text-[12px] text-ink-soft backdrop-blur-xl transition-colors duration-200 hover:border-glass-hi hover:bg-glass-hi hover:text-ink"
      style={{ x: sx, y: sy }}
      {...handlers}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: glow,
          opacity: hovered ? 1 : 0,
          transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <motion.span
        style={{ x: slx, y: sly }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        Request access
        <span
          aria-hidden="true"
          className="font-mono opacity-60 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </motion.span>
    </motion.a>
  );
}
