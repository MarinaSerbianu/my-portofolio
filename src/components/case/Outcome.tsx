import { cx } from "@/lib/format";

export type OutcomeKind = "win" | "loss" | "inconclusive" | "shipped-without-test";

const OUTCOME: Record<OutcomeKind, { label: string; cls: string }> = {
  win: {
    label: "Winning test",
    cls: "text-ink underline decoration-pen decoration-2 underline-offset-[0.3em]",
  },
  loss: {
    label: "Losing test",
    cls: "text-strike underline decoration-strike decoration-2 underline-offset-[0.3em]",
  },
  inconclusive: {
    label: "Inconclusive",
    cls: "text-ink underline decoration-pen decoration-dashed decoration-2 underline-offset-[0.3em]",
  },
  "shipped-without-test": { label: "Shipped without test", cls: "text-ink" },
};

export const outcomeLabel = (o: OutcomeKind) => OUTCOME[o].label;

/** Outcome of a project, stated in words; the stroke repeats it for the eye. */
export function Outcome({
  outcome,
  className,
}: {
  outcome?: OutcomeKind;
  className?: string;
}) {
  if (!outcome)
    return <span className={cx("label text-subtle", className)}>Case study</span>;
  const o = OUTCOME[outcome];
  return <span className={cx("label whitespace-nowrap", o.cls, className)}>{o.label}</span>;
}
