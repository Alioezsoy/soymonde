// Talks to the Shopify Admin API from the server.
//
// Since 2026 Shopify apps from the Dev Dashboard have no fixed token.
// The site exchanges the app's Client ID and Client secret for a token
// (valid about 24 hours) and keeps it until shortly before it runs out.
//
// Settings (environment variables, set in Vercel; never in code):
//   SHOPIFY_STORE_DOMAIN    e.g. "soymonde.myshopify.com"
//   SHOPIFY_CLIENT_ID       from the app in the Dev Dashboard
//   SHOPIFY_CLIENT_SECRET   from the app in the Dev Dashboard
import "server-only";

export const ADMIN_API_VERSION = "2025-10";

export const adminConfigured = () =>
  Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET);

let cached: { token: string; until: number } | null = null;

async function token(): Promise<string> {
  if (cached && Date.now() < cached.until) return cached.token;
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID ?? "",
      client_secret: process.env.SHOPIFY_CLIENT_SECRET ?? "",
    }),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number };
  if (!res.ok || !json.access_token) throw new Error(`Shopify token request failed (${res.status})`);
  const seconds = json.expires_in ?? 86_399;
  cached = { token: json.access_token, until: Date.now() + (seconds - 300) * 1000 };
  return cached.token;
}

type Gql<T> = { data?: T; errors?: { message: string }[] };

export async function admin<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-shopify-access-token": await token() },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );
  const json = (await res.json()) as Gql<T>;
  if (!res.ok || json.errors?.length || !json.data) {
    throw new Error(json.errors?.map((e) => e.message).join("; ") || `Shopify ${res.status}`);
  }
  return json.data;
}
