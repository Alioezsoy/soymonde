// Turns the bag into a Shopify cart and returns the address of the
// Shopify checkout. The bag only holds piece + size; the matching Shopify
// variant is looked up here by the piece's handle and the size name.
import type { NextRequest } from "next/server";
import { getProduct, getVariant } from "@/content/products";
import { countryOf } from "@/lib/country";
import { storefront } from "@/lib/shopify-storefront";

type Line = {
  handle?: unknown;
  colour?: unknown;
  size?: unknown;
  quantity?: unknown;
};

const LANGUAGES = { en: "EN", de: "DE", tr: "TR" } as const;

export async function POST(request: NextRequest) {
  let body: { lines?: Line[]; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const lines = (Array.isArray(body.lines) ? body.lines : [])
    .map((l) => ({
      handle: typeof l.handle === "string" ? l.handle : "",
      colour: typeof l.colour === "string" ? l.colour : "main",
      size: typeof l.size === "string" ? l.size : "",
      quantity: Number.isInteger(l.quantity)
        ? Math.min(Math.max(l.quantity as number, 1), 20)
        : 0,
    }))
    .filter((l) => getProduct(l.handle) && l.size && l.quantity > 0)
    .slice(0, 30);
  if (!lines.length) return Response.json({ error: "empty" }, { status: 400 });
  const country = countryOf(request);
  const language = LANGUAGES[body.lang as keyof typeof LANGUAGES] ?? "EN";

  try {
    // variants of the pieces in the bag
    const handles = [...new Set(lines.map((l) => l.handle))];
    // one aliased product(handle:) lookup per piece
    const query = `query {${handles
      .map(
        (h, i) =>
          `p${i}: product(handle: ${JSON.stringify(h)}) { handle variants(first: 50) { nodes { id selectedOptions { name value } } } }`,
      )
      .join(" ")}}`;
    const found = await storefront<
      Record<
        string,
        {
          handle: string;
          variants: {
            nodes: {
              id: string;
              selectedOptions: { name: string; value: string }[];
            }[];
          };
        } | null
      >
    >(query);
    const products = Object.values(found).filter((p) => p !== null);
    // the Shopify variant with this size and, where the piece has colours, this colour
    // (Shopify colour names are the English ones from content/products.ts)
    const variantOf = (handle: string, colour: string, size: string) => {
      const product = getProduct(handle);
      const colourName = product ? getVariant(product, colour).colour.en : "";
      return products
        .find((p) => p.handle === handle)
        ?.variants.nodes.find((v) => {
          const opts = Object.fromEntries(
            v.selectedOptions.map((o) => [o.name, o.value]),
          );
          return (
            opts.Size === size && (!opts.Colour || opts.Colour === colourName)
          );
        })?.id;
    };

    const cartLines = lines.map((l) => {
      const merchandiseId = variantOf(l.handle, l.colour, l.size);
      if (!merchandiseId)
        throw new Error(`no variant for ${l.handle} ${l.size}`);
      const attributes = getProduct(l.handle)?.preorder
        ? [{ key: "Pre-order", value: "Yes" }]
        : [];
      return { merchandiseId, quantity: l.quantity, attributes };
    });

    const created = await storefront<{
      cartCreate: {
        cart: { checkoutUrl: string } | null;
        userErrors: { message: string }[];
      };
    }>(
      `mutation ($input: CartInput!, $language: LanguageCode, $country: CountryCode)
        @inContext(language: $language, country: $country) {
        cartCreate(input: $input) { cart { checkoutUrl } userErrors { message } }
      }`,
      {
        input: { lines: cartLines, buyerIdentity: { countryCode: country } },
        language,
        country,
      },
    );
    const url = created.cartCreate.cart?.checkoutUrl;
    if (!url)
      throw new Error(
        created.cartCreate.userErrors.map((e) => e.message).join("; ") ||
          "no checkout url",
      );
    return Response.json({ url });
  } catch (error) {
    console.error("checkout failed:", error);
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
