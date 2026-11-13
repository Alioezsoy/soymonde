import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageIntro } from "@/components/PageIntro";
import { getLegal, isLegalSlug, legalSlugs } from "@/content/legal";
import { getTexts } from "@/lib/locale";

type Props = PageProps<"/[lang]/legal/[slug]">;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const { t } = await getTexts();
  return { title: t.legal[slug] };
}

export default function LegalPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="h-svh" />}>
      <LegalView params={params} />
    </Suspense>
  );
}

async function LegalView({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  const { lang, t } = await getTexts();
  const sections = getLegal(slug, lang, t.legal.toFollow);

  return (
    <>
      <PageIntro label={t.legal.label} title={t.legal[slug]} />
      <div className="px-5 pb-32 md:px-10 md:pb-48">
        <p className="coord max-w-2xl border-y border-rule py-4 text-stone-deep">{t.legal.draft}</p>
        <div className="mt-12 max-w-2xl space-y-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="label text-stone-deep">{section.heading}</h2>
              <div className="mt-4 space-y-3 font-light leading-relaxed">
                {section.body.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
