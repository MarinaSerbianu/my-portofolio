import { z } from "zod";

/**
 * Content contract between the Claude research workflow and the site.
 * Every case study JSON in /content/case-studies is validated against this
 * schema at build time — invalid content fails the build.
 */

export const CATEGORIES = [
  { id: "ux-ui", label: "UX/UI" },
  { id: "cro", label: "CRO & Experimentation" },
  { id: "research", label: "UX Research" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "design-systems", label: "Design Systems" },
  { id: "dev-qa", label: "Development & QA" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
const categoryIds = CATEGORIES.map((c) => c.id) as [
  CategoryId,
  ...CategoryId[],
];

/**
 * verified    – validated against the source of truth (e.g. significant A/B result)
 * directional – real data, but not conclusive (small sample, not significant)
 * unverified  – reported but not yet checked against a source
 * demo        – placeholder for development only. Never real.
 */
export const EvidenceStatus = z.enum([
  "verified",
  "directional",
  "unverified",
  "demo",
]);
export type EvidenceStatus = z.infer<typeof EvidenceStatus>;

const Source = z.object({
  /** Public, human-readable description. Shown on the site. */
  label: z.string().min(1),
  /** Internal pointer (dashboard URL, ticket ID). Stripped from public build. */
  ref: z.string().optional(),
});

export const Metric = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  /** "%", "pp", "×", "s", "€", or a word such as "sessions" */
  unit: z.string(),
  /** Decimal places to display. The UI never rounds beyond this. */
  precision: z.number().int().min(0).max(3).default(0),
  /** Whether the value should be prefixed with + / − */
  signed: z.boolean().default(false),
  direction: z.enum(["positive", "negative", "neutral"]).default("neutral"),
  evidenceStatus: EvidenceStatus,
  source: Source,
  publicVisibility: z.boolean(),
  /** e.g. "95% CI: +1.2 to +6.1pp, n = 48,210 sessions" */
  confidence: z.string().optional(),
  note: z.string().optional(),
});
export type Metric = z.infer<typeof Metric>;

const Image = z.object({
  src: z.string(),
  alt: z.string().min(1, "Every image needs alt text"),
  width: z.number().int(),
  height: z.number().int(),
  caption: z.string().optional(),
});
export type ImageAsset = z.infer<typeof Image>;

const Paragraphs = z.array(z.string()).min(1);

export const CaseStudy = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  /** One-sentence outcome-oriented summary for cards and meta description */
  summary: z.string(),
  /** Client or anonymised descriptor, e.g. "European photo-gift retailer" */
  client: z.string(),
  year: z.number().int(),
  order: z.number().int().default(100),
  featured: z.boolean().default(false),
  /** Demo content is excluded from production builds by default */
  isDemo: z.boolean().default(false),
  categories: z.array(z.enum(categoryIds)).min(1),
  role: z.string(),
  timeframe: z.string(),
  team: z.array(z.string()).default([]),
  cover: Image,

  context: z.object({ body: Paragraphs }),
  challenge: z.object({
    body: Paragraphs,
    /** The business question in one line */
    question: z.string().optional(),
  }),
  research: z
    .object({
      methods: z.array(z.string()),
      findings: z.array(
        z.object({
          title: z.string(),
          detail: z.string(),
          evidenceType: z.enum([
            "quantitative",
            "qualitative",
            "heuristic",
            "technical",
          ]),
          source: Source,
        }),
      ),
    })
    .optional(),
  hypothesis: z
    .object({
      if: z.string(),
      then: z.string(),
      because: z.string(),
      rationale: z.array(z.string()).default([]),
    })
    .optional(),
  exploration: z
    .object({
      body: Paragraphs,
      options: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
            decision: z.enum(["chosen", "rejected", "parked"]),
            reason: z.string(),
          }),
        )
        .default([]),
      images: z.array(Image).default([]),
    })
    .optional(),
  beforeAfter: z
    .object({
      before: Image,
      after: Image,
      caption: z.string().optional(),
    })
    .optional(),
  experiment: z
    .object({
      type: z.string(),
      platform: z.string().optional(),
      duration: z.string(),
      audience: z.string(),
      split: z.string().optional(),
      primaryMetric: z.string(),
      secondaryMetrics: z.array(z.string()).default([]),
      guardrails: z.array(z.string()).default([]),
      details: z.array(z.string()).default([]),
    })
    .optional(),
  results: z
    .object({
      summary: z.string(),
      outcome: z.enum(["win", "loss", "inconclusive", "shipped-without-test"]),
      metrics: z.array(Metric).default([]),
      decision: z.string(),
    })
    .optional(),
  failedAssumptions: z
    .array(
      z.object({
        assumption: z.string(),
        reality: z.string(),
        evidence: z.string().optional(),
      }),
    )
    .default([]),
  iterations: z
    .array(
      z.object({ label: z.string(), change: z.string(), outcome: z.string() }),
    )
    .default([]),
  lessons: z.array(z.string()).default([]),
  collaboration: z
    .object({
      ownership: z.array(z.string()),
      partners: z
        .array(z.object({ role: z.string(), contribution: z.string() }))
        .default([]),
    })
    .optional(),

  /** Confidential research notes. NEVER rendered; stripped by toPublic(). */
  internalNotes: z.unknown().optional(),
});

export type CaseStudyInput = z.input<typeof CaseStudy>;
export type CaseStudyFull = z.infer<typeof CaseStudy>;
