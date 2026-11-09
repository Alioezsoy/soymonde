import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Plate } from "@/components/Plate";
import { ProductRail } from "@/components/ProductRail";
import { Reveal } from "@/components/Reveal";
import { chapters, getChapter, type Block } from "@/content/chapters";
import { products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

type Props = PageProps<"/[lang]/archive/[slug]">;

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  return chapter ? { title: `${chapter.number} ${chapter.title}` } : {};
}

function BlockView({ block }: { block: Block }) {
  switch (block.layout) {
    case "full":
      return <Plate frame={block.frames[0]} className="aspect-[4/5] md:aspect-[16/9]" showCaption />;
    case "pair":
      return (
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {block.frames.map((f, i) => (
            <Plate key={i} frame={f} className="aspect-[3/4]" sizes="50vw" showCaption />
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
  }
}

export default function ChapterPage({ params }: Props) {
  return (
    <Suspense fallback={<div data-header-dark className="h-svh bg-ink" />}>
      <ChapterView params={params} />
    </Suspense>
  );
}

async function ChapterView({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const { lang, t } = await getTexts();

  const next = chapters[(chapters.indexOf(chapter) + 1) % chapters.length];
  const pieces = products.filter((p) => p.chapter === chapter.number);

  return (
    <article>
      {/* Chapter opening */}
      <header data-header-dark className="relative flex h-svh min-h-[34rem] flex-col justify-end overflow-hidden bg-ink text-bone">
        <Plate frame={chapter.cover} className="!absolute inset-0" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent" />
        <div className="relative px-5 pb-6 md:px-10 md:pb-9">
          <p className="coord">{chapter.number}</p>
          <h1 className="display mt-2 text-[24vw] md:text-[15vw]">{chapter.title}</h1>
          <div className="mt-5 flex items-end justify-between md:mt-8">
            <span className="label">
              {chapter.place[lang]}, {chapter.country[lang]}
            </span>
            <span className="coord text-bone/70">
              {chapter.coordinates} · {chapter.year}
            </span>
          </div>
        </div>
      </header>

      {/* Images */}
      <section className="space-y-3 px-5 pt-3 md:space-y-5 md:px-10 md:pt-5">
        {chapter.blocks.map((block, i) => (
          <Reveal key={i} className={block.layout.startsWith("offset") ? "py-12 md:py-28" : ""}>
            <BlockView block={block} />
          </Reveal>
        ))}
      </section>

      {/* Pieces from this chapter */}
      {pieces.length > 0 ? (
        <section className="overflow-hidden px-5 pt-28 md:px-10 md:pt-48">
          <Reveal>
            <h2 className="label mb-8 text-stone-deep md:mb-12">{t.archive.pieces}</h2>
            <ProductRail products={pieces} lang={lang} soldOutLabel={t.shop.soldOut} />
          </Reveal>
        </section>
      ) : null}

      {/* Next chapter */}
      <nav aria-label={t.archive.next} className="px-5 py-28 md:px-10 md:py-48">
        <Link href={href(lang, `/archive/${next.slug}`)} className="group block border-t border-rule pt-8">
          <div className="flex items-baseline justify-between">
            <span className="label text-stone-deep">{t.archive.next}</span>
            <span className="coord">{next.number}</span>
          </div>
          <p className="display mt-4 text-[20vw] md:text-[13vw]">{next.title}</p>
        </Link>
      </nav>
    </article>
  );
}
