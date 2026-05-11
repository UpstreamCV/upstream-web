"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "splash", label: "Top" },
  { id: "preview", label: "Preview" },
  { id: "how", label: "How it works" },
  { id: "capabilities", label: "Platform" },
  { id: "use-cases", label: "Use cases" },
  { id: "cta", label: "Get started" },
];

export default function SectionDots() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const center = window.innerHeight / 2;
      let closest: string | null = null;
      let closestDist = Infinity;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const sectionCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(sectionCenter - center);
        if (dist < closestDist) {
          closest = s.id;
          closestDist = dist;
        }
      }

      setActive(closest);
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav className="section-dots" aria-label="Page sections">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-dot ${active === s.id ? "active" : ""}`}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="dot-label">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
