import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/format";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex min-h-12 items-center gap-3 font-sans text-[0.9375rem] font-medium transition-colors duration-200";
const variants: Record<Variant, string> = {
  primary: "bg-ink px-6 text-paper hover:bg-pen",
  secondary:
    "px-1 text-ink underline decoration-line-strong decoration-1 underline-offset-[0.4em] hover:text-pen hover:decoration-pen",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      <Icon className="shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </>
  );
  const cls = cx(base, variants[variant], className);
  if (external || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
