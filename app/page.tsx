import Link from "next/link";
import { ChapterIndex } from "@/components/ChapterIndex";
import { Monogram, Wordmark } from "@/components/Logo";
import { Plate } from "@/components/Plate";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { chaptersNewestFirst } from "@/content/chapters";
import { products } from "@/content/products";
import { site } from "@/content/site";

export default function Home() {
  const latest = chaptersNewestFirst[0];

  return (
    <>
      {/* Opening: the gothic monogram against the clean wordmark */}
      <section className="relative flex h-svh min-h-[34rem] flex-col items-center justify-center overflow-hidden bg-ink text-bone">
        <Plate frame={{ ...latest.cover, tone: "ink" }} className="!absolute inset-0" priority />
        <div className="relative flex flex-col items-center">
          <Monogram tone="white" className="h-auto w-[min(62vw,56svh,38rem)]" />
          <Wordmark tone="white" className="mt-9 w-[min(52vw,24rem)] md:mt-14" />
        </div>
        <div className="absolute inset-x-5 bottom-6 flex items-end justify-between md:inset-x-10 md:bottom-9">
          <Link href={`/archive/${latest.slug}`} className="coord link-line">
            {latest.number} — {latest.place}
          </Link>
          <span className="coord text-bone/60">{latest.coordinates}</span>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-5 py-28 md:px-10 md:py-56">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="display text-3xl md:text-6xl">{site.manifesto}</p>
          <Link href="/about" className="label link-line mt-12 inline-block md:mt-16">
            The story
          </Link>
        </Reveal>
      </section>

      {/* Latest chapter */}
      <section className="px-5 md:px-10">
        <Reveal>
          <Link href={`/archive/${latest.slug}`} className="group block">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="label text-stone-deep">Latest chapter</span>
              <span className="coord">{latest.number}</span>
            </div>
            <Plate frame={latest.cover} className="aspect-[4/5] md:aspect-[16/9]" />
            <div className="mt-5 grid gap-3 md:mt-7 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-baseline md:gap-6">
              <h2 className="display text-4xl md:text-6xl">{latest.title}</h2>
              <span className="label">
                {latest.place}, {latest.country}
              </span>
              <span className="coord text-stone-deep">{latest.coordinates}</span>
              <span className="label link-line justify-self-start">Enter chapter</span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Selected pieces */}
      <section className="px-5 pt-32 md:px-10 md:pt-56">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between md:mb-12">
            <h2 className="label text-stone-deep">Selected pieces</h2>
            <Link href="/shop" className="label link-line">
              View shop
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {products.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* The world: chapter index */}
      <section className="px-5 py-32 md:px-10 md:py-56">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between md:mb-12">
            <h2 className="label text-stone-deep">The world so far</h2>
            <Link href="/archive" className="label link-line">
              Open archive
            </Link>
          </div>
          <ChapterIndex chapters={chaptersNewestFirst} />
        </Reveal>
      </section>
    </>
  );
}
