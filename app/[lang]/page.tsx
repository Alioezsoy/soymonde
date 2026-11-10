import Image from "next/image";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getArchive } from "@/content/archive";
import { products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

// How many products the start page shows before "View all".
const FEATURED = 6;

export default async function Home() {
  const { lang, t } = await getTexts();
  const featured = products.slice(0, FEATURED);
  const archive = getArchive().slice(0, 6);

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
