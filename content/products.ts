// PLACEHOLDER products. These will be replaced by real products
// from Shopify (Storefront API) in the next step. The shape below
// mirrors what Shopify returns, so the pages stay the same.
import type { Localized } from "@/lib/i18n";
import type { Frame } from "./archive";

export type Size = { label: string; available: boolean };

export type Product = {
  handle: string;
  title: string;
  price: number; // CHF
  colour: Localized;
  frames: Frame[]; // first = main image, second = shown on hover
  sizes: Size[];
  details: Localized[];
};

const sizes = (soldOut: string[] = []): Size[] =>
  ["S", "M", "L", "XL"].map((label) => ({ label, available: !soldOut.includes(label) }));

const black: Localized = { en: "Black", de: "Schwarz", tr: "Siyah" };
const stone: Localized = { en: "Stone", de: "Stone", tr: "Taş" };
const bone: Localized = { en: "Bone", de: "Bone", tr: "Kemik" };

// PLACEHOLDER details — replace with real material and fit information.
const details: Localized[] = [
  { en: "Material and weight to follow", de: "Material und Gewicht folgen", tr: "Kumaş ve gramaj eklenecek" },
  { en: "Fit to follow", de: "Passform folgt", tr: "Kalıp bilgisi eklenecek" },
  { en: "Made in — to follow", de: "Hergestellt in — folgt", tr: "Üretim yeri eklenecek" },
];

export const products: Product[] = [
  {
    handle: "monogram-hoodie",
    title: "Monogram Hoodie",
    price: 180,
    colour: black,
    frames: [
      { alt: "Monogram Hoodie", tone: "ink" },
      { alt: "Monogram Hoodie, back", tone: "smoke" },
      { alt: "Monogram Hoodie, detail", tone: "stone" },
    ],
    sizes: sizes(),
    details,
  },
  {
    handle: "atelier-coat",
    title: "Atelier Coat",
    price: 420,
    colour: stone,
    frames: [
      { alt: "Atelier Coat", tone: "stone" },
      { alt: "Atelier Coat, back", tone: "sand" },
      { alt: "Atelier Coat, detail", tone: "smoke" },
    ],
    sizes: sizes(["S"]),
    details,
  },
  {
    handle: "box-tee",
    title: "Box Tee",
    price: 75,
    colour: bone,
    frames: [
      { alt: "Box Tee", tone: "sand" },
      { alt: "Box Tee, back", tone: "stone" },
      { alt: "Box Tee, detail", tone: "ink" },
    ],
    sizes: sizes(),
    details,
  },
  {
    handle: "wide-trouser",
    title: "Wide Trouser",
    price: 210,
    colour: black,
    frames: [
      { alt: "Wide Trouser", tone: "smoke" },
      { alt: "Wide Trouser, back", tone: "ink" },
      { alt: "Wide Trouser, detail", tone: "sand" },
    ],
    sizes: sizes(["XL"]),
    details,
  },
  {
    handle: "monogram-cap",
    title: "Monogram Cap",
    price: 60,
    colour: black,
    frames: [
      { alt: "Monogram Cap", tone: "ink" },
      { alt: "Monogram Cap, side", tone: "sand" },
    ],
    sizes: [{ label: "One size", available: true }],
    details,
  },
  {
    handle: "origin-knit",
    title: "Origin Knit",
    price: 240,
    colour: bone,
    frames: [
      { alt: "Origin Knit", tone: "sand" },
      { alt: "Origin Knit, back", tone: "smoke" },
    ],
    sizes: sizes(["S", "M", "L", "XL"]),
    details,
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export const formatPrice = (amount: number) => `CHF ${amount.toFixed(2).replace(/\.00$/, "")}`;
