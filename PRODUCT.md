# Product

## Register

brand

## Users

The marketing site speaks to operators and CV teams running real-world camera deployments at scale — dock and cold-storage facilities, logistics hubs, industrial yards, retail entrances, perimeter and gate monitoring. The reader is someone currently stitching together RTSP captures, a self-hosted inference worker, a Slack webhook for alerts, and no drift detection at all. They have been burned by a model that worked in the demo and then degraded silently in production.

Three roles tend to overlap with the buyer the site needs to convert:

1. **The operator** who runs the camera network and gets paged when something is wrong.
2. **The CV engineer** who tuned the model and now needs to debug why it's behaving differently in production.
3. **The business owner** who needs to trust the count, the alert, the report — and has no way to verify it today.

They arrive skeptical. They've read landing pages full of "AI-powered" filler before. The site has to read like it was made by someone who has actually been on call at 2am with a fogged lens.

## Product Purpose

`upstream-web` is the marketing surface for Upstream — the reliability layer for production computer vision. Most platforms help teams launch CV workflows. Upstream helps teams trust, debug, and improve those workflows once they are running in the real world.

The site's job is to:

1. State the wedge clearly: *live computer vision, kept honest. Drift detected before it costs you.*
2. Demonstrate that wedge through working interfaces on the page (HeroStream, CameraIngestRibbon, InferenceLens, RuleComposer, DriftTimeline, ReplayScrubber, FieldReports) — not describe it.
3. Filter the right inbound: the waitlist's gate is *"bring your worst camera"* — we are not selling to teams with clean lab footage.
4. Establish the founders and the production-launch arc (Q4 2026) without overclaiming what ships today.

Success looks like a skeptical operator landing, scrolling, and saying *"these people have been on my side of the problem."*

## Brand Personality

**Three words: honest, operator-empathetic, expert-quiet.**

- **Voice**: a senior engineer describing a system they actually built. Specific, technical when needed, never marketing-speak. No "AI-powered." No "transform your business." No "unlock." No exclamation marks.
- **Tone**: confident but never bragging. The site assumes the reader has been burned before and is allergic to inflated claims. When in doubt, it shows the artifact (a stream, a finding, a rule) and lets the reader draw the conclusion.
- **Emotional goals**: calm gravity, not hype. The reader should feel they've arrived somewhere that takes the problem seriously — closer to a long-form magazine feature about infrastructure than a SaaS hero stack.
- **Visual register**: river/creek/stream is the through-metaphor (the product *is* an upstream system; the brand makes that literal). Earth-toned greens and mossy gold, frosted glass at depth, scroll-pinned moments that earn their pause.

## Anti-references

The site must not resemble:

- **SaaS-cream startup template** — pastel gradients, friendly blob illustrations, hero-metric template (huge number + tiny label), identical card grids of features.
- **Dark-blue observability cliché** — navy/teal Datadog-Grafana-Splunk lookalike. We are infrastructure-adjacent but the palette must not converge on the "serious infra" default.
- **Crypto neon-on-black** — cyberpunk gradients, glitch effects, magenta/cyan accents.
- **Generic AI workflow tool** — gradient hero, "AI for X" headline, "transform your workflow" copy, feature cards stamped from a template.
- **Glassmorphism-as-decoration** — glass is core to the brand, but every surface a blur card is the cliché. Glass is used purposefully against the dark-creek base, not as confetti.

When a design choice could plausibly belong on any of the above, rework until it couldn't.

## Design Principles

1. **Practice what you preach.** The site is the proof. If we claim reliability, the page must run at 60fps with no broken states, no janky scroll, no loading flash. A reliability product whose own marketing site stutters fails the test before the reader reads a word.
2. **Show, don't tell.** Working demo > prose describing the demo. HeroStream, DriftTimeline, RuleComposer should feel like live product surfaces stolen from the dashboard, not illustrations. The reader should be able to point at a moment on screen and say *"that's what they mean."*
3. **Honest about shipped vs. roadmap.** Per `docs/product-overview.md` §18, only claim what's shipped. The reliability layer is a vision arc; the site can narrate the arc without promising stages 3–6. No accuracy numbers without ground-truth labels.
4. **Editorial rhythm over landing-page beats.** Long-form pacing with kicker numbering (`01 — ingest`, `02 — inference`...), scroll-pinned moments, generous whitespace. Closer to a magazine feature than a hero-features-CTA stack.
5. **The river metaphor is load-bearing, not decorative.** Upstream is literally an upstream system in the camera pipeline. The visual language (creek greens, glass at depth, flow imagery) should reinforce the product idea, not just look pretty next to it.

## Accessibility & Inclusion

**Target: WCAG 2.1 AA.**

- Contrast: body ink (`#f5f1e7`) on base (`#0f1809`) clears AA at all body sizes. Verify any creek-green-on-dark combination meets 4.5:1 for body, 3:1 for large text. The accent green (`#5fb869`) is for emphasis and decoration, not for body text on the dark base.
- Motion: `prefers-reduced-motion` is honored (already wired in `globals.css` and via Framer Motion's `useReducedMotion`). Scroll-pinned sections must degrade to static layouts; no information lives only in animation.
- Keyboard: every interactive element (waitlist form, magnetic CTAs, nav links) reachable and operable by keyboard. Focus rings already styled via `:focus-visible` in `globals.css` — preserve, don't suppress.
- Semantics: real headings (`h1`/`h2`/`h3`), real landmarks (`<main>`, `<nav>`, `<footer>`), real form labels on the waitlist.
- Reader context: many operators are on glare-prone screens in industrial settings. Avoid combinations that fall apart under high ambient light or low contrast displays.
