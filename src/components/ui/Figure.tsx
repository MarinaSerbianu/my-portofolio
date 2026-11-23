import Image from "next/image";
import type { ImageAsset } from "@/content/schema";
import { cx } from "@/lib/format";

/** next/image wrapper. SVGs are served as-is (no optimisation needed). */
export function Img({
  image,
  priority,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  className,
}: {
  image: ImageAsset;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized={image.src.endsWith(".svg")}
      className={cx("h-auto w-full bg-placeholder", className)}
    />
  );
}
