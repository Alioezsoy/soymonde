"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { onOpenCart } from "@/lib/cart";
import type { Locale } from "@/lib/i18n";
import { CartLines } from "./CartLines";

/** The bag slides in from the right, without leaving the page. */
export function CartDrawer({
  lang,
  t,
  closeLabel,
}: {
  lang: Locale;
  t: Dictionary["cart"];
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => onOpenCart(() => setOpen(true)), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div inert={!open} className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label={closeLabel}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-700 ease-slow ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.label}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bone px-5 pb-6 text-ink transition-transform duration-700 ease-slow md:px-8 md:pb-8 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between md:h-20">
          <span className="label">{t.label}</span>
          <button type="button" className="label -m-3 p-3" onClick={() => setOpen(false)}>
            {closeLabel}
          </button>
        </div>
        <CartLines lang={lang} t={t} onNavigate={() => setOpen(false)} />
      </aside>
    </div>
  );
}
