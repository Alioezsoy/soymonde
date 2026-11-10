import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductRail } from "@/components/ProductRail";
import { Reveal } from "@/components/Reveal";
import { getProduct, products } from "@/content/products";
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
      <ProductDetail product={product} lang={lang} t={t.shop} />

      <section className="overflow-hidden px-5 py-28 md:px-10 md:py-48">
        <Reveal>
          <h2 className="label mb-8 text-stone-deep md:mb-12">{t.shop.more}</h2>
          <ProductRail products={more} lang={lang} t={t.shop} />
        </Reveal>
      </section>
    </>
  );
}
