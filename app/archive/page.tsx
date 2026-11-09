import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { WorldLine } from "@/components/WorldLine";
import { chaptersNewestFirst } from "@/content/chapters";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Archive",
  description: site.archiveIntro,
};

export default function ArchivePage() {
  return (
    <>
      <PageIntro label="Archive" title="The World">
        <p>{site.archiveIntro}</p>
      </PageIntro>

      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <Reveal>
          <WorldLine chapters={chaptersNewestFirst} />
        </Reveal>
      </section>

      <div className="space-y-28 px-5 pb-32 md:space-y-52 md:px-10 md:pb-56">
        {chaptersNewestFirst.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={c.slug}>
              <article>
                <Link
                  href={`/archive/${c.slug}`}
                  className="group grid gap-6 md:grid-cols-12 md:items-end md:gap-10"
                >
                  <div className={`md:col-span-8 ${flip ? "md:order-2" : ""}`}>
                    <Plate
                      frame={c.cover}
                      className="aspect-[4/5] md:aspect-[3/2]"
                      sizes="(min-width: 768px) 66vw, 100vw"
                    />
                  </div>
                  <div className={`md:col-span-4 md:pb-2 ${flip ? "md:order-1" : ""}`}>
                    <p className="coord">{c.number}</p>
                    <h2 className="display mt-3 text-5xl md:mt-5 md:text-7xl">{c.title}</h2>
                    <p className="mt-5 max-w-sm font-light leading-relaxed text-stone-deep md:mt-8">
                      {c.summary}
                    </p>
                    <dl className="mt-6 space-y-2 border-t border-rule pt-5 md:mt-10">
                      <div className="flex justify-between gap-4">
                        <dt className="label text-stone-deep">Place</dt>
                        <dd className="label text-right">
                          {c.place}, {c.country}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="label text-stone-deep">Position</dt>
                        <dd className="coord">{c.coordinates}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="label text-stone-deep">Year</dt>
                        <dd className="coord">{c.year}</dd>
                      </div>
                    </dl>
                    <span className="label link-line mt-8 inline-block">Enter chapter</span>
                  </div>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
