import { lang } from "next/root-params";
import { dictionaries } from "@/content/dictionaries";
import { defaultLocale, hasLocale, type Locale } from "./i18n";

/** The language of the current page (server components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return value && hasLocale(value) ? value : defaultLocale;
}

/** Language + its texts for the current page. */
export async function getTexts() {
  const locale = await getLocale();
  return { lang: locale, t: dictionaries[locale] };
}
