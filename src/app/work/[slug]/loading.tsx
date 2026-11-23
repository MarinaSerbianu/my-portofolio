/** Instant placeholder while a case study streams in: a blank page with the rule. */
export default function Loading() {
  return (
    <div className="container-page pt-16 pb-section" aria-busy="true">
      <div className="h-10 max-w-[28rem] bg-surface" />
      <div className="mt-6 h-5 max-w-[36rem] bg-surface" />
      <span className="sr-only">Loading case study</span>
    </div>
  );
}
