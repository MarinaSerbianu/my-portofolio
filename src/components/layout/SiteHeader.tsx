"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/format";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ name, role }: { name: string; role: string }) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper font-sans">
      <div className="container-page flex h-header items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-baseline gap-3">
          <span className="truncate text-[1.0625rem] font-semibold tracking-[-0.01em]">
            {name}
          </span>
          <span className="hidden truncate text-[0.9375rem] text-subtle lg:inline">
            {role}
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 sm:gap-3">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative inline-flex min-h-11 items-center px-2 text-[0.9375rem] transition-colors sm:px-2.5",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "absolute inset-x-2 bottom-2 h-0.5 origin-left bg-pen transition-transform duration-300 ease-out-expo sm:inset-x-2.5",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
