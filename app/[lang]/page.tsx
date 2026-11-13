import Image from "next/image";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { getArchive } from "@/content/archive";
import { collections } from "@/content/collections";
import { inCollection, products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

// How many products the start page shows before "View all".
const FEATURED = 8;

export default async function Home() {
  const { lang, t } = await getTexts();
  const collection = collections[0];
  const drop = inCollection(collection.key);
  const others = products.filter((p) => p.collection !== collection.key);
  const archive = getArchive().slice(0, 6);

  return (
    <>
      {/* The current collection comes first: visible the moment the page opens */}
      <section className="px-5 pt-24 md:px-10 md:pt-32">
        <h1 className="sr-only">SOYMONDE</h1>
        <ProductGrid
          count={drop.length}
          countLabel={<span lang="en">{collection.title}</span>}
          viewLabel={t.shop.view}
          action={
            <Link href={href(lang, `/collection/${collection.slug}`)} className="label link-line">
              {t.home.discover}
            </Link>
          }
        >
          {drop.map((p, i) => (
            <ProductCard key={p.handle} product={p} lang={lang} t={t.shop} priority={i < 4} />
          ))}
        </ProductGrid>
      </section>

      {/* Everything else */}
      <section className="px-5 pt-20 md:px-10 md:pt-32">
        <ProductGrid
          count={others.length}
          countLabel={t.home.pieces}
          viewLabel={t.shop.view}
          action={
            <Link href={href(lang, "/shop")} className="label link-line">
              {t.home.viewAll}
            </Link>
          }
        >
          {others.slice(0, FEATURED).map((p) => (
            <ProductCard key={p.handle} product={p} lang={lang} t={t.shop} />
          ))}
        </ProductGrid>
      </section>

      {/* A look into the archive */}
      <section className="overflow-hidden px-5 py-28 md:px-10 md:py-48">
        <Reveal>
          <div className="mb-5 flex items-baseline justify-between md:mb-8">
            <h2 className="label">{t.home.archive}</h2>
            <Link href={href(lang, "/archive")} className="label link-line">
              {t.home.discover}
            </Link>
          </div>
          <Link
            href={href(lang, "/archive")}
            aria-label={t.home.archive}
            className="rail group -mx-5 flex items-end gap-3 overflow-x-auto px-5 md:-mx-10 md:gap-5 md:px-10"
          >
            {archive.map((entry, i) => (
              <div key={i} className="h-[52svh] shrink-0 md:h-[68svh]" style={{ aspectRatio: `${entry.width} / ${entry.height}` }}>
                {entry.src ? (
                  <Image
                    src={entry.src}
                    alt={entry.alt}
                    width={entry.width}
                    height={entry.height}
                    sizes="70vw"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Plate frame={entry} className="h-full" />
                )}
              </div>
            ))}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
