"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";

export type TocItem = { id: string; n: string; label: string };

/**
 * Section navigation for case studies.
 * Desktop: sticky vertical list. Mobile: sticky, horizontally scrollable strip.
 * Highlights the section currently in view.
 */
export function CaseToc({
  items,
  variant,
}: {
  items: TocItem[];
  variant: "strip" | "list";
}) {
  const [active, setActive] = useState(items[0]?.id);
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active chip visible in the mobile strip
  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Case study sections" className="font-sans">
      {variant === "strip" ? (
        <ul
          ref={stripRef}
          className="flex gap-1 overflow-x-auto border-b border-line bg-paper px-[var(--gutter)] [scrollbar-width:none]"
        >
          {items.map((item) => (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cx(
                  "relative inline-flex min-h-11 items-center px-2.5 text-[0.875rem]",
                  active === item.id ? "text-ink" : "text-muted",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cx(
                    "absolute inset-x-2.5 bottom-1.5 h-0.5 bg-pen transition-transform duration-300",
                    active === item.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="label mb-4 text-subtle">In this case study</p>
          <ol className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cx(
                    "group flex items-baseline gap-3 py-1 text-[0.9375rem] transition-colors",
                    active === item.id
                      ? "text-ink"
                      : "text-subtle hover:text-ink",
                  )}
                >
                  <span
                    className={cx(
                      "tabular w-5 text-[0.8125rem]",
                      active === item.id ? "text-pen" : "text-subtle",
                    )}
                  >
                    {item.n}
                  </span>
                  <span
                    className={cx(
                      "underline-offset-[0.3em]",
                      active === item.id &&
                        "underline decoration-pen decoration-2",
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
    </nav>
  );
}
