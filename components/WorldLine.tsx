import Link from "next/link";
import type { Chapter } from "@/content/chapters";
import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";

const MIN = 0; // degrees east
const MAX = 32;

/** The archive as a line of longitude: every chapter sits where
    its place lies between west and east. */
export function WorldLine({
  chapters,
  lang,
  t,
}: {
  chapters: Chapter[];
  lang: Locale;
  t: Dictionary["archive"];
}) {
  const ticks = Array.from({ length: (MAX - MIN) / 4 + 1 }, (_, i) => MIN + i * 4);
  return (
    <div className="relative pb-14 pt-8" aria-label={t.mapLabel}>
      <div className="relative h-px bg-ink/25">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute top-0 h-1.5 w-px bg-ink/25"
            style={{ left: `${((t - MIN) / (MAX - MIN)) * 100}%` }}
          />
        ))}
        {chapters.map((c) => (
          <Link
            key={c.slug}
            href={href(lang, `/archive/${c.slug}`)}
            className="group absolute top-0 -translate-x-1/2"
            style={{ left: `${((c.longitude - MIN) / (MAX - MIN)) * 100}%` }}
          >
            <span className="absolute left-1/2 top-0 block size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-transform duration-700 ease-slow group-hover:scale-[1.8]" />
            <span className="coord absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap">
              {c.number}
            </span>
            <span className="coord absolute left-1/2 top-9 hidden -translate-x-1/2 whitespace-nowrap text-stone-deep md:block">
              {c.place[lang]}
            </span>
          </Link>
        ))}
      </div>
      <div className="coord absolute left-0 top-0 text-stone-deep">{MIN}° — {t.west}</div>
      <div className="coord absolute right-0 top-0 text-stone-deep">{t.east} — {MAX}°</div>
    </div>
  );
}
