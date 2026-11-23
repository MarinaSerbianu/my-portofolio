import { policy } from "@/content/policy";

/** Shown whenever demo content or unverified metrics can appear. */
export function DemoBanner() {
  if (!policy.showDemo && !policy.showUnverified) return null;
  const parts = [
    policy.showDemo && "demo content",
    policy.showUnverified && "unverified metrics",
  ].filter(Boolean);
  return (
    <div role="note" className="border-b border-line bg-surface font-sans">
      <p className="container-page flex items-center gap-2 py-2 text-[0.8125rem] text-muted">
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="var(--strike)"
          strokeWidth="1.5"
          className="shrink-0"
        >
          <circle cx="6" cy="6" r="4.75" />
        </svg>
        Development build: {parts.join(" and ")} visible. Not real results;
        hidden in production.
      </p>
    </div>
  );
}
