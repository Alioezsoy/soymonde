"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/lib/i18n";

/** EN / DE / TR — keeps the visitor on the same page in the other language. */
export function LanguageSwitch({
  lang,
  label,
  onNavigate,
  className = "",
}: {
  lang: Locale;
  label: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <ul aria-label={label} className={`flex items-center gap-3 ${className}`}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              onNavigate?.();
            }}
            className={`label -my-3 py-3 transition-opacity duration-700 ${
              l === lang ? "opacity-100" : "opacity-45 hover:opacity-100"
            }`}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );
}
