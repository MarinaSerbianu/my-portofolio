import { getCaseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  const all = getCaseStudies();
  return all.length
    ? all.map((c) => ({ slug: c.slug }))
    : [{ slug: "__none__" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return ogCard({
    kicker: cs
      ? `Case study · ${cs.year}${cs.isDemo ? " · DEMO" : ""}`
      : "Case study",
    title: cs?.title ?? site.name,
    footer: `${site.name} · ${site.role}`,
  });
}
