"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/content/chapters";
import { href, type Locale } from "@/lib/i18n";
import { Plate } from "./Plate";

/** The chapters as a large index. With a mouse, the chapter's
    cover image appears next to the cursor while hovering a row. */
export function ChapterIndex({ chapters, lang }: { chapters: Chapter[]; lang: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (preview.current) {
        preview.current.style.transform = `translate(${e.clientX + 28}px, ${e.clientY}px) translateY(-50%)`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <ul className="border-t border-rule" onMouseLeave={() => setActive(null)}>
        {chapters.map((c, i) => (
          <li key={c.slug} className="border-b border-rule">
            <Link
              href={href(lang, `/archive/${c.slug}`)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-4 py-6 transition-opacity duration-700 md:grid-cols-[9rem_1.4fr_1fr_1fr_3rem] md:py-9 ${
                active !== null && active !== i ? "md:opacity-30" : ""
              }`}
            >
              <span className="coord">{c.number}</span>
              <span>
                <span className="display text-5xl md:text-8xl">{c.title}</span>
                <span className="coord mt-3 block text-stone-deep md:hidden">
                  {c.place[lang]} · {c.coordinates}
                </span>
              </span>
              <span className="label hidden md:block">
                {c.place[lang]}, {c.country[lang]}
              </span>
              <span className="coord hidden text-stone-deep md:block">{c.coordinates}</span>
              <span className="coord text-right text-stone-deep">{c.year}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden w-[19vw] transition-opacity duration-500 [@media(hover:hover)]:lg:block ${
          active !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative aspect-[4/5]">
          {chapters.map((c, i) => (
            <div
              key={c.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            >
              <Plate frame={c.cover} className="h-full" sizes="19vw" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
