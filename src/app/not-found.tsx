import { ButtonLink } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";

export default function NotFound() {
  return (
    <div className="container-page py-section">
      <h1 className="max-w-[16ch] text-h1">
        <Mark kind="strike" delay={300}>
          This page exists.
        </Mark>
      </h1>
      <p className="mt-6 max-w-[44ch] text-lead text-muted">
        Hypothesis rejected (error 404). The link may be old, or the address mistyped.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          All work
        </ButtonLink>
      </div>
    </div>
  );
}
