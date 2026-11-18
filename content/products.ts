// The products. For now they are written here by hand; in the next step
// they come from Shopify (Storefront API). The shape below mirrors what
// Shopify returns, so the pages stay the same.
import type { Localized } from "@/lib/i18n";
import type { Frame } from "./archive";
import { categories, type Gender, type ProductType } from "./categories";
import type { CollectionKey } from "./collections";

export type Size = { label: string; available: boolean };

export const measureKeys = ["length", "chest", "shoulder", "sleeve", "waist", "inseam"] as const;
export type MeasureKey = (typeof measureKeys)[number];
/** The size guide: centimetres, measured flat. One number per size,
    in the same order as the sizes (S, M, L, XL). */
export type Measurements = Partial<Record<MeasureKey, number[]>>;

/** One colour of a product, with its own photos. */
export type Variant = {
  key: string; // short id, used in the bag
  colour: Localized;
  swatch: string; // the colour as a dot
  frames: Frame[]; // first = main image, second = shown on hover
};

export type Product = {
  handle: string;
  title: string;
  price?: number; // CHF. Leave out while the price is not set: shows "Coming soon"
  // the first (or only) colour
  colour: Localized;
  swatch: string;
  frames: Frame[];
  // further colours, if the piece comes in more than one
  otherColours?: Variant[];
  tag?: "new" | "limited";
  preorder?: boolean; // sold as a pre-order: "Pre-order" button and line
  collection?: CollectionKey; // the drop it belongs to
  upcoming?: boolean; // not released yet: cannot be bought, shows "Notify me"
  // A piece without a price cannot be bought either: it shows "Coming soon".
  // where the piece is filed in the shop (one or several categories)
  types: ProductType[];
  gender: Gender[]; // both = unisex
  basic?: boolean; // also listed under Basics
  sizes: Size[];
  measurements?: Measurements; // shows the size guide on the product page
  details: Localized[];
};

/** All colours of a product, the main one first. */
export const variantsOf = (p: Product): Variant[] => [
  { key: "main", colour: p.colour, swatch: p.swatch, frames: p.frames },
  ...(p.otherColours ?? []),
];

export const getVariant = (p: Product, key?: string) =>
  variantsOf(p).find((v) => v.key === key) ?? variantsOf(p)[0];

/** S to XL. Sizes listed in `notInStock` show the "Notify me" button. */
const sizes = (notInStock: string[] = []): Size[] =>
  ["S", "M", "L", "XL"].map((label) => ({
    label,
    available: !notInStock.includes(label),
  }));


const white: Localized = { en: "White", de: "Weiss", tr: "Beyaz" };

export const products: Product[] = [
  // ── Ghost Collection: the first drop. Not released yet. ──────────────
  // PLACEHOLDER: photos, prices, colours, sizes and details follow.
  {
    handle: "ghost-boxy-tee",
    collection: "ghost",
    preorder: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Boxy Tee", // working name
    colour: white,
    swatch: "#f4f2ed",
    frames: [
      { src: "/products/ghost-boxy-tee-01.webp", alt: "Ghost Boxy Tee, front", tone: "sand" },
      { src: "/products/ghost-boxy-tee-02.webp", alt: "Ghost Boxy Tee, back with Afterimage print", tone: "sand" },
      { src: "/products/ghost-boxy-tee-03.webp", alt: "Ghost Boxy Tee, print detail", tone: "sand" },
      { src: "/products/ghost-boxy-tee-04.webp", alt: "Ghost Boxy Tee, rib collar", tone: "sand" },
      { src: "/products/ghost-boxy-tee-05.webp", alt: "Ghost Boxy Tee, cloth tag at the side seam", tone: "sand" },
    ],
    sizes: sizes(),
    details: [
      { en: "Compact boxy fit, slightly dropped shoulder", de: "Kompakter Boxy Fit, leicht überschnittene Schulter", tr: "Kompakt boxy kesim, hafif düşük omuz" },
      { en: "High rib crew neck", de: "Hoher Rippkragen", tr: "Yüksek ribana yaka" },
      { en: "SOYMONDE wordmark on the chest", de: "SOYMONDE Schriftzug auf der Brust", tr: "Göğüste SOYMONDE yazısı" },
      { en: "Afterimage print on the back", de: "Afterimage-Print auf dem Rücken", tr: "Sırtta Afterimage baskı" },
      { en: "Cloth tag with monogram at the side seam", de: "Stofflabel mit Monogramm an der Seitennaht", tr: "Yan dikişte monogramlı kumaş etiket" },
    ],
  },
  {
    handle: "ghost-oversized-tee",
    collection: "ghost",
    preorder: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Oversized Tee", // working name
    colour: white,
    swatch: "#f4f2ed",
    frames: [
      { src: "/products/ghost-oversized-tee-01.webp", alt: "Ghost Oversized Tee, front", tone: "sand" },
      { src: "/products/ghost-oversized-tee-02.webp", alt: "Ghost Oversized Tee, back with stitched circle", tone: "sand" },
      { src: "/products/ghost-oversized-tee-03.webp", alt: "Ghost Oversized Tee, circle detail", tone: "sand" },
      { src: "/products/ghost-oversized-tee-04.webp", alt: "Ghost Oversized Tee, rib collar", tone: "sand" },
      { src: "/products/ghost-oversized-tee-05.webp", alt: "Ghost Oversized Tee, cloth tag at the side seam", tone: "sand" },
    ],
    sizes: sizes(),
    details: [
      { en: "Oversized fit, dropped shoulder", de: "Oversized geschnitten, überschnittene Schulter", tr: "Oversize kesim, düşük omuz" },
      { en: "SOYMONDE wordmark on the chest", de: "SOYMONDE Schriftzug auf der Brust", tr: "Göğüste SOYMONDE yazısı" },
      { en: "Tonal circle on the back, built from stitched segments", de: "Ton-in-Ton Kreis auf dem Rücken aus aufgenähten Segmenten", tr: "Sırtta dikili parçalardan ton sür ton daire" },
      { en: "Cloth tag with monogram at the side seam", de: "Stofflabel mit Monogramm an der Seitennaht", tr: "Yan dikişte monogramlı kumaş etiket" },
    ],
  },
  {
    handle: "ghost-longsleeve",
    collection: "ghost",
    preorder: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Longsleeve", // working name
    colour: white,
    swatch: "#f4f2ed",
    frames: [
      { src: "/products/ghost-longsleeve-01.webp", alt: "Ghost Longsleeve, front", tone: "sand" },
      { src: "/products/ghost-longsleeve-02.webp", alt: "Ghost Longsleeve, back", tone: "sand" },
      { src: "/products/ghost-longsleeve-03.webp", alt: "Ghost Longsleeve, smoke print on the sleeve", tone: "sand" },
      { src: "/products/ghost-longsleeve-04.webp", alt: "Ghost Longsleeve, rib collar", tone: "sand" },
      { src: "/products/ghost-longsleeve-05.webp", alt: "Ghost Longsleeve, cloth tag at the side seam", tone: "sand" },
    ],
    sizes: sizes(),
    details: [
      { en: "Dropped shoulder, long sleeves", de: "Überschnittene Schulter, lange Ärmel", tr: "Düşük omuz, uzun kol" },
      { en: "High rib crew neck", de: "Hoher Rippkragen", tr: "Yüksek ribana yaka" },
      { en: "SOYMONDE wordmark on the chest", de: "SOYMONDE Schriftzug auf der Brust", tr: "Göğüste SOYMONDE yazısı" },
      { en: "Smoke print on both sleeves", de: "Rauch-Print auf beiden Ärmeln", tr: "İki kolda duman baskı" },
      { en: "Cloth tag with monogram at the side seam", de: "Stofflabel mit Monogramm an der Seitennaht", tr: "Yan dikişte monogramlı kumaş etiket" },
    ],
  },
  {
    handle: "ghost-zip-jacket",
    collection: "ghost",
    preorder: true,
    types: ["sweats", "jackets"],
    gender: ["men", "women"],
    title: "Ghost Zip Jacket", // working name
    colour: white,
    swatch: "#f4f2ed",
    frames: [
      { src: "/products/ghost-zip-jacket-01.webp", alt: "Ghost Zip Jacket, front", tone: "sand" },
      { src: "/products/ghost-zip-jacket-02.webp", alt: "Ghost Zip Jacket, back with leather patch", tone: "sand" },
      { src: "/products/ghost-zip-jacket-03.webp", alt: "Ghost Zip Jacket, zip with monogram puller", tone: "sand" },
      { src: "/products/ghost-zip-jacket-04.webp", alt: "Ghost Zip Jacket, leather patch with metal plate", tone: "sand" },
      { src: "/products/ghost-zip-jacket-05.webp", alt: "Ghost Zip Jacket, kangaroo pocket", tone: "sand" },
    ],
    sizes: sizes(),
    details: [
      { en: "Hooded, full zip with monogram puller", de: "Mit Kapuze, durchgehender Reissverschluss mit Monogramm-Zipper", tr: "Kapüşonlu, monogramlı fermuar çekeceği" },
      { en: "Elastic hem and cuffs", de: "Elastischer Saum und Bündchen", tr: "Lastikli etek ve manşetler" },
      { en: "SOYMONDE wordmark on the chest", de: "SOYMONDE Schriftzug auf der Brust", tr: "Göğüste SOYMONDE yazısı" },
      { en: "Leather patch with metal monogram plate on the back", de: "Lederpatch mit Metallplakette und Monogramm auf dem Rücken", tr: "Sırtta metal monogram plakalı deri arma" },
      { en: "Kangaroo pocket", de: "Kängurutasche", tr: "Kanguru cep" },
    ],
  },
  {
    handle: "ghost-joggers",
    collection: "ghost",
    preorder: true,
    types: ["bottoms"],
    gender: ["men", "women"],
    title: "Ghost Joggers", // working name
    colour: white,
    swatch: "#f4f2ed",
    frames: [
      { src: "/products/ghost-joggers-01.webp", alt: "Ghost Joggers, front", tone: "sand" },
      { src: "/products/ghost-joggers-02.webp", alt: "Ghost Joggers, back", tone: "sand" },
      { src: "/products/ghost-joggers-03.webp", alt: "Ghost Joggers, smoke print on the leg", tone: "sand" },
      { src: "/products/ghost-joggers-04.webp", alt: "Ghost Joggers, cloth tag at the waist", tone: "sand" },
      { src: "/products/ghost-joggers-05.webp", alt: "Ghost Joggers, open hem with smoke print", tone: "sand" },
    ],
    sizes: sizes(),
    details: [
      { en: "Wide, straight leg with an open hem", de: "Weites, gerades Bein mit offenem Saum", tr: "Geniş, düz paça" },
      { en: "Elastic waistband, side pockets", de: "Elastischer Bund, seitliche Taschen", tr: "Lastikli bel, yan cepler" },
      { en: "SOYMONDE wordmark on the front", de: "SOYMONDE Schriftzug vorne", tr: "Önde SOYMONDE yazısı" },
      { en: "Smoke print on both legs", de: "Rauch-Print auf beiden Beinen", tr: "İki bacakta duman baskı" },
      { en: "Cloth tag with monogram at the waist", de: "Stofflabel mit Monogramm am Bund", tr: "Belde monogramlı kumaş etiket" },
    ],
  },
];

/** Categories that hold at least one piece; empty ones are not shown. */
export const activeCategories = categories.filter((c) =>
  c.key === "basics" ? products.some((p) => p.basic) : products.some((p) => p.types.includes(c.key)),
);

/** Whether the piece can be put in the bag (it needs a price). */
export const canBuy = (p: Product) => p.price !== undefined && !p.upcoming;

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export const inCollection = (key: CollectionKey) =>
  products.filter((p) => p.collection === key);

export const formatPrice = (amount: number) =>
  `CHF ${amount.toFixed(2).replace(/\.00$/, "")}`;
