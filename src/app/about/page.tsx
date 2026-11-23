import type { Metadata } from "next";
import {
  career,
  collaboration,
  principles,
  site,
  toolkit,
} from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "About",
  description: `From graphic design to QA to UX/UI and CRO: ${site.name}'s career since 2011.`,
};

export default function AboutPage() {
  return (
    <>
      <header className="container-page grid grid-cols-1 gap-x-6 gap-y-14 pt-14 pb-section md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="max-w-[15ch] text-h1">
            A designer who learned to{" "}
            <Mark kind="underline" delay={400}>
              break things
            </Mark>{" "}
            first.
          </h1>
          <p className="mt-8 max-w-[52ch] text-lead text-muted">
            I started in graphic design in 2011, moved into quality assurance,
            and now work as a UX/UI and product designer focused on conversion,
            experimentation and research. Each step added something the next
            one needed.
          </p>
        </div>
        <figure className="max-w-[30rem] lg:col-span-4 lg:col-start-9 lg:mt-16 lg:max-w-none">
          <Placeholder
            label="A working photo"
            hint="3:2 · at a workshop, whiteboard or desk"
            ratio="3 / 2"
          />
          <figcaption className="note mt-4">
            A picture of you at work says more than a headshot here.
          </figcaption>
        </figure>
      </header>

      <Section
        id="career"
        title="Three disciplines, one through-line."
        className="border-t border-line"
      >
        <ol className="relative ml-1 border-l border-ink">
          {career.map((c, i) => (
            <li key={c.title} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden="true"
                className={`absolute top-2 -left-[5.5px] size-2.5 border border-ink ${
                  i === career.length - 1 ? "bg-pen" : "bg-paper"
                }`}
              />
              <p className="label tabular font-normal text-subtle">{c.period}</p>
              <h3 className="mt-2 text-h2">{c.title}</h3>
              <p className="mt-4 max-w-prose text-muted">{c.body}</p>
              <p className="note mt-4">What it gave me: {c.learned.toLowerCase()}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="cross-functional"
        title="Who I work with, and how."
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

      <Section id="toolkit" title="Toolkit" className="border-t border-line">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {Object.entries(toolkit).map(([group, items]) => (
            <div key={group} className="border-t border-ink pt-4">
              <dt className="font-sans font-semibold">{group}</dt>
              <dd>
                <ul className="mt-3 space-y-1 text-muted">
                  {items.map((t, i) => (
                    <li key={`${t}-${i}`}>{t}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="principles"
        title="What I hold myself to."
        className="border-t border-line"
      >
        <ol>
          {principles.map((p) => (
            <li
              key={p.title}
              className="grid gap-1 border-t border-line py-6 first:border-ink md:grid-cols-[17rem_1fr] md:gap-8"
            >
              <h3 className="text-h3">{p.title}</h3>
              <p className="text-muted md:pt-1">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="cv"
        title="The one-page version."
        className="border-t border-line"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href={site.contact.cv} download>
            Download CV (PDF)
          </ButtonLink>
          <ButtonLink href={site.contact.linkedin} variant="secondary" external>
            LinkedIn
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
