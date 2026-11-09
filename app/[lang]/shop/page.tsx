import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/content/products";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.shop.label };
}

// Next step: this page loads the real products from Shopify.
export default async function ShopPage() {
  const { lang, t } = await getTexts();
  return (
    <>
      <PageIntro label={`${t.shop.label} · ${products.length}`} title={t.shop.title} />
      <section className="grid grid-cols-2 gap-x-3 gap-y-12 px-5 pb-32 md:grid-cols-3 md:gap-x-5 md:gap-y-20 md:px-10 md:pb-56">
        {products.map((p) => (
          <Reveal key={p.handle}>
            <ProductCard product={p} lang={lang} soldOutLabel={t.shop.soldOut} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
