"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Size } from "@/content/products";
import { addToCart, openCart } from "@/lib/cart";

/** Size choice and the add-to-bag button on the product page. */
export function AddToBag({
  handle,
  sizes,
  t,
}: {
  handle: string;
  sizes: Size[];
  t: Dictionary["shop"];
}) {
  const available = sizes.filter((s) => s.available);
  const single = sizes.length === 1;
  const [size, setSize] = useState<string | null>(single && available.length ? sizes[0].label : null);
  const [hint, setHint] = useState(false);
  const soldOut = available.length === 0;

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
            disabled={!s.available}
            aria-pressed={size === s.label}
            onClick={() => setSize(s.label)}
            className={`coord h-12 border transition-colors duration-500 ${
              size === s.label
                ? "border-ink bg-ink text-bone"
                : s.available
                  ? "border-ink/25 hover:border-ink"
                  : "border-ink/10 text-ink/30 line-through"
            } ${hint && !size && s.available ? "border-ink" : ""}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={soldOut}
        onClick={() => {
          if (!size) return setHint(true);
          addToCart(handle, size);
          openCart();
        }}
        className="label mt-4 h-14 w-full bg-ink text-bone transition-opacity duration-500 hover:opacity-85 disabled:bg-ink/15 disabled:text-ink/50"
      >
        {soldOut ? t.soldOut : t.add}
      </button>
    </div>
  );
}
