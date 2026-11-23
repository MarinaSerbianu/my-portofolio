"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/format";

export type MarkKind = "underline" | "dashed" | "strike" | "highlight";

/**
 * A pen mark on inline text: drawn left to right, line by line, the first
 * time the text scrolls into view. Purely visual: the meaning of a mark is
 * always also stated in words next to it.
 */
export function Mark({
  kind,
  children,
  delay = 0,
  className,
}: {
  kind: MarkKind;
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The mark is set on the DOM node directly: it is decoration, not state.
    const draw = () => el.setAttribute("data-drawn", "");
    if (reduce || !("IntersectionObserver" in window)) {
      draw();
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          timer = setTimeout(draw, delay);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return (
    <span
      ref={ref}
      className={cx("mark", `mark-${kind}`, className)}
    >
      {children}
    </span>
  );
}
