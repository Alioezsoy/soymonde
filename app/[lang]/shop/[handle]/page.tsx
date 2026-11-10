import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToBag } from "@/components/AddToBag";
import { Plate } from "@/components/Plate";
import { ProductRail } from "@/components/ProductRail";
import { Reveal } from "@/components/Reveal";
import { formatPrice, getProduct, products } from "@/content/products";
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
            <div key={i} className="w-[88vw] shrink-0 snap-start pr-1 last:pr-0 md:w-auto md:pr-0">
              <Plate
                frame={frame}
                className="aspect-[3/4]"
                sizes="(min-width: 768px) 58vw, 88vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Buying panel: stays in view on desktop */}
        <div className="px-5 pt-6 md:col-span-5 md:px-0 md:pt-0 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-28">
            <h1 className="display text-xl md:text-2xl">{product.title}</h1>
            <div className="mt-5 flex items-baseline justify-between">
              <p className="coord text-sm">{formatPrice(product.price)}</p>
              <p className="label text-stone-deep">
                {t.shop.colour}: <span className="text-ink">{product.colour[lang]}</span>
              </p>
            </div>

            <div className="mt-9">
              <AddToBag handle={product.handle} sizes={product.sizes} t={t.shop} />
            </div>

            <div className="mt-10 border-t border-rule">
              <details className="group/d border-b border-rule" open>
                <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                  {t.shop.details}
                  <span className="coord transition-transform duration-500 group-open/d:rotate-45">+</span>
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
                  <span className="coord transition-transform duration-500 group-open/d:rotate-45">+</span>
                </summary>
                <p className="pb-6 font-light text-stone-deep">{t.shop.shippingText}</p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden px-5 py-28 md:px-10 md:py-48">
        <Reveal>
          <h2 className="label mb-8 text-stone-deep md:mb-12">{t.shop.more}</h2>
          <ProductRail products={more} lang={lang} soldOutLabel={t.shop.soldOut} />
        </Reveal>
      </section>
    </>
  );
}
