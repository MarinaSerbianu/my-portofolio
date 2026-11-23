import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/content/schema";
import { Outcome, type OutcomeKind } from "@/components/case/Outcome";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";

export type IndexItem = {
  slug: string;
  title: string;
  question?: string;
  summary: string;
  year: number;
  disciplines: string[];
  outcome?: OutcomeKind;
  isDemo: boolean;
  cover: ImageAsset;
};

/** The work as an index of investigations: one row per project. */
export function WorkIndex({
  items,
  headingLevel = "h3",
}: {
  items: IndexItem[];
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <ol className="border-t border-ink">
      {items.map((it) => (
        <li key={it.slug} className="border-b border-line">
          <article className="group relative grid grid-cols-1 gap-x-6 gap-y-4 py-7 md:grid-cols-12 md:py-9">
            <div className="overflow-hidden border border-line md:col-span-3">
              <Image
                src={it.cover.src}
                alt=""
                width={it.cover.width}
                height={it.cover.height}
                sizes="(min-width: 768px) 22vw, 100vw"
                unoptimized={it.cover.src.endsWith(".svg")}
                className="aspect-[16/10] h-auto w-full bg-placeholder object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </div>
            <div className="md:col-span-6">
              <p className="label tabular font-normal text-subtle">
                {it.year} · {it.disciplines.join(", ")}
              </p>
              <H className="mt-2 text-h3 transition-colors duration-200 group-hover:text-pen">
                <Link
                  href={`/work/${it.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {it.title}
                </Link>
              </H>
              <p className="mt-2 max-w-[60ch] text-muted">
                {it.question ?? it.summary}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-3 md:flex-col md:items-end md:pt-1 md:text-right">
              <Outcome outcome={it.outcome} />
              {it.isDemo && <EvidenceBadge status="demo" />}
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-3 inset-y-1 hidden outline-2 outline-pen group-has-focus-visible:block"
            />
          </article>
        </li>
      ))}
    </ol>
  );
}
