import Link from "next/link";
import { social } from "@/content/company";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";
import { LanguageSwitch } from "./LanguageSwitch";
import { Monogram, Wordmark } from "./Logo";
import { Newsletter } from "./Newsletter";
import { Suspense } from "react";

/** A quiet close: newsletter, the way through the site, and the small mark. */
export async function Footer() {
  const { lang, t } = await getTexts();
  const nav = [
    { href: href(lang, "/shop"), label: t.nav.shop },
    { href: href(lang, "/archive"), label: t.nav.archive },
    { href: href(lang, "/about"), label: t.nav.about },
    { href: href(lang, "/contact"), label: t.nav.contact },
    { href: href(lang, "/faq"), label: t.faq.label },
  ];
  const legal = (["imprint", "privacy", "terms", "shipping"] as const).map((slug) => ({
    href: href(lang, `/legal/${slug}`),
    label: t.legal[slug],
  }));

  return (
    <footer className="bg-ink text-bone">
      <div className="grid gap-14 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <p className="label text-stone">{t.newsletter.title}</p>
          <p className="mt-3 font-light">{t.newsletter.text}</p>
          <div className="mt-5 max-w-sm">
            <Newsletter tone="dark" t={t.newsletter} />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label text-stone">{t.base.label}</p>
          <p className="mt-3 text-sm font-light">{t.base.place}</p>
          <p className="coord mt-1.5 text-stone">{t.base.coordinates}</p>
          <ul className="mt-8 space-y-3">
            {social.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" lang="en" className="label link-line">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav aria-label={t.legal.label} className="border-t border-bone/15 px-5 py-6 md:px-10">
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {legal.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="coord link-line text-bone/60">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-bone/15 px-5 py-6 md:px-10">
        <Link href={href(lang)} aria-label={t.nav.home} className="flex items-center gap-4">
          <Monogram tone="white" className="w-7" />
          <Wordmark tone="white" className="w-24" />
        </Link>
        <Suspense>
          <LanguageSwitch lang={lang} label={t.nav.language} />
        </Suspense>
      </div>
    </footer>
  );
}
