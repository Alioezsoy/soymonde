// The shop's public Storefront API: used to hand the bag over to the
// Shopify checkout. The token comes from the Headless app in Shopify and is
// public by design (it can only read the shop and create carts).
export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "yfitzu-wb.myshopify.com";
export const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "2b5c6cfa7e3c1ec44372fdff33757fb6";
export const STOREFRONT_API_VERSION = "2025-10";

type Gql<T> = { data?: T; errors?: { message: string }[] };

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-shopify-storefront-access-token": STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = (await res.json()) as Gql<T>;
  if (!res.ok || json.errors?.length || !json.data) {
    throw new Error(json.errors?.map((e) => e.message).join("; ") || `Shopify ${res.status}`);
  }
  return json.data;
}
