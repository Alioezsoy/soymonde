import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { href } from "@/lib/i18n";
import { getTexts } from "@/lib/locale";

export default async function NotFound() {
  const { lang, t } = await getTexts();
  return (
    <div className="pb-32 md:pb-56">
      <PageIntro label="00°00′N 00°00′E" title={t.notFound.title}>
        <Link href={href(lang)} className="label link-line">
          {t.notFound.back}
        </Link>
      </PageIntro>
    </div>
  );
}
