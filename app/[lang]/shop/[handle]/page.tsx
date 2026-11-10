import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { AddToBag } from "@/components/AddToBag";
import { ChevronIcon } from "@/components/Icons";
import { Tag } from "@/components/ProductCard";
import { Plate } from "@/components/Plate";
import { ProductRail } from "@/components/ProductRail";
import { Reveal } from "@/components/Reveal";
import { formatPrice, getProduct, products } from "@/content/products";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

type Props = PageProps<"/[lang]/shop/[handle]">;

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  return product ? { title: product.title } : {};
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="h-svh" />}>
      <ProductView params={params} />
    </Suspense>
  );
}

async function ProductView({ params }: { params: Props["params"] }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const { lang, t } = await getTexts();

  const more = products.filter((p) => p.handle !== product.handle);

  return (
    <>
      <div className="pt-16 md:grid md:grid-cols-12 md:gap-10 md:px-10 md:pt-24">
        {/* Images: swipe on the phone, stacked on desktop */}
        <div className="rail flex snap-x snap-mandatory overflow-x-auto md:col-span-7 md:block md:space-y-5 md:overflow-visible">
          {product.frames.map((frame, i) => (
            <div
              key={i}
              className="w-[88vw] shrink-0 snap-start pr-1 last:pr-0 md:w-auto md:pr-0"
            >
              {/* bone behind the photo, so its white background melts into the page */}
              <div className="bg-bone">
                <Plate
                  frame={frame}
                  className="aspect-[4/5] md:aspect-square"
                  sizes="(min-width: 768px) 58vw, 88vw"
                  blend
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buying panel: stays in view on desktop */}
        <div className="px-5 pt-6 md:col-span-5 md:px-0 md:pt-0 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-28">
            <nav
              aria-label="Breadcrumb"
              className="coord flex gap-2 text-stone-deep"
            >
              <Link href={href(lang, "/shop")} className="link-line">
                {t.shop.label}
              </Link>
              <span aria-hidden="true">/</span>
              <span lang="en" className="truncate text-ink">
                {product.title}
              </span>
            </nav>
            <div className="mt-6 flex min-h-5 gap-1.5">
              {product.tag ? <Tag>{t.shop.tags[product.tag]}</Tag> : null}
            </div>
            <h1 lang="en" className="display mt-3 text-xl md:text-2xl">
              {product.title}
            </h1>
            <p className="coord mt-3 text-sm">{formatPrice(product.price)}</p>

            <div className="mt-8 border-t border-rule pt-5">
              <p className="label text-stone-deep">
                {t.shop.colour}{" "}
                <span className="ml-2 text-ink">{product.colour[lang]}</span>
              </p>
              <span className="mt-3 inline-flex h-12 items-center gap-2.5 border border-ink px-4">
                <span
                  className="size-3.5 rounded-full border border-ink/20"
                  style={{ background: product.swatch }}
                />
                <span className="coord">{product.colour[lang]}</span>
              </span>
            </div>

            <div className="mt-7">
              <AddToBag
                handle={product.handle}
                sizes={product.sizes}
                t={t.shop}
              />
            </div>

            <div className="mt-10 border-t border-rule">
              <details className="group/d border-b border-rule" open>
                <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                  {t.shop.details}
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
                  {t.shop.shipping}
                  <ChevronIcon className="transition-transform duration-500 group-open/d:rotate-180" />
                </summary>
                <p className="pb-6 font-light text-stone-deep">
                  {t.shop.shippingText}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden px-5 py-28 md:px-10 md:py-48">
        <Reveal>
          <h2 className="label mb-8 text-stone-deep md:mb-12">{t.shop.more}</h2>
          <ProductRail products={more} lang={lang} t={t.shop} />
        </Reveal>
      </section>
    </>
  );
}
