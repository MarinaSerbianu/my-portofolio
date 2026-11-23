"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { Plus } from "@/components/ui/icons";

/** Expandable details (hypothesis rationale, experiment setup). */
export function Disclosure({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-y border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-sans text-[1rem] font-semibold hover:text-pen"
        >
          {label}
          <Plus
            className={`shrink-0 text-pen transition-transform duration-300 ease-out-expo ${open ? "rotate-45" : ""}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-7">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
