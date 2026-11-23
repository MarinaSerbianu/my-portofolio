import { site } from "@/content/site";
import { ogCard, ogSize } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: site.focus,
    title: site.headline.replace(/\*/g, ""),
    footer: `${site.name} · ${site.role}`,
  });
}
