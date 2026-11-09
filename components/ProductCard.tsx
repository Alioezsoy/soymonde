import Link from "next/link";
import { formatPrice, type Product } from "@/content/products";
import { href, type Locale } from "@/lib/i18n";
import { Plate } from "./Plate";

/** Product tile: image, second image on hover, name, price, available sizes. */
export function ProductCard({
  product,
  lang,
  soldOutLabel,
  sizes = "(min-width: 768px) 33vw, 50vw",
}: {
  product: Product;
  lang: Locale;
  soldOutLabel: string;
  sizes?: string;
}) {
  const soldOut = product.sizes.every((s) => !s.available);
  return (
    <Link href={href(lang, `/shop/${product.handle}`)} className="group block">
      <div className="relative">
        <Plate frame={product.frames[0]} className="aspect-[3/4]" sizes={sizes} />
        {product.frames[1] ? (
          <div className="swap-second absolute inset-0">
            <Plate frame={product.frames[1]} className="h-full" sizes={sizes} />
          </div>
        ) : null}
        {soldOut ? (
          <span className="label absolute left-3 top-3 bg-bone px-2 py-1 text-ink">{soldOutLabel}</span>
        ) : (
          <span className="coord absolute inset-x-3 bottom-3 hidden justify-between text-bone opacity-0 mix-blend-difference transition-opacity duration-700 group-hover:opacity-100 md:flex">
            {product.sizes.map((s) => (
              <span key={s.label} className={s.available ? "" : "line-through opacity-50"}>
                {s.label}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 md:mt-4">
        <div>
          <p className="text-sm md:text-base">{product.title}</p>
          <p className="coord mt-1 text-stone-deep">
            {product.colour[lang]} · {product.chapter}
          </p>
        </div>
        <p className="coord shrink-0 pt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
