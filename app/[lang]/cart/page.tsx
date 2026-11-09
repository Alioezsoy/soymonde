import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.cart.label };
}

// Step 2: the real cart (Shopify) replaces this page.
export default async function CartPage() {
  const { lang, t } = await getTexts();
  return (
    <div className="pb-32 md:pb-56">
      <PageIntro label={t.cart.label} title={t.cart.title}>
        <Link href={href(lang, "/shop")} className="label link-line">
          {t.cart.continue}
        </Link>
      </PageIntro>
    </div>
  );
}
