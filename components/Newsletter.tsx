"use client";

import { useState } from "react";

/** Newsletter sign-up. NOT connected yet — it will be wired to
    Shopify customers (or a mail tool) in a later step. */
export function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [sent, setSent] = useState(false);
  const line = tone === "dark" ? "border-bone/30 focus-within:border-bone" : "border-ink/30 focus-within:border-ink";
  const muted = tone === "dark" ? "placeholder:text-bone/40" : "placeholder:text-ink/40";

  if (sent) {
    return (
      <p className="label py-4" role="status">
        Sign-up opens soon — this form is not connected yet.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={`flex items-center border-b transition-colors duration-700 ${line}`}
    >
      <label htmlFor={`email-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`email-${tone}`}
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className={`min-w-0 flex-1 bg-transparent py-4 text-base outline-none ${muted}`}
      />
      <button type="submit" className="label -mr-2 shrink-0 p-2 pl-4">
        Subscribe
      </button>
    </form>
  );
}
