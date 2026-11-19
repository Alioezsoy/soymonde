"use client";

// The visitor's market (currency and prices), loaded once per visit from
// /api/market. Until it arrives, prices show in CHF as written on the site.
import { useSyncExternalStore } from "react";
import type { Market } from "@/app/api/market/route";
import type { Locale } from "@/lib/i18n";

let market: Market | null = null;
let started = false;
const listeners = new Set<() => void>();

function start() {
  if (started) return;
  started = true;
  fetch("/api/market")
    .then((r) => (r.ok ? (r.json() as Promise<Market>) : null))
    .then((m) => {
      if (!m) return;
      market = m;
      listeners.forEach((l) => l());
    })
    .catch(() => {});
}

export function useMarket(): Market | null {
  return useSyncExternalStore(
    (l) => {
      start();
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => market,
    () => null,
  );
}

const LOCALES: Record<Locale, string> = { en: "en-CH", de: "de-CH", tr: "tr-TR" };

/** "CHF 55", "₺3.360", "€60,95" */
export function formatMoney(amount: number, currency: string, lang: Locale) {
  if (currency === "CHF") return `CHF ${amount.toFixed(2).replace(/\.00$/, "")}`;
  return new Intl.NumberFormat(LOCALES[lang], {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Price of one piece in the visitor's market (falls back to the CHF price). */
export function usePrice(handle: string, chf: number | undefined) {
  const m = useMarket();
  if (chf === undefined) return null;
  const local = m?.prices[handle];
  return local !== undefined && m ? { amount: local, currency: m.currency } : { amount: chf, currency: "CHF" };
}
