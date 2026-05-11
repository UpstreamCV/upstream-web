"use client";

import { useEffect, useRef, useState } from "react";

interface MetricProps {
  target: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export default function Metric({
  target,
  suffix,
  label,
  decimals = 0,
}: MetricProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const start = performance.now();
          const duration = 1400;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(target * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="metric" ref={ref}>
      <div className="v">
        {val.toFixed(decimals)}
        <sup>{suffix}</sup>
      </div>
      <div className="k">{label}</div>
    </div>
  );
}
