import Image from "next/image";
import SplashMedia from "./SplashMedia";
import SectionDots from "./SectionDots";

const LOGO_SRC = "/assets/upstream-logo-white.png";

const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#capabilities", label: "Platform" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#docs", label: "Docs" },
  { href: "#pricing", label: "Pricing" },
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
      <div className="backdrop">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="backdrop-dim" />
      </div>

      <SectionDots />

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
                Start building
              </a>
            </div>
          </div>
        </nav>

        <section className="splash" id="splash">
          <SplashMedia />
          <div className="splash-tint" />
          <div className="splash-inner">
            <span className="eyebrow">
              Real-time computer vision infrastructure
            </span>
            <h1 className="display">
              Cameras, <em>upstream</em> of your code.
            </h1>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#start">
                Start building
                <span className="mono" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-ghost" href="#preview">
                See it work
              </a>
            </div>
          </div>
          <a className="scroll-hint" href="#preview">
            <span>scroll</span>
            <span className="line" />
          </a>
        </section>

        <section className="preview" id="preview">
          <div className="preview-copy">
            <span className="section-tag">
              Now processing 2.4M frames / second
            </span>
            <h2>
              Turn live cameras into <em>production-ready events.</em>
            </h2>
            <p>
              Upstream is real-time computer vision infrastructure for teams
              that want to ship product, not pipelines. Connect a camera,
              configure detections and tracking zones visually, and Upstream
              watches every frame — firing typed events into your stack the
              moment something happens.
            </p>
            <div className="hero-meta" style={{ marginTop: 28 }}>
              <span>
                <b>Sub-100ms</b> end-to-end latency
              </span>
              <span>
                <b>RTSP, WebRTC, ONVIF</b> ingestion
              </span>
              <span>
                <b>SOC 2 Type II</b>
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
                    DOCK ZONE A
                  </text>
                </svg>

                <div
                  className="box"
                  data-label="truck · 0.97"
                  style={{ left: "12%", top: "32%", width: "38%", height: "28%" }}
                />
                <div
                  className="box alt"
                  data-label="person · 0.92"
                  style={{ left: "57%", top: "78%", width: "7.5%", height: "17%" }}
                />
                <div
                  className="box alt"
                  data-label="person · 0.88"
                  style={{ left: "71%", top: "80%", width: "7%", height: "15%" }}
                />
                <div
                  className="box warn"
                  data-label="pallet · 0.84"
                  style={{ left: "37%", top: "84%", width: "15%", height: "9%" }}
                />

                <div className="hud">
                  <span className="hud-tag">
                    <span className="rec-dot" /> LIVE · cam_dock_03
                  </span>
                  <span className="hud-tag">28.4 fps · 1080p</span>
                </div>
                <div className="hud-bottom">
                  <span>lat 84ms · gpu a10</span>
                  <span>11:42:08 PDT</span>
                </div>
              </div>

              <div className="event-panel">
                <div className="head">
                  <span className="title">Event fired</span>
                  <span className="badge-ok">200 OK</span>
                </div>
                <div className="row">
                  <span className="label">trigger</span>
                  <span className="val">truck.entered_zone</span>
                </div>
                <div className="row">
                  <span className="label">zone</span>
                  <span className="val">dock_zone_a</span>
                </div>
                <div className="row">
                  <span className="label">webhook</span>
                  <span className="val">/api/inbound</span>
                </div>
                <div className="row">
                  <span className="label">latency</span>
                  <span className="val">84ms</span>
                </div>
              </div>
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
            {steps.map((step) => (
              <div key={step.n} className="step glass">
                <div className="num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="arrow" aria-hidden="true">→</span>
              </div>
            ))}
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
                <div className="metric">
                  <div className="v">
                    84<sup>ms</sup>
                  </div>
                  <div className="k">P50 LATENCY</div>
                </div>
                <div className="metric">
                  <div className="v">
                    99.98<sup>%</sup>
                  </div>
                  <div className="k">UPTIME · 30D</div>
                </div>
                <div className="metric">
                  <div className="v">
                    12<sup>×</sup>
                  </div>
                  <div className="k">REGIONS</div>
                </div>
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
              <div className="code-title">upstream/handlers/forklift.ts</div>
              <div className="code-title" style={{ opacity: 0.4 }}>
                webhook
              </div>
            </div>
            <pre className="code-body">
              <span className="c">{`// Triggered when a forklift dwells in a restricted zone`}</span>
              {`\n`}
              <span className="k">import</span>
              {` { upstream } `}
              <span className="k">from</span>
              {` `}
              <span className="s">{`"@upstream/sdk"`}</span>
              {`;\n\n`}
              <span className="k">export const</span>
              {` `}
              <span className="f">onEvent</span>
              {` = upstream.`}
              <span className="f">on</span>
              {`(`}
              <span className="s">{`"forklift.dwell"`}</span>
              {`, `}
              <span className="k">async</span>
              {` (e) => {\n  `}
              <span className="k">if</span>
              {` (e.zone === `}
              <span className="s">{`"aisle_3"`}</span>
              {` && e.duration_s > `}
              <span className="n">30</span>
              {`) {\n    `}
              <span className="k">await</span>
              {` alerts.`}
              <span className="f">page</span>
              {`({\n      team:     `}
              <span className="s">{`"floor-safety"`}</span>
              {`,\n      camera:   e.camera_id,\n      `}
              <span className="c">{`// signed, 5-min URL to the clip frame`}</span>
              {`\n      preview:  e.`}
              <span className="f">frame</span>
              {`({ format: `}
              <span className="s">{`"jpeg"`}</span>
              {`, w: `}
              <span className="n">1280</span>
              {` }),\n    });\n  }\n});\n\n`}
              <span className="c">{`// Latency: 84ms · Delivery: at-least-once · Region: us-west-2`}</span>
            </pre>
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
              <a href="#docs">Docs</a>
              <a href="#status">Status</a>
              <a href="#security">Security</a>
              <a href="#careers">Careers</a>
              <a href="#twitter">/ x</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
