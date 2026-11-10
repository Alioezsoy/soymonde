import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { formatPrice, type Product } from "@/content/products";
import { href, type Locale } from "@/lib/i18n";
import { Plate } from "./Plate";

/** A small boxed label: New, Limited. */
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="label border border-ink/60 px-1.5 py-0.5 !text-[0.5625rem]">{children}</span>;
}

/** Product tile: a light card holding image, labels, name, price and colour. */
export function ProductCard({
  product,
  lang,
  t,
  sizes = "(min-width: 768px) 33vw, 50vw",
  priority = false,
}: {
  product: Product;
  lang: Locale;
  t: Dictionary["shop"];
  sizes?: string;
  /** load the image early: for tiles visible when the page opens */
  priority?: boolean;
}) {
  return (
    <Link href={href(lang, `/shop/${product.handle}`)} className="group flex h-full flex-col bg-paper">
      <div className="relative">
        <Plate frame={product.frames[0]} className="aspect-[4/5]" sizes={sizes} priority={priority} blend />
        {product.frames[1] ? (
          <div className="swap-second absolute inset-0 bg-paper">
            <Plate frame={product.frames[1]} className="h-full" sizes={sizes} blend />
          </div>
        ) : null}
        <span className="coord absolute inset-x-3 bottom-3 hidden justify-between text-bone opacity-0 mix-blend-difference transition-opacity duration-700 group-hover:opacity-100 md:flex">
            {product.sizes.map((s) => (
              <span key={s.label}>{s.label}</span>
            ))}
          </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-3 md:px-4 md:pb-5">
        <div className="flex min-h-5 flex-wrap gap-1.5">
          {product.tag ? <Tag>{t.tags[product.tag]}</Tag> : null}
        </div>
        <p lang="en" className="label mt-2">{product.title}</p>
        <p className="coord mt-1.5 text-stone-deep">{formatPrice(product.price)}</p>
        <span
          className="mt-3 block size-3 rounded-full border border-ink/20"
          style={{ background: product.swatch }}
          title={product.colour[lang]}
          role="img"
          aria-label={product.colour[lang]}
        />
      </div>
    </Link>
  );
}
