"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type LineKind =
  | "prompt"
  | "sep"
  | "step"
  | "field"
  | "comment"
  | "blank"
  | "cursor";

interface Pill {
  text: string;
  kind: "time" | "pass";
}

interface Line {
  kind: LineKind;
  cmd?: string;
  args?: string;
  bullet?: "▸" | "✓" | "·";
  label?: string;
  value?: string;
  text?: string;
  pill?: Pill;
}

const SCRIPT: Line[] = [
  { kind: "prompt", cmd: "pip", args: "install upstream-agent" },
  { kind: "sep" },
  { kind: "step", bullet: "▸", text: "collecting upstream-agent" },
  { kind: "step", bullet: "▸", text: "installing collected packages" },
  {
    kind: "step",
    bullet: "✓",
    text: "installed upstream-agent · 0.1.0",
    pill: { text: "1.2s", kind: "time" },
  },
  { kind: "blank" },

  { kind: "prompt", cmd: "upstream", args: "init" },
  { kind: "sep" },
  {
    kind: "field",
    bullet: "✓",
    label: "wrote",
    value: "~/.upstream/config.yaml",
  },
  { kind: "blank" },
  { kind: "comment", text: "# edit api.token + camera in config.yaml" },
  { kind: "blank" },

  { kind: "prompt", cmd: "upstream", args: "check --camera" },
  { kind: "sep" },
  {
    kind: "field",
    bullet: "✓",
    label: "opened",
    value: "1280×720 @ 30 fps",
    pill: { text: "PASS", kind: "pass" },
  },
  { kind: "blank" },

  { kind: "prompt", cmd: "upstream", args: "check --api" },
  { kind: "sep" },
  { kind: "field", bullet: "✓", label: "agent", value: "agent_8c4f12" },
  { kind: "field", bullet: "✓", label: "camera", value: "cam_dock_03" },
  { kind: "field", bullet: "✓", label: "session", value: "sess_a91d" },
  {
    kind: "field",
    bullet: "·",
    label: "config",
    value: "h264 · 720p30 · 3000 kbps · balanced",
  },
  {
    kind: "field",
    bullet: "·",
    label: "srt",
    value: "received",
    pill: { text: "PASS", kind: "pass" },
  },
  { kind: "blank" },
  { kind: "cursor" },
];

const DWELL_AFTER: Record<LineKind, number> = {
  prompt: 220,
  sep: 60,
  step: 90,
  field: 80,
  comment: 140,
  blank: 60,
  cursor: 0,
};

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [revealed, setRevealed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!hasStarted || reduced) return;
    if (revealed >= SCRIPT.length) return;
    const delay =
      revealed === 0 ? 260 : DWELL_AFTER[SCRIPT[revealed - 1].kind];
    const id = setTimeout(() => setRevealed((r) => r + 1), delay);
    return () => clearTimeout(id);
  }, [hasStarted, revealed, reduced]);

  const effectiveRevealed = reduced ? SCRIPT.length : revealed;

  return (
    <div ref={containerRef} className="terminal">
      <div className="terminal-scrim" aria-hidden="true" />
      <div className="terminal-body">
        {SCRIPT.map((line, i) => (
          <TerminalLine
            key={i}
            line={line}
            visible={i < effectiveRevealed}
          />
        ))}
      </div>
    </div>
  );
}

function TerminalLine({ line, visible }: { line: Line; visible: boolean }) {
  const cls = `term-line term-${line.kind}${visible ? " is-in" : ""}`;

  if (line.kind === "blank") {
    return <div className={cls} aria-hidden="true" />;
  }

  if (line.kind === "sep") {
    return <div className={cls} aria-hidden="true" />;
  }

  if (line.kind === "prompt") {
    return (
      <div className={cls}>
        <span className="term-cwd">~/agent</span>
        <span className="term-caret">❯</span>
        <span className="term-cmd">{line.cmd}</span>
        <span className="term-args">{line.args}</span>
      </div>
    );
  }

  if (line.kind === "step") {
    return (
      <div className={cls}>
        <span
          className={`term-bullet ${line.bullet === "✓" ? "is-ok" : "is-mute"}`}
        >
          {line.bullet}
        </span>
        <span className="term-step-text">{line.text}</span>
        {line.pill ? <PillBadge pill={line.pill} /> : null}
      </div>
    );
  }

  if (line.kind === "field") {
    return (
      <div className={cls}>
        <span
          className={`term-bullet ${line.bullet === "✓" ? "is-ok" : "is-mute"}`}
        >
          {line.bullet}
        </span>
        <span className="term-field-label">{line.label}</span>
        <span className="term-field-value">{line.value}</span>
        {line.pill ? <PillBadge pill={line.pill} /> : null}
      </div>
    );
  }

  if (line.kind === "comment") {
    return <div className={cls}>{line.text}</div>;
  }

  // cursor
  return (
    <div className={`term-line term-prompt is-in`}>
      <span className="term-cwd">~/agent</span>
      <span className="term-caret">❯</span>
      <span className="term-blink" aria-hidden="true" />
    </div>
  );
}

function PillBadge({ pill }: { pill: Pill }) {
  return <span className={`term-pill term-pill-${pill.kind}`}>{pill.text}</span>;
}
