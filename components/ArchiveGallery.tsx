"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ArchiveEntry } from "@/content/archive";
import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "./Reveal";

const two = (n: number) => String(n).padStart(2, "0");

// The rhythm of the journey: how each image sits on the page (desktop, 12 columns).
// Repeats after ten images. On the phone, images alternate between full and inset.
const RHYTHM = [
  "md:col-span-12",
  "md:col-span-5 md:col-start-1 md:mt-40",
  "md:col-span-6 md:col-start-7",
  "md:col-span-8 md:col-start-3 md:mt-32",
  "md:col-span-4 md:col-start-2 md:mt-32",
  "md:col-span-5 md:col-start-8 md:mt-64",
  "md:col-span-10 md:col-start-2 md:mt-32",
  "md:col-span-6 md:col-start-1 md:mt-32",
  "md:col-span-4 md:col-start-8 md:mt-72",
  "md:col-span-6 md:col-start-4 md:mt-32",
];
// Upright images would become enormous in the wide slots, so they get narrower ones.
const UPRIGHT: Record<string, string> = {
  "md:col-span-12": "md:col-span-6 md:col-start-4",
  "md:col-span-8 md:col-start-3 md:mt-32":
    "md:col-span-5 md:col-start-2 md:mt-32",
  "md:col-span-10 md:col-start-2 md:mt-32":
    "md:col-span-5 md:col-start-7 md:mt-32",
};
const PHONE = ["", "w-4/5", "w-4/5 ml-auto", "", "w-3/5", "w-4/5 ml-auto"];

function slot(entry: ArchiveEntry, i: number) {
  const base = RHYTHM[i % RHYTHM.length];
  return entry.height > entry.width ? (UPRIGHT[base] ?? base) : base;
}

function Picture({
  entry,
  sizes,
  priority,
}: {
  entry: ArchiveEntry;
  sizes: string;
  priority?: boolean;
}) {
  if (entry.src) {
    return (
      <Image
        src={entry.src}
        alt={entry.alt}
        width={entry.width}
        height={entry.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    );
  }
  return (
    <div
      className="plate"
      style={{ aspectRatio: `${entry.width} / ${entry.height}` }}
    >
      <div
        className="plate-inner"
        data-tone={entry.tone}
        role="img"
        aria-label={entry.alt}
      >
        <div className="plate-grain" />
      </div>
    </div>
  );
}

/** The archive as a scroll journey, with a full-screen viewer on click. */
export function ArchiveGallery({
  entries,
  t,
}: {
  entries: ArchiveEntry[];
  t: Dictionary["archive"];
}) {
  const [current, setCurrent] = useState(0); // image nearest the middle of the screen
  const [viewing, setViewing] = useState<number | null>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const total = entries.length;

  // Which image is the visitor at? Drives the counter.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (hits) => {
        for (const hit of hits) {
          if (hit.isIntersecting)
            setCurrent(Number((hit.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [total]);

  const step = useCallback(
    (by: number) =>
      setViewing((v) => (v === null ? v : (v + by + total) % total)),
    [total],
  );

  useEffect(() => {
    if (viewing === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing, step]);

  const label = (entry: ArchiveEntry, i: number) =>
    `${two(i + 1)}${entry.kind ? ` — ${t.kinds[entry.kind]}` : ""}`;

  return (
    <div className="relative px-5 pb-10 md:px-10">
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-5 md:gap-y-0">
        {entries.map((entry, i) => (
          <figure
            key={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className={`${PHONE[i % PHONE.length]} md:ml-0 md:w-auto ${slot(entry, i)} ${i === 0 ? "md:!mt-0" : ""}`}
          >
            <Reveal>
              <button
                type="button"
                onClick={() => setViewing(i)}
                aria-label={`${t.open} ${two(i + 1)}`}
                className="group block w-full cursor-zoom-in overflow-hidden"
              >
                <Picture
                  entry={entry}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  priority={i === 0}
                />
              </button>
              <figcaption className="coord mt-3 text-stone-deep">
                {label(entry, i)}
              </figcaption>
            </Reveal>
          </figure>
        ))}
      </div>

      {/* Where you are in the journey */}
      <div className="pointer-events-none sticky bottom-5 mt-16 flex justify-end md:bottom-8">
        <span
          className="coord bg-bone/85 px-2 py-1 backdrop-blur-md"
          aria-hidden="true"
        >
          {two(current + 1)} / {two(total)}
        </span>
      </div>

      {/* Full-screen viewer: attached to the page body so it covers everything */}
      {viewing !== null
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.label}
              className="page-enter fixed inset-0 z-[55] flex flex-col bg-ink text-bone"
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10">
                <span className="coord">
                  {label(entries[viewing], viewing)}{" "}
                  <span className="text-bone/50">/ {two(total)}</span>
                </span>
                <button
                  type="button"
                  autoFocus
                  className="label -m-3 p-3"
                  onClick={() => setViewing(null)}
                >
                  {t.close}
                </button>
              </div>
              <div className="relative min-h-0 flex-1 px-5 pb-5 md:px-24 md:pb-10">
                {entries[viewing].src ? (
                  <img
                    src={entries[viewing].src}
                    alt={entries[viewing].alt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div
                      className="max-h-full w-full"
                      style={{
                        maxWidth: `calc((100svh - 9rem) * ${entries[viewing].width / entries[viewing].height})`,
                      }}
                    >
                      <Picture entry={entries[viewing]} sizes="100vw" />
                    </div>
                  </div>
                )}
                {/* left half = back, right half = forward */}
                <button
                  type="button"
                  aria-label={t.previous}
                  onClick={() => step(-1)}
                  className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
                />
                <button
                  type="button"
                  aria-label={t.next}
                  onClick={() => step(1)}
                  className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
