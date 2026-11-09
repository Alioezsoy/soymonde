import Link from "next/link";
import { ChapterIndex } from "@/components/ChapterIndex";
import { Plate } from "@/components/Plate";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { chaptersNewestFirst } from "@/content/chapters";
import { products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

// How many products the start page shows before "View all".
const FEATURED = 6;

export default async function Home() {
  const { lang, t } = await getTexts();
  const latest = chaptersNewestFirst[0];
  const latestHref = href(lang, `/archive/${latest.slug}`);
  const featured = products.slice(0, FEATURED);

  return (
    <>
      {/* The products come first: visible the moment the page opens */}
      <section className="px-5 pt-24 md:px-10 md:pt-32">
        <div className="mb-5 flex items-baseline justify-between md:mb-8">
          <h1 className="label">
            {t.home.pieces} <span className="text-stone-deep">· {products.length}</span>
          </h1>
          <Link href={href(lang, "/shop")} className="label link-line">
            {t.home.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-16">
          {featured.map((p, i) => (
            <ProductCard key={p.handle} product={p} lang={lang} soldOutLabel={t.shop.soldOut} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* Latest chapter: one large image, title set over it */}
      <section className="px-5 pt-28 md:px-10 md:pt-48">
        <Reveal>
          <Link href={latestHref} className="group relative block text-bone">
            <Plate frame={latest.cover} className="aspect-[3/4] md:aspect-[16/9]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute inset-x-4 top-4 flex items-baseline justify-between md:inset-x-8 md:top-7">
              <span className="label">{t.home.latest}</span>
              <span className="coord">{latest.number}</span>
            </div>
            <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-7">
              <h2 className="display text-2xl md:text-5xl">{latest.title}</h2>
              <div className="mt-4 flex items-end justify-between gap-4 md:mt-6">
                <span className="label">
                  {latest.place[lang]}, {latest.country[lang]}
                  <span className="coord mt-1 block text-bone/70">{latest.coordinates}</span>
                </span>
                <span className="label link-line">{t.home.discover}</span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* The world: chapter index */}
      <section className="px-5 py-28 md:px-10 md:py-48">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between md:mb-12">
            <h2 className="label text-stone-deep">{t.home.world}</h2>
            <Link href={href(lang, "/archive")} className="label link-line">
              {t.home.openArchive}
            </Link>
          </div>
          <ChapterIndex chapters={chaptersNewestFirst} lang={lang} />
        </Reveal>
      </section>
    </>
  );
}
