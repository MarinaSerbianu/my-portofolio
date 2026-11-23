import type { PublicMetric } from "@/content/case-studies";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";
import { Mark } from "@/components/ui/Mark";
import { cx, formatMetric, formatNumber } from "@/lib/format";

/**
 * A metric is never shown without its evidence status and source.
 * Only verified values get the highlighter. Policy filtering (visibility,
 * unverified, demo) has already happened in the content layer.
 */
export function MetricCard({ metric }: { metric: PublicMetric }) {
  const isDemo = metric.evidenceStatus === "demo";
  // Word units ("sessions") sit small beside the number instead of wrapping.
  const full = formatMetric(metric.value, metric.unit, metric.precision, metric.signed);
  const wordUnit = full.endsWith(` ${metric.unit}`);
  const value = wordUnit ? (
    <>
      {formatNumber(metric.value, metric.precision, metric.signed)}
      <span className="ml-2 text-[0.4em] font-medium tracking-normal">{metric.unit}</span>
    </>
  ) : (
    full
  );
  return (
    <div className="flex h-full flex-col border-t border-ink pt-5">
      <dt className="order-2 mt-3 font-sans font-semibold">{metric.label}</dt>
      <dd
        className={cx(
          "order-1 font-sans text-[clamp(2.5rem,1.9rem+2.6vw,4rem)] leading-none font-semibold tracking-[-0.04em]",
          isDemo && "text-subtle",
        )}
      >
        {metric.evidenceStatus === "verified" ? (
          <Mark kind="highlight" delay={500}>
            {value}
          </Mark>
        ) : (
          value
        )}
        {isDemo && (
          <span className="sr-only"> (demo placeholder, not a real result)</span>
        )}
      </dd>
      <dd className="order-3 mt-4 flex flex-col items-start gap-2">
        <EvidenceBadge status={metric.evidenceStatus} />
        <span className="note">
          <span className="sr-only">Source: </span>
          {metric.source.label}
        </span>
        {metric.confidence && (
          <span className="label font-normal text-muted">{metric.confidence}</span>
        )}
        {metric.note && (
          <span className="label font-normal text-subtle">{metric.note}</span>
        )}
      </dd>
    </div>
  );
}
