import type { Metadata } from "next";
import { CartLines } from "@/components/CartLines";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.cart.label };
}

export default async function CartPage() {
  const { lang, t } = await getTexts();
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-2xl flex-col px-5 pb-32 pt-36 md:pb-48 md:pt-48">
      <h1 className="label mb-6 text-stone-deep">{t.cart.label}</h1>
      <CartLines lang={lang} t={t.cart} />
    </section>
  );
}
