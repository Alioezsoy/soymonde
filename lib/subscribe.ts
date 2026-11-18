// Sends an email sign-up to our own server (app/api/subscribe), which
// stores it in Shopify. Used by the newsletter, early access and "Notify me".

export type SignupList = "newsletter" | "early-access" | "notify";

export type SignupResult = "ok" | "pending" | "error";

export async function subscribe(input: {
  email: string;
  list: SignupList;
  /** for "notify": which piece and size */
  handle?: string;
  size?: string;
}): Promise<SignupResult> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) return "ok";
    // 503: no shop connected yet; the address could not be stored
    if (res.status === 503) return "pending";
    return "error";
  } catch {
    return "error";
  }
}
