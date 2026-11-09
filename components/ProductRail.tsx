import type { Product } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

/** A row of products you can swipe sideways. */
export function ProductRail({
  products,
  lang,
  soldOutLabel,
}: {
  products: Product[];
  lang: Locale;
  soldOutLabel: string;
}) {
  return (
    <div className="rail -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:-mx-10 md:gap-5 md:px-10 md:[scroll-padding-inline:2.5rem] [scroll-padding-inline:1.25rem]">
      {products.map((p) => (
        <div key={p.handle} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-[27vw]">
          <ProductCard product={p} lang={lang} soldOutLabel={soldOutLabel} sizes="(min-width: 1024px) 27vw, 68vw" />
        </div>
      ))}
    </div>
  );
}
