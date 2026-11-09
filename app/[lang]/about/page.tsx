import type { Metadata } from "next";
import { HeroZoom } from "@/components/HeroZoom";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.about.label };
}

// The brand moment lives here: the monogram opening, then one quiet line.
// The story is added later.
export default async function AboutPage() {
  const { t } = await getTexts();
  return (
    <>
      <HeroZoom coordinates={t.base.coordinates} scrollLabel={t.nav.scroll} />
      <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 pb-32 text-center">
        <p className="label max-w-xs leading-loose">{t.about.line}</p>
        <p className="coord mt-6 text-stone-deep">
          {t.base.place} · {t.base.coordinates}
        </p>
      </section>
    </>
  );
}
