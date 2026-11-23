import type { Metadata } from "next";
import { getCaseStudies } from "@/content/case-studies";
import { CATEGORIES } from "@/content/schema";
import { Mark } from "@/components/ui/Mark";
import { WorkFilter } from "@/components/work/WorkFilter";
import { toIndexItem } from "@/lib/index-item";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in UX/UI, CRO & experimentation, research, e-commerce, design systems and QA.",
};

export default function WorkPage() {
  const all = getCaseStudies();
  const categories = CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    count: all.filter((cs) => cs.categories.includes(c.id)).length,
  }));

  return (
    <div className="container-page pt-14 pb-section md:pt-24">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
        <h1 className="max-w-[16ch] text-h1 lg:col-span-7">
          Case studies, including{" "}
          <Mark kind="underline" delay={400}>
            the tests that lost.
          </Mark>
        </h1>
        <p className="max-w-[44ch] text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
          Each project follows the same arc: evidence, hypothesis, design,
          experiment, result and what I learned. Every metric carries its
          evidence status and source.
        </p>
      </div>

      <div className="mt-16 md:mt-20">
        {all.length ? (
          <WorkFilter
            categories={categories}
            items={all.map((cs) => ({
              ...toIndexItem(cs),
              categoryIds: cs.categories,
            }))}
          />
        ) : (
          <p className="text-muted">
            Case studies are being prepared and verified. Please check back
            soon.
          </p>
        )}
      </div>
    </div>
  );
}
