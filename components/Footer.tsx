import Link from "next/link";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";
import { Wordmark } from "./Logo";
import { Newsletter } from "./Newsletter";

export async function Footer() {
  const { lang, t } = await getTexts();
  const nav = [
    { href: href(lang, "/shop"), label: t.nav.shop },
    { href: href(lang, "/archive"), label: t.nav.archive },
    { href: href(lang, "/about"), label: t.nav.about },
    { href: href(lang, "/contact"), label: t.nav.contact },
  ];

  return (
    <footer className="bg-ink text-bone">
      <div className="grid gap-16 px-5 pt-20 md:grid-cols-2 md:px-10 md:pt-32">
        <div className="max-w-md">
          <p className="label text-stone">{t.newsletter.title}</p>
          <p className="mt-4 text-lg font-light">{t.newsletter.text}</p>
          <div className="mt-8">
            <Newsletter tone="dark" t={t.newsletter} />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:justify-self-end md:gap-24">
          <ul className="space-y-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className="label text-stone">{t.base.label}</p>
            <p className="mt-4 text-sm font-light leading-relaxed">{t.base.place}</p>
            <p className="coord mt-2 text-stone">{t.base.coordinates}</p>
          </div>
        </nav>
      </div>

      <div className="px-5 pb-8 pt-24 md:px-10 md:pt-40">
        <Wordmark tone="white" className="w-full" />
        <div className="mt-8 flex justify-between gap-6 text-stone">
          <span className="coord">© Soymonde</span>
          <span className="coord text-right">{t.base.coordinates}</span>
        </div>
      </div>
    </footer>
  );
}
