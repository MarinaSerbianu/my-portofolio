import { cx } from "@/lib/format";

/**
 * An image slot waiting for a real picture: research grid, crop marks at the
 * corners and a plain note saying what belongs here.
 */
export function Placeholder({
  label,
  hint,
  ratio = "4 / 5",
  className,
}: {
  label: string;
  hint?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cx("research-grid relative", className)}
      style={{ aspectRatio: ratio }}
    >
      <CropMarks />
      <div className="absolute inset-x-5 bottom-5 font-sans">
        <p className="label text-ink">{label}</p>
        {hint && <p className="label mt-0.5 font-normal text-subtle">{hint}</p>}
      </div>
    </div>
  );
}

export function CropMarks({ className }: { className?: string }) {
  const corner = "absolute size-3.5 border-ink";
  return (
    <span aria-hidden="true" className={cx("pointer-events-none", className)}>
      <span className={cx(corner, "-top-px -left-px border-t border-l")} />
      <span className={cx(corner, "-top-px -right-px border-t border-r")} />
      <span className={cx(corner, "-bottom-px -left-px border-b border-l")} />
      <span className={cx(corner, "-right-px -bottom-px border-r border-b")} />
    </span>
  );
}
