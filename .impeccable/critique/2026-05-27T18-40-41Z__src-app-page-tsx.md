---
target: homepage (whole site)
total_score: 21
p0_count: 0
p1_count: 3
timestamp: 2026-05-27T18-40-41Z
slug: src-app-page-tsx
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live indicators and pinned-scrub timeline communicate state well; waitlist form lacks per-field validation feedback |
| 2 | Match System / Real World | 4 | Domain vocabulary (RTSP, YOLO, p50, drift score, false-positive budget, pager) is authentic for the ops-engineer buyer |
| 3 | User Control and Freedom | 2 | Lenis hijacks scroll; the 150vh pinned drift section can't be skipped; in-page anchors fight smooth-scroll + pin |
| 4 | Consistency and Standards | 2 | Two warm yellows (`--accent-warm`, `--accent-amber`) share semantic territory; glass-pane radius varies (2xl vs 3xl); section numbering resets across home and about |
| 5 | Error Prevention | 2 | Waitlist form has no failure state, no graceful error path, no email-format messaging beyond browser default |
| 6 | Recognition Rather Than Recall | 3 | CameraIngestRibbon legend lists 6 states but data only has 4; "drift" and "noisy" both render `accent-warm` and are visually identical |
| 7 | Flexibility and Efficiency | 1 | No skip links, no keyboard shortcuts, smooth-scroll penalizes speed-readers, no quick path through 3 pinned/scrubbed sections |
| 8 | Aesthetic and Minimalist Design | 2 | Maximalist atmosphere stack (CursorGlow + Lenis + magnetic + scrubbed pins + Framer reveals + GSAP fade-ins) sits underneath an editorial-minimal visual register — implementation contradicts the vision |
| 9 | Error Recovery | 1 | Form has no error state; no visible 404 design; no graceful fallback if `river.mp4` fails to load past the poster |
| 10 | Help and Documentation | 1 | No tooltips on demo HUDs ("drift score · 24h" / "p50 ingest → event" carry no on-hover help for non-CV viewers) |
| **Total** | | **21/40** | **Functional but flawed — polished surface, unfocused design strategy** |

---

### Anti-Patterns Verdict

**Start here. Does this look AI-generated?** Partially. The content (copy, founder voices, field-report stories) reads as human and operator-written. The chrome reads as 2025 SaaS-template stock.

**LLM assessment.** The site escaped the *first-order* category reflex (CV-infra → navy/black + neon + monospace terminal) by going editorial-magazine instead. That is the right call. But it then walked directly into the *second-order* reflex: the now-saturated "Linear/Vercel/Resend/Mintlify editorial-infra" lane, defined by Satoshi + italic-accent em + monospace `/ 01` kickers + frosted glass on every demo + scroll-pinned scrubs + magnetic buttons + Lenis smooth-scroll + CursorGlow. Strip the copy and this is indistinguishable from any other late-2025 infra landing built by Cursor-fluent designers. The dead giveaways:

- An `atmosphere/` directory containing CursorGlow + ScrollProgress + MagneticButton + KineticHeadline + RevealText + GlassPanel + SmoothScrollProvider, all wired in `RootLayout`. Every Lenis+GSAP+Framer site has this exact set.
- A `<em class="italic-accent">` punchline at the end of *every* headline ("kept *honest.*", "*not guesses.*", "*code.*", "*before it costs you.*", "*current.*", "*substrate*"). By the third recurrence the reader recognizes the template, not the emphasis.
- HUD pills with `cam_dock_03 · 11:42:08 PDT · 1080p · 28.4 fps` mono badges. Faux real-time chips are demo-shorthand for "we're a serious infra tool" and read as cosplay to actual ops engineers.
- `.glass-pane` as the default container — 13 applications across 8 surface files. This is glassmorphism-as-default, which the impeccable laws explicitly flag.

**Deterministic scan.** Detector found 6 `pure-black-white` warnings, all `bg-black/40` HUD pill backgrounds in `CameraIngestRibbon.tsx` (lines 140, 144), `InferenceLens.tsx` (147, 151), and `ReplayScrubber.tsx` (129, 133). Each should tint toward `--base` (`rgba(13, 20, 8, 0.5)`) to match the rest of the palette.

**Visual overlays.** Browser-automation tooling is not available in this session, so no overlay was injected. The dev server is running at `http://localhost:3000` — you can verify the findings visually yourself. No reliable user-visible overlay claim is being made.

---

### Overall Impression

The voice is *real*. The chrome isn't. Field Reports' "A pallet wrap covered cam_lot_22 for fourteen hours. We told them in fifteen minutes." and the waitlist question "What is one camera silently lying to you about?" are written by people who know the job — they would convince a skeptical ops engineer in 90 seconds. But that voice is buried under an aesthetic vocabulary that says "we hired a designer who watched the same five Awwwards reels." The single biggest opportunity: ruthlessly subtract chrome until the content's authority is the loudest thing on the page.

---

### What's Working

1. **The Field Reports section.** Specific, dated, named-by-facility-type stories with metrics. "Eight cameras drifted on the same afternoon — and Upstream caught all eight" reads as fact, not slogan. The honest "Names are placeholders until customers say we can use theirs" lede is a trust accelerator.

2. **The Drift section's mechanic.** Pinned scrub with three lanes diverging at day 10, frosted callout sliding in at the divergence point. This is the one place where the motion *is* the message — scroll progresses through time, and the lane decay tells the story. Genuinely novel for the category.

3. **The waitlist's specific question.** "What is one camera silently lying to you about?" out-performs every "tell us about your use case" form ever written. It signals you know the job and asks the buyer to bring evidence.

---

### Priority Issues

**[P1] The italic-green-em punchline is a template, not a voice.**
*Why it matters:* Every headline lands the accent at the exact same syntactic position. By the third recurrence the reader sees the trick instead of the emphasis. It's the strongest single AI-slop tell on the page because it would not happen if a human author wrote each headline against the same brief independently.
*Fix:* Pick the 2-3 headlines where the italic-accent is genuinely the punchline (HeroStream is one; FieldReports' "*not a haystack*" is one). Strip it from the rest. Vary emphasis the other way: weight contrast on one, scale contrast on another, no emphasis on a third. Cap total accent-em occurrences at 4 across the entire site.
*Suggested command:* `/impeccable distill`

**[P1] Glassmorphism is the design system, not a tool.**
*Why it matters:* 13 `.glass-pane` applications across 8 surfaces: Hero LiveCard, Token Stream, Rule editor, Rule preview, Replay viewport, Verdict diff, Field Report cards (×3), Team photos (×3), Waitlist form, DriftTimeline callout. Impeccable's absolute ban reads "glassmorphism as default — rare and purposeful, or nothing." When every elevated surface frosts, frost stops elevating anything.
*Fix:* Pick the 2-3 highest-stakes glass moments — the InferenceLens viewport (frost = "you're looking through the lens"), the WaitlistForm (frost = "the gate you're requesting through"), and one more. Replace the rest with matte tinted surfaces in `--creek-dark` or solid `--base` with a 1px border. Team photos especially don't need frost — they need photography.
*Suggested command:* `/impeccable distill`

**[P1] Color strategy is unfocused — neither restrained nor committed.**
*Why it matters:* The brand green (`#5fb869`) appears as italic-accent text, dot indicators, focus rings, MagneticButton fills, scrub bar fills, sparkline strokes, link hovers — sprinkled across ~15 touchpoints in 3+ opacities. But never as a section background, never as a hero word, never as a sustained color statement. Per impeccable's color-strategy commitment axis: this is between Restrained (one accent ≤10%) and Committed (one color 30-60%). It's neither. A half-committed brand color reads as cautious.
*Fix:* Pick the lane. Either go Restrained (italic em + scrub fill + done; everything else neutral), or go Committed and let one section — likely DeltaCta or the Field Reports area — be drenched in `--creek-deep` so the green is the surface, not the sprinkle.
*Suggested command:* `/impeccable colorize`

**[P2] Motion stack is doing four jobs to add one unit of polish.**
*Why it matters:* CursorGlow + ScrollProgress + Lenis smooth-scroll + GSAP scrubbed pins + Framer `whileInView` reveals + masked KineticHeadline + RevealText body + MagneticButton + custom JS fade-in observers on HeroStream — all in one page. Reduce-motion users get a degraded version; speed-readers get hijacked scroll; the motion budget is spent before the content has a chance to land. CursorGlow specifically signals "design template" with zero functional value for an infrastructure page.
*Fix:* Remove CursorGlow entirely. Pick one of {ScrollProgress, Lenis} — they fight each other. HeroStream uses BOTH the custom `data-fade-in` observer AND `useGSAP` timelines AND `KineticHeadline` — collapse to one. Keep the DriftTimeline pinned scrub (it earns its weight) and the InferenceLens stroke-dashoffset draw-in (it visualizes detection). Cut everything else.
*Suggested command:* `/impeccable quieter`

**[P2] Two warm yellows doing semantic overlap.**
*Why it matters:* `--accent-warm` (#d6c189) and `--accent-amber` (#e8b86a) are both used for "warning" / "drift" / "kicker numbers" / "noisy" — with no consistent rule. CameraIngestRibbon's legend (line 84-91) shows "drift flagged" and "noisy" both as `text-accent-warm`, visually indistinguishable, while the data clearly distinguishes them. The "blocked" state uses `accent-amber`. So one warning color means three things and another means one.
*Fix:* Either consolidate to one warning yellow (recommended — `--accent-amber` is more legible against the dark base) and free `--accent-warm` for use as kicker/eyebrow accent only, OR formalize a contract: amber = blocking error, warm = drift/anomaly, with no overlap.
*Suggested command:* `/impeccable clarify`

**[P3] CameraIngestRibbon legend lists states that don't exist in the data.**
*Why it matters:* The legend (line 84-91) shows 6 entries — healthy, drift flagged, blocked lens, noisy, offline, review — but the `TILES` array only uses 4 (ok, drift, blocked, noisy). "Offline" and "review" never appear. A legend that doesn't legend the data trains users to ignore legends entirely.
*Fix:* Either prune the legend to 4 entries with distinct dot colors, or add representative tiles for offline/review (preferred — completes the implied taxonomy).
*Suggested command:* `/impeccable clarify`

---

### Persona Red Flags

**Maya (Ops Engineer, primary buyer — runs CV at 200 cameras in production):**
- Every demo is a synthetic SVG composition. Maya knows what a YOLO viewport, a real RTSP feed, a real Datadog drift dashboard look like. The faked HUD chips with `yolov9-c · 62ms` will register as marketing pretense, not product evidence. There is no GitHub link, no docs link, no actual product screenshot.
- The waitlist gate means she cannot try the product, cannot evaluate it asynchronously, must talk to people. For a senior IC evaluator this is friction.
- Smooth-scroll forces her to slow down through 7 sections she would normally skim in 20 seconds.
- "Production launch · Q4 2026" tells her this is pre-product. She bookmarks and leaves.

**Sam (Curious Skimmer, 30s of attention):**
- Above-the-fold gives him: video, headline ("Live computer vision, kept honest."), and a HeroLiveCard with 4 stats he has no context for ("drift score · 24h · 0.04" — is 0.04 good?). He has no anchor in the first 5 seconds.
- The "See the pipeline" ghost CTA scrolls into a 12-tile camera ribbon with a partial-legend. Sam doesn't know where to look first.
- KineticHeadline reveal-from-below on every section delays the headline by ~1 second per section. Across 7 sections this is meaningful wait time for a skimmer.

**Ariel (Investor / Strategist, due-diligence pass):**
- "Production launch · Q4 2026" + "we onboard a small number of facilities per quarter" + anonymous customer references = pre-revenue signaling. Honest, but soft.
- LinkedIn links for all three founders are present — good. The team section is structurally sound; the bios are well-written and operator-coded.
- The fish illustration behind the Delta CTA is faint enough to wonder if it's intentional. On Ariel's high-DPI display, "min(85vw, 920px)" is a large image at 12% opacity — present but unresolved.

---

### Minor Observations

- **Footer coordinates are Denver, not Boulder.** `Boulder, Colorado · 39.7392° N, 104.9903° W` — those are Denver's coordinates. Boulder is roughly 40.0150° N, 105.2705° W. Verifiable factual error in the footer copy. (`src/components/layout/Footer.tsx:79`)
- **48 em dashes across the source.** Impeccable's copy convention bans them as visual clutter; an editorial-mono register earns its quiet through periods and semicolons. Most could become commas (`isn't the model, it's the day...`) or periods.
- **`Date.now().toString(36).slice(-6)` as a fake reference id** in the waitlist receipt. Operators will read this as fake immediately. Either drop it or wire a real id.
- **HeroStream uses both `useGSAP` timelines and a separate `data-fade-in` raw-DOM mount observer.** Two systems doing the same thing — pick one.
- **The `glass-pane` border-radius is inconsistent.** Hero/Inference/Rules use `rounded-2xl`, Field Reports and Waitlist use `rounded-3xl`. Small-scale visual inconsistency.
- **`viewport.themeColor: "#0f1809"`** — pure-ish dark hex bypasses the OKLCH discipline in the rest of the system. Token it as `var(--base-2)` equivalent.
- **`SmoothScrollProvider` sets `data-lenis-ready` on `<html>` but nothing reads it.** Dead instrumentation.
- **`/01–/07` section numbering on home, then `/01–/03` on about** — the numbering resets without explaining why. Either continue from `/08` on about, or drop the numeric kicker on about (it's only 3 sections; the index is redundant).
- **`HeroStripe` claims "3y · frame + event"** — a specific retention SLA. Make sure it survives the first sales conversation; specifics in marketing become contracts.

---

### Questions to Consider

- What if the Drift mechanic (Section 04 — the one genuinely novel scroll moment) was the hero, and the 12-tile camera ribbon shrank to one line of corroborating evidence below the fold?
- What would actually be lost if every glass surface became matte, tinted in `--creek-dark` or `--base` with a 1px stroke? Be honest — would readers miss frost, or have they already learned to ignore it because it's everywhere?
- Could the italic-green-em pattern earn its place by appearing exactly 3 times across the entire site instead of 8+?
- Does "Production launch · Q4 2026" belong front-and-center? That signal makes the right buyer wait instead of leaning in — could it move to the footer-only?
- If you killed CursorGlow, Lenis, and the magnetic buttons entirely, what page-rank or conversion metric would actually change?
- Could the waitlist form do its job without `.glass-pane` chrome — just clean form fields on the page background, with the operator question as the only flourish?
