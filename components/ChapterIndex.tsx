import Link from "next/link";
import type { Chapter } from "@/content/chapters";

/** The chapters as a quiet index list. */
export function ChapterIndex({ chapters }: { chapters: Chapter[] }) {
  return (
    <ul className="border-t border-rule">
      {chapters.map((c) => (
        <li key={c.slug} className="border-b border-rule">
          <Link
            href={`/archive/${c.slug}`}
            className="group grid grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-4 py-6 md:grid-cols-[9rem_1.3fr_1fr_1fr_3rem] md:py-8"
          >
            <span className="coord">{c.number}</span>
            <span>
              <span className="display link-line text-2xl md:text-4xl">{c.title}</span>
              <span className="coord mt-2 block text-stone-deep md:hidden">
                {c.place} · {c.coordinates}
              </span>
            </span>
            <span className="label hidden md:block">
              {c.place}, {c.country}
            </span>
            <span className="coord hidden text-stone-deep md:block">{c.coordinates}</span>
            <span className="coord text-right text-stone-deep">{c.year}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
