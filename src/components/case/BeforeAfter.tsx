"use client";

import { useId, useState } from "react";
import type { ImageAsset } from "@/content/schema";
import { Img } from "@/components/ui/Figure";

/**
 * Before/after comparison.
 * A native <input type="range"> drives it: keyboard (arrows, Home/End,
 * PageUp/Down), touch and screen readers work with no custom key handling.
 * Both images keep their alt text, so the comparison isn't visual-only.
 */
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: ImageAsset;
  after: ImageAsset;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  const portrait = after.height > after.width;
  return (
    <figure className={portrait ? "max-w-[36rem]" : undefined}>
      <div
        aria-hidden="true"
        className="mb-3 flex justify-between font-sans text-[0.875rem] font-semibold"
      >
        <span>Before</span>
        <span className="text-pen">After</span>
      </div>
      <div
        className="relative overflow-hidden border border-ink select-none has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-pen"
        style={{ aspectRatio: `${after.width} / ${after.height}` }}
      >
        <Img
          image={after}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Img
            image={before}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full object-cover"
          />
        </div>

        {/* Divider + grip (decorative; the range input is the control) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-pen"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-12 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 border-2 border-pen bg-paper">
            <span className="h-4 w-px bg-pen" />
            <span className="h-4 w-px bg-pen" />
          </div>
        </div>

        <label htmlFor={id} className="sr-only">
          Comparison slider: amount of the &ldquo;before&rdquo; version shown
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${pos}% before, ${100 - pos}% after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      {caption && (
        <figcaption className="note mt-4">{caption}</figcaption>
      )}
    </figure>
  );
}
