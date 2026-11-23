"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/format";
import { WorkIndex, type IndexItem } from "./WorkIndex";

type Item = IndexItem & { categoryIds: string[] };
type Category = { id: string; label: string; count: number };

/**
 * Single-select discipline filter over the work index. The URL (?category=)
 * stays in sync so filtered views are shareable. Uses history.replaceState
 * instead of router navigation so the static page never re-renders.
 */
export function WorkFilter({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    // Intentional: the page is static, so the URL can only be read after
    // hydration. Reading it during render would cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl && categories.some((c) => c.id === fromUrl)) setActive(fromUrl);
  }, [categories]);

  function select(id: string | null) {
    setActive(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("category", id);
    else url.searchParams.delete("category");
    window.history.replaceState(window.history.state, "", url);
  }

  const visible = active
    ? items.filter((i) => i.categoryIds.includes(active))
    : items;
  const options = [
    { id: null, label: "All", count: items.length },
    ...categories,
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="flex flex-wrap gap-x-1 gap-y-1 font-sans"
      >
        {options.map((o) => {
          const pressed = active === o.id;
          const disabled = o.count === 0;
          return (
            <button
              key={o.id ?? "all"}
              type="button"
              aria-pressed={pressed}
              disabled={disabled}
              onClick={() => select(o.id)}
              className={cx(
                "relative inline-flex min-h-11 items-baseline gap-1.5 px-2.5 pt-2.5 text-[0.9375rem] transition-colors",
                pressed ? "text-ink" : "text-muted hover:text-ink",
                disabled && "cursor-not-allowed text-line-strong hover:text-line-strong",
              )}
            >
              {o.label}
              <span className="tabular text-[0.75rem] text-subtle">{o.count}</span>
              <span
                aria-hidden="true"
                className={cx(
                  "absolute inset-x-2.5 bottom-1.5 h-0.5 origin-left bg-pen transition-transform duration-300 ease-out-expo",
                  pressed ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <p role="status" className="label mt-6 mb-8 font-normal text-subtle">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active && <> in {categories.find((c) => c.id === active)?.label}</>}
      </p>

      {visible.length > 0 ? (
        <WorkIndex items={visible} headingLevel="h2" />
      ) : (
        <p className="border-t border-ink pt-8 text-muted">
          No published projects in this discipline yet.{" "}
          <button
            type="button"
            className="link font-sans font-medium"
            onClick={() => select(null)}
          >
            Show all work
          </button>
        </p>
      )}
    </>
  );
}
