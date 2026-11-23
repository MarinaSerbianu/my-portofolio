import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/work", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
  }));
  const cases = getCaseStudies()
    .filter((c) => !c.isDemo)
    .map((c) => ({ url: `${base}/work/${c.slug}` }));
  return [...pages, ...cases];
}
