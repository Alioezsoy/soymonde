"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { subscribe, type SignupList, type SignupResult } from "@/lib/subscribe";

/** Email sign-up: the newsletter, or early access for a drop.
    The address is stored in Shopify (see app/api/subscribe). */
export function Newsletter({
  tone = "dark",
  list = "newsletter",
  t,
}: {
  tone?: "dark" | "light";
  list?: Extract<SignupList, "newsletter" | "early-access">;
  t: Dictionary["newsletter"];
}) {
  const [result, setResult] = useState<SignupResult | null>(null);
  const [busy, setBusy] = useState(false);
  const line = tone === "dark" ? "border-bone/30 focus-within:border-bone" : "border-ink/30 focus-within:border-ink";
  const muted = tone === "dark" ? "placeholder:text-bone/40" : "placeholder:text-ink/40";
  const id = `email-${list}-${tone}`;

  if (result === "ok" || result === "pending") {
    return (
      <p className="label py-4" role="status">
        {result === "ok" ? t.done : t.pending}
      </p>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        setBusy(true);
        setResult(await subscribe({ email: String(email ?? ""), list }));
        setBusy(false);
      }}
    >
      <div className={`flex items-center border-b transition-colors duration-700 ${line}`}>
        <label htmlFor={id} className="sr-only">
          {t.email}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.email}
          className={`min-w-0 flex-1 bg-transparent py-4 text-base outline-none ${muted}`}
        />
        <button type="submit" disabled={busy} className="label -mr-2 shrink-0 p-2 pl-4 disabled:opacity-60">
          {t.subscribe}
        </button>
      </div>
      {result === "error" ? (
        <p className="mt-3 text-sm font-light" role="alert">
          {t.error}
        </p>
      ) : null}
    </form>
  );
}
