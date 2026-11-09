"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Monogram, Wordmark } from "./Logo";

/** The opening. While scrolling, the camera moves into the monogram
    until its white fills the screen and becomes the page itself. */
export function HeroZoom({
  chapterHref,
  chapterLabel,
  coordinates,
  scrollLabel,
}: {
  chapterHref: string;
  chapterLabel: string;
  coordinates: string;
  scrollLabel: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const flood = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el || !mark.current || !fade.current || !flood.current) return;
      const distance = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / distance));
      // slow start, fast finish
      const scale = 1 + Math.pow(p, 4) * 44;
      mark.current.style.transform = `scale(${scale})`;
      fade.current.style.opacity = String(Math.max(0, 1 - p * 5));
      flood.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.84) / 0.14)));
      // tell the header when the screen behind it has turned light
      // (the solid stem of the M, ~6% of the mark's width each side, now spans the screen)
      const width = mark.current.offsetWidth;
      const origin = window.innerWidth / 2 - 0.355 * width;
      const covered = scale * width * 0.06 >= Math.max(origin, window.innerWidth - origin);
      el.toggleAttribute("data-header-dark", !covered);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={track} data-header-dark className="relative h-[220svh] bg-bone motion-reduce:h-svh">
      <div className="sticky top-0 flex h-svh min-h-[30rem] flex-col items-center justify-center overflow-hidden bg-ink text-bone">
        {/* The zoom centres on a solid part of the M, so the white fills the screen. */}
        <div
          ref={mark}
          className="will-change-transform"
          style={{ transformOrigin: "14.5% 57%" }}
        >
          <Monogram tone="bone" className="h-auto w-[min(48vw,38svh,21rem)]" />
        </div>

        <div ref={fade} className="absolute inset-0">
          <div className="absolute inset-x-0 top-[calc(50%+min(24vw,19svh,10.5rem)+2.5rem)] flex justify-center md:top-[calc(50%+min(24vw,19svh,10.5rem)+3.5rem)]">
            <Wordmark tone="white" className="w-[min(50vw,19rem)]" />
          </div>
          <div className="absolute inset-x-5 bottom-6 flex items-end justify-between md:inset-x-10 md:bottom-9">
            <Link href={chapterHref} className="coord link-line">
              {chapterLabel}
            </Link>
            <span className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
              <span className="label text-bone/60">{scrollLabel}</span>
              <span className="scroll-hint" />
            </span>
            <span className="coord text-bone/60">{coordinates}</span>
          </div>
        </div>

        <div ref={flood} className="pointer-events-none absolute inset-0 bg-bone opacity-0" />
      </div>
    </section>
  );
}
