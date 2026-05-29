"use client";

/**
 * Nav — sticky at top. Transparent over the hero, becomes frosted
 * after ~80px of scroll. Small upstream-logo-white.png mark on the left,
 * editorial mono nav on the right, a magnetic Request-access CTA on the
 * far right (same cursor-tracking pattern as MagneticButton).
 *
 * Mobile (<md) swaps the link group for a hamburger glyph that opens a
 * full-viewport overlay. The NavCta stays visible at all widths — it's
 * the primary action; never hide it.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import { EASE, useMagnetic } from "@/lib/motion";

const NAV = [
  { href: "/#act-observation", label: "Pipeline" },
  { href: "/#act-drift", label: "Drift" },
  { href: "/#act-reports", label: "Field" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[40]"
      >
        <div className="shell">
          <div
            className={`pointer-events-auto mt-4 flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ${
              scrolled || menuOpen
                ? "border-glass-stroke bg-base-2/65 backdrop-blur-2xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)]"
                : "border-transparent bg-transparent"
            }`}
          >
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Upstream home"
              onClick={() => setMenuOpen(false)}
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

            <div className="flex items-center gap-2">
              <MenuToggle
                open={menuOpen}
                onToggle={() => setMenuOpen((v) => !v)}
              />
              <NavCta href="/waitlist" />
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
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

/**
 * Hamburger / × glyph. Visible only at <md. Two stacked monospace bars
 * that rotate into an × when open. Hit target is 40×40 with an invisible
 * 1.5-unit padding bringing it to ~52px on touch — well above the
 * 44px minimum.
 */
function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onToggle}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-glass-stroke bg-glass-bg text-ink transition-colors duration-200 hover:bg-glass-hi md:hidden before:absolute before:-inset-1.5 before:content-['']"
    >
      <span aria-hidden="true" className="relative block h-3 w-4">
        <motion.span
          className="absolute left-0 top-1/2 block h-px w-4 bg-ink"
          animate={
            open
              ? { y: 0, rotate: 45 }
              : { y: -4, rotate: 0 }
          }
          transition={{ duration: 0.28, ease: EASE.outQuint }}
        />
        <motion.span
          className="absolute left-0 top-1/2 block h-px w-4 bg-ink"
          animate={
            open
              ? { y: 0, rotate: -45 }
              : { y: 4, rotate: 0 }
          }
          transition={{ duration: 0.28, ease: EASE.outQuint }}
        />
      </span>
    </button>
  );
}

/**
 * Full-viewport overlay menu. Renders the four nav links as stacked
 * editorial mono lines and repeats the Request access CTA at the bottom.
 * Locks page scroll while open via `overflow: hidden` on <html>. Closes
 * on link tap, ESC, route change, and outside tap.
 */
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Close on route change.
  useEffect(() => {
    onClose();
    // We intentionally don't depend on onClose — only pathname.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock scroll + close on ESC while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleLinkClick = useCallback(() => onClose(), [onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE.outQuint }}
          className="fixed inset-0 z-[50] flex flex-col bg-base-2/95 backdrop-blur-2xl md:hidden"
          onClick={(e) => {
            // Outside tap (any direct backdrop hit) closes.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="shell flex h-full flex-col pt-28 pb-[max(env(safe-area-inset-bottom),32px)]">
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE.outQuint, delay: 0.05 }}
              className="eyebrow"
            >
              Navigation
            </motion.span>

            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE.outQuint, delay: 0.1 }}
              className="mt-3 h-px w-full origin-left bg-glass-stroke"
            />

            <nav className="mt-10 flex flex-col gap-7">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE.outQuint,
                    delay: 0.18 + i * 0.06,
                  }}
                >
                  <Link
                    href={n.href}
                    onClick={handleLinkClick}
                    className="block font-display text-[34px] leading-none tracking-tight text-ink"
                  >
                    <span className="italic">{n.label}</span>
                    <span
                      aria-hidden="true"
                      className="ml-3 font-mono text-[11px] uppercase tracking-mono text-ink-mute align-middle"
                    >
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE.outQuint, delay: 0.5 }}
              >
                <Link
                  href="/waitlist"
                  onClick={handleLinkClick}
                  className="group relative flex w-full items-center justify-between rounded-full border border-glass-stroke bg-glass-bg px-6 py-4 text-ink"
                >
                  <span className="font-display text-base">Request access</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-ink-soft transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
