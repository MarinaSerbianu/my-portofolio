# Architecture & Visual System

This document covers Phase 1 (architecture) and Phase 2 (visual system) of the
portfolio build. Read it before you add pages or content.

---

## 1. Positioning

The site doesn't present a gallery of outputs. It shows **how decisions get made**:

> Problem → Evidence → Hypothesis → Design → Experiment → Result → Learning

Each page answers one of three questions:

| Visitor question                  | Where it's answered                          |
| --------------------------------- | -------------------------------------------- |
| "What kind of designer is this?"  | Home hero, expertise, working method         |
| "Can I trust the claims?"         | Evidence labels on every metric, failed tests |
| "How would they work with us?"    | Collaboration, ownership, About, Contact     |

---

## 2. Information architecture

```
/                       Home
├── Hero — positioning in one sentence + method strip
├── Selected work — up to 3 featured case studies
├── Expertise — 6 disciplines (= the Work filter categories)
├── Method — 5 numbered steps, evidence → learning
├── Career journey — 2011 → Graphic Design → QA → UX/UI & CRO
├── Collaboration — who I work with, what I own
└── Contact CTA — email + LinkedIn

/work                   Work index
├── Filter (single-select, URL-synced ?category=)
│   All · UX/UI · CRO & Experimentation · UX Research ·
│   E-commerce · Design Systems · Development & QA
└── Project list (all visible, never paginated or carousel'd)

/work/[slug]            Case study (template, sections render only if present)
├── 00 Hero — title, summary, meta (role, timeframe, team, type), cover
├── 01 Context & role
├── 02 Business challenge
├── 03 Research evidence — findings with evidence type + source label
├── 04 Hypothesis — If / Then / Because, expandable rationale
├── 05 Design exploration — options considered, why rejected
├── 06 Before / after — keyboard-accessible comparison slider
├── 07 Experiment — setup table + expandable details
├── 08 Results — metrics with evidence status + decision
├── 09 Failed assumptions — what we believed vs. what happened
├── 10 Iterations
├── 11 Lessons learned
├── 12 Collaboration & ownership
└── Prev / next project

/about                  Career since 2011, cross-functional experience,
                        tools & methods, principles, CV download
/contact                Email, LinkedIn, GitHub (optional)
```

Navigation stays flat: **Work · About · Contact** plus the name/home link.
There's no mega menu and no hidden drawer on desktop. On mobile the three
links stay inline because they fit at 320px.

---

## 3. Content & evidence model

The site reads structured case studies. In development these are hand-written
JSON. In production they come from the Claude research workflow, which
exports JSON in the same shape.

```
content/case-studies/*.json   ← one file per project (research workflow output)
src/content/schema.ts         ← Zod schema = the contract with the workflow
src/content/policy.ts         ← what is allowed into the public build
src/content/case-studies.ts   ← loads, validates, sanitises, sorts
src/content/site.ts           ← person, career, contact (hand-edited)
```

### Metric contract

Every metric must have these fields, and the build fails if one is missing:

| Field              | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| `value` + `unit`   | The number. Never derived or rounded up by the UI.    |
| `evidenceStatus`   | `verified` · `directional` · `unverified` · `demo`    |
| `source.label`     | Public description, e.g. "VWO, 21-day A/B test"       |
| `source.ref`       | Internal pointer (dashboard URL, ticket). **Stripped.** |
| `publicVisibility` | `true` only after NDA / stakeholder sign-off.         |

### Public-build policy (`src/content/policy.ts`)

| Status        | Development             | Production (default)           |
| ------------- | ----------------------- | ------------------------------ |
| `verified`    | shown                   | shown, with source label       |
| `directional` | shown, labelled         | shown, labelled "Directional"  |
| `unverified`  | shown, labelled         | **hidden**                     |
| `demo`        | shown, loudly labelled  | **hidden** (whole case study)  |
| `publicVisibility: false` | hidden      | hidden                         |

`internalNotes`, `source.ref` and research `ref` fields are removed in
`toPublic()` before any data reaches a component. Client components only
ever receive the sanitised object. `npm run check:content` also scans the
production output for leaked internal strings.

---

## 4. Visual system

### Principles
1. **Typography carries the design.** Imagery supports, it doesn't decorate.
2. **A Swiss 12-column grid.** Content hangs from consistent column lines, and
   section numbers sit in the margin column.
3. **Warm neutrals with one accent.** The accent marks *evidence and
   action*: focus rings, verified markers, active filter, links on hover.
4. **Borders, not shadows.** Hairline rules separate sections, the way an
   editorial publication does.

### Colour tokens

| Token          | Light     | Dark      | Use                         | Contrast on bg |
| -------------- | --------- | --------- | --------------------------- | -------------- |
| `--paper`      | `#F4F1EA` | `#121110` | Page background             | –              |
| `--surface`    | `#FBFAF6` | `#1B1A18` | Cards, panels               | –              |
| `--ink`        | `#151412` | `#F1EDE5` | Primary text                | 16.3 / 16.2    |
| `--muted`      | `#5F5A51` | `#ADA698` | Secondary text              | 6.1 / 7.8      |
| `--subtle`     | `#6B655C` | `#8F887C` | Meta labels                 | ≥4.9 / 5.4     |
| `--accent`     | `#B23A12` | `#F07A4A` | Vermilion — the one accent  | 5.3 / 6.8      |
| `--line`       | `#D6D0C4` | `#34312C` | Hairlines (decorative)      | –              |
| `--line-strong`| `#8F887C` | `#6E685F` | Control borders (≥3:1)      | 3.1 / 3.4      |

Evidence states use **shape + text**, never colour alone: ● verified,
◐ directional, ○ unverified, ◇ demo.

### Type
- **Geist Sans**: UI and body text. Display weights are tracked tight.
- **Instrument Serif** (italic): editorial emphasis inside headings, used sparingly.
- **Geist Mono**: section numbers, metadata, evidence labels and metrics.

A fluid scale built on `clamp()`, from 320px to 1920px:

| Token        | Min → Max        | Use                  |
| ------------ | ---------------- | -------------------- |
| `display`    | 2.75 → 7.5rem    | Home hero            |
| `h1`         | 2.25 → 5rem      | Page / case title    |
| `h2`         | 1.75 → 3rem      | Section titles       |
| `h3`         | 1.25 → 1.625rem  | Sub-sections         |
| `lead`       | 1.125 → 1.5rem   | Intro paragraphs     |
| `body`       | 1 → 1.0625rem    | Running text, max 68ch |
| `meta`       | 0.75 → 0.8125rem | Mono labels, uppercase |

### Space & grid
- Spacing is on a 4px base. Section rhythm is `clamp(4rem, 10vw, 9rem)`.
- Gutter is `clamp(1rem, 4vw, 3rem)`, so it's 16px at 320px.
- Max content width is 1440px, and text measure is capped at 68ch.

### Motion
| Interaction            | Duration | Purpose                                |
| ---------------------- | -------- | -------------------------------------- |
| Route transition       | 220ms    | Cross-fade that keeps your place       |
| Card → case hero       | 400ms    | Shared-element morph for continuity    |
| Section reveal         | 500ms    | 16px rise + fade, once only            |
| Metric count-up        | 1.2s     | Draws the eye to the number            |
| Disclosure             | 250ms    | Height + fade                          |

With `prefers-reduced-motion: reduce`, every motion above becomes an instant
state change. Content is never conditional on animation.
