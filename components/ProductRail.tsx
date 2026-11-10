import type { Dictionary } from "@/content/dictionaries";
import type { Product } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

/** A row of products you can swipe sideways. */
export function ProductRail({
  products,
  lang,
  t,
}: {
  products: Product[];
  lang: Locale;
  t: Dictionary["shop"];
}) {
  return (
    <div className="rail -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 [scroll-padding-inline:1.25rem] md:-mx-10 md:gap-3 md:px-10 md:[scroll-padding-inline:2.5rem]">
      {products.map((p) => (
        <div key={p.handle} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23vw]">
          <ProductCard product={p} lang={lang} t={t} sizes="(min-width: 1024px) 23vw, 62vw" />
        </div>
      ))}
    </div>
  );
}
