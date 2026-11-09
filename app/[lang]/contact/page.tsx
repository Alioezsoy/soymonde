import type { Metadata } from "next";
import { Newsletter } from "@/components/Newsletter";
import { PageIntro } from "@/components/PageIntro";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.contact.label };
}

// Contact details (email, Instagram) are added in a later step.
export default async function ContactPage() {
  const { t } = await getTexts();
  return (
    <>
      <PageIntro label={t.contact.label} title={t.contact.title} />
      <section className="grid gap-16 px-5 pb-32 md:grid-cols-2 md:px-10 md:pb-56">
        <div className="max-w-md">
          <p className="label text-stone-deep">{t.newsletter.title}</p>
          <p className="mt-4 text-lg font-light">{t.newsletter.text}</p>
          <div className="mt-8">
            <Newsletter tone="light" t={t.newsletter} />
          </div>
        </div>
        <div>
          <p className="label text-stone-deep">{t.base.label}</p>
          <p className="mt-4 text-lg font-light">{t.base.place}</p>
          <p className="coord mt-2 text-stone-deep">{t.base.coordinates}</p>
        </div>
      </section>
    </>
  );
}
