"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import {
  categories,
  genders,
  isCategory,
  isGender,
  shopQuery,
  type CategoryKey,
  type Gender,
  type ProductType,
} from "@/content/categories";
import type { Dictionary } from "@/content/dictionaries";
import { ProductGrid } from "./ProductGrid";

export type ShopItem = {
  handle: string;
  types: ProductType[];
  gender: Gender[];
  basic: boolean;
  card: ReactNode;
};

/** The shop with its filters: Men / Women, and the categories.
    The choice is kept in the address (?g=men&c=jackets), so it can be
    linked to from the menu and survives going back. */
export function ShopBrowser({ items, t }: { items: ShopItem[]; t: Dictionary["shop"] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const g = params.get("g");
  const c = params.get("c");
  const gender = isGender(g) ? g : null;
  const category = isCategory(c) ? c : null;

  const set = (nextGender: Gender | null, nextCategory: CategoryKey | null) =>
    router.replace(`${pathname}${shopQuery(nextGender, nextCategory)}`, { scroll: false });

  const shown = items.filter(
    (item) =>
      (!gender || item.gender.includes(gender)) &&
      (!category || (category === "basics" ? item.basic : item.types.includes(category))),
  );

  const chip = (label: string, active: boolean, onClick: () => void, english = true) => (
    <button
      type="button"
      lang={english ? "en" : undefined}
      aria-pressed={active}
      onClick={onClick}
      className={`label shrink-0 whitespace-nowrap border px-3 py-2 transition-colors duration-500 ${
        active ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
      }`}
    >
      {label}
    </button>
  );

  const title =
    [genders.find((x) => x.key === gender)?.label, categories.find((x) => x.key === category)?.label]
      .filter(Boolean)
      .join(" · ") || t.title;

  return (
    <>
      <div role="group" aria-label={t.filter} className="mb-8 space-y-2 md:mb-12">
        <div className="rail -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {chip(t.all, !gender, () => set(null, category), false)}
          {genders.map((x) => (
            <span key={x.key} className="contents">
              {chip(x.label, gender === x.key, () => set(gender === x.key ? null : x.key, category))}
            </span>
          ))}
        </div>
        <div className="rail -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((x) => (
            <span key={x.key} className="contents">
              {chip(x.label, category === x.key, () => set(gender, category === x.key ? null : x.key))}
            </span>
          ))}
        </div>
      </div>

      <ProductGrid count={shown.length} countLabel={<span lang="en">{title}</span>} viewLabel={t.view}>
        {shown.map((item) => (
          <div key={item.handle}>{item.card}</div>
        ))}
      </ProductGrid>

      {shown.length === 0 ? (
        <div className="flex min-h-[40svh] flex-col items-center justify-center gap-6 text-center">
          <p className="label text-stone-deep">{t.empty}</p>
          <button type="button" className="label link-line" onClick={() => set(null, null)}>
            {t.all}
          </button>
        </div>
      ) : null}
    </>
  );
}
