import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/content/products";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.shop.label };
}

// Step 2: this page will load real products from Shopify.
export default async function ShopPage() {
  const { t } = await getTexts();
  return (
    <>
      <PageIntro label={t.shop.label} title={t.shop.title} />
      <section className="grid grid-cols-2 gap-x-3 gap-y-12 px-5 pb-32 md:grid-cols-4 md:gap-x-5 md:px-10 md:pb-56">
        {products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </section>
    </>
  );
}
