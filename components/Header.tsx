"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { categories, genders, shopQuery } from "@/content/categories";
import { collections } from "@/content/collections";
import type { Dictionary } from "@/content/dictionaries";
import { openCart, useCart } from "@/lib/cart";
import { href, type Locale } from "@/lib/i18n";
import { CartDrawer } from "./CartDrawer";
import { LanguageSwitch } from "./LanguageSwitch";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
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
    ...collections.map((c) => ({ href: href(lang, `/collection/${c.slug}`), label: c.title })),
    { href: href(lang, "/archive"), label: t.archive },
    { href: href(lang, "/about"), label: t.about },
    { href: href(lang, "/contact"), label: t.contact },
  ];
  const bag = `${t.bag} (${count})`;
  const home = href(lang);

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
      {/* Menu left, wordmark centred, bag right.
          Over dark images the bar is clear and inverts against what is behind it;
          everywhere else it is bone with dark text. */}
      <header
        className={`fixed inset-x-0 top-0 z-40 ${
          onDark ? "bg-transparent text-white mix-blend-difference" : "bg-bone/85 text-ink backdrop-blur-md"
        }`}
      >
        <div className="relative flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <button
            type="button"
            className="-m-3 flex items-center gap-3 p-3"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={t.menu}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
            <span className="label hidden md:inline">{t.menu}</span>
          </button>

          <Link href={home} aria-label={t.home} className="absolute left-1/2 -translate-x-1/2 p-2">
            <Wordmark tone={onDark ? "white" : "black"} className="w-28 md:w-36" />
          </Link>

          <div className="flex items-center gap-7">
            <Suspense>
              <LanguageSwitch lang={lang} label={t.language} className="hidden md:flex" />
            </Suspense>
            <button type="button" onClick={openCart} aria-label={bag} className="-m-3 flex items-center gap-1.5 p-3">
              <BagIcon />
              <span className="coord">{count}</span>
            </button>
          </div>
        </div>
      </header>

      <CartDrawer lang={lang} t={cart} closeLabel={t.close} />

      {/* Menu: an image on one side, the way through the site on the other */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        inert={!open}
        className={`fixed inset-0 z-50 grid bg-bone text-ink transition-opacity duration-700 ease-slow md:grid-cols-2 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Link
          href={home}
          onClick={() => setOpen(false)}
          aria-label={t.home}
          className="hidden items-center justify-center bg-ink md:flex"
        >
          <Monogram tone="white" className="w-[min(18vw,13rem)]" />
        </Link>

        <div className="flex min-h-0 flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10">
            <button
              type="button"
              className="-m-3 flex items-center gap-3 p-3"
              aria-label={t.close}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
              <span className="label hidden md:inline">{t.close}</span>
            </button>
            <Monogram className="w-9 md:hidden" />
          </div>

          <nav aria-label={t.menu} className="flex min-h-0 flex-1 flex-col justify-center gap-5 overflow-y-auto px-5 py-6 md:gap-7 md:px-16">
            {nav.map((item, i) => (
              <div
                key={item.href}
                className={`transition-all duration-1000 ease-slow ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 90}ms` : "0ms" }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} lang="en" className="display text-2xl md:text-3xl">
                  <span className="link-line">{item.label}</span>
                </Link>
                {/* the shop's categories, right under "Shop" */}
                {i === 0 ? (
                  <ul lang="en" className="mb-2 mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:max-w-md">
                    {[...genders, ...categories].map((entry) => (
                      <li key={entry.key}>
                        <Link
                          href={`${item.href}${
                            entry.key === "men" || entry.key === "women"
                              ? shopQuery(entry.key, null)
                              : shopQuery(null, entry.key)
                          }`}
                          onClick={() => setOpen(false)}
                          className="label link-line text-stone-deep hover:text-ink"
                        >
                          {entry.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-end justify-between px-5 pb-8 md:px-16 md:pb-10">
            <Suspense>
              <LanguageSwitch lang={lang} label={t.language} onNavigate={() => setOpen(false)} className="gap-6" />
            </Suspense>
            <span className="coord text-stone-deep">{coordinates}</span>
          </div>
        </div>
      </div>
    </>
  );
}
