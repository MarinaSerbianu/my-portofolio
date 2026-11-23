# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, in priority order where they conflict:

1. **In-house hiring managers** (design and product leads) assessing whether this designer can own UX/UI and experimentation work on a team. They read case studies in depth and look for judgement, process and honesty about results.
2. **Recruiters** screening quickly, often on mobile, for role fit, focus areas and years of experience. They need the positioning, career path and contact within seconds.
3. **Freelance / agency clients** looking to hire for a CRO or UX project. They want proof of outcomes, the kind of problems handled, and how collaboration works.

## Product Purpose

A personal portfolio for a UX/UI & Product Designer specialising in CRO, experimentation, research and QA. It presents work as a decision trail: problem → evidence → hypothesis → design → experiment → result → learning. Success means a visitor understands the kind of designer this is, trusts the claims, and gets in touch (email or LinkedIn) or downloads the CV.

## Positioning

Evidence-based design with honest readouts: every metric carries an evidence status and a public source, and failed tests are published with the same care as wins. The career path (graphic design since 2011 → QA → UX/UI & CRO) means caring about both the pixel and the edge case.

## Operating Context

- Visitors arrive from LinkedIn, job applications, recruiter outreach and direct referrals; recruiters often skim on a phone.
- Case studies are exported as JSON from a research workflow into `content/case-studies/`, validated by the Zod schema in `src/content/schema.ts`.
- Person, career, method and contact content is edited by hand in `src/content/site.ts`.

## Capabilities and Constraints

- Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, Motion, Zod. Deployed on Vercel.
- Routes: `/`, `/work` (filterable by category), `/work/[slug]` (case study template whose sections render only when present), `/about`, `/contact`.
- Evidence statuses: `verified`, `directional`, `unverified`, `demo`. Production hides `unverified` and `demo`; the UI never derives, rounds or invents numbers.
- Confidential fields (`internalNotes`, `source.ref`) are stripped before render; `npm run check:content` guards against leaks and blocks production deploys while placeholders remain.
- Quality bar already in the repo: WCAG 2.2 AA (axe), no overflow at 320/768/1440/1920, keyboard checks (`npm run qa`).

## Brand Commitments

Binding wishes from the owner, to be honoured by the visual design:

- **White background** with a small number of colour accents.
- **Human, hand-made feel**: must not read as AI-generated or templated.
- **Image placeholders**: real text, with clearly marked image slots (project imagery, portrait) that the owner fills in later.

## Evidence on Hand

- **3 or more NDA-cleared case studies** available for launch; not yet in the repo. Only `content/case-studies/demo-delivery-promise.json` (demo) exists today.
- Images go in `public/work/<slug>/`; currently only demo SVGs in `public/demo/`.
- Still placeholder in `src/content/site.ts`: name, email, LinkedIn, location, career years after 2011, most toolkit entries. `public/cv.pdf` is missing.
- No testimonials, client logos or press. Do not invent any.

## Product Principles

1. **Evidence over opinion.** Every claim traces to a source; uncertainty is shown, not hidden.
2. **Publish the losses.** Failed assumptions are first-class content, not footnotes.
3. **Fast to scan, deep to read.** A recruiter gets the fit in seconds; a hiring manager can follow the full reasoning.
4. **The work leads.** The interface stays out of the way of the case studies.
5. **QA is design.** Every page holds up on every device, keyboard and screen reader.

## Accessibility & Inclusion

WCAG 2.2 AA, enforced by the Playwright + axe suite. Evidence states use shape and text, never colour alone. Reduced-motion users get instant state changes; no content depends on animation.
