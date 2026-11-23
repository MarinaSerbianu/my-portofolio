import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

export function SiteFooter() {
  const { contact } = site;
  const links = [
    { label: "LinkedIn", href: contact.linkedin },
    ...(contact.github ? [{ label: "GitHub", href: contact.github }] : []),
  ];
  return (
    <footer className="border-t border-line font-sans">
      <div className="container-page flex flex-col gap-6 py-10 text-[0.9375rem] md:flex-row md:items-baseline md:justify-between">
        <p>
          <span className="font-semibold">{site.name}</span>
          <span className="text-subtle"> · {site.role}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${contact.email}`} className="link">
              {contact.email}
            </a>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1"
              >
                {l.label}
                <ArrowUpRight size={12} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <Link href="/about#cv" className="link">
              CV
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
