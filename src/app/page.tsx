import Link from "next/link";
import { ViewTransition } from "react";
import { getFeaturedCaseStudies, getCaseStudies } from "@/content/case-studies";
import { career, collaboration, expertise, method, site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Figure";
import { Mark } from "@/components/ui/Mark";
import { Placeholder } from "@/components/ui/Placeholder";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Outcome } from "@/components/case/Outcome";
import { WorkIndex } from "@/components/work/WorkIndex";
import { categoryLabel, toIndexItem } from "@/lib/index-item";

/** "plain *marked* plain": the marked part gets the blue pen underline. */
function Stance({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <Mark key={i} kind="underline" delay={450}>
            {p}
          </Mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default function HomePage() {
  const featured = getFeaturedCaseStudies(4);
  const total = getCaseStudies().length;
  const [lead, ...rest] = featured;

  return (
    <>
      {/* ── The person ── */}
      <section
        aria-labelledby="hero-title"
        className="container-page grid grid-cols-1 gap-x-6 gap-y-14 pt-12 pb-20 md:pt-14 lg:grid-cols-12 lg:pb-16"
      >
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="text-display">
            {site.name}
          </h1>
          <p className="mt-8 max-w-[22ch] text-[clamp(1.5rem,1.2rem+1.3vw,2.375rem)] leading-[1.22] tracking-[-0.01em]">
            <Stance text={site.headline} />
          </p>
          <p className="mt-7 max-w-[46ch] text-muted">{site.intro}</p>
          <p className="label mt-6 font-normal text-subtle">
            {site.role} · {site.focus}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/work">See the work</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              About me
            </ButtonLink>
          </div>
        </div>

        <figure className="max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:mt-10 lg:max-w-none">
          {site.portrait ? (
            <Img
              image={site.portrait}
              priority
              sizes="(min-width: 1024px) 30vw, 26rem"
              className="aspect-[4/5] object-cover"
            />
          ) : (
            <Placeholder
              label="Your portrait"
              hint="4:5 photo · add it in src/content/site.ts"
            />
          )}
          <figcaption className="note mt-4 max-w-[30ch]">{site.pathNote}</figcaption>
        </figure>
      </section>

      {/* ── Work ── */}
      <section
        id="work"
        aria-labelledby="work-title"
        className="container-page pb-section"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-ink pt-8">
          <div>
            <h2 id="work-title" className="text-h2">
              Selected work
            </h2>
            <p className="mt-3 max-w-[48ch] text-muted">
              Problems, evidence and outcomes, including what didn&rsquo;t
              work.
            </p>
          </div>
          {total > 0 && (
            <Link href="/work" className="link font-sans text-[0.9375rem] font-medium">
              All work
            </Link>
          )}
        </div>

        {lead ? (
          <>
            <article className="group relative mt-12 grid grid-cols-1 gap-x-6 gap-y-8 lg:mt-16 lg:grid-cols-12">
              <div className="overflow-hidden border border-line lg:col-span-7">
                <ViewTransition
                  name={`cover-${lead.slug}`}
                  share="morph"
                  default="none"
                >
                  <Img
                    image={lead.cover}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="aspect-[16/10] object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.015]"
                  />
                </ViewTransition>
              </div>
              <div className="flex flex-col lg:col-span-4 lg:col-start-9">
                <p className="label tabular font-normal text-subtle">
                  {lead.year} · {lead.categories.map(categoryLabel).join(", ")}
                </p>
                <h3 className="mt-4 text-h2 transition-colors duration-200 group-hover:text-pen">
                  <Link
                    href={`/work/${lead.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {lead.title}
                  </Link>
                </h3>
                {lead.challenge.question && (
                  <p className="mt-5 text-lead">{lead.challenge.question}</p>
                )}
                <p className="mt-4 text-muted">{lead.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Outcome outcome={lead.results?.outcome} />
                  {lead.isDemo && <EvidenceBadge status="demo" />}
                </div>
                <p className="mt-8 inline-flex items-center gap-2 font-sans text-[0.9375rem] font-medium lg:mt-auto lg:pt-8">
                  Read the case study
                  <ArrowRight className="text-pen transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </p>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 hidden outline-2 outline-pen group-has-focus-visible:block"
              />
            </article>
            {rest.length > 0 && (
              <div className="mt-16">
                <WorkIndex items={rest.map(toIndexItem)} />
              </div>
            )}
          </>
        ) : (
          <p className="mt-10 text-muted">
            Case studies are being prepared and verified.
          </p>
        )}
      </section>

      {/* ── Method ── */}
      <Section
        id="method"
        title="From a hunch to a decision."
        intro="The same five steps sit underneath every case study on this site."
        className="border-t border-line"
      >
        <ol>
          {method.map((m, i) => (
            <li
              key={m.n}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-7 first:border-ink md:grid-cols-[3rem_14rem_1fr] md:gap-x-8"
            >
              <span className="label tabular pt-1.5 text-pen">{i + 1}</span>
              <h3 className="text-h3">{m.title}</h3>
              <p className="col-start-2 mt-2 max-w-prose text-muted md:col-start-3 md:mt-0">
                {m.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Expertise ── */}
      <Section
        id="expertise"
        title="Six disciplines, one way of working."
        className="border-t border-line"
      >
        <dl className="grid gap-x-12 gap-y-11 sm:grid-cols-2">
          {expertise.map((e) => (
            <div key={e.category}>
              <dt className="font-sans text-[1.125rem] font-semibold tracking-[-0.01em]">
                <Link
                  href={`/work?category=${e.category}`}
                  className="group inline-flex items-baseline gap-2 hover:text-pen"
                >
                  {e.title}
                  <ArrowRight
                    size={14}
                    className="text-pen transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                  <span className="sr-only">: related work</span>
                </Link>
              </dt>
              <dd className="mt-2 text-muted">{e.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Career ── */}
      <Section
        id="journey"
        title="Since 2011: graphic design, then QA, then UX/UI & CRO."
        className="border-t border-line"
      >
        <ol className="grid gap-y-10 border-t border-ink md:grid-cols-3">
          {career.map((c, i) => (
            <li key={c.title} className="relative pt-7 md:pr-8">
              <span
                aria-hidden="true"
                className={`absolute -top-[5px] left-0 size-2.5 border border-ink ${
                  i === career.length - 1 ? "bg-pen" : "bg-paper"
                }`}
              />
              <p className="label tabular font-normal text-subtle">{c.period}</p>
              <h3 className="mt-3 text-h3">{c.title}</h3>
              <p className="mt-3 text-muted">{c.body}</p>
              <p className="note mt-4">Gave me: {c.learned.toLowerCase()}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 font-sans text-[0.9375rem] font-medium">
          <Link href="/about" className="link">
            The full story
          </Link>
        </p>
      </Section>

      {/* ── Collaboration ── */}
      <Section
        id="collaboration"
        title="Experimentation is a team sport."
        className="border-t border-line"
      >
        <dl>
          {collaboration.map((c) => (
            <div
              key={c.partner}
              className="grid gap-1 border-t border-line py-5 first:border-ink md:grid-cols-[13rem_1fr] md:gap-8"
            >
              <dt className="font-sans font-semibold">{c.partner}</dt>
              <dd className="max-w-prose text-muted">{c.how}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Contact ── */}
      <section
        aria-labelledby="contact-title"
        className="border-t border-ink py-section"
      >
        <div className="container-page grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12">
          <h2 id="contact-title" className="max-w-[12ch] text-h1 lg:col-span-6">
            Have a problem worth testing?
          </h2>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="max-w-[40ch] text-lead text-muted">
              Open to product design, CRO and experimentation roles and
              projects.
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-8 inline-block font-sans text-h2 break-all hover:text-pen"
            >
              <Mark kind="underline" delay={200}>
                {site.contact.email}
              </Mark>
            </a>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[0.9375rem] font-medium">
              <li>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1.5"
                >
                  LinkedIn <ArrowUpRight size={13} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link href="/about#cv" className="link">
                  Download CV
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
