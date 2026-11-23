import type { Metadata } from "next";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";
import { Mark } from "@/components/ui/Mark";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about UX/UI, CRO and experimentation work.`,
};

export default function ContactPage() {
  const { contact } = site;
  const channels = [
    {
      label: "LinkedIn",
      value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.linkedin,
      note: "Professional background and recommendations",
    },
    ...(contact.github
      ? [
          {
            label: "GitHub",
            value: contact.github.replace(/^https?:\/\/(www\.)?/, ""),
            href: contact.github,
            note: "Prototypes and front-end experiments",
          },
        ]
      : []),
  ];

  return (
    <div className="container-page grid grid-cols-1 gap-x-6 gap-y-14 pt-14 pb-section md:pt-24 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h1 className="max-w-[14ch] text-h1">
          Let&rsquo;s talk about your funnel.
        </h1>
        <p className="mt-8 max-w-[44ch] text-lead text-muted">
          Open to conversations about product design, CRO and experimentation
          roles and projects.
        </p>
      </div>

      <div className="lg:col-span-6 lg:pt-2">
        <p className="label text-subtle">Email, best for project enquiries</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-3 inline-block font-sans text-h2 font-semibold break-all hover:text-pen"
        >
          <Mark kind="underline" delay={300}>
            {contact.email}
          </Mark>
        </a>

        <ul className="mt-14">
          {channels.map((c) => (
            <li key={c.label} className="border-t border-line first:border-ink">
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 py-6 font-sans sm:grid-cols-[7rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-[0.9375rem] font-semibold">{c.label}</span>
                <span className="min-w-0">
                  <span className="block break-all text-h3 group-hover:text-pen">
                    {c.value}
                  </span>
                  <span className="note mt-1 block">{c.note}</span>
                </span>
                <ArrowUpRight className="hidden shrink-0 text-pen transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
