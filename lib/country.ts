// Which country a visitor shops from. Decides currency, prices and the
// Shopify market at checkout.
// Order: a chosen country (cookie, or ?country=TR for testing), then the
// country Vercel detects from the visitor's connection, then Switzerland.
import type { NextRequest } from "next/server";

export const COUNTRY_COOKIE = "soymonde-country";
export const DEFAULT_COUNTRY = "CH";

const valid = (v: string | null | undefined) => (v && /^[A-Z]{2}$/.test(v.toUpperCase()) ? v.toUpperCase() : null);

export function countryOf(request: NextRequest): string {
  return (
    valid(request.nextUrl.searchParams.get("country")) ??
    valid(request.cookies.get(COUNTRY_COOKIE)?.value) ??
    valid(request.headers.get("x-vercel-ip-country")) ??
    DEFAULT_COUNTRY
  );
}
