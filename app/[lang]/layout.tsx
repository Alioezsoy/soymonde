import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { locales } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return {
    title: { default: "SOYMONDE", template: "%s — SOYMONDE" },
    description: t.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#ede9e1",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { lang, t } = await getTexts();
  return (
    <html lang={lang} className="antialiased" suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <Intro />
        <Header lang={lang} t={t.nav} cart={t.cart} coordinates={t.base.coordinates} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
