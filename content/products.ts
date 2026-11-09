// PLACEHOLDER products. These will be replaced by real products
// from Shopify (Storefront API) in the next step.
import type { Tone } from "./chapters";

export type Product = {
  handle: string;
  title: string;
  colour: string;
  price: string;
  chapter: string;
  tone: Tone;
};

export const products: Product[] = [
  { handle: "monogram-hoodie", title: "Monogram Hoodie", colour: "Black", price: "CHF 180", chapter: "SM-003", tone: "ink" },
  { handle: "atelier-coat", title: "Atelier Coat", colour: "Stone", price: "CHF 420", chapter: "SM-003", tone: "stone" },
  { handle: "box-tee", title: "Box Tee", colour: "Bone", price: "CHF 75", chapter: "SM-002", tone: "sand" },
  { handle: "wide-trouser", title: "Wide Trouser", colour: "Black", price: "CHF 210", chapter: "SM-002", tone: "smoke" },
];
