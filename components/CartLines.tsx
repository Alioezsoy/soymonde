"use client";

import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { formatPrice, getProduct } from "@/content/products";
import { setQuantity, useCart } from "@/lib/cart";
import { href, type Locale } from "@/lib/i18n";
import { Plate } from "./Plate";

/** The contents of the bag: used in the slide-in panel and on the bag page. */
export function CartLines({
  lang,
  t,
  onNavigate,
}: {
  lang: Locale;
  t: Dictionary["cart"];
  onNavigate?: () => void;
}) {
  const lines = useCart()
    .map((line) => ({ line, product: getProduct(line.handle) }))
    .filter((x) => x.product);
  const subtotal = lines.reduce((sum, { line, product }) => sum + product!.price * line.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-start justify-center gap-6">
        <p className="display text-lg md:text-xl">{t.empty}</p>
        <Link href={href(lang, "/shop")} onClick={onNavigate} className="label link-line">
          {t.continue}
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="flex-1 divide-y divide-rule overflow-y-auto">
        {lines.map(({ line, product }) => (
          <li key={`${line.handle}-${line.size}`} className="flex gap-4 py-5">
            <Link
              href={href(lang, `/shop/${line.handle}`)}
              onClick={onNavigate}
              className="w-20 shrink-0 bg-bone md:w-24"
              aria-label={product!.title}
            >
              <Plate frame={product!.frames[0]} className="aspect-[4/5]" sizes="96px" blend />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm md:text-base">{product!.title}</p>
                <p className="coord shrink-0 pt-1">{formatPrice(product!.price * line.quantity)}</p>
              </div>
              <p className="coord mt-1 text-stone-deep">
                {product!.colour[lang]} · {t.size} {line.size}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center border border-ink/25" role="group" aria-label={t.quantity}>
                  <button
                    type="button"
                    aria-label="−"
                    className="coord size-9"
                    onClick={() => setQuantity(line.handle, line.size, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="coord w-6 text-center">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="+"
                    className="coord size-9"
                    onClick={() => setQuantity(line.handle, line.size, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="label link-line text-stone-deep"
                  onClick={() => setQuantity(line.handle, line.size, 0)}
                >
                  {t.remove}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-ink/25 pt-5">
        <div className="flex items-baseline justify-between">
          <span className="label">{t.subtotal}</span>
          <span className="coord text-sm">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-sm font-light text-stone-deep">{t.note}</p>
        {/* Checkout is switched on when Shopify is connected. */}
        <button type="button" disabled className="label mt-5 h-14 w-full bg-ink/15 text-ink/60">
          {t.checkoutSoon}
        </button>
      </div>
    </>
  );
}
