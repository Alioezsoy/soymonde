import type { Metadata } from "next";
import Link from "next/link";
import { ChevronIcon } from "@/components/Icons";
import { PageIntro } from "@/components/PageIntro";
import { faq } from "@/content/faq";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.faq.label };
}

export default async function FaqPage() {
  const { lang, t } = await getTexts();
  return (
    <>
      <PageIntro label={t.faq.label} title={t.faq.title} />
      <div className="px-5 pb-32 md:px-10 md:pb-48">
        <div className="max-w-2xl border-t border-rule">
          {faq.map((item) => (
            <details key={item.q.en} className="group/d border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-light [&::-webkit-details-marker]:hidden">
                {item.q[lang]}
                <ChevronIcon className="shrink-0 transition-transform duration-500 group-open/d:rotate-180" />
              </summary>
              <p className="pb-7 font-light leading-relaxed text-stone-deep">{item.a[lang]}</p>
            </details>
          ))}
        </div>
        <p className="mt-12 font-light">
          <Link href={href(lang, "/legal/shipping")} className="link-line">
            {t.legal.shipping}
          </Link>
        </p>
      </div>
    </>
  );
}
