// Stores email sign-ups (newsletter, early access, "Notify me") as customers
// in Shopify, marked as subscribed to email marketing and tagged by list.
//
// Needs two settings (environment variables, set in Vercel; never in code):
//   SHOPIFY_STORE_DOMAIN   e.g. "soymonde.myshopify.com"
//   SHOPIFY_ADMIN_TOKEN    Admin API token of a custom app with the
//                          scopes read_customers and write_customers
// Without them the endpoint answers 503 and the site says "opens soon".

const API_VERSION = "2025-10";
const LISTS = ["newsletter", "early-access", "notify"] as const;
type List = (typeof LISTS)[number];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Gql<T> = { data?: T; errors?: { message: string }[] };

async function shopify<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-shopify-access-token": process.env.SHOPIFY_ADMIN_TOKEN ?? "",
      },
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

const consent = { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" };

async function store(email: string, tags: string[]) {
  const found = await shopify<{ customers: { nodes: { id: string }[] } }>(
    `query ($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`,
    { q: `email:${JSON.stringify(email)}` },
  );
  const id = found.customers.nodes[0]?.id;

  if (!id) {
    const created = await shopify<{ customerCreate: { userErrors: { message: string }[] } }>(
      `mutation ($input: CustomerInput!) {
        customerCreate(input: $input) { customer { id } userErrors { message } }
      }`,
      { input: { email, tags, emailMarketingConsent: consent } },
    );
    if (created.customerCreate.userErrors.length) {
      throw new Error(created.customerCreate.userErrors.map((e) => e.message).join("; "));
    }
    return;
  }

  await shopify(
    `mutation ($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { message } } }`,
    { id, tags },
  );
  await shopify(
    `mutation ($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) { userErrors { message } }
    }`,
    { input: { customerId: id, emailMarketingConsent: consent } },
  );
}

export async function POST(request: Request) {
  let body: { email?: unknown; list?: unknown; handle?: unknown; size?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = LISTS.includes(body.list as List) ? (body.list as List) : null;
  if (!EMAIL.test(email) || email.length > 254 || !list) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_TOKEN) {
    return Response.json({ error: "not connected" }, { status: 503 });
  }

  const tags: string[] = [list];
  if (list === "notify") {
    const clean = (v: unknown) => (typeof v === "string" ? v.replace(/[^a-z0-9-]/gi, "").slice(0, 60) : "");
    const handle = clean(body.handle);
    const size = clean(body.size);
    if (handle) tags.push(`notify-${handle}${size ? `-${size}` : ""}`);
  }

  try {
    await store(email, tags);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("subscribe failed:", error);
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
