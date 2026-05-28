---
target: homepage (whole site)
total_score: 26
p0_count: 0
p1_count: 1
timestamp: 2026-05-27T19-29-04Z
slug: src-app-page-tsx
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live indicators / scrubbed pin timelines still communicate well; waitlist form still has no per-field validation feedback |
| 2 | Match System / Real World | 4 | Domain vocabulary (RTSP, YOLO, p50, drift score, false-positive budget, pager) remains authentic |
| 3 | User Control and Freedom | 3 | CursorGlow is gone; ScrollTrigger sync fixed for pinned sections; Lenis still hijacks wheel and the 150vh drift pin still can't be skipped |
| 4 | Consistency and Standards | 4 | Legend now matches data; drift/noisy color collision resolved; italic-em capped at 2 strategic moments; glass-pane has a coherent split (panes = 2xl, form/photos = 3xl); Boulder mentioned only in footer; section numbering reset on About still untouched |
| 5 | Error Prevention | 2 | Waitlist form still has no failure state; no graceful path if `setTimeout(900)` simulated POST gets replaced with a real one |
| 6 | Recognition Rather Than Recall | 3 | Legend now correctly enumerates 4 states with 4 distinct dot colors (severity gradient: signal → ink-mute → warm → amber); demo HUDs still have unlabeled chips ("p50 ingest → event", "drift score · 24h") |
| 7 | Flexibility and Efficiency | 1 | No keyboard shortcuts; no skip links; smooth-scroll still penalizes speed-readers; three scrub/pin sections still gate skim flow |
| 8 | Aesthetic and Minimalist Design | 4 | Major progress: chrome subtracted, color committed at the CTA, glass concentrated to three system surfaces, italic-em down from 11 to 2. Motion stack is still maximalist (Lenis + scrub pins + masked reveals + magnetic buttons + framer whileInView) under what now reads as a more deliberate visual register |
| 9 | Error Recovery | 1 | No error states for the waitlist; no 404 design; no fallback if `river.mp4` fails past the poster |
| 10 | Help and Documentation | 1 | Still no tooltips on demo HUDs; the curious skimmer has nothing to anchor "drift score · 24h" or "p50 confidence" semantically |
| **Total** | | **26/40** | **Solid but unrefined — chrome resolved, content surfaces still need a help/error/empty-states pass** |

---

### Anti-Patterns Verdict

**Does this look AI-generated?** Less so. The big template tells are gone or contained: the `<em class="italic-accent">` punchline survives at 2 deliberate moments instead of being applied to every section heading; `.glass-pane` is reserved for the InferenceLens viewport (the lens), the ReplayScrubber viewport (the playback), and the WaitlistForm (the gate); `CursorGlow` is gone entirely; the ScrollProgress bar reads as cream instrumentation rather than a brand-green→gold sprinkle. The DeltaCta drench gives the page a real visual climax instead of 15 cautious accent-green touchpoints.

What still gives it away: the *section grammar* (kicker number + KineticHeadline + lede + content) repeats 7 times on home and 3 on about, which the brand register explicitly flags as "AI scaffolding unless it's a deliberate, named brand system." And every demo is still synthetic SVG — there are no actual product screenshots, which is the single biggest "the product isn't real yet" signal for the ops-engineer buyer.

The second-order category reflex check: an "infra brand that's not navy/black/neon → editorial-typographic dark mode" still lands roughly here, though more loosely than before. Satoshi + JetBrains Mono + dark-creek base + radial glows + scrub timelines is recognizable as the late-2025 Linear/Vercel/Resend infra-editorial family. Less reflex-y now, but the lane is still inhabited.

**Deterministic scan**: 0 findings. Previously 6 `pure-black-white` warnings on HUD pills; all resolved by the distill pass (`bg-black/40` → `bg-base/65`).

**Visual overlays**: browser-automation tooling unavailable. Dev server is at `http://localhost:3000` for manual verification.

---

### Overall Impression

The chrome got out of the way. The content is doing the work it should have been doing all along: the Field Reports stories, the waitlist's specific question, the drift pinned scrub. The single biggest opportunity now is the *flexibility / help / errors* gap — once the chrome problem is solved, the next layer of polish is making the experience tolerant of real users (skip-readers, error states, on-hover semantics). Otherwise this is a polished page that punishes anyone who doesn't read it linearly.

---

### What's Working (Now)

1. **The CTA color commitment.** Every primary `Request access` button is now the brand `--accent` green with deep-creek text — high-contrast and brand-forward. The same color shows up at the DeltaCta drench. The brand has a *signal* now, not a sprinkle.

2. **The DeltaCta drench.** The transition from matte Field Reports cards into the green-flooded creek pool is a real visual moment. The fish image (now at 22% opacity, less filtered) reads as a fish *in* the water — the copy "Step into the current" actually does what it says. Genuinely earned.

3. **CameraIngestRibbon legend repair.** Four states, four distinct dot colors, a clear severity gradient: healthy (signal) → noisy (ink-mute) → drift (warm) → blocked (amber). The legend now teaches; before it confused.

4. **Two surviving italic-em punchlines.** "kept *honest.*" at the brand thesis and "*not a haystack.*" at the Field Reports value prop carry weight precisely because they're rare. The DriftTimeline H2 going font-bold without the italic-accent reads as a confident statement instead of a templated punchline.

5. **The Nav request-access pill.** The new layered-glass treatment (`.glass-pane`-ish frost inside the scrolled-state nav frost) reads as a deliberate density gradient, not a default style. Removing the pulse dot was the right call — it was overloaded with attention-grabbing animation that the pill didn't need.

---

### Priority Issues

**[P1] Motion stack is doing four jobs to add one unit of polish.**
*Why it matters:* Even with CursorGlow removed, the page still ships Lenis smooth-scroll + GSAP scrubbed pins + Framer `whileInView` reveals + masked `KineticHeadline` + `RevealText` body + magnetic buttons + the CSS-transition entrance on HeroStream. Reduce-motion users get a degraded version; skip-readers fight hijacked scroll; the recent ScrollTrigger sync issues (just fixed) are a symptom of compounding smoothing. Motion budget should serve narrative, not advertise that you can animate.
*Fix:* Pick one of {Lenis smooth-scroll, ScrollProgress bar}. Pick one of {masked KineticHeadline, simple opacity reveal} for non-Hero headlines (the masking is a lot for sections 2–6). Keep the DriftTimeline pinned scrub (it earns its weight) and the InferenceLens stroke draw-in (it visualizes detection). Cut MagneticButton's translate-pull on hover — replace with a 1px y-translate and an opacity nudge on the cream lift.
*Suggested command:* `/impeccable quieter`

**[P2] The "section grammar" repeats 7+ times unchanged.**
*Why it matters:* The brand register specifically flags "repeated tiny uppercase tracked labels above every section heading" as AI scaffolding. CameraIngestRibbon, InferenceLens, RuleComposer, ReplayScrubber, FieldReports all open with `/ 0N · kicker text` → KineticHeadline → lede → demo. DriftTimeline partially breaks the pattern (it builds its own header), and DeltaCta uses a centered variant — those are the only two that vary. Five sections sharing chrome is monotony, not consistency.
*Fix:* Break the grammar on 1–2 sections. Field Reports could lose the kicker and lead with a large date / facility kicker built into the first card. InferenceLens could let the viewport be the only thing above the fold and put the headline below it. The point isn't to remove kickers — it's to vary art direction per section the way the brand register explicitly permits.
*Suggested command:* `/impeccable layout` or `/impeccable bolder`

**[P2] No actual product screenshots.**
*Why it matters:* For Maya (the ops-engineer buyer), the synthetic SVG demos are the single biggest "this isn't real yet" tell. The yolov9-c chip, the bounding boxes, the rule editor, the drift lanes — all hand-composed in SVG. An ops engineer knows what a real YOLO viewport looks like. The waitlist gate compounds this: she can't try it, can't see real product, has to talk to people.
*Fix:* Two paths. Either lean into "we're pre-product, here's the thesis and the team" (current direction, but explicitly): drop the demos that pretend to be product, double down on the Field Reports stories as the proof. OR: replace 2–3 synthetic SVG demos with actual product screenshots (even of an internal dashboard) so there's something concrete to look at. The hybrid where most demos are SVG but nothing is real is the weakest version.
*Suggested command:* `/impeccable shape` (this is a scoping decision, not a polish fix)

**[P2] No error / loading / empty states across the experience.**
*Why it matters:* WaitlistForm has no failure path — if the simulated `setTimeout(900)` becomes a real backend call that fails, the user is stranded. There's no 404 page. If `river.mp4` fails past the poster, there's no graceful narrative. These are P2 because the site is pre-launch and the happy path works, but they're the difference between "polished" and "production-ready."
*Fix:* Add a failure state to WaitlistForm (`state: "error"`) with a retry CTA and a fallback email link. Sketch a 404 that matches the brand voice ("the camera at this URL is offline. let's get you back upstream.").
*Suggested command:* `/impeccable harden`

**[P3] Help / on-hover semantics for demo HUDs.**
*Why it matters:* For Sam (curious skimmer), `drift score · 24h · 0.04` carries zero meaning — is 0.04 good? Same for `p50 ingest → event · 84ms`, `confidence p50 · 0.92`. The data looks impressive without telling the visitor what to think about it.
*Fix:* On-hover tooltips for the metric labels (1-line plain-language explanation), or a `legend mini-row` below each HUD: "lower drift = more stable model. p50 = median latency." Tiny scaffolding, big comprehension win.
*Suggested command:* `/impeccable clarify`

---

### Persona Red Flags

**Maya (Ops Engineer, primary buyer):**
- Synthetic SVG demos still register as marketing pretense (unchanged). She still can't try the product.
- "Production launch · Q4 2026" tells her this is pre-product (unchanged).
- *New positive:* the CTA is now visibly the brand color — she can find the next step without scanning.
- *New positive:* legend mismatch in CameraIngestRibbon resolved — if she opens it, it tells the truth.

**Sam (Curious Skimmer, 30s of attention):**
- Above-the-fold cleaner: eyebrow is now just `production launch · q4 2026` (was dot + Boulder + separator + launch info). One anchor instead of four.
- Hero text still uses masked reveal that takes ~1s to land — wait time non-trivial across 7 sections.
- KineticHeadline still animates from y=108% on each line — wait time compounds.
- No tooltips on metric chips — the HUDs still don't explain themselves.

**Ariel (Investor / Strategist):**
- Footer location is now factually correct (Boulder coords, not Denver's).
- Fake `Date.now().toString(36)` receipt ID is gone — the form done-state reads honest.
- LinkedIn links + bios still ground the team section.
- DeltaCta drench reads as a confident brand moment instead of pre-product hedging.

---

### Minor Observations

- **51 em dashes across source** (up 3 since previous critique; likely my own comment additions). The convention bans them; many could become commas, semicolons, or full stops. Still a dedicated pass.
- **`HeroStripe` still claims "3y · frame + event"** retention. Specific marketing copy becomes a contract; verify it survives the first sales conversation.
- **Section numbering resets** between home (`/01–/07`) and about (`/01–/03`). Either continue from `/08` on about or drop the numeric kicker on about (only 3 sections, the index is redundant).
- **`viewport.themeColor: "#0f1809"`** in `layout.tsx` bypasses the OKLCH discipline. Token it.
- **AboutTeam member photo containers use `rounded-3xl`** while panes use `rounded-2xl` — this is the deliberate "photo/form = 3xl, pane = 2xl" split, but worth documenting in any future DESIGN.md.
- **DriftTimeline H2 is `font-bold` (700)** while other section H2s via KineticHeadline are `font-semibold` (600). Intentional weight hierarchy (drift is the brand heart), but should be deliberate, not accidental — add a comment or token if it stays.
- **Two ScrollTrigger smoothing factors stack** (`scrub: 0.8` on Hero, `0.6` on Drift/Replay) on top of Lenis's `lerp: 0.085`. Compound smoothing can feel sluggish on lower-refresh-rate displays. Consider lowering one.

---

### Questions to Consider

- Now that the brand green carries the CTAs and the DeltaCta surface, is there a *third* deliberate green moment? Or is two-and-the-surface the right count?
- The "section grammar" is the next-biggest AI-tell. Could two of the six sections drop the kicker-headline-lede chrome and lead with art direction instead?
- If the synthetic SVG demos were replaced by actual product screenshots (even rough internal ones), would the page need ~30% fewer words?
- Could the WaitlistForm's "we'll be in touch *soon.*" page-end moment lose the receipt-card entirely and become a calm prose paragraph — closer to a personal note than a confirmation modal?
- The masked text reveal mechanism (now safe for descenders) is still mechanical-feeling at scale. Could 2–3 sections opt out of it and use a simpler opacity-only fade?
- What would the page look like without Lenis? Test it. If the answer is "fine," that's a real motion-budget win.
