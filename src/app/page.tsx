import Image from "next/image";
import BgVideo from "./BgVideo";
import EventStream from "./EventStream";
import Metric from "./Metric";
import Terminal from "./Terminal";

function ConnectVisual() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="step-svg"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="20"
        width="34"
        height="22"
        rx="3"
        fill="rgb(from var(--graph) r g b / 0.06)"
        stroke="var(--graph)"
        strokeWidth="1.4"
      />
      <circle
        cx="25"
        cy="31"
        r="6"
        fill="none"
        stroke="var(--graph)"
        strokeWidth="1.4"
      />
      <circle cx="25" cy="31" r="2.4" fill="var(--graph)" />
      <path
        d="M 50 31 Q 99 22 148 31"
        fill="none"
        stroke="var(--graph)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="step-wave step-wave-1"
      />
      <path
        d="M 50 31 Q 99 10 148 31"
        fill="none"
        stroke="var(--graph)"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="step-wave step-wave-2"
      />
      <path
        d="M 50 31 Q 99 -3 148 31"
        fill="none"
        stroke="var(--graph)"
        strokeWidth="1"
        strokeLinecap="round"
        className="step-wave step-wave-3"
      />
      <circle
        cx="50"
        cy="31"
        r="3.4"
        fill="var(--graph)"
        stroke="rgba(10,16,6,0.5)"
        strokeWidth="0.5"
      />
      <circle
        cx="148"
        cy="31"
        r="3.4"
        fill="var(--graph)"
        stroke="rgba(10,16,6,0.5)"
        strokeWidth="0.5"
      />
      <path
        d="M 168 22 a 12 12 0 0 1 24 0 a 8 8 0 0 1 6 16 l -36 0 a 7 7 0 0 1 6 -16 z"
        fill="rgb(from var(--graph) r g b / 0.14)"
        stroke="var(--graph)"
        strokeWidth="1.2"
      />
      <text
        x="181"
        y="33"
        textAnchor="middle"
        fill="var(--graph)"
        fontSize="8"
        fontFamily="var(--font-mono-stack)"
      >
        upstream
      </text>
    </svg>
  );
}

function ConfigureVisual() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="step-svg"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="216"
        height="52"
        rx="4"
        fill="none"
        stroke="rgba(245,241,231,0.06)"
        strokeWidth="0.8"
      />
      <path
        d="M 1 22 L 220 22"
        stroke="rgba(245,241,231,0.04)"
        strokeWidth="0.6"
      />
      <path
        d="M 1 42 L 220 42"
        stroke="rgba(245,241,231,0.04)"
        strokeWidth="0.6"
      />
      <path
        d="M 60 12 L 158 12"
        stroke="rgba(245,241,231,0.04)"
        strokeWidth="0.6"
      />
      <path
        d="M 100 12 L 100 52"
        stroke="rgba(245,241,231,0.04)"
        strokeWidth="0.6"
      />
      <path
        id="step-trace-path-d"
        pathLength="100"
        d="M 24 38 L 70 18 L 140 24 L 192 14 L 178 46 L 64 48 Z"
        fill="rgba(75,129,108,0.18)"
        stroke="var(--graph)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        fillOpacity="0"
        className="step-trace-path"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="4.5s"
          repeatCount="indefinite"
          calcMode="linear"
          values="100;0;0;0;100"
          keyTimes="0;0.55;0.68;0.85;1"
          begin="0s"
        />
        <animate
          attributeName="fill-opacity"
          dur="4.5s"
          repeatCount="indefinite"
          calcMode="linear"
          values="0;0;0.6;0.6;0"
          keyTimes="0;0.55;0.68;0.85;1"
          begin="0s"
        />
      </path>
      <circle cx="24" cy="38" r="2.2" fill="var(--graph)" />
      <circle cx="70" cy="18" r="2.2" fill="var(--graph)" />
      <circle cx="140" cy="24" r="2.2" fill="var(--graph)" />
      <circle cx="192" cy="14" r="2.2" fill="var(--graph)" />
      <circle cx="178" cy="46" r="2.2" fill="var(--graph)" />
      <circle cx="64" cy="48" r="2.2" fill="var(--graph)" />
      <g className="step-cursor">
        <path
          d="M 0 0 L 0 10 L 3.4 7.4 L 5.8 11.6 L 7.6 10.6 L 5.2 6.5 L 8.6 6 Z"
          fill="#f5f1e7"
          stroke="#0a1006"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <animateMotion
          dur="4.5s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          keyTimes="0;0.55;1"
          path="M 24 38 L 70 18 L 140 24 L 192 14 L 178 46 L 64 48 Z"
        />
        <animate
          attributeName="opacity"
          dur="4.5s"
          repeatCount="indefinite"
          calcMode="linear"
          values="1;1;0;0;1"
          keyTimes="0;0.5;0.62;0.98;1"
        />
      </g>
    </svg>
  );
}

function LogicVisual() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="step-svg"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="20"
        width="50"
        height="20"
        rx="6"
        fill="rgb(from var(--graph) r g b / 0.08)"
        stroke="var(--graph)"
        strokeWidth="1"
        className="step-logic-rect step-logic-rect-1"
      />
      <text
        x="31"
        y="33"
        fill="var(--graph)"
        fontSize="8.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        person
      </text>
      <line
        x1="56"
        y1="30"
        x2="84"
        y2="30"
        stroke="var(--graph)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
        className="step-logic-connector step-logic-connector-1"
      />
      <rect
        x="84"
        y="20"
        width="52"
        height="20"
        rx="6"
        fill="rgba(212,201,138,0.1)"
        stroke="#d4c98a"
        strokeWidth="1"
        className="step-logic-rect step-logic-rect-2"
      />
      <text
        x="110"
        y="33"
        fill="#d4c98a"
        fontSize="8.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        if &gt; 30s
      </text>
      <line
        x1="136"
        y1="30"
        x2="164"
        y2="30"
        stroke="var(--graph)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
        className="step-logic-connector step-logic-connector-2"
      />
      <rect
        x="164"
        y="20"
        width="50"
        height="20"
        rx="6"
        fill="rgba(232,167,106,0.12)"
        stroke="#e8a76a"
        strokeWidth="1"
        className="step-logic-rect step-logic-rect-3"
      />
      <text
        x="189"
        y="33"
        fill="#e8a76a"
        fontSize="8.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        fire
      </text>
    </svg>
  );
}

function TriggerVisual() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="step-svg"
      role="img"
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="28"
        r="8"
        fill="rgb(from var(--graph) r g b / 0.18)"
        stroke="var(--graph)"
        strokeWidth="1.2"
      />
      <text
        x="14"
        y="31"
        fill="var(--graph)"
        fontSize="7"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        evt
      </text>
      <path
        d="M 22 28 H 100"
        stroke="var(--graph)"
        strokeWidth="1.3"
      />
      <path
        d="M 100 28 L 168 8"
        stroke="var(--graph)"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M 100 28 L 168 28"
        stroke="var(--graph)"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M 100 28 L 168 48"
        stroke="var(--graph)"
        strokeWidth="1"
        opacity="0.55"
      />
      <rect
        x="168"
        y="2"
        width="46"
        height="12"
        rx="3"
        fill="rgb(from var(--graph) r g b / 0.1)"
        stroke="var(--graph)"
        strokeWidth="1"
      />
      <text
        x="191"
        y="11"
        fill="var(--graph)"
        fontSize="7.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        webhook
      </text>
      <rect
        x="168"
        y="22"
        width="46"
        height="12"
        rx="3"
        fill="rgba(212,201,138,0.1)"
        stroke="#d4c98a"
        strokeWidth="1"
      />
      <text
        x="191"
        y="31"
        fill="#d4c98a"
        fontSize="7.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        queue
      </text>
      <rect
        x="168"
        y="42"
        width="46"
        height="12"
        rx="3"
        fill="rgba(232,167,106,0.1)"
        stroke="#e8a76a"
        strokeWidth="1"
      />
      <text
        x="191"
        y="51"
        fill="#e8a76a"
        fontSize="7.5"
        fontFamily="var(--font-mono-stack)"
        textAnchor="middle"
      >
        slack
      </text>
      <circle r="2.6" fill="var(--graph)" className="step-trigger-dot">
        <animateMotion
          path="M 22 28 H 96 L 164 9"
          dur="1.8s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle r="2.4" fill="#d4c98a" className="step-trigger-dot">
        <animateMotion
          path="M 22 28 H 96 L 164 28"
          dur="1.8s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </circle>
      <circle r="2.4" fill="#e8a76a" className="step-trigger-dot">
        <animateMotion
          path="M 22 28 H 96 L 164 47"
          dur="1.8s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>
    </svg>
  );
}

const stepVisuals: Record<string, () => React.ReactElement> = {
  "01": ConnectVisual,
  "02": ConfigureVisual,
  "03": LogicVisual,
  "04": TriggerVisual,
};

const LOGO_SRC = "/assets/upstream-logo-white.png";

const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#capabilities", label: "Platform" },
  { href: "#use-cases", label: "Use cases" },
  { href: "/about", label: "About" },
];

const steps = [
  {
    n: "01",
    title: "Connect a stream",
    body: "Point an RTSP, WebRTC, or ONVIF camera at Upstream. Edge devices, IP cameras, drones — we ingest them all at the source.",
  },
  {
    n: "02",
    title: "Configure visually",
    body: "Draw tracking zones, pick detection models, set thresholds and dwell rules in a hosted studio. No model wrangling required.",
  },
  {
    n: "03",
    title: "Author event logic",
    body: "Compose conditions across detections, zones, and time — “forklift in aisle 3 for >30s” — without writing infrastructure code.",
  },
  {
    n: "04",
    title: "Trigger anything",
    body: "Push to your webhook, queue, database, or workflow. Upstream guarantees delivery; you decide what happens downstream.",
  },
];

const useCases = [
  {
    icon: "WH",
    name: "Warehouse & logistics",
    desc: "Dock occupancy, pallet counting, PPE compliance",
  },
  {
    icon: "RT",
    name: "Retail analytics",
    desc: "Queue length, dwell heatmaps, conversion funnels",
  },
  {
    icon: "MF",
    name: "Manufacturing",
    desc: "Line throughput, defect flagging, safety perimeters",
  },
  {
    icon: "SC",
    name: "Smart cities & mobility",
    desc: "Curb activity, traffic counts, incident detection",
  },
  {
    icon: "AG",
    name: "Agriculture & field ops",
    desc: "Livestock tracking, equipment telemetry, intrusion",
  },
];

export default function Page() {
  return (
    <>
      <BgVideo />

      <div className="page">
        <nav className="top">
          <div className="nav-inner">
            <a href="#" className="brand">
              <Image
                src={LOGO_SRC}
                alt="Upstream salmon mark"
                width={32}
                height={32}
              />
              Upstream
            </a>
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="nav-cta">
              <a className="btn btn-ghost" href="#signin">
                Sign in
              </a>
              <a className="btn btn-primary" href="#start">
                Get ready
              </a>
            </div>
          </div>
        </nav>

        <section className="splash" id="splash">
          <div className="splash-tint" />
          <div className="splash-inner">
            <span className="eyebrow">
              Camera intelligence infrastructure for developers
            </span>
            <h1 className="display">
              <span className="display-dim">Build</span> camera intelligence<span className="display-dim">,</span>
              <br />
              <span className="display-dim">not</span> infrastructure<span className="display-dim">.</span>
            </h1>
            <div
              className="hero-status"
              role="status"
              aria-label="Project status"
            >
              <span>Coming Soon</span>
              <span className="hero-status-divider" aria-hidden="true">·</span>
              <span>Expected Q1 2027</span>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#start">
                Get ready
                <span className="mono" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-ghost" href="#preview">
                See how it works
              </a>
            </div>
          </div>
          <a className="scroll-hint" href="#preview">
            <span>scroll</span>
            <span className="line" />
          </a>
        </section>

        <div className="curtain">
        <section className="preview" id="preview">
          <div className="preview-copy">
            <span className="section-tag">
              Open-source agent · Hosted CV cloud
            </span>
            <h2>
              Skip the pipeline. Ship <em>the product.</em>
            </h2>
            <p>
              Drop the open-source agent next to your camera, draw your zones
              and triggers in the dashboard, and Upstream streams typed events
              into your stack. RTSP ingestion, GPU inference, tracking, and
              event delivery are handled — so you ship product logic instead
              of pipelines.
            </p>
            <div className="hero-meta" style={{ marginTop: 28 }}>
              <span>
                <b>Sub-100ms</b> end-to-end latency
              </span>
              <span>
                <b>RTSP · IP cameras · webcam</b> ingestion
              </span>
              <span>
                <b>Webhooks · REST · WebSocket</b> event delivery
              </span>
            </div>
          </div>

          <div className="preview-visual">
            <div className="feed-stack">
              <div className="feed-card">
                <div className="feed-scene">
                  <div className="scene-horizon" />
                  <div className="scene-floor" />
                  <div className="scene-truck" />
                  <div className="scene-pallet" />
                  <div className="scene-person p1" />
                  <div className="scene-person p2" />
                </div>
                <div className="feed-grid" />

                <svg
                  className="zone-outline"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,60 60,60 92,88 8,92"
                    fill="rgba(169,199,179,0.18)"
                    stroke="rgba(169,199,179,0.8)"
                    strokeWidth="0.4"
                    strokeDasharray="1.2 0.8"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x="10"
                    y="68"
                    fill="#a9c7b3"
                    fontSize="2"
                    fontFamily="var(--font-mono-stack)"
                  >
                    ZONE_A · front_door
                  </text>
                </svg>


                <div
                  className="box"
                  data-label="truck · 0.97"
                  style={{ left: "12%", top: "32%", width: "38%", height: "28%" }}
                />
                <div
                  className="box alt"
                  data-label="person · 0.92 · trk_789"
                  style={{ left: "57%", top: "78%", width: "7.5%", height: "17%" }}
                />
                <div
                  className="box alt"
                  data-label="person · 0.88 · trk_792"
                  style={{ left: "71%", top: "80%", width: "7%", height: "15%" }}
                />
                <div
                  className="box warn"
                  data-label="pallet · 0.84"
                  style={{ left: "37%", top: "84%", width: "15%", height: "9%" }}
                />

                <div className="hud">
                  <span className="hud-tag">
                    <span className="rec-dot" /> agent · cam_dock_03
                  </span>
                  <span className="hud-tag">28.4 fps · 1080p</span>
                </div>
                <div className="hud-bottom">
                  <span>lat 84ms · gpu a10</span>
                  <span>11:42:08 PDT</span>
                </div>
              </div>

              <EventStream />
            </div>
          </div>
        </section>

        <section className="how" id="how">
          <div className="section-head">
            <div>
              <span className="section-tag">How it works</span>
              <h2>
                Four steps from camera <em>to callback.</em>
              </h2>
            </div>
            <p>
              The whole pipeline — ingest, inference, event logic, delivery —
              runs as managed infrastructure. You configure it; we keep it
              flowing.
            </p>
          </div>

          <div className="steps">
            {steps.map((step) => {
              const Visual = stepVisuals[step.n];
              return (
                <div key={step.n} className="step glass">
                  <div className="step-visual">{Visual ? <Visual /> : null}</div>
                  <div className="num">{step.n}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="cap" id="capabilities">
          <div className="section-head">
            <div>
              <span className="section-tag">The platform</span>
              <h2>
                Everything <em>upstream</em> of your product.
              </h2>
            </div>
            <p>
              RTSP ingestion, GPU inference, orchestration, scaling, monitoring
              — all of the plumbing that usually takes six months to build, run
              as a hosted service.
            </p>
          </div>

          <div className="cap-grid">
            <div className="cap-card glass cap-large">
              <span className="top">Tracking zones</span>
              <h3>Draw the world, watch what flows through it.</h3>
              <p>
                Polygonal zones, virtual tripwires, dwell timers and entry/exit
                logic — all editable in the browser, versioned, and deployed in
                one click.
              </p>
              <div className="zone-illu">
                <svg viewBox="0 0 320 200" preserveAspectRatio="none">
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="320" height="200" fill="url(#grid)" />
                  <polygon
                    points="20,140 140,90 240,120 290,170 20,190"
                    fill="rgba(75,129,108,0.25)"
                    stroke="#a9c7b3"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <polygon
                    points="160,30 240,40 250,80 180,85"
                    fill="rgba(129,118,75,0.18)"
                    stroke="#d4c98a"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <text
                    x="30"
                    y="160"
                    fill="#a9c7b3"
                    fontSize="9"
                    fontFamily="var(--font-mono-stack)"
                  >
                    zone_a · loading
                  </text>
                  <text
                    x="170"
                    y="55"
                    fill="#d4c98a"
                    fontSize="9"
                    fontFamily="var(--font-mono-stack)"
                  >
                    zone_b · staging
                  </text>
                  <circle cx="100" cy="155" r="3" fill="#f5f1e7" />
                  <circle cx="180" cy="145" r="3" fill="#f5f1e7" />
                  <circle cx="220" cy="60" r="3" fill="#f5f1e7" />
                  <line
                    x1="100"
                    y1="155"
                    x2="180"
                    y2="145"
                    stroke="#f5f1e7"
                    strokeWidth="0.6"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                  <line
                    x1="180"
                    y1="145"
                    x2="220"
                    y2="60"
                    stroke="#f5f1e7"
                    strokeWidth="0.6"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>

            <div className="cap-card glass cap-wide">
              <span className="top">Event pipeline</span>
              <h3>Detections become events become actions.</h3>
              <p>
                Compose typed events across cameras, zones, and time. Upstream
                handles fan-out, retries, and ordering — your handlers stay
                simple.
              </p>
              <div className="pipeline">
                <span className="pip">
                  <span className="dot" /> detection
                </span>
                <span className="pip-arrow">→</span>
                <span className="pip">
                  <span className="dot" /> zone enter
                </span>
                <span className="pip-arrow">→</span>
                <span className="pip">
                  <span className="dot" /> dwell 30s
                </span>
                <span className="pip-arrow">→</span>
                <span className="pip">
                  <span className="dot" /> webhook
                </span>
                <span className="pip-arrow">→</span>
                <span className="pip">
                  <span className="dot" /> Slack alert
                </span>
              </div>
            </div>

            <div className="cap-card glass cap-wide">
              <span className="top">Managed infra</span>
              <h3>Hosted compute that scales with the stream.</h3>
              <p>
                GPU autoscaling, regional pinning, monitoring — without an
                MLOps team.
              </p>
              <div className="metric-row">
                <Metric target={84} suffix="ms" label="P50 LATENCY" />
                <Metric
                  target={99.98}
                  suffix="%"
                  decimals={2}
                  label="UPTIME · 30D"
                />
                <Metric target={12} suffix="×" label="REGIONS" />
                <div className="metric">
                  <div className="v">∞</div>
                  <div className="k">STREAMS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="craft" id="use-cases">
          <div className="code-card">
            <div className="code-head">
              <div className="code-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="code-title">bash · ~/.upstream</div>
              <div className="code-title" style={{ opacity: 0.4 }}>
                upstream-agent · MIT
              </div>
            </div>
            <Terminal />
          </div>

          <div className="use-cases">
            <div className="use-head">
              <span className="section-tag">Built for</span>
              <h3>
                Live cameras, <em>real product.</em>
              </h3>
              <p>
                Teams use Upstream wherever a stream of pixels needs to become
                a stream of business events.
              </p>
            </div>
            <div className="use-list glass" style={{ padding: 8 }}>
              {useCases.map((u) => (
                <div key={u.icon} className="use-item">
                  <div className="left">
                    <div className="icon">{u.icon}</div>
                    <div>
                      <div className="name">{u.name}</div>
                      <div className="desc">{u.desc}</div>
                    </div>
                  </div>
                  <span className="arr">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="cta">
          <div className="cta-card">
            <Image
              className="logo-watermark"
              src="/assets/UpstreamFish.png"
              alt=""
              width={280}
              height={405}
            />
            <h2>
              Stop building pipelines.
              <br />
              Start shipping <em>what they enable.</em>
            </h2>
            <p>
              Spin up a free workspace, point a camera at it, and have a
              working event flowing into your stack in under ten minutes.
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#start">
                Start free <span className="mono">→</span>
              </a>
              <a className="btn btn-ghost" href="#sales">
                Talk to engineering
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="foot-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src={LOGO_SRC} alt="" width={22} height={22} />
              <span>© 2026 Upstream Labs, Inc. · Started in Boulder, CO</span>
            </div>
            <div className="foot-links">
              <a href="/about">About</a>
              <a href="https://linkedin.com/company/upstreamcomputervision">LinkedIn</a>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </>
  );
}
