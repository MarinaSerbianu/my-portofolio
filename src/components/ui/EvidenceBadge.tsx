import type { EvidenceStatus } from "@/content/schema";
import { cx } from "@/lib/format";

/**
 * Evidence state is carried by stroke + words, never colour alone (WCAG 1.4.1):
 * solid underline = verified, dashed = directional, dotted = unverified,
 * open ring = demo placeholder.
 */
const STATES: Record<
  EvidenceStatus,
  { label: string; description: string }
> = {
  verified: {
    label: "Verified",
    description: "Validated against the source of truth",
  },
  directional: {
    label: "Directional",
    description: "Real data, not statistically conclusive",
  },
  unverified: {
    label: "Unverified",
    description: "Reported, not yet checked against a source",
  },
  demo: {
    label: "Demo data",
    description: "Placeholder for development, not a real result",
  },
};

export function EvidenceBadge({
  status,
  className,
}: {
  status: EvidenceStatus;
  className?: string;
}) {
  const s = STATES[status];
  if (status === "demo") {
    return (
      <span
        className={cx(
          "label inline-flex items-center gap-1.5 whitespace-nowrap text-strike",
          className,
        )}
        title={s.description}
      >
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="6" cy="6" r="4.75" />
        </svg>
        {s.label}
      </span>
    );
  }
  return (
    <span
      className={cx(
        "label inline-block whitespace-nowrap underline decoration-2 underline-offset-[0.3em]",
        status === "verified" && "text-ink decoration-pen decoration-solid",
        status === "directional" && "text-ink decoration-pen decoration-dashed",
        status === "unverified" && "text-muted decoration-line-strong decoration-dotted",
        className,
      )}
      title={s.description}
    >
      {s.label}
    </span>
  );
}

export const EVIDENCE_STATES = STATES;
