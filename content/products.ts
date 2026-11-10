// PLACEHOLDER products. These will be replaced by real products
// from Shopify (Storefront API) in the next step. The shape below
// mirrors what Shopify returns, so the pages stay the same.
import type { Localized } from "@/lib/i18n";
import type { Frame } from "./archive";

export type Size = { label: string; available: boolean };

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
  price: number; // CHF
  // the first (or only) colour
  colour: Localized;
  swatch: string;
  frames: Frame[];
  // further colours, if the piece comes in more than one
  otherColours?: Variant[];
  tag?: "new" | "limited";
  sizes: Size[];
  details: Localized[];
};

/** All colours of a product, the main one first. */
export const variantsOf = (p: Product): Variant[] => [
  { key: "main", colour: p.colour, swatch: p.swatch, frames: p.frames },
  ...(p.otherColours ?? []),
];

export const getVariant = (p: Product, key?: string) =>
  variantsOf(p).find((v) => v.key === key) ?? variantsOf(p)[0];

const sizes = (soldOut: string[] = []): Size[] =>
  ["S", "M", "L", "XL"].map((label) => ({ label, available: !soldOut.includes(label) }));

const black: Localized = { en: "Black", de: "Schwarz", tr: "Siyah" };
const stone: Localized = { en: "Stone", de: "Stone", tr: "Taş" };
const bone: Localized = { en: "Bone", de: "Bone", tr: "Kemik" };
const emerald: Localized = { en: "Emerald", de: "Smaragd", tr: "Zümrüt" };
const white: Localized = { en: "White", de: "Weiss", tr: "Beyaz" };

// PLACEHOLDER details — replace with real material and fit information.
const details: Localized[] = [
  { en: "Material and weight to follow", de: "Material und Gewicht folgen", tr: "Kumaş ve gramaj eklenecek" },
  { en: "Fit to follow", de: "Passform folgt", tr: "Kalıp bilgisi eklenecek" },
  { en: "Made in — to follow", de: "Hergestellt in — folgt", tr: "Üretim yeri eklenecek" },
];

export const products: Product[] = [
  // The first real piece. Photos are in /public/products.
  {
    handle: "emerald-balaclava",
    tag: "new",
    title: "Emerald Balaclava", // working name
    price: 199,
    colour: emerald,
    swatch: "#0a5c36",
    frames: [
      { src: "/products/emerald-balaclava-01.webp", alt: "Emerald Balaclava, front", tone: "sand" },
      { src: "/products/emerald-balaclava-02.webp", alt: "Emerald Balaclava, back", tone: "sand" },
      { src: "/products/emerald-balaclava-03.webp", alt: "Emerald Balaclava, lining detail", tone: "sand" },
    ],
    sizes: [{ label: "One size", available: true }],
    details: [
      { en: "Knitted, with pearl detail and fringe", de: "Gestrickt, mit Perlen und Fransen", tr: "Örgü, inci ve saçak detaylı" },
      { en: "Lined", de: "Gefüttert", tr: "Astarlı" },
      { en: "Material to follow", de: "Material folgt", tr: "Kumaş bilgisi eklenecek" },
    ],
  },
  {
    handle: "v001-hoodie",
    title: "V001 Hoodie", // working name
    price: 180,
    colour: emerald,
    swatch: "#0a5c36",
    frames: [
      { src: "/products/v001-hoodie-01.webp", alt: "V001 Hoodie, front", tone: "sand" },
      { src: "/products/v001-hoodie-02.webp", alt: "V001 Hoodie, back", tone: "sand" },
      { src: "/products/v001-hoodie-03.webp", alt: "V001 Hoodie, embossed lettering", tone: "sand" },
    ],
    sizes: sizes(), // PLACEHOLDER: sizes not confirmed yet
    details: [
      { en: "Cropped fit", de: "Cropped geschnitten", tr: "Crop kesim" },
      { en: "Embossed lettering on the chest", de: "Geprägter Schriftzug auf der Brust", tr: "Göğüste kabartma yazı" },
      { en: "Material to follow", de: "Material folgt", tr: "Kumaş bilgisi eklenecek" },
    ],
  },
  {
    handle: "chess-jeans",
    title: "Chess Jeans",
    price: 210, // PLACEHOLDER: price not confirmed yet
    colour: black,
    swatch: "#111110",
    frames: [
      { src: "/products/chess-jeans-black-01.webp", alt: "Chess Jeans in black, front", tone: "sand" },
      { src: "/products/chess-jeans-black-02.webp", alt: "Chess Jeans in black, back", tone: "sand" },
      { src: "/products/chess-jeans-black-03.webp", alt: "Chess Jeans in black, embroidered monogram", tone: "sand" },
    ],
    otherColours: [
      {
        key: "white",
        colour: white,
        swatch: "#eceae4",
        frames: [
          { src: "/products/chess-jeans-white-01.webp", alt: "Chess Jeans in white, front", tone: "sand" },
          { src: "/products/chess-jeans-white-02.webp", alt: "Chess Jeans in white, back", tone: "sand" },
          { src: "/products/chess-jeans-white-03.webp", alt: "Chess Jeans in white, embroidered monogram", tone: "sand" },
        ],
      },
    ],
    sizes: sizes(), // PLACEHOLDER: sizes not confirmed yet
    details: [
      { en: "Wide leg", de: "Weites Bein", tr: "Bol paça" },
      { en: "Frayed checkerboard pattern", de: "Schachbrettmuster mit Fransen", tr: "Saçaklı dama deseni" },
      { en: "Embroidered monogram", de: "Gesticktes Monogramm", tr: "İşlemeli monogram" },
      { en: "Material to follow", de: "Material folgt", tr: "Kumaş bilgisi eklenecek" },
    ],
  },
  {
    handle: "atelier-coat",
    tag: "limited",
    title: "Atelier Coat",
    price: 420,
    colour: stone,
    swatch: "#8a8379",
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
    swatch: "#e4dfd5",
    frames: [
      { alt: "Box Tee", tone: "sand" },
      { alt: "Box Tee, back", tone: "stone" },
      { alt: "Box Tee, detail", tone: "ink" },
    ],
    sizes: sizes(),
    details,
  },
  {
    handle: "monogram-cap",
    title: "Monogram Cap",
    price: 60,
    colour: black,
    swatch: "#0a0a09",
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
    swatch: "#e4dfd5",
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
