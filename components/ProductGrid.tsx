"use client";

import { useState, type ReactNode } from "react";

/** The product grid with a switch between a large and a compact view. */
export function ProductGrid({
  children,
  count,
  countLabel,
  viewLabel,
  action,
}: {
  children: ReactNode;
  count: number;
  /** what is being counted, e.g. "Pieces" or the chosen category */
  countLabel: ReactNode;
  viewLabel: string;
  /** optional link shown next to the view switch, e.g. "View all" */
  action?: ReactNode;
}) {
  const [compact, setCompact] = useState(true);

  const option = (value: boolean, phone: string, desktop: string) => (
    <button
      type="button"
      aria-pressed={compact === value}
      onClick={() => setCompact(value)}
      className={`coord -my-3 px-1 py-3 transition-opacity duration-500 ${
        compact === value ? "underline underline-offset-4" : "opacity-45 hover:opacity-100"
      }`}
    >
      <span className="md:hidden">{phone}</span>
      <span className="hidden md:inline">{desktop}</span>
    </button>
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
        <p className="label min-w-0 truncate">
          {countLabel} <span className="text-stone-deep">· {count}</span>
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <div className="flex items-center gap-2" role="group" aria-label={viewLabel}>
            <span className="label mr-1 hidden text-stone-deep sm:inline">{viewLabel}</span>
            {option(false, "1", "2")}
            {option(true, "2", "4")}
          </div>
          {action}
        </div>
      </div>
      <div className={`grid gap-2 md:gap-3 ${compact ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
        {children}
      </div>
    </>
  );
}
