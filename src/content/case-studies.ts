import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { CaseStudy, type CaseStudyFull, type CategoryId } from "./schema";
import { isStatusAllowed, policy } from "./policy";

const DIR = path.join(process.cwd(), "content", "case-studies");

/**
 * Read + validate at module scope: deterministic, so it is part of the
 * static shell under Cache Components. Invalid JSON fails the build loudly.
 */
function loadAll(): CaseStudyFull[] {
  const files = readdirSync(DIR).filter(
    (f) => f.endsWith(".json") && !f.startsWith("_"),
  );
  return files.map((file) => {
    const raw = JSON.parse(readFileSync(path.join(DIR, file), "utf8"));
    const parsed = CaseStudy.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid case study "${file}":\n` +
          parsed.error.issues
            .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
            .join("\n"),
      );
    }
    return parsed.data;
  });
}

/** Strip everything that must never reach the browser. */
function toPublic(cs: CaseStudyFull) {
  const { internalNotes: _internal, ...rest } = cs;
  void _internal;
  return {
    ...rest,
    research: rest.research && {
      ...rest.research,
      findings: rest.research.findings.map((f) => ({
        ...f,
        source: { label: f.source.label },
      })),
    },
    results: rest.results && {
      ...rest.results,
      metrics: rest.results.metrics
        .filter((m) => m.publicVisibility && isStatusAllowed(m.evidenceStatus))
        .map(({ source, ...m }) => ({ ...m, source: { label: source.label } })),
    },
  };
}

export type PublicCaseStudy = ReturnType<typeof toPublic>;
export type PublicMetric = NonNullable<
  PublicCaseStudy["results"]
>["metrics"][number];

const all: PublicCaseStudy[] = loadAll()
  .filter((cs) => (cs.isDemo ? policy.showDemo : true))
  .map(toPublic)
  .sort((a, b) => a.order - b.order || b.year - a.year);

export function getCaseStudies(category?: CategoryId) {
  return category ? all.filter((c) => c.categories.includes(category)) : all;
}

export function getFeaturedCaseStudies(limit = 3) {
  const featured = all.filter((c) => c.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getCaseStudy(slug: string) {
  return all.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = all.findIndex((c) => c.slug === slug);
  if (i === -1 || all.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}
