import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Only production deployments are indexable.
  const indexable =
    process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
