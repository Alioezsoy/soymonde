import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShopBrowser, type ShopItem } from "@/components/ShopBrowser";
import { products } from "@/content/products";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.shop.label };
}

// Next step: this page loads the real products from Shopify.
export default async function ShopPage() {
  const { lang, t } = await getTexts();

  const items: ShopItem[] = products.map((p, i) => ({
    handle: p.handle,
    types: p.types,
    gender: p.gender,
    basic: Boolean(p.basic),
    card: <ProductCard product={p} lang={lang} t={t.shop} priority={i < 4} />,
  }));

  return (
    <section className="px-5 pb-28 pt-24 md:px-10 md:pb-48 md:pt-32">
      <h1 className="display mb-8 text-center text-xl md:mb-12 md:text-2xl">{t.shop.title}</h1>
      {/* The filters read the address, so this part waits for the browser. */}
      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <ShopBrowser items={items} t={t.shop} />
      </Suspense>
    </section>
  );
}
