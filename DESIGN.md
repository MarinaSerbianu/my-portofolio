---
name: Portfolio
description: A designer's working notebook made editorial; white paper, ink, two pens and one highlighter.
colors:
  paper: "#ffffff"
  surface: "#f5f6f8"
  ink: "#15171c"
  muted: "#474c56"
  subtle: "#5c626d"
  pen: "#1d3bc4"
  strike: "#c42d19"
  highlight: "#ffe55c"
  line: "#e2e4e8"
  line-strong: "#858b96"
  grid: "#e6ebf3"
  placeholder: "#f7f8fa"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2rem + 4.6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline-lg:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2.6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.45rem + 1.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.12rem + 0.4vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1.2rem, 1.08rem + 0.55vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.12vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  ui:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.35
  note:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  metric:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.9rem + 2.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "tnum, lnum"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(5rem, 11vw, 10rem)"
  header: "4.25rem"
  container-page: "90rem"
  container-prose: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.paper}"
  button-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    padding: "0 4px"
    height: "48px"
  button-secondary-hover:
    textColor: "{colors.pen}"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.ui}"
    padding: "0 10px"
    height: "44px"
  nav-link-active:
    textColor: "{colors.ink}"
  evidence-badge:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  evidence-badge-demo:
    textColor: "{colors.strike}"
    typography: "{typography.label}"
  margin-note:
    textColor: "{colors.pen}"
    typography: "{typography.note}"
  image-slot:
    backgroundColor: "{colors.placeholder}"
    rounded: "{rounded.none}"
  hypothesis-panel:
    backgroundColor: "{colors.placeholder}"
    rounded: "{rounded.none}"
    padding: "40px 32px"
  metric-card:
    textColor: "{colors.ink}"
    typography: "{typography.metric}"
    padding: "20px 0 0"
---

# Design System: Portfolio

## Overview

**Creative North Star: "The Working Notebook"**

A designer's working notebook made editorial. The page is plain white paper with near-black ink; the person leads, and each case study reads as the record of an investigation (evidence, hypothesis, decision, outcome) with the pen marks left in. Two pens and one highlighter are the only colour on the page, and each has one job: blue annotates, red corrects, yellow certifies a verified result.

Density is calm and editorial: generous section spacing, a 12-column grid with headings hanging in a narrow left column, hairline rules that divide the work into rows like a ledger. Ornament is replaced by marks that mean something. A pen stroke drawn under, through or behind text always restates something already said in words beside it, so the marks reward the eye without carrying meaning alone.

The world is light-only by owner decision: a white background was pinned as a brand commitment and dark mode was removed on purpose (`color-scheme: light`, theme colour #ffffff). It deliberately replaced an earlier warm-cream, italic-serif, tracked-mono look.

**Key Characteristics:**
- White paper, near-black ink, graphite secondary text; light only.
- Two pens and one highlighter, each with a single job.
- Evidence carried by stroke style plus words, never by colour alone.
- Schibsted Grotesk for display and interface; Literata for reading and blue italic margin notes.
- Square corners, hairline rules, no shadows, no pills.
- Motion is a pen drawing a mark, plus one shared-element cover morph.

## Colors

A white-paper palette: ink and graphite neutrals carry everything, and three marker colours appear only where they mean something.

### Primary
- **Ink Blue Pen** (`pen`): annotations, sources, margin notes, step numbers and hypothesis keys, links on hover, the active-nav underline, the before/after divider, and the one focus ring everywhere. Also the hover state of the primary button and the solid/dashed underline of verified and directional evidence.

### Secondary
- **Correction Red** (`strike`): only for things disproved or rejected (losing test outcome, "Not supported by the test", struck failed assumptions, rejected options, the 404 strike) and the demo-data warning ring. Never decorative, never a call to action.

### Tertiary
- **Highlighter Yellow** (`highlight`): only behind verified result values in metric cards, and as the text-selection colour. Nothing else gets yellow.

### Neutral
- **White Paper** (`paper`): the page background, header background, button text on ink.
- **Cool Surface** (`surface`): the development demo banner strip and loading skeleton bars.
- **Near-Black Ink** (`ink`): body text, headings, the primary button fill, strong rules (section tops, index tops, metric-card tops), crop marks, boxes around chosen options and the hypothesis panel.
- **Graphite** (`muted`): secondary prose, intros, inactive nav.
- **Soft Graphite** (`subtle`): metadata lines, counts, placeholder hints, footer role.
- **Hairline** (`line`): row dividers, image frames, footer and header rules.
- **Strong Hairline** (`line-strong`): resting link underlines, unverified dotted underline, disabled filter text, demo metric values, timeline spine, scrollbar thumb.
- **Research Grid** (`grid`) on **Slot Paper** (`placeholder`): the faint 8px grid and its ground, used only inside image slots and the hypothesis panel.

### Named Rules
**The One Job Per Pen Rule.** Blue annotates and points (sources, links, focus); red only marks something disproved, rejected or demo; yellow only sits behind a verified result value or a text selection. If a colour is not doing its job, it is not on the page.

**The Words First Rule.** Every mark and colour restates a word already present (Verified, Losing test, Rejected, Demo data). Remove the colour and the meaning survives (WCAG 1.4.1).

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Literata (with Georgia, serif), roman and italic
**Label/Mono Font:** none; labels are Schibsted Grotesk in sentence case, numbers use tabular lining figures.

**Character:** A tight, confident grotesk sets names, headings and every interface element; a warm bookish serif carries the reading and, in blue italic, the handwritten-feeling margin notes. Headings are weight 600 with negative tracking that tightens as size grows.

### Hierarchy
- **Display** (600, clamp 3rem to 6rem, line-height 0.94, -0.04em): the person's name on the home page only.
- **Headline Large** (600, clamp 2.25rem to 4.25rem, 1.02): page titles and the closing contact question.
- **Headline** (600, clamp 1.75rem to 2.75rem, 1.08): section headings, the lead case title, the contact email.
- **Title** (600, clamp 1.2rem to 1.5rem, 1.25): index entries, findings, steps, career stages, option names.
- **Lead** (Literata 400, clamp 1.2rem to 1.625rem, 1.45): first paragraph of prose, hypothesis rows, decisions, the stance line.
- **Body** (Literata 400, clamp 1.0625rem to 1.125rem, 1.65): all reading text, capped at 66ch.
- **UI** (Schibsted 500, 0.9375rem): buttons, nav, filter, footer, inline actions.
- **Label** (Schibsted 500, 0.8125rem, 1.35, sentence case): metadata lines (year · disciplines), table and panel heads, evidence and outcome labels.
- **Note** (Literata italic, 0.9375rem, 1.45, pen blue): margin notes: sources, the portrait caption, "Gave me" lessons.
- **Metric** (Schibsted 600, clamp 2.5rem to 4rem, line-height 1, -0.04em, tabular): result values in metric cards.

### Named Rules
**The Sentence Case Rule.** Labels are small sans in sentence case. No tracked uppercase, no monospace costume, no italic display serif.

**The Margin Note Rule.** Blue italic Literata is the voice of the annotator: sources, provenance and asides only, never body copy or headings.

## Layout

A 12-column grid inside a page container (max 90rem) with fluid side gutters (`gutter`). Editorial sections hang their heading in columns 1-4 and run content in columns 6-12, stacking to one column on mobile. Vertical rhythm between sections is the fluid `section` step; the sticky header is `header` tall. Reading measure is capped at 66ch (`container-prose`); headings use balanced wrapping and paragraphs pretty wrapping.

The home first viewport puts the name, stance, discipline line and actions in columns 1-7 and a 4:5 portrait slot in columns 10-12, its top set lower than the name, with a margin note beneath. On mobile the order is name, stance, actions, portrait.

The work is an index, not a card grid: an ink rule opens the list, each project is a row (cover in 3 columns, text in 6, outcome right-aligned in 3) divided by hairlines. Case studies add a section TOC (sticky side list on desktop, horizontally scrolling tab strip on mobile). Lists of findings, steps, assumptions and collaborators are ruled rows, with the first rule in ink and the rest hairlines.

**The Ledger Rule.** Groups open with a 1px ink rule; items inside are divided by 1px hairlines. Content is organised as rows, not tiles.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth and grouping come from rules and boxes: 1px ink rules open groups, hairlines divide rows, a 1px hairline frames images, and a 2px ink border marks the single most important container in a set (the chosen option, the decision box). The faint research grid on slot paper is the only texture, and it says "this is a working surface".

**The Ruled Not Raised Rule.** Nothing floats. Emphasis is a heavier stroke, never a shadow, blur or lift.

## Shapes

Square corners throughout (0px radius): buttons, image frames, panels, filters, badges. No pills, no rounded cards. The recurring geometry is the stroke: underlines (solid, dashed, dotted), strikes, open rings, 2px pen bars under active nav and filter items, small square bullets and square timeline nodes (ink-outlined, the current one filled pen blue), and crop-mark corners (14px L-shaped ink ticks) on image placeholders.

## Components

### Buttons
Ink and paper, decisive and plain.
- **Shape:** square (0px), min height 48px.
- **Primary:** ink fill, paper text, UI type, 24px horizontal padding, trailing 16px arrow icon.
- **Hover / Focus:** fill shifts to pen blue over 200ms; the arrow nudges 4px right with the expo-out ease; focus is the global 2px pen outline at 3px offset.
- **Secondary:** a text link with a 1px strong-hairline underline at 0.4em offset; on hover text and underline turn pen blue. External links use an up-right arrow and announce "opens in a new tab".

### Chips (filter)
- **Style:** not chips: plain UI-type words with a small tabular count, no background or border.
- **State:** inactive graphite, hover ink, pressed ink with a 2px pen bar drawn under it (scale-x from the left, 300ms expo-out); disabled in strong hairline. Single-select, synced to the URL.

### Cards / Containers
- **Corner Style:** square.
- **Background:** paper; slots and the hypothesis panel use the research grid.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline frames on covers and unselected options; 1px ink around the hypothesis panel and before/after; 2px ink for the chosen option and the decision box.
- **Internal Padding:** 20-36px for boxed panels; index rows use 28-36px vertical padding with no box.

### Navigation
- **Style:** sticky hairline header on paper; name in Schibsted 600 at 1.0625rem with the role in soft graphite beside it on large screens.
- **States:** links are UI type in graphite, ink on hover; the current page is ink with a 2px pen bar under it. Touch targets are at least 44px tall.
- **Mobile:** the same three links (Work, About, Contact) stay inline; the role line hides.

### Evidence Badge (signature)
Evidence state by stroke, always with its word: **Verified** ink with a solid 2px pen underline; **Directional** ink with a dashed pen underline; **Unverified** graphite with a dotted strong-hairline underline; **Demo data** in correction red with a 12px open ring. Outcomes reuse the grammar: winning test solid pen, losing test red underline, inconclusive dashed pen.

### Pen Mark (signature)
Inline marks drawn left to right across wrapped lines, once, when the text scrolls into view: pen underline, dashed pen underline, red strike through the middle, and a yellow highlighter band behind the lower part of the glyphs. On a hypothesis the "Then" clause is underlined when supported, struck when not, dashed when inconclusive; failed assumptions and rejected options are struck; the stance sentence and contact email carry one blue underline.

### Image Slot (signature)
A placeholder with real text: research grid on slot paper, ink crop marks at the four corners, and a label plus soft-graphite hint at bottom left, exposed to assistive tech as "Image placeholder: …".

### Metric Card
An ink top rule, a large tabular value (highlighted only when verified; demo values in strong hairline with a screen-reader disclaimer), the label beneath, then the evidence badge, the source as a margin note, and optional confidence and note lines. A metric never appears without its status and source.

### Motion
Two gestures only. **Ink draw:** a background-size reveal from 0% to 100% over 900ms (highlighter 700ms) on the expo-out curve, triggered once by an IntersectionObserver with an optional stagger delay. **Cover morph:** a shared-element view transition (480ms, expo-out) from an index cover to the case cover, with a 220ms cross-fade for other route changes. Small affordances (arrow nudge, cover scale 1.015-1.03 on hover, nav bars) use the same curve. Under reduced motion every mark is drawn instantly and view transitions are off.

## Do's and Don'ts

### Do:
- **Do** keep the page white (#ffffff) and light-only; colour is limited to the two pens and the highlighter.
- **Do** state every evidence state and outcome in words, and let the stroke repeat it: solid verified, dashed directional, dotted unverified, open ring demo, red strike disproved.
- **Do** reserve highlighter yellow for verified result values (and text selection), and correction red for disproved, rejected or demo.
- **Do** use the blue pen for sources, annotations, links on hover and the single 2px focus ring.
- **Do** draw marks once, on scroll into view, with the expo-out curve, and draw them instantly under reduced motion.
- **Do** organise content as ruled rows: an ink rule to open, hairlines between.
- **Do** keep image slots honest: research grid, crop marks and a written note of what belongs there.

### Don't:
- **Don't** add eyebrow or kicker labels above headings, numbered section eyebrows, or tracked uppercase labels.
- **Don't** round corners, use pills, or add shadows, blurs or lifts.
- **Don't** use red or yellow decoratively, or blue for anything that is not an annotation, link, active state or focus.
- **Don't** add a dark mode or tint the paper (no cream, no warm off-white).
- **Don't** let anything float, bounce or fade in by default; motion is a pen drawing or the cover morph.
- **Don't** add taped paper, sticky notes or decorative scribbles; every mark means something.
- **Don't** lay the work out as a hero followed by an equal card grid.
