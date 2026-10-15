"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Role } from "@/content/resume";
import { Reveal } from "./reveal";

export function Experience({ employer, roles }: { employer: string; roles: Role[] }) {
  // Current role starts expanded; the rest show their one-line summary.
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <p className="mb-8 text-sm text-muted">
        {employer} · {roles.at(-1)?.start} – {roles[0]?.end} · {roles.length} roles
      </p>
      <ol className="relative border-l border-line">
        {roles.map((role, i) => {
          const isOpen = open.has(i);
          const panelId = `role-${i}`;
          return (
            <li key={`${role.title}-${role.start}`} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden
                className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent ${
                  i === 0 ? "bg-accent" : "bg-bg"
                }`}
              />
              <Reveal>
                <p className="text-sm font-medium text-accent">
                  {role.start} – {role.end}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-medium">{role.title}</h3>
                <p className="text-sm text-muted">{role.team}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-pretty">{role.summary}</p>

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
                >
                  {isOpen ? "Hide highlights" : `Show highlights (${role.highlights.length})`}
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 max-w-2xl space-y-3">
                        {role.highlights.map((h) => (
                          <li key={h} className="flex gap-3 leading-relaxed text-muted">
                            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {role.stack.map((t) => (
                    <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
