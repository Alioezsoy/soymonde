import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { chapters, getChapter, type Block } from "@/content/chapters";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/archive/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.number} ${chapter.title}`,
    description: chapter.summary,
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.layout) {
    case "full":
      return <Plate frame={block.frames[0]} className="aspect-[4/5] md:aspect-[16/9]" showCaption />;
    case "pair":
      return (
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {block.frames.map((f, i) => (
            <Plate
              key={i}
              frame={f}
              className="aspect-[3/4]"
              sizes="50vw"
              showCaption
            />
          ))}
        </div>
      );
    case "offset-left":
    case "offset-right":
      return (
        <div className={`flex ${block.layout === "offset-right" ? "justify-end" : ""}`}>
          <Plate
            frame={block.frames[0]}
            className="aspect-[4/5] w-4/5 md:w-5/12"
            sizes="(min-width: 768px) 42vw, 80vw"
            showCaption
          />
        </div>
      );
    case "text":
      return (
        <p className="display mx-auto max-w-3xl py-8 text-center text-3xl md:py-20 md:text-5xl">
          {block.text}
        </p>
      );
  }
}

export default function ChapterPage({ params }: PageProps<"/archive/[slug]">) {
  return (
    <Suspense fallback={<div className="h-svh bg-ink" />}>
      <ChapterView params={params} />
    </Suspense>
  );
}

async function ChapterView({ params }: { params: PageProps<"/archive/[slug]">["params"] }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const index = chapters.indexOf(chapter);
  const next = chapters[(index + 1) % chapters.length];

  return (
    <article>
      {/* Chapter opening */}
      <header className="relative flex h-svh min-h-[34rem] flex-col justify-end overflow-hidden bg-ink text-bone">
        <Plate frame={chapter.cover} className="!absolute inset-0" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="relative px-5 pb-6 md:px-10 md:pb-9">
          <p className="coord">{chapter.number}</p>
          <h1 className="display mt-3 text-6xl md:mt-5 md:text-[9rem]">{chapter.title}</h1>
          <div className="mt-6 flex items-end justify-between md:mt-10">
            <span className="label">
              {chapter.place}, {chapter.country}
            </span>
            <span className="coord text-bone/70">{chapter.coordinates}</span>
          </div>
        </div>
      </header>

      {/* Intro text */}
      <section className="grid gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-48">
        <dl className="space-y-2 md:col-span-3">
          <div className="flex justify-between gap-4 md:block">
            <dt className="label text-stone-deep">Chapter</dt>
            <dd className="coord md:mt-1">{chapter.number}</dd>
          </div>
          <div className="flex justify-between gap-4 md:block md:pt-4">
            <dt className="label text-stone-deep">Position</dt>
            <dd className="coord md:mt-1">{chapter.coordinates}</dd>
          </div>
          <div className="flex justify-between gap-4 md:block md:pt-4">
            <dt className="label text-stone-deep">Year</dt>
            <dd className="coord md:mt-1">{chapter.year}</dd>
          </div>
        </dl>
        <Reveal className="space-y-6 text-xl font-light leading-relaxed md:col-span-7 md:col-start-5 md:text-3xl md:leading-snug">
          {chapter.intro.map((p, i) => (
            <p key={i} className={i > 0 ? "text-stone-deep" : ""}>
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Images */}
      <section className="space-y-3 px-5 md:space-y-5 md:px-10">
        {chapter.blocks.map((block, i) => (
          <Reveal key={i} className={block.layout.startsWith("offset") ? "py-12 md:py-28" : ""}>
            <BlockView block={block} />
          </Reveal>
        ))}
      </section>

      {/* Next chapter */}
      <nav aria-label="Next chapter" className="px-5 py-32 md:px-10 md:py-56">
        <Link href={`/archive/${next.slug}`} className="group block border-t border-rule pt-8">
          <div className="flex items-baseline justify-between">
            <span className="label text-stone-deep">Next chapter</span>
            <span className="coord text-stone-deep">{next.coordinates}</span>
          </div>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="coord">{next.number}</span>
            <span className="display link-line text-5xl md:text-8xl">{next.title}</span>
          </p>
        </Link>
      </nav>
    </article>
  );
}
