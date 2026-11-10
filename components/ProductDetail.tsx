"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { formatPrice, variantsOf, type Product } from "@/content/products";
import { href, type Locale } from "@/lib/i18n";
import { AddToBag } from "./AddToBag";
import { ChevronIcon } from "./Icons";
import { Plate } from "./Plate";
import { Tag } from "./ProductCard";

/** The product page: photos on one side, everything needed to buy on the other.
    Choosing a colour swaps the photos. */
export function ProductDetail({
  product,
  lang,
  t,
}: {
  product: Product;
  lang: Locale;
  t: Dictionary["shop"];
}) {
  const variants = variantsOf(product);
  const [colour, setColour] = useState(variants[0].key);
  const variant = variants.find((v) => v.key === colour) ?? variants[0];

  return (
    <div className="pt-16 md:grid md:grid-cols-12 md:gap-10 md:px-10 md:pt-24">
      {/* Photos: swipe on the phone, stacked on desktop */}
      <div
        key={variant.key}
        className="rail page-enter flex snap-x snap-mandatory overflow-x-auto md:col-span-7 md:block md:space-y-5 md:overflow-visible"
      >
        {variant.frames.map((frame, i) => (
          <div key={i} className="w-[88vw] shrink-0 snap-start pr-1 last:pr-0 md:w-auto md:pr-0">
            {/* a light panel behind the photo: its white background melts into it,
                and light pieces keep their colour */}
            <div className="bg-paper">
              <Plate
                frame={frame}
                className="aspect-[4/5] md:aspect-square"
                sizes="(min-width: 768px) 58vw, 88vw"
                blend
                contain
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Buying panel: stays in view on desktop */}
      <div className="px-5 pt-6 md:col-span-5 md:px-0 md:pt-0 lg:col-span-4 lg:col-start-9">
        <div className="md:sticky md:top-28">
          <nav aria-label="Breadcrumb" className="coord flex gap-2 text-stone-deep">
            <Link href={href(lang, "/shop")} className="link-line">
              {t.label}
            </Link>
            <span aria-hidden="true">/</span>
            <span lang="en" className="truncate text-ink">
              {product.title}
            </span>
          </nav>
          <div className="mt-6 flex min-h-5 gap-1.5">{product.tag ? <Tag>{t.tags[product.tag]}</Tag> : null}</div>
          <h1 lang="en" className="display mt-3 text-xl md:text-2xl">
            {product.title}
          </h1>
          <p className="coord mt-3 text-sm">{formatPrice(product.price)}</p>

          <div className="mt-8 border-t border-rule pt-5">
            <p className="label text-stone-deep">
              {t.colour} <span className="ml-2 text-ink">{variant.colour[lang]}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  aria-pressed={v.key === variant.key}
                  onClick={() => setColour(v.key)}
                  className={`inline-flex h-12 items-center gap-2.5 border px-4 transition-colors duration-500 ${
                    v.key === variant.key ? "border-ink" : "border-ink/25 hover:border-ink"
                  }`}
                >
                  <span className="size-3.5 rounded-full border border-ink/20" style={{ background: v.swatch }} />
                  <span className="coord">{v.colour[lang]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <AddToBag handle={product.handle} colour={variant.key} sizes={product.sizes} t={t} />
          </div>

          <div className="mt-10 border-t border-rule">
            <details className="group/d border-b border-rule" open>
              <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                {t.details}
                <ChevronIcon className="transition-transform duration-500 group-open/d:rotate-180" />
              </summary>
              <ul className="space-y-1.5 pb-6 font-light text-stone-deep">
                {product.details.map((d, i) => (
                  <li key={i}>{d[lang]}</li>
                ))}
              </ul>
            </details>
            <details className="group/d border-b border-rule">
              <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                {t.shipping}
                <ChevronIcon className="transition-transform duration-500 group-open/d:rotate-180" />
              </summary>
              <p className="pb-6 font-light text-stone-deep">{t.shippingText}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
