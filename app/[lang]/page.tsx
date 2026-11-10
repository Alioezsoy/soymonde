import Image from "next/image";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { getArchive } from "@/content/archive";
import { products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

// How many products the start page shows before "View all".
const FEATURED = 8;

export default async function Home() {
  const { lang, t } = await getTexts();
  const featured = products.slice(0, FEATURED);
  const archive = getArchive().slice(0, 6);

  return (
    <>
      {/* The products come first: visible the moment the page opens */}
      <section className="px-5 pt-24 md:px-10 md:pt-32">
        <h1 className="sr-only">SOYMONDE</h1>
        <ProductGrid
          count={products.length}
          countLabel={t.home.pieces}
          viewLabel={t.shop.view}
          action={
            <Link href={href(lang, "/shop")} className="label link-line">
              {t.home.viewAll}
            </Link>
          }
        >
          {featured.map((p, i) => (
            <ProductCard key={p.handle} product={p} lang={lang} t={t.shop} priority={i < 4} />
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
