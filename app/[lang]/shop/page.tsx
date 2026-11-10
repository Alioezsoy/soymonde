import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
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
    <section className="px-5 pb-28 pt-24 md:px-10 md:pb-48 md:pt-32">
      <h1 className="display mb-10 text-center text-xl md:mb-14 md:text-2xl">{t.shop.title}</h1>
      <ProductGrid count={products.length} countLabel={t.shop.title} viewLabel={t.shop.view}>
        {products.map((p, i) => (
          <ProductCard key={p.handle} product={p} lang={lang} t={t.shop} priority={i < 4} />
        ))}
      </ProductGrid>
    </section>
  );
}
