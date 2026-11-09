import type { Metadata } from "next";
import { Monogram, Wordmark } from "@/components/Logo";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.about.label };
}

// PLACEHOLDER story — to be written properly in a later step.
export default async function AboutPage() {
  const { t } = await getTexts();
  return (
    <>
      <PageIntro label={t.about.label} title={t.about.title}>
        <p>{t.home.manifesto}</p>
      </PageIntro>

      <section className="grid items-center gap-16 px-5 pb-32 md:grid-cols-2 md:gap-10 md:px-10 md:pb-56">
        <Reveal className="flex flex-col items-center gap-10 bg-ink px-8 py-24 md:py-40">
          <Monogram tone="white" className="w-40 md:w-56" />
          <Wordmark tone="white" className="w-40 md:w-56" />
        </Reveal>
        <Reveal className="max-w-md space-y-6 text-lg font-light leading-relaxed md:justify-self-center">
          <p>{t.about.p1}</p>
          <p className="text-stone-deep">{t.about.p2}</p>
          <p className="text-stone-deep">{t.about.placeholder}</p>
        </Reveal>
      </section>
    </>
  );
}
