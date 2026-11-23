# Evidence-based UX/Product Design Portfolio

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion · Zod.

This portfolio presents case studies as **evidence → hypothesis → design → experiment → result → learning**.
Every metric carries an evidence status and a source, and failed assumptions are part of the template.

- Architecture, information architecture and visual system: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- QA checklist: [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md)
- Deployment: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Setup

```bash
npm install
npm run dev            # http://localhost:3000 — shows demo content + labels
```

Node 20.9+ is required (developed on Node 24).

## Scripts

| Script                  | What it does                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Dev server. Shows demo content and unverified metrics, all labelled |
| `npm run build`         | Production build: **no demo, no unverified metrics**. Runs `check:content` afterwards |
| `npm run build:preview` | Production build *with* demo + unverified metrics (for previews/tests) |
| `npm run check:content` | Scans build output for leaked internal strings and lists placeholders |
| `npm run test:e2e`      | Playwright: axe WCAG 2.2 AA, overflow at 320/768/1440/1920, keyboard checks |
| `npm run qa`            | typecheck → lint → preview build → content check → e2e              |

On first use, run `npx playwright install chromium`.

## Project structure

```
content/case-studies/*.json   Case studies (one file each; "_"-prefixed files are ignored)
public/                       Images (put project images in public/work/<slug>/), cv.pdf
src/content/schema.ts         Zod content contract — the build fails on invalid content
src/content/policy.ts         What may appear in a build (demo / unverified)
src/content/case-studies.ts   Load → validate → strip confidential fields → sort
src/content/site.ts           Name, contact, career, method, toolkit  ← edit me
src/components/ui/            Section, Reveal, Button, EvidenceBadge, Figure, icons
src/components/case/          CaseCard, MetricCard, CountUp, BeforeAfter, Disclosure, CaseToc, blocks
src/components/work/          WorkFilter
src/app/                      Routes: / · /work · /work/[slug] · /about · /contact + OG, sitemap, robots
scripts/check-content.mjs     Leak and placeholder guard
tests/site.spec.ts            E2E and accessibility tests
```

## Adding a real case study

1. Export JSON from the research workflow into `content/case-studies/<slug>.json`.
   [`demo-delivery-promise.json`](content/case-studies/demo-delivery-promise.json) shows every field;
   the authoritative contract is [`src/content/schema.ts`](src/content/schema.ts).
2. For **every metric**, set `value`, `unit`, `evidenceStatus`, `source.label` and `publicVisibility`.
   - `source.label` is public ("VWO, 21-day A/B test, mobile").
   - `source.ref` is internal (dashboard URL or ticket) and is **always stripped**.
   - Only set `publicVisibility: true` after NDA or stakeholder clearance.
3. Put anything confidential in `internalNotes`. It's never rendered, and `check:content` verifies it isn't in the build.
4. Put images in `public/work/<slug>/` with real `alt` text and the correct `width`/`height`.
5. Optional sections (research, hypothesis, before/after, experiment, results…) can be omitted.
   The template renders only what's present and renumbers the sections.
6. Run `npm run qa`.

### Evidence status

| Status        | Meaning                                         | Production |
| ------------- | ----------------------------------------------- | ---------- |
| `verified`    | Checked against the source of truth             | Shown      |
| `directional` | Real but not conclusive (e.g. not significant)  | Shown, labelled |
| `unverified`  | Not yet checked                                 | Hidden     |
| `demo`        | Placeholder                                     | Hidden     |

The UI never derives, rounds or invents numbers. It displays `value` at the configured `precision`.

## Before launch

Run `npm run check:content -- --strict --skip-leaks`. It lists every placeholder still left in `src/content/site.ts`
(name, email, LinkedIn, career years, toolkit). Then add `public/cv.pdf` and delete the demo case study.
Production deploys on Vercel fail while placeholders remain.
