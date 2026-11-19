// Prices in the visitor's market: country, currency and the price of every
// piece, as Shopify sets them (Shopify Markets converts from CHF).
import type { NextRequest } from "next/server";
import { products } from "@/content/products";
import { countryOf, DEFAULT_COUNTRY } from "@/lib/country";
import { storefront } from "@/lib/shopify-storefront";

export type Market = {
  country: string;
  currency: string;
  prices: Record<string, number>;
};

export async function GET(request: NextRequest) {
  const country = countryOf(request);
  const handles = products.filter((p) => p.price !== undefined).map((p) => p.handle);

  try {
    const data = await storefront<
      { localization: { country: { isoCode: string; currency: { isoCode: string } } } } & Record<
        string,
        { handle: string; variants: { nodes: { price: { amount: string } }[] } } | null
      >
    >(
      `query ($country: CountryCode) @inContext(country: $country) {
        localization { country { isoCode currency { isoCode } } }
        ${handles.map((h, i) => `p${i}: product(handle: ${JSON.stringify(h)}) { handle variants(first: 1) { nodes { price { amount } } } }`).join("\n")}
      }`,
      { country },
    );
    const prices: Record<string, number> = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "localization" || !value || !("handle" in value)) continue;
      const amount = value.variants.nodes[0]?.price.amount;
      if (amount) prices[value.handle] = Number(amount);
    }
    const market: Market = {
      country: data.localization.country.isoCode,
      currency: data.localization.country.currency.isoCode,
      prices,
    };
    return Response.json(market, { headers: { "cache-control": "private, max-age=600" } });
  } catch (error) {
    console.error("market failed:", error);
    // Shopify unreachable: fall back to the prices on the site, in CHF
    const prices = Object.fromEntries(products.flatMap((p) => (p.price === undefined ? [] : [[p.handle, p.price]])));
    return Response.json({ country: DEFAULT_COUNTRY, currency: "CHF", prices } satisfies Market);
  }
}
