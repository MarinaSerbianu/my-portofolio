import type { PublicCaseStudy } from "@/content/case-studies";
import { CATEGORIES } from "@/content/schema";
import type { IndexItem } from "@/components/work/WorkIndex";

export const categoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export function toIndexItem(cs: PublicCaseStudy): IndexItem {
  return {
    slug: cs.slug,
    title: cs.title,
    question: cs.challenge.question,
    summary: cs.summary,
    year: cs.year,
    disciplines: cs.categories.map(categoryLabel),
    outcome: cs.results?.outcome,
    isDemo: cs.isDemo,
    cover: cs.cover,
  };
}
