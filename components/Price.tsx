"use client";

import { formatMoney, usePrice } from "@/lib/market";
import type { Locale } from "@/lib/i18n";

/** A piece's price in the visitor's currency. */
export function Price({
  handle,
  chf,
  lang,
  quantity = 1,
  fallback,
}: {
  handle: string;
  chf: number | undefined;
  lang: Locale;
  quantity?: number;
  /** shown when the piece has no price yet */
  fallback?: string;
}) {
  const price = usePrice(handle, chf);
  if (!price) return <>{fallback ?? null}</>;
  return <>{formatMoney(price.amount * quantity, price.currency, lang)}</>;
}
