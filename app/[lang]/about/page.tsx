import type { Metadata } from "next";
import { Monogram, Wordmark } from "@/components/Logo";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.about.label };
}

// Deliberately quiet for now. The story is added later.
export default async function AboutPage() {
  const { t } = await getTexts();
  return (
    <section data-header-dark className="flex min-h-svh flex-col items-center justify-center bg-ink px-5 text-center text-bone">
      <Monogram tone="white" className="w-[min(40vw,14rem)]" />
      <Wordmark tone="white" className="mt-10 w-[min(44vw,13rem)]" />
      <p className="label mt-12 max-w-xs leading-loose text-bone/70">{t.about.line}</p>
      <p className="coord mt-6 text-bone/50">
        {t.base.place} · {t.base.coordinates}
      </p>
    </section>
  );
}
