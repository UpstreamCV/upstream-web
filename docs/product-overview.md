# Upstream — Product Overview

This document is the source of truth for what Upstream is, where it's going, and how the pieces fit together. It is written for a Claude terminal that needs to produce or revise website copy without re-exploring the codebase. Read it end-to-end before writing.

The document blends two layers:

- **What's built today.** The technical foundation — ingest, streaming, dashboard, control plane — that already ships. Safe to claim on the site.
- **The product wedge & reliability-layer vision.** The sharper positioning the team is moving toward. Some pieces ship; many are concept-level direction. Each section flags which is which.

When in doubt, lean on the shipped layer for what the site can claim, and on the vision for the narrative arc.

---

## 1. The Product Wedge

> **Upstream is the reliability layer for production computer vision.**
>
> Most platforms help teams *launch* computer vision workflows. Upstream helps teams *trust, debug, and improve* those workflows once they are running in the real world.

This is the sharper wedge the product is moving toward. The hard problem in CV isn't running a model — countless platforms already do that. The hard problem is the day the model quietly stops working: a lens fogs, exposure shifts at golden hour, a confidence distribution sags, a tracker fragments in crowded scenes, a rule starts firing on shadows. Standard streaming and inference stacks treat those failures as someone else's problem. Upstream treats them as **the** problem.

The product promise the marketing site already adopts: *"Live computer vision, kept honest."* The concrete commitment behind it: **drift detected before it costs you.**

Investor / product framing:

> Computer vision works in the demo but breaks in production. Upstream is the reliability layer that helps teams monitor, debug, and improve live camera workflows after deployment.

Competitor contrast:

> Most platforms help teams deploy computer vision. Upstream helps teams prove whether that computer vision is reliable once it is running in the real world.

Why this wedge matters: most CV vendors compete on "ease of deployment" or "model accuracy on our benchmark." Upstream competes on **does it still work next Tuesday at 7 PM in February rain on the camera you actually have?** That's an empty quadrant in the market, and it's the quadrant operators actually pay for.

---

## 2. The Questions Upstream Helps Teams Answer

The wedge above is abstract. Concretely, Upstream is the system that can answer questions today's CV stacks can't, or can only answer by guesswork. Any of these can ground positioning copy.

**About the camera:**
- Is this camera placed well for the use case?
- Is the target area visible? Are objects too small or too far away?
- Does lighting change throughout the day in ways that hurt reliability?
- Are there hours where this camera is just unreliable?

**About the stream:**
- Is the stream dropping frames?
- Is FPS lower than expected?
- Is compression hurting detection quality?
- Are reconnects happening too often?

**About the model:**
- Are detections low confidence?
- Are there likely false positives or false negatives?
- Is the model struggling at night, with small objects, or under occlusion?
- Did the new model version regress on this specific camera?

**About the tracker:**
- Are tracks stable, or fragmenting?
- Are objects being counted twice?
- Is the tracker tuned correctly for this camera and this frame rate?

**About the rules:**
- Is the ROI placed correctly?
- Is the line in the right spot? Is the direction logic right?
- Are events being triggered too often, or being missed?
- Does the rule actually match the workflow it's supposed to represent?

**About the workflow as a whole:**
- Is the full workflow reliable?
- Are the emitted events believable?
- Are counts drifting from reality?
- Did the last config or model update improve or hurt things?
- What should the team fix first?

These are concrete proof points behind the "reliability layer" wedge. The site should treat them as the questions Upstream is *built to answer*.

---

## 3. Who It's For

Upstream serves operators and CV teams running real-world deployments at multi-camera scale — dock and cold-storage facilities, logistics hubs, industrial yards, retail entrances, perimeter and gate monitoring, and any safety-or-compliance application where a missed event has a cost. The buyer is the person currently stitching together RTSP captures, a self-hosted inference worker, a Slack webhook for alerts, and no drift detection at all. They have been burned by a model that worked in the demo and then degraded silently in production.

The waitlist filter — *"bring your worst camera"* — is deliberate. We are not selling to teams running clean lab footage. We are selling to teams whose stream itself is the problem, on hardware they cannot easily replace, in conditions they cannot control.

Three roles tend to overlap with the buyer:

1. **The operator** who runs the camera network and gets paged when something is wrong.
2. **The CV engineer** who tuned the model and now needs to debug why it's behaving differently in production.
3. **The business owner** who needs to trust the count, the alert, the report — and has no way to verify it today.

The reliability layer is built so all three roles can use the same surface: operators get health status, CV engineers get root-cause attribution, business owners get a status they can defend.

---

## 4. What the Reliability Layer Is (and Is Not)

> **Concept-level: most pieces are roadmap, not shipped. See §18 for the shipped vs. roadmap demarcation.**

The reliability layer is the part of Upstream that **observes, scores, explains, and improves** production CV workflows. It is not one feature; it is a system that sits across ingest, processing, dashboard, storage, configuration, and review.

It is **not** just an uptime checker. A camera can be online but completely unreliable.

It is **not** just model accuracy. A model can have high benchmark accuracy and still fail on a specific camera because of bad lighting, a poor angle, heavy occlusion, the wrong ROI, tracker instability, compression artifacts, or a rule that doesn't match the real workflow.

The reliability layer asks the harder question:

> Is this full camera workflow reliable in *this exact deployment*?

That means evaluating the complete production pipeline, end-to-end:

```
Camera → Stream → Frame Quality → Model → Tracker → Rules → Events → Evidence → Review → Tuning
```

Drift, false alerts, missed events, unstable counts, and silent degradation can originate anywhere along that chain. Upstream's job is to monitor the whole thing and tell the team **which** part is breaking, **why**, and **what to try next**.

---

## 5. The Core Reliability Loop

The reliability layer is a continuous loop, not a one-time setup. The product is built around making this loop easy:

1. Connect the camera or video source.
2. Validate stream health and camera setup.
3. Run the detection / tracking / rule workflow.
4. Capture evidence around events and suspicious moments.
5. Monitor quality signals over time.
6. Surface likely failures, drift, and weak cameras.
7. Explain the likely cause.
8. Recommend camera, config, model, tracker, or rule changes.
9. Re-test using replay, shadow mode, or controlled scenarios.
10. Track whether reliability improves after each change — and start over.

The marketing site can present this as the operating manual for production CV: **deploy → trust → debug → improve → re-verify.** That is the rhythm operators actually live in, and it's the rhythm Upstream is built around.

---

## 6. Reliability Issue Taxonomy

Upstream classifies reliability problems into seven categories. The same taxonomy is intended to appear in dashboard warnings, findings, evidence labels, recommendations, and reports. Each category has clear examples and a likely source — the value of the product is being able to **point at the specific cause**, not just say "something is wrong."

| Category | Examples | Likely Source |
|---|---|---|
| **Stream / Infrastructure** | Camera offline, unstable connection, low FPS, low bitrate, resolution mismatch, codec mismatch, frozen stream, excessive reconnects, high latency, missing or corrupted frames | Camera, network, agent, MediaMTX, encoder, infrastructure |
| **Frame Quality** | Poor brightness, dark or overexposed frame, backlighting, glare, motion blur, compression artifacts, low sharpness, frozen frame, obstructed lens, weather, dirty lens, nighttime degradation | Environment, lens, lighting, compression, hardware |
| **Camera Setup** | Bad angle, camera too high/low, target area too far, objects too small, important area outside frame, heavy occlusion, bad line/zone coverage, camera moved after setup | Physical deployment, site layout, user setup |
| **Model** | Low confidence, missed detections, false positives, class confusion, poor performance on small objects, occlusion, night, domain mismatch, regression after a model update | Model version, training data, inference config, threshold settings |
| **Tracker** | ID switches, track fragmentation, duplicate tracks, lost tracks, short unstable tracks, objects counted multiple times, poor tracking in crowds | Tracker settings, frame rate, detection quality, occlusion |
| **Rule / Configuration** | Bad ROI placement, bad line placement, wrong direction logic, threshold too sensitive or too strict, duplicate events, missed events, wrong class selected, wrong workflow package | User configuration, workflow settings, geometry, rule engine |
| **Environment / Scene Change** | Lighting changed, store layout changed, new obstruction, seasonal shift, weather impact, crowd density change, new signage, camera bumped, time-of-day performance drop | Real-world deployment conditions |

The "likely source" column is the whole point. It's how Upstream differs from monitoring tools that just flag "something is wrong." The product job is to **attribute** the failure, not just detect it.

---

## 7. Architecture at a Glance (Current)

> **Built today.** The technical foundation that makes the reliability layer possible.

Upstream is six services plus a Postgres database. The boundary between them is a **control plane** (`upstream-api-server`, the only service that touches the DB) and a **media plane** (`upstream-streaming-server`, which handles raw video). Cross-service trust runs through signed webhooks or short-lived JWTs.

```
┌────────────────────┐
│  upstream-agent    │  pip-installable Python lib on customer hardware
│  (Python + cv2)    │  → captures webcam, FFmpeg-encodes H.264, ships via SRT
└─────────┬──────────┘
          │  SRT publish (per-session AES-256 passphrase)
          ▼
┌────────────────────────────────────┐
│  upstream-streaming-server         │
│  (MediaMTX 1.9.3 + bash hooks)     │
│  • SRT ingest    :18890/udp        │
│  • RTSP read     (processor)       │
│  • WHEP fanout   :8889 (dashboard) │
│  • JPEG snapshots → webhook upload │
└──┬─────────────┬──────────┬────────┘
   │ RTSP        │ WHEP     │ webhook
   ▼             ▼          │
┌──────────┐  ┌──────────┐  │
│ upstream │  │ upstream │  │
│ processor│  │ dashboard│  │
│ (CV inf.)│  │ (Next.js)│  │
└────┬─────┘  └────┬─────┘  │
     │             │        │
     │  webhook    │ JWT    │
     ▼             ▼        ▼
┌──────────────────────────────────┐
│  upstream-api-server             │
│  (FastAPI + asyncpg)             │
│  • mints SRT passphrase + JWT    │
│  • brokers all webhooks          │
│  • only service touching the DB  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Supabase (Postgres + Storage)   │
│  • 14 tables, RLS by account_id  │
│  • snapshots bucket              │
└──────────────────────────────────┘
```

Two more services sit alongside the core flow. **`upstream-web`** is the public marketing site — Next.js + GSAP, no data layer. **`upstream-monitoring`** is Uptime Kuma behind Caddy on an isolated Lightsail box, publishing `status.upstreamcv.com`; intentionally segregated from the platform so it survives a platform outage.

Each layer is positioned as an input to the reliability layer:

- **Agent** is the first source of reliability signal (heartbeats, capture stats, reconnect history).
- **Streaming server** validates each session against expected codec / resolution / FPS / bitrate.
- **Processor** is where detection / tracking / rule evaluation happen, with the responsibility to emit *traceable* perception facts — not just raw events.
- **API server** is where reliability findings, evidence, recommendations, and review labels all converge.
- **Dashboard** is where reliability information becomes legible to humans.

---

## 8. The Ingest & Streaming Flow (Current)

> **Built today.** Step-by-step trace of one stream coming online — and every step is a signal source for the reliability layer.

**Install & register.** Operator `pip install`s `upstream-agent`, runs `upstream init` to scaffold `~/.upstream/config.yaml`, and pastes an API token issued from the dashboard. The token format is `ups_<env>_<id>_<secret>` — argon2id-hashed server-side, shown once. The agent calls `POST /v1/agents/register` and `POST /v1/cameras/register` to upsert metadata and report camera capabilities.

**Session start.** Agent calls `POST /v1/stream-sessions/start`. The api-server takes an advisory PostgreSQL lock keyed on `account_id`, validates against snapshotted limits (max cameras, codec allowlist, bitrate, FPS, resolution), inserts a `stream_sessions` row with limits snapshotted into `lim_*` columns, and mints three artifacts: a 4-hour HS256 session JWT, a short opaque stream key `sess_<16 hex>`, and a per-session AES-256 SRT passphrase. It then PATCHes the MediaMTX path config to provision that passphrase. The agent receives a URL of the form `srt://ingest.upstreamcv.com:18890?streamid=publish:sess_<hex>&passphrase=<key>&pbkeylen=32`.

**SRT handshake & accept.** Agent's FFmpeg subprocess connects. MediaMTX uses `authMethod: http`, so before any media bytes are accepted it POSTs the handshake to `/v1/ingest/mediamtx-auth/{secret}`. Non-2xx kills the connection at the handshake — no partial connection, no media leak.

**Validation.** On accept, MediaMTX's `runOnReady` bash hook ffprobes the local RTSP re-stream, POSTs observed codec / resolution / FPS / bitrate to `/v1/ingest/stream-started`, and the session transitions `approved → streaming`. The same hook posts an ffprobe-comparator verdict to `/v1/ingest/stream-validations`. **Mismatches are the first reliability signal the product can act on today** — they surface in the dashboard's `ValidationPanel`. Enforcement (kill the stream on mismatch) is implemented but env-gated off; observe-and-report ships.

**Snapshots.** A detached `snapshotter.sh` extracts JPEG frames at intervals, atomically writes them, and best-effort POSTs each to `/v1/ingest/snapshots`. Stored in Supabase Storage at `snapshots/<account_id>/<camera_id>/<yyyymmdd>/<uuid>.jpg` with per-account 30-day quota enforcement. **Snapshots are the visual ground truth the reliability layer will use for frame-quality scoring**, evidence display, and review.

**Dashboard playback.** The dashboard subscribes to Supabase Realtime on `stream_sessions` and `cameras`, polls `GET /v1/cameras/<id>/latest-frame` every ~7s, and opens a WHEP session via the api-server's WHEP proxy. WebRTC media flows browser ↔ MediaMTX direct.

**Inference.** The processor reads the same stream over internal RTSP, runs the CV model, and posts back via `/v1/internal/processor/observations` (per-detection records — class, bbox, confidence, track ID, frame timestamp) and `/v1/internal/processor/perception-snapshots` (per-camera latest-frame-with-overlay).

**Teardown.** When the agent disconnects, MediaMTX fires `runOnNotReady`, which POSTs `/v1/ingest/stream-ended`. Session transitions `streaming → ended`, usage events are emitted, and the MediaMTX path config is DELETEd.

Every step above produces signal the reliability layer consumes: heartbeats, validation verdicts, snapshots, observations, perception snapshots, session lifecycle events.

---

## 9. Reliability Layer Stages

> **Mix of shipped + forward-looking.** Each stage flags status.

The reliability layer is staged from "easy to ship today" to "ambitious future." This roadmap matters for the website: only Stage 1 and parts of Stage 2 are claimable as live product today.

### Stage 1 — Operational Reliability *(partially shipping)*

Tell the team whether the camera and stream are healthy right now.

**Signals:** online/offline, last heartbeat, current session state, latest frame age, stream readiness, FPS expected vs observed, resolution expected vs observed, reconnect count, validation warnings, failed-session reason, snapshot availability.

**Outputs:** camera health status, stream health warnings, basic uptime/downtime history, findings like *"this camera reconnected 6 times in the last hour"* or *"latest frame is 8 minutes stale."*

This is the first practical reliability surface and is built directly on existing ingest, heartbeat, and validation work.

### Stage 2 — Frame Quality *(early concept)*

Tell the team whether the visual input is good enough for inference.

**Signals:** brightness, darkness, blur, sharpness, contrast, frozen frame, compression artifacts, obstruction, time-of-day degradation, basic scene change.

**Outputs:** frame quality score per camera, time windows where inference is risky, findings like *"low-light risk after 7:10 PM"* or *"camera may be obstructed."*

Achievable with classical CV metrics over existing snapshot data before any new ML is needed.

### Stage 3 — Detection / Tracking Reliability *(roadmap)*

Tell the team whether model and tracker outputs are stable.

**Signals:** detection confidence trends, count anomalies, track age, track fragmentation rate, ID switches, short-lived tracks, duplicate tracks, crowded-scene risk, occlusion risk, model version comparisons.

**Outputs:** detection and tracker reliability warnings, suspicious event flags, findings like *"this count may be unreliable because tracks are fragmenting"* or *"model v2 is producing fewer detections than v1 on this camera."*

Requires the processor to emit richer metadata than raw events.

### Stage 4 — Rule / Event Reliability *(roadmap)*

Tell the team whether the **emitted events** are trustworthy.

**Signals:** event frequency changes, event confidence, rule trigger traces, ROI/line interactions, event cooldown behavior, direction logic, duplicate event risk, missed-event candidates, review labels.

**Outputs:** event reliability score, suspicious event queue, missed-event candidate queue, findings like *"line crossing events dropped after geometry was changed"* or *"missed-entry risk increased because tracks are ending before crossing the line."*

This is where Upstream becomes much more valuable than a generic deployment platform — and where the reliability-layer wedge gets sharpest.

### Stage 5 — Replay & Shadow Testing *(future)*

Let teams test workflows against stored footage (replay) or live alongside production (shadow) before changes are rolled out.

**Replay use cases:** *"would this new line placement reduce false counts?"*, *"did the new model perform better on last Friday's footage?"*, *"can we reproduce yesterday's bad event?"*

**Shadow use cases:** A/B a tracker setting, compare model versions safely, validate a rule change before flipping it on.

**Output:** comparison reports — production vs shadow event counts, duplicate-risk delta, missed-event-risk delta, suggested winner.

### Stage 6 — Recommendations & Tuning *(future)*

Turn findings into suggested improvements. Categories: camera placement, lighting, stream settings, model selection, threshold, tracker settings, ROI/line geometry, rule logic, event cooldown, data collection, human review.

Important guardrail: **early recommendations are suggested, not auto-applied.** One-click apply and safe auto-tuning are later phases. We don't want to be the system that quietly changes your config and breaks production at 3 AM.

---

## 10. Reliability Data Concepts *(forward-looking)*

> **Concept-level only.** Detailed schemas are not finalized; the names below are placeholders for what the system will eventually collect.

- **`stream_health_metrics`** — stream quality over time: FPS observed vs expected, bitrate, resolution, codec, bytes received, readiness, freeze detection, reconnect count, latency estimate, validation status.
- **`frame_quality_metrics`** — whether frames are usable for inference: brightness, blur, sharpness, contrast, compression-artifact score, occlusion score, frozen-frame score, quality flags.
- **`observations`** — raw or semi-processed perception output: class, confidence, bbox, track ID, ROI / line ID, all tagged with model / processor / tracker / rule / config versions.
- **`workflow_events`** — final emitted events with risk score, risk flags, version traceability, evidence references.
- **`event_evidence`** — snapshots and (eventually) short clips associated with events or suspicious moments.
- **`reliability_findings`** — detected issues, with category, severity, likely cause, supporting metrics, supporting evidence, status.
- **`review_labels`** — human feedback on events: correct, false positive, missed event, wrong class, wrong count, bad track, bad rule, bad camera angle, uncertain.
- **`tuning_recommendations`** — suggested actions with recommendation type, suggested action, expected impact, confidence, status.
- **`replay_runs` / `shadow_runs`** — test artifacts: source video or shadow config, versions in play, comparison summary.

The cross-cutting principle: **every emitted event must be traceable**. An event shouldn't just say *"person_entered, count: 1"* — it should be traceable to the camera, session, model version, tracker version, rule version, config version, track ID, confidence, line ID, ROI ID, evidence frame ID, and risk flags that produced it. The schema must be designed so this is possible, even if not every field is populated on day one. **Versioning early is non-negotiable** — without it, debugging production CV becomes guesswork.

---

## 11. Evidence & Review

> **Forward-looking with shipped foundations.** Snapshots ship today; evidence viewer and review UI are roadmap.

Reliability without evidence is not trustworthy. The product must show the team **why** it thinks something is wrong. For each suspicious event or reliability finding, the system should eventually surface:

- Snapshot or short clip around the event
- Timestamp + nearby context
- Detected objects, tracks, rule/line/ROI overlay
- Risk flags (e.g. `low_light`, `short_track`, `crowded_scene`)
- Model / config / tracker / rule versions in effect
- Likely cause explanation
- Suggested fix
- Review buttons

Review actions a user can take on any event or finding:

- **Correct** — the event happened
- **False positive** — the event didn't happen
- **Missed event** — something happened that wasn't caught
- **Wrong count / wrong class** — partial correctness
- **Bad track / bad rule / bad camera setup** — attribution
- **Unclear** — cannot tell from evidence

Review labels feed back into reliability scoring (the only way to know real accuracy), recommendation quality, replay evaluation, model/config comparisons, customer-specific tuning baselines, and eventually training data collection.

The product loop closes through human review. Marketing can describe Upstream as **the system that turns uncertain CV outputs into reviewable, labelable evidence**.

**Storage policy direction (open question):** start with snapshots and latest frames; add short event clips when real processing events exist; avoid full video archive by default because of cost and privacy. Customers should eventually be able to choose retention by plan and use case.

---

## 12. Reliability Scoring (Careful Framing)

> **Important for website copy: do not overclaim accuracy.**

A reliability score is **not** the same as accuracy unless ground-truth labels exist. Without labels, Upstream can estimate *reliability risk* using stream quality, frame quality, detection confidence, tracking stability, event consistency, drift from baseline, user review feedback, and replay/shadow comparisons. Only with labels can the product calculate true precision, recall, false-positive rate, or count error.

The early product uses **status language**, not pretend-accuracy numbers:

- **Healthy** — all signals look good
- **Needs Review** — uncertain; user attention requested
- **At Risk** — degradation detected; events may be unreliable
- **Unreliable** — serious problem; do not trust outputs
- **Unknown** — insufficient signal

Long-term, instead of a single vague "reliability score," the product is likely to expose multiple scores per camera: **Stream Health Score**, **Frame Quality Score**, **Detection Stability Score**, **Tracking Stability Score**, **Rule/Event Reliability Score**, **Review-Verified Accuracy**, **Overall Workflow Reliability**.

For website copy: it's safer to talk about *reliability risk*, *quality signals*, and *degradation warnings* than to claim *accuracy*. Use accuracy language only when supported by labels.

A good early example of the right voice:

> 12 people counted today.
> Reliability warning: count may be underreported between 6:00 PM and 8:00 PM because frame brightness dropped and tracks became unstable.

That's the difference between "show what happened" and "help users understand whether they should trust it."

---

## 13. Product Modes *(forward-looking direction)*

The reliability layer can eventually run in several modes. The team's current direction is to build the native pipeline first, but design data models so the other modes are possible later. This matters for positioning — the long-term story is broader than "we run your cameras."

| Mode | What it means | Why it matters |
|---|---|---|
| **Native pipeline** *(current direction)* | Upstream ingests cameras, runs the model / tracker / rules, emits events. | Full visibility, strongest reliability product, best evidence. |
| **Bring-your-own-model** *(future)* | Customer provides the model; Upstream handles deployment, streaming, monitoring, evidence, reliability. | Flexibility for advanced customers; Upstream still controls the runtime. |
| **External event monitoring** *(future enterprise wedge)* | Customer has their own CV pipeline; sends events + metadata + optional evidence to Upstream for monitoring and reliability scoring. | Lets Upstream be the reliability layer without replacing the customer's pipeline. Strong enterprise wedge. |
| **Replay / video upload** *(future)* | Customer uploads footage; Upstream stress-tests it against models / configs. | Useful for testing before live deployment; good for sales demos. |
| **Hybrid** *(likely long-term)* | Customer uses some Upstream components, not all (e.g. their own model, but Upstream's review + reliability + replay). | Probably the dominant long-term mode. |

The marketing site doesn't need to lead with this complexity, but the reliability-layer positioning makes more sense if the reader understands Upstream isn't *only* trying to replace the runtime — it can also monitor pipelines it doesn't own.

---

## 14. Stack & Deployment Topology

| Component | Tech | Deploys to |
|---|---|---|
| `upstream-agent` | Python 3.10+, Typer CLI, Pydantic v2, OpenCV, FFmpeg + libsrt | Pip-installed on customer hardware (Linux / macOS / Windows) |
| `upstream-streaming-server` | MediaMTX 1.9.3 on `alpine:3.20`, bash hook scripts | Docker, single ingest node, DNS-fronted at `ingest.upstreamcv.com` |
| `upstream-api-server` | FastAPI, Pydantic v2, asyncpg (hot path), SQLAlchemy 2.0 async (dashboard reads), structlog, argon2id, HS256 JWTs | Docker (gunicorn + uvicorn on `:4000`), Caddy reverse proxy with TLS, 1 MB body cap (5 MB carve-out for `/v1/snapshots`) |
| `upstream-processor` | CV inference runtime | Internal-only; pulls RTSP from MediaMTX, posts observations / perception via webhook |
| `upstream-dashboard` | Next.js 16.2.6, React 19, Tailwind v4, SWR, Supabase Auth (`@supabase/ssr`, HTTP-only cookies), Radix Dialog (token reveal) | Netlify (Edge Function for `proxy.ts` session refresh + serverless catch-all `/api/upstream/[...path]`) |
| `upstream-web` | Next.js 16.2.6, GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll | Static; Netlify or Vercel |
| `upstream-monitoring` | Uptime Kuma + Caddy 2 (auto-TLS via Let's Encrypt) | Dedicated Lightsail / EC2 instance |
| Data store | Supabase Postgres (managed) + Supabase Auth + Supabase Realtime + Supabase Storage | Managed Supabase |

The schema today has **14 tables**: `accounts`, `account_members`, `account_limits`, `api_tokens`, `agents`, `cameras`, `stream_sessions`, `stream_validations`, `heartbeats`, `snapshots`, `usage_events`, `processor_statuses`, `observations`, `latest_perception_snapshots`, `camera_geometry_configs`. RLS scopes every row by `account_id`. The reliability data concepts in §10 will add more tables over time.

**Three identity classes** carry trust through the system, plus one ephemeral secret:

1. **API token** (long-lived) — `ups_<env>_<id>_<secret>`. Argon2id-hashed, shown once on creation.
2. **Session JWT** (4 h TTL, HS256) — claims: `acc`, `sub`, `cam`, `sid`, `jti`, `exp`, `lim`. Returned at session-start.
3. **Stream key** (4 h TTL, opaque) — `sess_<16 hex>`. Rides inside SRT streamid only.
4. **SRT passphrase** (per-session, AES-256, ephemeral) — embedded only in the SRT URL returned to the agent. Never logged, never reused, deleted from MediaMTX at session end.

---

## 15. Multi-Tenancy & Limits

Account model: `accounts → account_members → account_limits`. Supabase Auth users (in `auth.users`) join an account via `account_members` with one of three roles: **owner**, **admin**, **member**. Agents authenticate via a bearer token bound to one account. Dashboard users authenticate via Supabase JWT and resolve their active account from a `upstream_active_account` cookie validated against `account_members` via RLS.

**Limits are snapshot-on-start.** When a session is approved, the relevant `account_limits` columns are copied onto `stream_sessions.lim_*`. If an operator raises or lowers limits mid-stream, in-flight sessions are unaffected; only new sessions see the new values.

**TOCTOU defense on session start:** a partial unique index `stream_sessions(camera_id) WHERE state IN ('approved','streaming')` prevents two concurrent starts on the same camera. A PostgreSQL advisory transaction lock keyed on `account_id` serializes concurrent starts within an account.

**Three webhook trust domains** — streaming server, processor, dashboard — each authenticate with a different `X-Upstream-Webhook-Secret`. Compromising one secret does not escalate to another.

---

## 16. Backend vs. Frontend Responsibilities

> **Architectural principle worth respecting in any new reliability feature.**

The **backend** returns structured perception facts: detections, tracks, events, confidence, risk flags, issue categories, evidence references, timestamps, model / processor / tracker / rule / config versions, reliability findings, recommendations.

The **frontend** owns presentation: bounding-box colors, label styling, ROI/line styling, overlay toggles, timeline visualization, warning display, review UI.

Do not make the backend responsible for frontend styling choices. The backend says `{"object_type": "person", "confidence": 0.82, "risk_flags": ["low_light"], "bbox": [...]}`; the frontend decides how that appears.

---

## 17. Brand & Positioning Notes

> **Use verbatim where appropriate.** Both the new wedge and the existing marketing language remain valid; the new wedge is the sharper version when more direct positioning is needed.

**Canonical positioning (new wedge):**

- **"Upstream is the reliability layer for production computer vision."**
- *"Most platforms help teams launch computer vision workflows. Upstream helps teams trust, debug, and improve those workflows once they are running in the real world."*
- *"Upstream helps teams trust production computer vision."*
- *"Computer vision works in the demo but breaks in production. Upstream is the reliability layer that helps teams monitor, debug, and improve live camera workflows after deployment."*

**Existing marketing language (still valid):**

- Headline: **"Live computer vision, kept honest."**
- Lede: *"Reliability-native infrastructure for live computer vision. Upstream runs the pipeline behind your cameras and tells you the moment a single one stops telling the truth."*
- Tagline: **"Drift detected before it costs you."**
- About mission: *"The hardest part of running CV in the real world isn't the model — it's the day the model stops working and nobody notices."*
- Founder origin: *"Three operators who got tired of stitched-together stacks and a pager that lied to us. Upstream is the system we wished we'd had."*
- Philosophy planks: (1) **reliability is a product, not a metric**; (2) **own the whole pipeline** (ingest, inference, rules, events, review — only then can you explain a false alert); (3) **demos are the easy case** (measure how the same rule holds up at the same camera six months later in February rain).
- Waitlist pitch: **"Bring your worst camera."** Three-step process: we read submissions, 48-hour response, onboarding through 2026.

**Sharper short pitches** for the new wedge:

- *Connect cameras. Run workflows. Capture evidence. Detect reliability issues. Explain likely causes. Recommend improvements. Re-test changes.*
- *Datadog helps teams monitor infrastructure. Sentry helps teams debug software errors. Upstream helps teams monitor and debug production computer vision reliability.*

**Founders:** **Elkan Bruha** (CEO / operations), **Josh** (CTO / vision systems), **Hayden** (COO / deployment).

**Production launch target:** **Q4 2026.**

**Brand palette:** dark forest green base `#0f1809`, mid `#344c2c`, panel `#1a2613`, accent `#5fb869` (used for italicized emphasis in headlines).

**Typography:** **Satoshi** variable (display + body), **JetBrains Mono** (code, IDs, timestamps).

**Visual idioms:** frosted glass panels (22 px backdrop blur), kicker numbering (`01 — ingest`, `02 — inference`, ...), magnetic CTAs, scroll-pinned animations on hero and drift timeline, syntax-coloured rule editor.

---

## 18. Current Stage vs. Roadmap

This section is the most important reference for the website-copy terminal. **Only claim what's shipped.**

### Shipped today

- Agent at Milestone 7: live streaming, exponential-backoff recovery on transient SRT / FFmpeg / API failures, heartbeats, snapshot capture.
- API server through Phase 5 partial: processor observation + perception-snapshot endpoints wired.
- Streaming server: M4.1 (ingest auth at SRT handshake), M5.1 (ffprobe validation observe-and-report), M6.1A (local snapshot extraction), M6.1B (best-effort upload).
- Dashboard runs two parallel UIs during redesign — `/dashboard` (legacy dark) and `/dashboard-next` (light theme target). Both share the same data layer, proxy, and WHEP client.
- Marketing site: hero, ingest ribbon, inference lens, rule composer, drift timeline, replay scrubber, field reports, delta CTA, about page, waitlist.
- Stage 1 reliability signals: camera online/offline, heartbeats, session state, latest-frame freshness, validation warnings, reconnect tracking. Not yet packaged as a polished reliability surface, but the underlying signals exist.

### In flight

- M5.2 (validation enforcement: kill stream on mismatch) — implemented, env-gated off pending production rollout.
- Phase 6 (rate limiter, Prometheus `/metrics`, session-expiry sweeper, token rotation, Sentry integration).
- Light-theme dashboard promotion.
- First polished reliability surface — likely a camera reliability panel showing status, key signals, and a small set of rule-based findings (offline, stale frame, low FPS, frequent reconnects, snapshot failure).

### Forward-looking (vision, not promises)

- Stages 2–6 of the reliability layer (frame quality, detection/tracking, rule/event, replay/shadow, recommendations).
- Reliability findings table, evidence viewer, review queue, tuning recommendations as first-class product surfaces.
- Replay and shadow testing.
- Product modes beyond native pipeline (BYO model, external event monitoring, replay/upload).
- Multi-camera reliability reports, model/config version comparison, drift detection from baseline.
- Per-camera and per-site reliability dashboards.
- Customer-specific tuning baselines, retraining feedback loops.

### Explicitly not shipped — do **not** write copy that promises them

- Multi-region ingest.
- HLS recording / long-term video archive.
- OAuth providers (email/password only today).
- Public `/metrics` endpoint.
- Multi-tenant per-account custom models.
- Auto-tuning that applies changes without user approval.
- Verified accuracy numbers (precision / recall / FP rate / FN rate) — these need ground-truth labels we don't have yet.

---

## 19. Open Product Questions

Tracked so any new contributor knows what's still in motion. Not for direct quotation on the site, but useful context for tone.

**Product questions**

- Is the first customer Upstream serves an operator, a CV engineer, or a business owner?
- Is the first wedge people counting, occupancy, safety, security, or general CV reliability?
- Does Upstream require customers to use the full platform, or can it monitor external pipelines?
- How much review work are users willing to do?
- Should reliability be marketed as monitoring, testing, debugging, QA, or observability?

**Technical questions**

- What evidence should be stored by default — snapshots only, short event clips, rolling buffer, full archive?
- How long should evidence be retained?
- Should reliability findings be generated synchronously or asynchronously?
- Should frame quality metrics be computed in the processor, streaming server, or a separate worker?
- How should external event ingestion work later?

**UX questions**

- Single overall reliability score, or separate health categories?
- How to prioritize warnings so a user with 100 cameras isn't overwhelmed?
- How to communicate likely cause to non-technical users without overstating confidence?
- How should review queues stay manageable?

---

## 20. Development Guardrails

A few principles that the website should respect implicitly even when not stating them outright:

- **No undebuggable events.** Every important event is traceable to camera, session, model / processor / tracker / rule / config versions, evidence, and risk flags.
- **Live inference is an input, not the product.** The product is the loop: run model → emit event → capture evidence → monitor reliability → explain issues → improve workflow.
- **Do not overclaim accuracy.** Without labels, use reliability risk, quality signals, and review-needed status. Reserve true accuracy language for when human review or ground truth supports it.
- **Perception facts ≠ UI styling.** Backend returns facts; frontend decides how they look.
- **Version everything.** Without versioning, debugging production CV becomes guesswork.
- **Design for native and external pipelines.** Start native, but design data models so external event monitoring is possible later.

---

## 21. Final Principle

Upstream is not "another camera-to-model platform." The core product story is:

> Connect cameras. Run workflows. Capture evidence. Detect reliability issues. Explain likely causes. Recommend improvements. Re-test changes. Help teams trust production computer vision.

That is the reliability wedge — and it's what every piece of marketing copy should serve.

---

**Source-of-truth files** for cross-checking specific technical claims (read before quoting numbers or naming endpoints):

- `upstream-api-server/docs/architecture.md`, `upstream-api-server/docs/api-contracts.md`, `upstream-api-server/docs/module-map.md`
- `upstream-agent/docs/architecture.md`, `upstream-agent/docs/milestone-7-summary.md`
- `upstream-streaming-server/docs/architecture.md`, `upstream-streaming-server/docs/stream-auth.md`, `upstream-streaming-server/docs/stream-validation.md`
- `upstream-dashboard/AGENTS.md`, `upstream-dashboard/proxy.ts`, `upstream-dashboard/src/app/`
- `upstream-web/src/app/page.tsx` and `upstream-web/src/app/about/page.tsx` for harvested positioning copy
- This document for product positioning, reliability-layer vision, and the shipped-vs-roadmap distinction
