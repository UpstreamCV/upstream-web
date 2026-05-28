---
name: Upstream
description: The reliability layer for production computer vision — marketing site visual system.
colors:
  creek-deep:     "#344C2C"
  creek-mid:      "#4B816C"
  creek-moss:     "#81764B"
  signal-bright:  "#5FB869"
  signal-amber:   "#E8C06B"
  ink:            "#F5F1E7"
  ink-soft:       "#B0AC9F"
  ink-mute:       "#7E7B71"
  base:           "#0F1809"
  base-deep:      "#060A03"
  base-panel:     "#1A2613"
  glass-stroke:   "#262C20"
typography:
  display:
    fontFamily: "Satoshi Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Satoshi Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Satoshi Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
  gutter: "clamp(20px, 5vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.base}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-bright}"
    textColor: "{colors.base-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-ghost-hover:
    backgroundColor: "{colors.glass-stroke}"
    textColor: "{colors.ink}"
  glass-pane:
    backgroundColor: "{colors.base-panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  eyebrow-label:
    textColor: "{colors.ink-mute}"
    typography: "{typography.label}"
    padding: "0"
  waitlist-input:
    backgroundColor: "{colors.base-panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
    typography: "{typography.body}"
---

# Design System: Upstream

## 1. Overview

**Creative North Star: "The Confluence"**

Three streams of equal weight, meeting. The Upstream brand makes the river metaphor literal — the product *is* an upstream system in the camera pipeline, and the visual language reinforces that idea instead of decorating around it. Deep creek green, mid-creek teal-green, and streambank mossy gold sit at equal weight across the surface; no single hue dominates. They are joined by a warm reed-cream ink on a near-black riverbed base, with frosted glass providing depth at every interactive layer.

The system rejects four reflex aesthetics common to AI infrastructure marketing: the SaaS-cream startup template, the dark-blue Datadog/Grafana observability cliché, crypto neon-on-black, and the generic "AI for X" workflow tool with a gradient hero and feature-card grid. Upstream sits in a quieter, earthier, more editorial lane — closer to a long-form magazine feature about industrial systems than a hero-features-CTA stack.

Glass is core, not decorative. Surfaces stack with 22–28px backdrop blur at saturation 140%, sitting against the dark riverbed so the green primaries glow through from behind. Motion is restrained but choreographed at key moments: scroll-pinned hero stream, drift timeline, replay scrubber. Kicker numbering (`01 — ingest`, `02 — inference`) carries the editorial rhythm.

**Key Characteristics:**
- Three equal earth-toned primaries on a near-black base; no hero accent.
- Frosted glass at depth — 22–28px blur, 140% saturation, stacked over a radial-glow background.
- Satoshi Variable for display and body; JetBrains Mono for kickers, eyebrows, IDs, timestamps.
- Kicker numbering, generous gutters (clamp(20px, 5vw, 64px)), editorial pacing.
- Scroll-pinned moments instead of carousel-of-features.
- `prefers-reduced-motion` is honored; nothing critical lives only in animation.

## 2. Colors: The Confluence Palette

A river photographed at golden hour: deep, mid, and bank water at equal billing, with reed-cream highlights and a near-black bed.

### Primary

The three primaries are equal — no hierarchy, no dominant hero color. Each carries a third of the surface where chromatic weight is needed.

- **Deep Creek** (`#344C2C`): The riverbed at depth. Used for filled surfaces that should read as solid green — section backdrops where contrast against the base is needed, accent borders, ribbon backgrounds.
- **River Mid** (`#4B816C`): The moving water itself, slightly cooler than Deep Creek. Used for glass-tinted strokes, mid-elevation panels, hover treatments on glass cards, and as a join between Deep Creek and Mossy Gold.
- **Streambank Moss** (`#81764B`): Silt and sun along the banks — a warm gold-green that prevents the palette from going monochrome. Used for highlights on data layers (drift timeline accent ticks, snapshot frames, signal callouts), and as the warmer of three primaries in long-form ribbons.

### Secondary

- **Signal Bright** (`#5FB869`): Reserved for italicized emphasis in display headlines (the `<em>` accent) and for state cues that must read clearly against the base. Treat as a **signal**, not a primary — ≤10% of any screen. Never used as a section fill.
- **Signal Amber** (`#E8C06B`): Reserved for at-risk / needs-review states on demo surfaces. Never used for chrome or body text.

### Neutral

- **Reed Cream** (`#F5F1E7`): Body ink. Warm off-white, never `#FFF`. Clears AA on every primary and on the base.
- **Reed Cream / Soft** (`rgba(245, 241, 231, 0.70)`): Secondary body text, captions, kicker copy.
- **Reed Cream / Mute** (`rgba(245, 241, 231, 0.50)`): Eyebrows, supporting labels, metadata.
- **Reed Cream / Faint** (`rgba(245, 241, 231, 0.22)`): Hairlines, ghost borders, separators.
- **Riverbed Base** (`#0F1809`): Primary page background. Always with a fixed radial-glow overlay (River Mid + Streambank Moss at low chroma).
- **Riverbed Deep** (`#060A03`): Lowest layer — used behind glass panels to make the blur read.
- **Riverbed Panel** (`#1A2613`): Mid-elevation panel fill when a glass treatment is too soft for the content.

### Named Rules

**The Equal Confluence Rule.** Deep Creek, River Mid, and Streambank Moss carry equal billing across the system. No one of them is the brand color. If a screen leans on a single green and ignores the other two, redesign the surface so all three appear, even in small doses.

**The One-Tenth Signal Rule.** Signal Bright (`#5FB869`) is allowed only as italicized emphasis in display text or as a state cue. It is never section fill, never button fill, never link color. If it covers more than 10% of the visible viewport, it is misused.

**The No-Pure-Black Rule.** `#000` is forbidden. The Riverbed base is tinted toward Deep Creek (chroma > 0). The same applies to text: never `#FFF`. Always Reed Cream.

**The Product-Quote Exception.** Brand chrome never uses pure `#FFF`. The single exception is the `.dn-tile` surface inside `.dn-demo` panels: those tiles intentionally quote the actual `upstream-dashboard/dashboard-next` light theme so that when a reader scrolls into a dashboard-embedded section, the page reads as *you have stepped into the product*. The white is doing show-don't-tell work; it is not an aesthetic choice. The exception is bounded: `.dn-tile` only. The dark brand surface around the tiles never uses `#FFF`, and tile-internal text uses Riverbed (`#0F1809`) values via `--dn-text`, not pure `#000`.

## 3. Typography

**Display Font:** Satoshi Variable (with ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif fallbacks)
**Body Font:** Satoshi (same fallbacks)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace fallbacks)

**Character:** Satoshi carries the editorial confidence — geometric but warm, with italic forms that take Signal Bright for emphasis. JetBrains Mono carries the operator-engineer voice — kickers, IDs, timestamps, status strings. Together they read as *senior engineer writing a long-form piece in a respected journal*.

### Hierarchy

- **Display** (Satoshi 500, `clamp(2.75rem, 7vw, 6rem)`, line-height 1.02, letter-spacing -0.025em): Hero headline, About hero, section overture text. Italicized spans take Signal Bright via `.display em` / `.italic-accent`.
- **Headline** (Satoshi 500, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height 1.12, letter-spacing -0.02em): Section openers (`InferenceLens`, `DriftTimeline`, `RuleComposer`).
- **Title** (Satoshi 500, 1.25rem, line-height 1.3, letter-spacing -0.01em): Card titles, sub-section headers, named-step labels in ribbons.
- **Body** (Satoshi 400, 1.0625rem, line-height 1.55): Long-form paragraphs. Capped at 65–75ch via `max-width: 65ch` on the prose containers.
- **Label / Eyebrow** (JetBrains Mono 500, 0.6875rem / 11px, letter-spacing 0.22em, uppercase): Section kickers (`01 — ingest`), data labels, timestamps, IDs.

### Named Rules

**The Italic-as-Accent Rule.** The only place Signal Bright appears in text is the italic span inside display headlines (`.display em`, `.italic-accent`). It is never used as regular text color. The italic *is* the accent.

**The Kicker Number Rule.** Every major section opens with a mono kicker numbered in two-digit form (`01 — ingest`, `02 — inference`, `03 — rules`). The numbering is editorial pacing; it counts the story, not the features.

**The 65ch Body Rule.** Body prose is capped at 65–75 characters per line. Glass panels with body text inside must enforce this even if the panel itself is wider — pad inward or constrain the prose column.

## 4. Elevation

The system is **glass-dominant**: depth is communicated by frosted layers stacking against the dark riverbed, not by drop shadows. Shadows exist only as a soft inset highlight (1px white at 6% opacity) on glass tops, and as a deep ambient shadow (-30px y, 60% spread, 60% black) under elevated panels to anchor them.

The radial-gradient background fixed on `body` creates a subtle creek glow — River Mid at 10% and Signal Bright at 7%, at opposite corners — that gives every glass panel something to refract.

### Shadow Vocabulary

- **Soft inset** (`box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 30px 60px -30px rgba(0, 0, 0, 0.6)`): Standard glass pane. Highlight on top, ambient lift below.
- **Deep ambient** (`box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.85), 0 1px 0 rgba(255, 255, 255, 0.04) inset`): Lifted panels — hero card, replay scrubber pinned moment.

### Glass Recipes

- **Primary glass** (`.glass-pane`): `background: rgba(245, 241, 231, 0.06); border: 1px solid rgba(245, 241, 231, 0.14); backdrop-filter: blur(22px) saturate(140%);` Most surfaces.
- **Quieter glass** (`.glass-pane-2`): `background: rgba(245, 241, 231, 0.04); border: 1px solid rgba(245, 241, 231, 0.08); backdrop-filter: blur(14px) saturate(130%);` Nested surfaces, secondary panels.

### Named Rules

**The No-Black-Shadow Rule.** Shadows are always paired with a 1px inset white highlight at 4–6% opacity. A shadow without a highlight reads as a 2014 drop-shadow card; a shadow with a highlight reads as glass catching light.

**The Glass-Has-Something-To-Refract Rule.** Glass panels must sit over a textured surface — the radial creek glow on body, or a deeper panel underneath. Glass on a flat color is wasted blur.

## 5. Components

### Buttons

- **Shape:** Pill (`border-radius: 9999px`). No square buttons.
- **Primary:** Reed Cream fill (`#F5F1E7`) with Riverbed (`#0F1809`) label; 14px / 28px padding; label uses JetBrains Mono 11px, letter-spacing 0.22em, uppercase. Used for the single primary CTA per section (waitlist, "Join", "Bring your worst camera").
- **Hover / Focus:** Background transitions to Signal Bright (`#5FB869`) with Riverbed Deep label; magnetic translation (3px / 3px range) via Framer Motion on pointer-near. Focus uses the global `:focus-visible` ring (1px Reed Cream at 60% opacity, 3px offset).
- **Ghost:** Transparent fill, Reed Cream label, no border. Hover fills with Glass Stroke (`#262C20`). Used for nav links and secondary actions.

### Eyebrows / Kicker Labels

- **Style:** JetBrains Mono 11px, letter-spacing 0.22em, uppercase, Reed Cream / Mute. Numbered (`01 — `) for major sections.
- **Spacing:** Always sits one `--space-md` (20px) above the section headline.

### Glass Panels (Cards / Containers)

- **Corner Style:** `--rounded-lg` (20px). Hero variants and About sections may step up to `--rounded-xl` (32px).
- **Background:** `.glass-pane` recipe (Reed Cream at 6% opacity, 22px blur).
- **Border:** 1px Reed Cream at 14% opacity. Never a colored stroke.
- **Shadow Strategy:** Soft inset (see Elevation).
- **Internal Padding:** `--space-lg` (32px) at desktop; collapses to `--space-md` (20px) on mobile.

### Inputs / Waitlist Field

- **Style:** Riverbed Panel fill (`#1A2613`), Reed Cream text, `--rounded-md` (12px), 14px / 18px padding.
- **Focus:** Border transitions from glass-stroke (`#262C20`) to River Mid (`#4B816C`) at full opacity; subtle inner glow (River Mid at 10%).
- **Error:** Border shifts to Signal Amber (`#E8C06B`); helper text appears below at Reed Cream / Soft.

### Navigation

- **Style:** Fixed top, glass-pane-2 backdrop, Reed Cream links in Satoshi 400, 0.95rem. No underline; hover lifts opacity to 100% from 70%. Logo lockup on the left, "Join waitlist" pill CTA on the right.
- **Active state:** Mono dot indicator (River Mid) appears below the active link.
- **Mobile:** Collapses to a hamburger that opens a full-bleed glass overlay with the same link list at 1.5rem.

### Signature: The Hero Stream

Hero is not a static image — it's a glass-encased "live" video panel with a mocked stream overlay (kicker `LIVE — sess_<hex>`, FPS badge, snapshot frame). The panel uses Deep ambient shadow, glass-pane background, and a faint River Mid border. Scroll-pinned for the first viewport so the reader can see the "stream" before any text. This is *Show, don't tell* in literal form.

### Signature: Drift Timeline

Horizontal scrubber across the section width. Each tick is a glass-pane-2 dot with a mono timestamp below; ticks shift from River Mid → Streambank Moss → Signal Amber as drift severity grows. The "now" cursor is a Reed Cream vertical line. Scrolling the section advances the scrubber via ScrollTrigger.

## 6. Do's and Don'ts

### Do:

- **Do** treat Deep Creek (`#344C2C`), River Mid (`#4B816C`), and Streambank Moss (`#81764B`) as equal primaries. Every major section should let at least two of the three breathe somewhere on screen.
- **Do** use Signal Bright (`#5FB869`) for italic emphasis in display headlines (`<em>` / `.italic-accent`) and for nothing else.
- **Do** stack glass over a textured surface — the body's radial creek glow, or a Riverbed Panel underneath.
- **Do** open every major section with a mono kicker number (`01 — `, `02 — `).
- **Do** cap body prose at 65–75ch even when the surrounding glass panel is wider.
- **Do** honor `prefers-reduced-motion` — scroll-pinned sections must degrade to static layouts.
- **Do** pair every shadow with a 1px inset white highlight at 4–6% opacity.

### Don't:

- **Don't** make one green dominant. The Equal Confluence Rule: no hero color.
- **Don't** use Signal Bright as a button fill, link color, or section background. ≤10% of any viewport, italic emphasis only.
- **Don't** use `#000` or `#FFF`. Riverbed and Reed Cream only.
- **Don't** reach for the **SaaS-cream startup template** — pastel gradients, friendly blob illustrations, hero-metric template (huge number + tiny label), identical card grids of features. Anti-reference from PRODUCT.md.
- **Don't** drift into the **dark-blue observability cliché** — navy/teal Datadog-Grafana-Splunk lookalike. If the palette starts looking like blue infra, the river is gone.
- **Don't** reach for **crypto neon-on-black** — cyberpunk gradients, glitch effects, magenta/cyan accents. Anti-reference from PRODUCT.md.
- **Don't** generate the **generic AI workflow tool** — gradient hero, "AI for X" headline, "transform your workflow" copy, feature cards stamped from a template. Anti-reference from PRODUCT.md.
- **Don't** use **glass as decoration**. Every glass surface must have a reason — content lives on it, or it sits between two elevations. Glass on a flat color, used "for vibes," is the cliché.
- **Don't** add **side-stripe borders** (`border-left > 1px` as a colored accent). Use full borders, background tints, or numbered kickers instead.
- **Don't** use **gradient text** (`background-clip: text` on a gradient). Single solid color; emphasis via weight or italic accent.
- **Don't** animate CSS layout properties. Use transform / opacity. GSAP and Framer Motion are already wired — use them.
- **Don't** open a modal as a first thought. Inline / progressive disclosure first; modals only when the affordance truly requires it.
- **Don't** write copy with em dashes — commas, colons, semicolons, periods, or parentheses only. (PRODUCT.md voice rule.)
- **Don't** claim accuracy numbers (precision, recall, FP/FN rate) on the site. Without ground-truth labels, we don't have them. Reliability risk, quality signals, status language only.
