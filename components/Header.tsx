"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { openCart, useCart } from "@/lib/cart";
import { href, type Locale } from "@/lib/i18n";
import { CartDrawer } from "./CartDrawer";
import { LanguageSwitch } from "./LanguageSwitch";
import { Monogram, Wordmark } from "./Logo";

export function Header({
  lang,
  t,
  cart,
  coordinates,
}: {
  lang: Locale;
  t: Dictionary["nav"];
  cart: Dictionary["cart"];
  coordinates: string;
}) {
  const [open, setOpen] = useState(false);
  // true while a dark image or section sits behind the bar
  const [onDark, setOnDark] = useState(false);
  const count = useCart().reduce((sum, line) => sum + line.quantity, 0);

  const nav = [
    { href: href(lang, "/shop"), label: t.shop },
    { href: href(lang, "/archive"), label: t.archive },
    { href: href(lang, "/about"), label: t.about },
    { href: href(lang, "/contact"), label: t.contact },
  ];
  const bag = `${t.bag} (${count})`;

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const dark = Array.from(document.querySelectorAll("[data-header-dark]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 32 && r.bottom >= 32;
      });
      setOnDark(dark);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // page changes alter the page height: re-check then, too
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
      {/* Over dark images the bar is clear and inverts against what is behind it;
          everywhere else it is bone with dark text. */}
      <header
        className={`fixed inset-x-0 top-0 z-40 ${
          onDark ? "bg-transparent text-white mix-blend-difference" : "bg-bone/85 text-ink backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Link href={href(lang)} aria-label={t.home} className="-m-2 p-2">
            <Monogram tone={onDark ? "white" : "black"} className="h-9 w-auto md:h-10" />
          </Link>

          <nav aria-label={t.menu} className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="label link-line">
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={openCart} className="label link-line">
              {bag}
            </button>
            <Suspense>
              <LanguageSwitch lang={lang} label={t.language} className="ml-2" />
            </Suspense>
          </nav>

          <div className="flex items-center gap-6 lg:hidden">
            <button type="button" onClick={openCart} className="label -my-3 py-3">
              {bag}
            </button>
            <button
              type="button"
              className="label -m-3 p-3"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              {t.menu}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer lang={lang} t={cart} closeLabel={t.close} />

      {/* Full-screen menu (phone and tablet) */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-bone text-ink transition-opacity duration-700 ease-slow lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Link href={href(lang)} onClick={() => setOpen(false)} aria-label={t.home} className="-m-2 p-2">
            <Monogram className="h-9 w-auto md:h-10" />
          </Link>
          <button type="button" className="label -m-3 p-3" onClick={() => setOpen(false)}>
            {t.close}
          </button>
        </div>

        <nav aria-label={t.menu} className="flex flex-1 flex-col justify-center gap-7 px-5 md:px-10">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`display text-2xl transition-all duration-1000 ease-slow ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 90}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
          <Suspense>
            <LanguageSwitch
              lang={lang}
              label={t.language}
              onNavigate={() => setOpen(false)}
              className="mt-8 gap-6"
            />
          </Suspense>
        </nav>

        <div className="flex items-end justify-between px-5 pb-8 md:px-10">
          <Wordmark className="w-28" />
          <span className="coord text-stone-deep">{coordinates}</span>
        </div>
      </div>
    </>
  );
}
