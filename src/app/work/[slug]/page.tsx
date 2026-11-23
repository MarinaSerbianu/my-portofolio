import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";
import {
  getAdjacent,
  getCaseStudies,
  getCaseStudy,
} from "@/content/case-studies";
import { CATEGORIES } from "@/content/schema";
import { Img } from "@/components/ui/Figure";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";
import { ArrowRight } from "@/components/ui/icons";
import { Outcome } from "@/components/case/Outcome";
import { BeforeAfter } from "@/components/case/BeforeAfter";
import { CaseToc, type TocItem } from "@/components/case/CaseToc";
import {
  CaseSection,
  Collaboration,
  Experiment,
  Exploration,
  FailedAssumptions,
  Hypothesis,
  Iterations,
  Lessons,
  Prose,
  Research,
  Results,
} from "@/components/case/blocks";

export function generateStaticParams() {
  const all = getCaseStudies();
  // Cache Components needs at least one sample param; an unknown slug 404s.
  return all.length
    ? all.map((c) => ({ slug: c.slug }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: { title: cs.title, description: cs.summary, type: "article" },
    robots: cs.isDemo ? { index: false, follow: false } : undefined,
  };
}

type Block = {
  id: string;
  label: string;
  title: string;
  body: ReactNode;
};

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { prev, next } = getAdjacent(slug);

  // Only sections with content are rendered — and numbered — so partial
  // real-world case studies still read cleanly.
  const blocks: (Block | false | undefined)[] = [
    {
      id: "context",
      label: "Context",
      title: "Context and my role",
      body: <Prose paragraphs={cs.context.body} lead />,
    },
    {
      id: "challenge",
      label: "Challenge",
      title: cs.challenge.question ?? "The business challenge",
      body: <Prose paragraphs={cs.challenge.body} />,
    },
    cs.research && {
      id: "research",
      label: "Research",
      title: "What the evidence said",
      body: <Research research={cs.research} />,
    },
    cs.hypothesis && {
      id: "hypothesis",
      label: "Hypothesis",
      title: "What we believed — written down first",
      body: (
        <Hypothesis
          hypothesis={cs.hypothesis}
          outcome={cs.results?.outcome}
        />
      ),
    },
    cs.exploration && {
      id: "exploration",
      label: "Exploration",
      title: "Options considered",
      body: <Exploration exploration={cs.exploration} />,
    },
    cs.beforeAfter && {
      id: "before-after",
      label: "Before / after",
      title: "Control and variant",
      body: <BeforeAfter {...cs.beforeAfter} />,
    },
    cs.experiment && {
      id: "experiment",
      label: "Experiment",
      title: "How it was tested",
      body: <Experiment experiment={cs.experiment} />,
    },
    cs.results && {
      id: "results",
      label: "Results",
      title: "What happened",
      body: <Results results={cs.results} />,
    },
    cs.failedAssumptions.length > 0 && {
      id: "failed-assumptions",
      label: "Failed assumptions",
      title: "What we got wrong",
      body: <FailedAssumptions items={cs.failedAssumptions} />,
    },
    cs.iterations.length > 0 && {
      id: "iterations",
      label: "Iterations",
      title: "How it evolved",
      body: <Iterations items={cs.iterations} />,
    },
    cs.lessons.length > 0 && {
      id: "lessons",
      label: "Lessons",
      title: "What I’d carry forward",
      body: <Lessons items={cs.lessons} />,
    },
    cs.collaboration && {
      id: "collaboration",
      label: "Collaboration",
      title: "Who did what",
      body: <Collaboration collaboration={cs.collaboration} team={cs.team} />,
    },
  ];
  const sections = blocks.filter((b): b is Block => Boolean(b));
  const toc: TocItem[] = sections.map((s, i) => ({
    id: s.id,
    n: String(i + 1),
    label: s.label,
  }));

  const meta: [string, string][] = [
    ["Year", String(cs.year)],
    ["Client", cs.client],
    ["Role", cs.role],
    ["Timeframe", cs.timeframe],
    ...(cs.team.length ? [["Team", cs.team.join(", ")] as [string, string]] : []),
  ];
  const disciplines = cs.categories
    .map((c) => CATEGORIES.find((x) => x.id === c)?.label)
    .join(", ");

  return (
    <article>
      {/* Entry header: the notebook margin holds the facts, the page holds the story */}
      <header className="container-page grid grid-cols-1 gap-x-6 pt-10 pb-14 md:pt-16 lg:grid-cols-12 lg:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="font-sans text-[0.9375rem] lg:col-span-12"
        >
          <ol className="flex gap-2 text-subtle">
            <li>
              <Link href="/work" className="link">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate">
              {disciplines}
            </li>
          </ol>
        </nav>

        <div className="mt-10 lg:col-span-8 lg:col-start-5 lg:row-start-2 lg:mt-14">
          {cs.isDemo && (
            <p
              role="note"
              className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 border border-dashed border-strike px-4 py-3 font-sans text-[0.9375rem]"
            >
              <EvidenceBadge status="demo" />
              This is a template demo. Story, images and numbers are
              placeholders, not a real project or real results.
            </p>
          )}
          <h1 className="max-w-[20ch] text-h1">{cs.title}</h1>
          <p className="mt-7 max-w-[54ch] text-lead text-muted">{cs.summary}</p>
          {cs.results && (
            <p className="mt-7 font-sans text-[0.9375rem]">
              <span className="font-semibold">Outcome: </span>
              <Outcome outcome={cs.results.outcome} className="text-[0.9375rem]" />
            </p>
          )}
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-ink pt-6 sm:grid-cols-2 lg:col-span-3 lg:row-start-2 lg:mt-14 lg:grid-cols-1 lg:self-start">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-0.5 font-sans text-[0.9375rem]">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-page">
        <figure className="overflow-hidden border border-line">
          <ViewTransition
            name={`cover-${cs.slug}`}
            share="morph"
            default="none"
          >
            <Img
              image={cs.cover}
              priority
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="aspect-[16/10] object-cover"
            />
          </ViewTransition>
        </figure>
      </div>

      {/* Body: sticky section list in the margin, entries on the page */}
      <div className="sticky top-header z-30 mt-14 lg:hidden">
        <CaseToc items={toc} variant="strip" />
      </div>
      <div className="container-page grid gap-x-6 lg:mt-20 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2.5rem)] pt-24">
            <CaseToc items={toc} variant="list" />
          </div>
        </aside>
        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {sections.map((s) => (
            <CaseSection key={s.id} id={s.id} title={s.title}>
              {s.body}
            </CaseSection>
          ))}
        </div>
      </div>

      {/* Adjacent projects */}
      {next && prev && next.slug !== slug && (
        <nav
          aria-label="More case studies"
          className="mt-8 border-t border-ink"
        >
          <div className="container-page grid md:grid-cols-2">
            {[
              { label: "Previous", cs: prev },
              { label: "Next", cs: next },
            ].map(({ label, cs: c }) => (
              <Link
                key={label}
                href={`/work/${c.slug}`}
                className="group py-10 md:odd:pr-10 md:even:border-l md:even:border-line md:even:pl-10"
              >
                <span className="label text-subtle">{label} case study</span>
                <span className="mt-3 flex items-start justify-between gap-4 font-sans text-h3 font-semibold group-hover:text-pen">
                  {c.title}
                  <ArrowRight className="mt-2 shrink-0 text-pen transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      <div className="container-page border-t border-line py-12">
        <Link href="/work" className="link font-sans text-[0.9375rem] font-medium">
          All work
        </Link>
      </div>
    </article>
  );
}
