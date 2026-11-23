# QA Checklist

Items marked **[auto]** are covered by `npm run qa` (typecheck, lint, content guard, Playwright and axe).
The rest need a person to check them.

## Content integrity
- [ ] [auto] Every case study validates against the schema (the build fails otherwise)
- [ ] [auto] No `internalNotes`, `source.ref` or non-public metric appears in the build output
- [ ] [auto] Demo case study is labelled and `noindex`, and absent from `npm run build`
- [ ] Every published metric was checked against its source by a person
- [ ] `publicVisibility: true` only where NDA and stakeholders allow it
- [ ] No placeholder text (`npm run check:content -- --strict --skip-leaks` passes)
- [ ] Each case study includes at least one failed assumption or limitation
- [ ] Client names and screenshots are cleared or anonymised

## Accessibility (WCAG 2.2 AA)
- [ ] [auto] axe: zero violations on all pages at 320 / 768 / 1440 / 1920px
- [ ] [auto] Exactly one `h1` per page; skip link works
- [ ] [auto] Work filter, before/after slider and disclosures are operable by keyboard
- [ ] Tab through every page: the order is logical and focus is always visible, never hidden under the sticky header
- [ ] VoiceOver (macOS/iOS) and NVDA: metrics read as value, label, evidence status and source
- [ ] Zoom to 200% and 400% (reflow): no loss of content or horizontal scroll
- [ ] Turn on `prefers-reduced-motion`: no count-up, no slide, transitions are instant
- [ ] Windows High Contrast / forced colours: focus and controls are still visible
- [ ] Every image has meaningful alt text (Zod rejects empty alt)

## Responsive
- [ ] [auto] No horizontal overflow at 320, 768, 1440 and 1920px
- [ ] Real devices: iPhone SE, a recent iPhone, Android mid-range, iPad, and a large desktop
- [ ] Long titles and German compound words don't break the layout
- [ ] Case study section strip (mobile) scrolls and highlights the current section

## Performance (Core Web Vitals)
- [ ] Lighthouse (mobile) ≥ 95 for Performance, Accessibility, Best Practices and SEO
- [ ] LCP < 2.5s: the hero H1 and case cover aren't animated; the case cover uses `priority`
- [ ] CLS < 0.1: every image has width/height, and fonts use `next/font`
- [ ] INP < 200ms: the filter and slider stay responsive on a mid-range Android
- [ ] Raster project images are ≤ 2400px wide; next/image serves AVIF/WebP

## SEO and sharing
- [ ] [auto] OG image is generated for the site and each case study
- [ ] `NEXT_PUBLIC_SITE_URL` is set, so canonical/OG URLs are absolute and correct
- [ ] Share a case study URL in LinkedIn Post Inspector and Slack, and check the preview
- [ ] `sitemap.xml` lists only real case studies; `robots.txt` blocks previews

## Cross-browser
- [ ] Chrome, Safari (macOS + iOS), Firefox, Edge
- [ ] View transitions animate in Chromium and Safari, and degrade to an instant swap elsewhere
