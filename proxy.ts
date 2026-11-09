import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n";

/** Pick the visitor's language: remembered choice first, then browser language. */
function pickLocale(request: NextRequest): Locale {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (remembered && hasLocale(remembered)) return remembered;

  const header = request.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { code: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { code } of wanted) if (hasLocale(code)) return code;
  return defaultLocale;
}

// Every address without a language gets one: /archive → /de/archive
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLang = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLang) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and files (logos, images, icon …)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
