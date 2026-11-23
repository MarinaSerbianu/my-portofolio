/**
 * Person, career and contact content.
 *
 * ⚠️  Anything marked PLACEHOLDER must be replaced before launch.
 * `npm run check:content` lists every remaining placeholder and fails
 * production deploys (VERCEL_ENV=production) while any remain.
 */

export const PLACEHOLDER = "⟨placeholder⟩";

export const site = {
  name: "Your Name", // PLACEHOLDER
  role: "UX/UI & Product Designer",
  focus: "CRO · Experimentation · Research · QA",
  location: "Germany", // PLACEHOLDER — confirm or remove
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "UX/UI & Product Designer specialising in conversion optimisation, experimentation, research and QA — making product decisions with evidence, and publishing what didn’t work too.",

  contact: {
    email: "hello@example.com", // PLACEHOLDER
    linkedin: "https://www.linkedin.com/in/your-handle", // PLACEHOLDER
    /** Set to undefined to hide GitHub everywhere */
    github: undefined as string | undefined,
    cv: "/cv.pdf", // PLACEHOLDER — add public/cv.pdf
  },

  /**
   * Homepage stance: one sentence under the name. The part between *…* gets
   * the blue pen underline.
   */
  headline: "I design product experiences, then *test whether they work.*",
  intro:
    "From research and hypothesis to shipped variant and honest readout. My background in graphic design and QA means I care about both the pixel and the edge case.",
  /** Margin note beside the portrait. Keep it factual. */
  pathNote: "Graphic design since 2011, then QA, now UX/UI & CRO.",

  /**
   * PLACEHOLDER: add your portrait to /public (e.g. /portrait.jpg, 4:5) and
   * describe it here. Until then the site shows a marked image slot.
   */
  portrait: undefined as
    | { src: string; alt: string; width: number; height: number }
    | undefined,
} as const;

export const method = [
  {
    n: "01",
    title: "Find the problem",
    body: "Funnel data, session recordings, support tickets and heuristics — triangulated before anything is designed.",
  },
  {
    n: "02",
    title: "State a hypothesis",
    body: "If we change X for audience Y, metric Z moves, because of evidence E. Written down before the first wireframe.",
  },
  {
    n: "03",
    title: "Design the smallest test",
    body: "Explore options, then pick the variant that isolates the idea — not the one that changes everything at once.",
  },
  {
    n: "04",
    title: "Run it properly",
    body: "Sample size, runtime, guardrail metrics and QA across devices before traffic is split.",
  },
  {
    n: "05",
    title: "Learn — including from losses",
    body: "Ship, iterate or kill. Failed tests are documented with the same care as wins.",
  },
] as const;

export const expertise = [
  {
    category: "ux-ui",
    title: "UX/UI Design",
    body: "Interfaces for complex purchase journeys — product pages, configurators, checkout.",
  },
  {
    category: "cro",
    title: "CRO & Experimentation",
    body: "Hypothesis-driven A/B testing, from test design and QA to statistical readout.",
  },
  {
    category: "research",
    title: "UX Research",
    body: "Usability testing, surveys, analytics deep-dives and behavioural analysis.",
  },
  {
    category: "ecommerce",
    title: "E-commerce",
    body: "Discovery, merchandising, trust and pricing presentation for online retail.",
  },
  {
    category: "design-systems",
    title: "Design Systems",
    body: "Components and tokens that keep experiments fast and production consistent.",
  },
  {
    category: "dev-qa",
    title: "Development & QA",
    body: "Front-end understanding and a QA background — I catch the edge case before users do.",
  },
] as const;

/**
 * Career journey. Years after 2011 are PLACEHOLDERS — fill in real dates.
 * Keep entries factual; don't add employers you don't want public.
 */
export const career = [
  {
    period: "2011 – ⟨year⟩", // PLACEHOLDER
    title: "Graphic Design",
    body: "Where it started: typography, layout, visual hierarchy and production discipline.",
    learned: "Craft and visual communication",
  },
  {
    period: "⟨year⟩ – ⟨year⟩", // PLACEHOLDER
    title: "Quality Assurance",
    body: "Testing products end to end taught me how real systems break — and how users get stuck.",
    learned: "Systems thinking and rigour",
  },
  {
    period: "⟨year⟩ – today", // PLACEHOLDER
    title: "UX/UI & CRO",
    body: "Combining both: designing experiences and proving whether they work through research and experimentation.",
    learned: "Evidence-based product decisions",
  },
] as const;

export const collaboration = [
  {
    partner: "Product management",
    how: "Shared roadmap of hypotheses, prioritised by impact, confidence and effort.",
  },
  {
    partner: "Engineering",
    how: "Specs with states and edge cases; I QA variants myself before launch.",
  },
  {
    partner: "Data & analytics",
    how: "Agree on metrics, sample size and guardrails before a test starts — not after.",
  },
  {
    partner: "Marketing & content",
    how: "Copy and messaging tests grounded in customer language from research.",
  },
  {
    partner: "Stakeholders & leadership",
    how: "Readouts that lead with the decision, show the uncertainty and include the losses.",
  },
] as const;

export const principles = [
  { title: "Evidence over opinion", body: "Including my own." },
  {
    title: "Publish the losses",
    body: "A failed test that taught us something is a result.",
  },
  {
    title: "Small, isolated changes",
    body: "So we know what actually caused the effect.",
  },
  {
    title: "QA is design",
    body: "An experience that breaks on one device isn’t finished.",
  },
] as const;

/** PLACEHOLDER — replace with the tools and methods you actually use. */
export const toolkit = {
  Design: ["Figma", "⟨tool⟩"],
  "Research & analytics": ["⟨tool⟩", "⟨tool⟩"],
  Experimentation: ["⟨tool⟩"],
  "Development & QA": ["HTML / CSS", "⟨tool⟩"],
  Methods: [
    "Usability testing",
    "Heuristic evaluation",
    "Funnel analysis",
    "A/B & multivariate testing",
    "Cross-browser QA",
  ],
} as const;
