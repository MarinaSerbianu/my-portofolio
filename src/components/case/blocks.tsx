import type { ReactNode } from "react";
import type { PublicCaseStudy } from "@/content/case-studies";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";
import { Mark, type MarkKind } from "@/components/ui/Mark";
import { cx } from "@/lib/format";
import { Disclosure } from "./Disclosure";
import { MetricCard } from "./MetricCard";
import { Outcome, type OutcomeKind } from "./Outcome";

type CS = PublicCaseStudy;

export function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-32 border-t border-line py-16 first:border-ink lg:scroll-mt-28 lg:py-24"
    >
      <h2 id={`${id}-title`} className="max-w-[24ch] text-h2">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Prose({
  paragraphs,
  lead,
}: {
  paragraphs: string[];
  lead?: boolean;
}) {
  return (
    <div className="max-w-prose space-y-5">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={cx(lead && i === 0 ? "text-lead" : "text-muted")}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

const EVIDENCE_TYPE: Record<string, string> = {
  quantitative: "Quantitative",
  qualitative: "Qualitative",
  heuristic: "Heuristic",
  technical: "Technical",
};

/** Evidence: findings with their source written in the margin, in blue pen. */
export function Research({
  research,
}: {
  research: NonNullable<CS["research"]>;
}) {
  return (
    <>
      {research.methods.length > 0 && (
        <p className="max-w-prose font-sans text-[0.9375rem]">
          <span className="font-semibold">Methods: </span>
          <span className="text-muted">{research.methods.join(", ")}</span>
        </p>
      )}
      <ol className="mt-10">
        {research.findings.map((f, i) => (
          <li
            key={i}
            className="grid gap-x-6 gap-y-2 border-t border-line py-7 md:grid-cols-[3rem_minmax(0,1fr)_13rem]"
          >
            <span className="label tabular pt-1 text-pen">F{i + 1}</span>
            <div>
              <h3 className="text-h3">{f.title}</h3>
              <p className="mt-2 max-w-prose text-muted">{f.detail}</p>
            </div>
            <p className="note md:pt-1">
              <span className="sr-only">Evidence: </span>
              {EVIDENCE_TYPE[f.evidenceType]}. {f.source.label}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

const VERDICT: Record<
  OutcomeKind,
  { text: string; mark?: MarkKind; cls: string }
> = {
  win: {
    text: "Supported by the test",
    mark: "underline",
    cls: "text-ink underline decoration-pen decoration-2 underline-offset-[0.3em]",
  },
  loss: {
    text: "Not supported by the test",
    mark: "strike",
    cls: "text-strike underline decoration-strike decoration-2 underline-offset-[0.3em]",
  },
  inconclusive: {
    text: "Inconclusive",
    mark: "dashed",
    cls: "text-ink underline decoration-pen decoration-dashed decoration-2 underline-offset-[0.3em]",
  },
  "shipped-without-test": { text: "Shipped without a test", cls: "text-muted" },
};

/**
 * Hypothesis: written down before the test, on the research grid. Once a
 * result exists, the "then" clause gets the pen: underline when supported,
 * red strike when not, dashed when inconclusive.
 */
export function Hypothesis({
  hypothesis,
  outcome,
}: {
  hypothesis: NonNullable<CS["hypothesis"]>;
  outcome?: OutcomeKind;
}) {
  const verdict = outcome ? VERDICT[outcome] : undefined;
  return (
    <>
      <div className="research-grid border border-ink">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink bg-paper px-5 py-3 md:px-8">
          <p className="label">Written before the test</p>
          <p className={cx("label", verdict?.cls ?? "text-subtle")}>
            {verdict ? verdict.text : "Not tested yet"}
          </p>
        </div>
        <dl className="space-y-6 px-5 py-7 md:px-8 md:py-10">
          <Row k="If">{hypothesis.if}</Row>
          <Row k="Then">
            {verdict?.mark ? (
              <Mark kind={verdict.mark} delay={350}>
                {hypothesis.then}
              </Mark>
            ) : (
              hypothesis.then
            )}
          </Row>
          <Row k="Because">{hypothesis.because}</Row>
        </dl>
      </div>
      {verdict && (
        <p className="note mt-4">
          {verdict.text}.{" "}
          <a href="#results" className="underline underline-offset-[0.2em]">
            See the results
          </a>
        </p>
      )}
      {hypothesis.rationale.length > 0 && (
        <div className="mt-10">
          <Disclosure label="Why this hypothesis, and how it was scoped">
            <List items={hypothesis.rationale} />
          </Disclosure>
        </div>
      )}
    </>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 md:grid-cols-[6.5rem_1fr] md:gap-6">
      <dt className="label pt-2 text-pen">{k}</dt>
      <dd className="text-lead">{children}</dd>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-3 text-muted">
      {items.map((r, i) => (
        <li key={i} className="grid grid-cols-[1rem_1fr] gap-2">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 bg-pen" />
          {r}
        </li>
      ))}
    </ul>
  );
}

const DECISION: Record<string, { label: string; cls: string }> = {
  chosen: {
    label: "Chosen",
    cls: "text-ink underline decoration-pen decoration-2 underline-offset-[0.3em]",
  },
  rejected: { label: "Rejected", cls: "text-strike" },
  parked: {
    label: "Parked",
    cls: "text-ink underline decoration-line-strong decoration-dashed decoration-2 underline-offset-[0.3em]",
  },
};

/** Options considered: the chosen one is boxed in ink, rejected ones are struck. */
export function Exploration({
  exploration,
}: {
  exploration: NonNullable<CS["exploration"]>;
}) {
  return (
    <>
      <Prose paragraphs={exploration.body} />
      {exploration.options.length > 0 && (
        <ul className="mt-10 space-y-3">
          {exploration.options.map((o) => (
            <li
              key={o.name}
              className={cx(
                "grid gap-x-6 gap-y-2 px-5 py-6 md:grid-cols-[7rem_1fr] md:px-7",
                o.decision === "chosen"
                  ? "border-2 border-ink"
                  : "border border-line",
              )}
            >
              <p className={cx("label pt-1", DECISION[o.decision].cls)}>
                {DECISION[o.decision].label}
              </p>
              <div>
                <h3 className="text-h3">
                  {o.decision === "rejected" ? (
                    <Mark kind="strike">{o.name}</Mark>
                  ) : (
                    o.name
                  )}
                </h3>
                <p className="mt-2 text-muted">{o.description}</p>
                <p className="note mt-3">
                  <span className="sr-only">Reason: </span>
                  {o.reason}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Experiment: the lab record. */
export function Experiment({
  experiment,
}: {
  experiment: NonNullable<CS["experiment"]>;
}) {
  const rows: [string, ReactNode][] = [
    ["Type", experiment.type],
    ...(experiment.platform
      ? [["Platform", experiment.platform] as [string, ReactNode]]
      : []),
    ["Duration", experiment.duration],
    ["Audience", experiment.audience],
    ...(experiment.split
      ? [["Traffic split", experiment.split] as [string, ReactNode]]
      : []),
    [
      "Primary metric",
      <strong key="p" className="font-sans font-semibold">
        {experiment.primaryMetric}
      </strong>,
    ],
    ...(experiment.secondaryMetrics.length
      ? [
          ["Secondary", experiment.secondaryMetrics.join(", ")] as [
            string,
            ReactNode,
          ],
        ]
      : []),
    ...(experiment.guardrails.length
      ? [
          ["Guardrails", experiment.guardrails.join(", ")] as [
            string,
            ReactNode,
          ],
        ]
      : []),
  ];
  return (
    <>
      <dl className="border-b border-line">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="grid gap-1 border-t border-line py-4 first:border-ink md:grid-cols-[11rem_1fr] md:gap-6"
          >
            <dt className="label pt-1 text-subtle">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {experiment.details.length > 0 && (
        <div className="mt-8">
          <Disclosure label="Test design, QA and validity checks">
            <List items={experiment.details} />
          </Disclosure>
        </div>
      )}
    </>
  );
}

/** Outcome: the numbers with their evidence, then the decision in a firm box. */
export function Results({ results }: { results: NonNullable<CS["results"]> }) {
  return (
    <>
      <p className="font-sans text-[0.9375rem]">
        <span className="font-semibold">Outcome: </span>
        <Outcome outcome={results.outcome} className="text-[0.9375rem]" />
      </p>
      <p className="mt-5 max-w-prose text-lead">{results.summary}</p>

      {results.metrics.length > 0 ? (
        <dl className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {results.metrics.map((m) => (
            <MetricCard key={m.id} metric={m} />
          ))}
        </dl>
      ) : (
        <p className="note mt-10 max-w-prose">
          Metrics for this project are confidential or still being verified, so
          they aren&rsquo;t published here.
        </p>
      )}

      <div className="mt-14 border-2 border-ink p-6 md:p-9">
        <h3 className="font-sans text-[1.0625rem] font-semibold">Decision</h3>
        <p className="mt-3 max-w-prose text-lead">{results.decision}</p>
      </div>
    </>
  );
}

/** Failed assumptions: what we believed gets the red strike, reality stays. */
export function FailedAssumptions({
  items,
}: {
  items: CS["failedAssumptions"];
}) {
  return (
    <ol>
      {items.map((a, i) => (
        <li
          key={i}
          className="grid gap-6 border-t border-line py-8 first:border-ink md:grid-cols-2 md:gap-10"
        >
          <div>
            <p className="label text-subtle">We assumed</p>
            <p className="mt-2 text-h3 text-muted">
              <Mark kind="strike" delay={i * 150}>
                {a.assumption}
              </Mark>
            </p>
          </div>
          <div>
            <p className="label text-strike">What actually happened</p>
            <p className="mt-2 text-h3">{a.reality}</p>
            {a.evidence && <p className="note mt-3">Evidence: {a.evidence}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Iterations({ items }: { items: CS["iterations"] }) {
  return (
    <ol className="relative ml-1 space-y-10 border-l border-line-strong pl-8">
      {items.map((it) => (
        <li key={it.label} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[2.32rem] size-2.5 border border-ink bg-paper"
          />
          <p className="label text-pen">{it.label}</p>
          <h3 className="mt-1 text-h3">{it.change}</h3>
          <p className="mt-2 text-muted">{it.outcome}</p>
        </li>
      ))}
    </ol>
  );
}

export function Lessons({ items }: { items: string[] }) {
  return (
    <ol className="space-y-8">
      {items.map((l, i) => (
        <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3">
          <span className="label tabular pt-2 text-pen">{i + 1}</span>
          <p className="max-w-[40ch] text-lead">{l}</p>
        </li>
      ))}
    </ol>
  );
}

export function Collaboration({
  collaboration,
  team,
}: {
  collaboration: NonNullable<CS["collaboration"]>;
  team: string[];
}) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <h3 className="font-sans text-[1.0625rem] font-semibold">
          What I owned
        </h3>
        <ul className="mt-4">
          {collaboration.ownership.map((o) => (
            <li
              key={o}
              className="grid grid-cols-[1rem_1fr] gap-2 border-t border-line py-3"
            >
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 bg-pen" />
              {o}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-sans text-[1.0625rem] font-semibold">
          Worked with
        </h3>
        {collaboration.partners.length > 0 ? (
          <dl className="mt-4">
            {collaboration.partners.map((p) => (
              <div key={p.role} className="border-t border-line py-3">
                <dt className="font-sans font-medium">{p.role}</dt>
                <dd className="text-muted">{p.contribution}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 text-muted">{team.join(", ")}</p>
        )}
      </div>
    </div>
  );
}

export { EvidenceBadge };
