import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Monogram } from "@/components/Logo";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { collections, getCollection } from "@/content/collections";
import { inCollection } from "@/content/products";
import { getTexts } from "@/lib/locale";

type Props = PageProps<"/[lang]/collection/[slug]">;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  return collection ? { title: collection.title } : {};
}

export default function CollectionPage({ params }: Props) {
  return (
    <Suspense fallback={<div data-header-dark className="h-[70svh] bg-ink" />}>
      <CollectionView params={params} />
    </Suspense>
  );
}

async function CollectionView({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const { lang, t } = await getTexts();
  const pieces = inCollection(collection.key);

  return (
    <>
      {/* Opening: the name of the drop, nothing else */}
      <header
        data-header-dark
        className="relative flex h-[70svh] min-h-[26rem] flex-col items-center justify-center overflow-hidden bg-ink px-5 text-center text-bone"
      >
        <Monogram tone="white" className="absolute w-[min(70vw,30rem)] opacity-[0.06]" />
        <h1 lang="en" className="display relative text-3xl md:text-6xl">
          {collection.title}
        </h1>
        {collection.upcoming ? <p className="label relative mt-6 text-bone/60">{t.shop.soon}</p> : null}
      </header>

      <section className="px-5 pt-10 md:px-10 md:pt-16">
        <ProductGrid count={pieces.length} countLabel={t.shop.title} viewLabel={t.shop.view}>
          {pieces.map((p, i) => (
            <ProductCard key={p.handle} product={p} lang={lang} t={t.shop} priority={i < 4} />
          ))}
        </ProductGrid>
      </section>

      {/* Before the drop: the newsletter is the way to hear about it first */}
      {collection.upcoming ? (
        <section className="mx-auto max-w-md px-5 py-28 text-center md:py-40">
          <p className="label text-stone-deep">{t.newsletter.title}</p>
          <p className="mt-4 text-lg font-light">{t.newsletter.text}</p>
          <div className="mt-8 text-left">
            <Newsletter tone="light" t={t.newsletter} />
          </div>
        </section>
      ) : (
        <div className="h-28 md:h-40" />
      )}
    </>
  );
}
