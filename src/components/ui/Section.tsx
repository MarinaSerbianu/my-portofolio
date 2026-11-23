import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/**
 * Editorial section: the heading hangs in a narrow left column, the content
 * runs in a wider right column with open space after it. Stacks on mobile.
 */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx("py-section", className)}
    >
      <div className="container-page grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id={headingId} className="max-w-[16ch] text-h2">
            {title}
          </h2>
          {intro && (
            <div className="mt-5 max-w-[34ch] text-muted">{intro}</div>
          )}
        </div>
        {children && (
          <div className="min-w-0 lg:col-span-7 lg:col-start-6">{children}</div>
        )}
      </div>
    </section>
  );
}
