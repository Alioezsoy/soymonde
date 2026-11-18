"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Size } from "@/content/products";
import { addToCart, openCart } from "@/lib/cart";
import { subscribe, type SignupResult } from "@/lib/subscribe";

/** Size choice and the main button on the product page.
    A size that is not in stock is never labelled "sold out": choosing it
    turns the button into "Notify me", which asks for an email address.
    A piece without a price ("buyable" false) only offers "Notify me";
    a pre-order piece says "Pre-order" on the button. */
export function AddToBag({
  handle,
  colour,
  sizes,
  buyable = true,
  preorder = false,
  t,
}: {
  handle: string;
  /** key of the chosen colour */
  colour: string;
  sizes: Size[];
  buyable?: boolean;
  preorder?: boolean;
  t: Dictionary["shop"];
}) {
  const single = sizes.length === 1;
  const noneAvailable = !buyable || sizes.every((s) => !s.available);
  const [size, setSize] = useState<string | null>(single ? sizes[0].label : null);
  const [hint, setHint] = useState(false);
  const [asking, setAsking] = useState(false); // email form open
  const [sent, setSent] = useState<SignupResult | null>(null);
  const [busy, setBusy] = useState(false);

  const chosen = sizes.find((s) => s.label === size);
  const notify = !buyable || (chosen ? !chosen.available : noneAvailable);

  const choose = (label: string) => {
    setSize(label);
    setAsking(false);
    setSent(null);
  };

  const submitNotify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setBusy(true);
    setSent(await subscribe({ email: String(email ?? ""), list: "notify", handle, size: size ?? undefined }));
    setBusy(false);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label text-stone-deep">{t.size}</span>
        <span className={`label transition-opacity duration-500 ${hint && !size ? "opacity-100" : "opacity-0"}`} role="status">
          {hint && !size ? t.selectSize : ""}
        </span>
      </div>
      <div className={`mt-3 grid gap-2 ${single ? "grid-cols-1" : "grid-cols-4"}`}>
        {sizes.map((s) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={size === s.label}
            onClick={() => choose(s.label)}
            className={`coord h-12 border transition-colors duration-500 ${
              size === s.label
                ? "border-ink bg-ink text-bone"
                : s.available
                  ? "border-ink/25 hover:border-ink"
                  : "border-ink/15 text-ink/45 hover:border-ink hover:text-ink"
            } ${hint && !size ? "border-ink" : ""}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {asking && notify ? (
        sent && sent !== "error" ? (
          <p className="label mt-4 flex min-h-14 items-center border border-ink/25 px-4" role="status">
            {sent === "ok" ? t.notifyDone : t.notifyPending}
          </p>
        ) : (
          <form onSubmit={submitNotify} className="mt-4">
            <p className="mb-3 text-sm font-light text-stone-deep" role={sent === "error" ? "alert" : undefined}>
              {sent === "error" ? t.notifyError : t.notifyText}
            </p>
            <div className="flex h-14 border border-ink">
              <label htmlFor={`notify-${handle}`} className="sr-only">
                {t.email}
              </label>
              <input
                id={`notify-${handle}`}
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder={t.email}
                style={{ outline: "none" }} // the box around the field already shows focus
                className="min-w-0 flex-1 bg-transparent px-4 text-base placeholder:text-ink/40"
              />
              <button type="submit" disabled={busy} className="label shrink-0 bg-ink px-6 text-bone disabled:opacity-60">
                {t.notifySend}
              </button>
            </div>
          </form>
        )
      ) : (
        <button
          type="button"
          onClick={() => {
            if (!size) return setHint(true);
            if (notify) return setAsking(true);
            addToCart(handle, colour, size);
            openCart();
          }}
          className={`label mt-4 h-14 w-full transition-opacity duration-500 hover:opacity-85 ${
            notify ? "border border-ink text-ink" : "bg-ink text-bone"
          }`}
        >
          {notify ? t.notify : preorder ? t.preorder : t.add}
        </button>
      )}
    </div>
  );
}
