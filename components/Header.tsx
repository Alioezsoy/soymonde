"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Monogram, Wordmark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* The bar inverts against whatever is behind it:
          white on dark images, black on bone. */}
      <header className="fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="SOYMONDE — home" className="-m-2 p-2">
            <Monogram tone="white" className="h-6 w-auto md:h-7" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="label link-line">
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="label link-line">
              Bag (0)
            </Link>
          </nav>

          <div className="flex items-center gap-6 md:hidden">
            <Link href="/cart" className="label -my-3 py-3">
              Bag (0)
            </Link>
            <button
              type="button"
              className="label -m-3 p-3"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (mobile) */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-bone text-ink transition-opacity duration-700 ease-slow md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/" onClick={() => setOpen(false)} aria-label="SOYMONDE — home" className="-m-2 p-2">
            <Monogram className="h-6 w-auto" />
          </Link>
          <button type="button" className="label -m-3 p-3" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-5 px-5">
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`display text-[2.75rem] transition-all duration-1000 ease-slow ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 90}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-end justify-between px-5 pb-8">
          <Wordmark className="w-36" />
          <span className="coord text-stone-deep">{site.base.coordinates}</span>
        </div>
      </div>
    </>
  );
}
