// The languages of the site. The first one is the fallback.
export const locales = ["en", "de", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  tr: "Türkçe",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A text in all three languages. */
export type Localized = Record<Locale, string>;

/** Prefix an internal path with the language: ("de", "/archive") → "/de/archive" */
export const href = (lang: Locale, path = "/") =>
  `/${lang}${path === "/" ? "" : path}`;

/** Cookie that remembers the visitor's chosen language. */
export const LOCALE_COOKIE = "soymonde-lang";
