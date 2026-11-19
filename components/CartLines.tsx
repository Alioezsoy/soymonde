"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { getProduct, getVariant } from "@/content/products";
import { formatMoney, useMarket } from "@/lib/market";
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
    .flatMap((line) => {
      const product = getProduct(line.handle);
      return product ? [{ line, product, variant: getVariant(product, line.colour) }] : [];
    });
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // Hands the bag to Shopify and opens its checkout.
  const checkout = async () => {
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lang,
          lines: lines.map(({ line }) => ({ handle: line.handle, size: line.size, quantity: line.quantity })),
        }),
      });
      const json = (await res.json()) as { url?: string };
      if (!res.ok || !json.url) throw new Error("checkout");
      window.location.assign(json.url);
    } catch {
      setFailed(true);
      setBusy(false);
    }
  };

  const market = useMarket();
  // prices in the visitor's currency once known; CHF until then
  const priceOf = (handle: string, chf: number | undefined) => market?.prices[handle] ?? chf ?? 0;
  const currency = market?.currency ?? "CHF";
  const subtotal = lines.reduce((sum, { line, product }) => sum + priceOf(product.handle, product.price) * line.quantity, 0);

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
        {lines.map(({ line, product, variant }) => (
          <li key={`${line.handle}-${variant.key}-${line.size}`} className="flex gap-4 py-5">
            <Link
              href={href(lang, `/shop/${line.handle}`)}
              onClick={onNavigate}
              className="w-20 shrink-0 bg-paper md:w-24"
              aria-label={product.title}
            >
              <Plate frame={variant.frames[0]} className="aspect-[4/5]" sizes="96px" blend contain />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm md:text-base">{product.title}</p>
                <p className="coord shrink-0 pt-1">{formatMoney(priceOf(product.handle, product.price) * line.quantity, currency, lang)}</p>
              </div>
              <p className="coord mt-1 text-stone-deep">
                {variant.colour[lang]} · {t.size} {line.size}
              </p>
              {product.preorder ? <p className="coord mt-1 text-stone-deep">{t.preorder}</p> : null}
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center border border-ink/25" role="group" aria-label={t.quantity}>
                  <button
                    type="button"
                    aria-label="−"
                    className="coord size-9"
                    onClick={() => setQuantity(line.handle, variant.key, line.size, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="coord w-6 text-center">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="+"
                    className="coord size-9"
                    onClick={() => setQuantity(line.handle, variant.key, line.size, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="label link-line text-stone-deep"
                  onClick={() => setQuantity(line.handle, variant.key, line.size, 0)}
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
          <span className="coord text-sm">{formatMoney(subtotal, currency, lang)}</span>
        </div>
        <p className="mt-2 text-sm font-light text-stone-deep">{t.note}</p>
        <button
          type="button"
          onClick={checkout}
          disabled={busy}
          className="label mt-5 h-14 w-full bg-ink text-bone transition-opacity duration-500 hover:opacity-85 disabled:opacity-60"
        >
          {busy ? t.checkoutBusy : t.checkout}
        </button>
        {failed ? (
          <p className="mt-3 text-sm font-light" role="alert">
            {t.checkoutError}
          </p>
        ) : null}
      </div>
    </>
  );
}
