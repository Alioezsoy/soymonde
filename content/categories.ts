// The shop's categories. Their names are the same in every language.
//
// A product belongs to one type (tops, bottoms …), to Men, Women or both,
// and can additionally be marked as a Basic.

export const genders = [
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
] as const;

export const categories = [
  { key: "basics", label: "Basics" },
  { key: "tops", label: "T-Shirts & Tanktops" },
  { key: "bottoms", label: "Pants & Joggers" },
  { key: "sweats", label: "Hoodies, Sweaters & Zippers" },
  { key: "jackets", label: "Jackets" },
  { key: "accessories", label: "Accessories" },
] as const;

export type Gender = (typeof genders)[number]["key"];
export type CategoryKey = (typeof categories)[number]["key"];
/** The type a product is filed under ("basics" is a mark, not a type). */
export type ProductType = Exclude<CategoryKey, "basics">;

export const isGender = (v: string | null): v is Gender => genders.some((g) => g.key === v);
export const isCategory = (v: string | null): v is CategoryKey => categories.some((c) => c.key === v);

/** Address of the shop with a filter set, e.g. /shop?g=men&c=jackets */
export const shopQuery = (g?: Gender | null, c?: CategoryKey | null) => {
  const q = new URLSearchParams();
  if (g) q.set("g", g);
  if (c) q.set("c", c);
  const s = q.toString();
  return s ? `?${s}` : "";
};
