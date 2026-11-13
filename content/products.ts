// The products. For now they are written here by hand; in the next step
// they come from Shopify (Storefront API). The shape below mirrors what
// Shopify returns, so the pages stay the same.
import type { Localized } from "@/lib/i18n";
import type { Frame } from "./archive";
import type { Gender, ProductType } from "./categories";
import type { CollectionKey } from "./collections";

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
  price?: number; // CHF. Leave out while the price is not set: shows "Coming soon"
  // the first (or only) colour
  colour: Localized;
  swatch: string;
  frames: Frame[];
  // further colours, if the piece comes in more than one
  otherColours?: Variant[];
  tag?: "new" | "limited";
  collection?: CollectionKey; // the drop it belongs to
  upcoming?: boolean; // not released yet: cannot be bought, shows "Notify me"
  // where the piece is filed in the shop (one or several categories)
  types: ProductType[];
  gender: Gender[]; // both = unisex
  basic?: boolean; // also listed under Basics
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

/** S to XL. Sizes listed in `notInStock` show the "Notify me" button. */
const sizes = (notInStock: string[] = []): Size[] =>
  ["S", "M", "L", "XL"].map((label) => ({
    label,
    available: !notInStock.includes(label),
  }));

/** For pieces that are not released yet: every size leads to "Notify me". */
const notYet: Size[] = sizes(["S", "M", "L", "XL"]);
// PLACEHOLDER colour for unreleased pieces (not shown on the site)
const ghostColour: Localized = {
  en: "To follow",
  de: "Folgt",
  tr: "Eklenecek",
};

const black: Localized = { en: "Black", de: "Schwarz", tr: "Siyah" };
const emerald: Localized = { en: "Emerald", de: "Smaragd", tr: "Zümrüt" };
const white: Localized = { en: "White", de: "Weiss", tr: "Beyaz" };

export const products: Product[] = [
  // ── Ghost Collection: the first drop. Not released yet. ──────────────
  // PLACEHOLDER: photos, prices, colours, sizes and details follow.
  {
    handle: "ghost-boxy-tee",
    collection: "ghost",
    upcoming: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Boxy Tee", // working name
    colour: ghostColour,
    swatch: "#e9e6df",
    frames: [{ alt: "Ghost Boxy Tee", tone: "sand" }], // PLACEHOLDER: photos to follow
    sizes: notYet,
    details: [],
  },
  {
    handle: "ghost-oversized-tee",
    collection: "ghost",
    upcoming: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Oversized Tee", // working name
    colour: ghostColour,
    swatch: "#e9e6df",
    frames: [{ alt: "Ghost Oversized Tee", tone: "sand" }], // PLACEHOLDER: photos to follow
    sizes: notYet,
    details: [],
  },
  {
    handle: "ghost-longsleeve",
    collection: "ghost",
    upcoming: true,
    types: ["tops"],
    gender: ["men", "women"],
    title: "Ghost Longsleeve", // working name
    colour: ghostColour,
    swatch: "#e9e6df",
    frames: [{ alt: "Ghost Longsleeve", tone: "sand" }], // PLACEHOLDER: photos to follow
    sizes: notYet,
    details: [],
  },
  {
    handle: "ghost-zip-jacket",
    collection: "ghost",
    upcoming: true,
    types: ["sweats", "jackets"],
    gender: ["men", "women"],
    title: "Ghost Zip Jacket", // working name
    colour: ghostColour,
    swatch: "#e9e6df",
    frames: [{ alt: "Ghost Zip Jacket", tone: "sand" }], // PLACEHOLDER: photos to follow
    sizes: notYet,
    details: [],
  },
  {
    handle: "ghost-joggers",
    collection: "ghost",
    upcoming: true,
    types: ["bottoms"],
    gender: ["men", "women"],
    title: "Ghost Joggers", // working name
    colour: ghostColour,
    swatch: "#e9e6df",
    frames: [{ alt: "Ghost Joggers", tone: "sand" }], // PLACEHOLDER: photos to follow
    sizes: notYet,
    details: [],
  },

  // ── Example pieces ─────────────────────────────────────────────────
  // The first real piece. Photos are in /public/products.
  {
    handle: "emerald-balaclava",
    types: ["accessories"],
    gender: ["men", "women"],
    tag: "new",
    title: "Emerald Balaclava", // working name
    price: 199,
    colour: emerald,
    swatch: "#0a5c36",
    frames: [
      {
        src: "/products/emerald-balaclava-01.webp",
        alt: "Emerald Balaclava, front",
        tone: "sand",
      },
      {
        src: "/products/emerald-balaclava-02.webp",
        alt: "Emerald Balaclava, back",
        tone: "sand",
      },
      {
        src: "/products/emerald-balaclava-03.webp",
        alt: "Emerald Balaclava, lining detail",
        tone: "sand",
      },
    ],
    sizes: [{ label: "One size", available: true }],
    details: [
      {
        en: "Knitted, with pearl detail and fringe",
        de: "Gestrickt, mit Perlen und Fransen",
        tr: "Örgü, inci ve saçak detaylı",
      },
      { en: "Lined", de: "Gefüttert", tr: "Astarlı" },
      {
        en: "Material to follow",
        de: "Material folgt",
        tr: "Kumaş bilgisi eklenecek",
      },
    ],
  },
  {
    handle: "v001-hoodie",
    types: ["sweats"],
    gender: ["men", "women"],
    title: "V001 Hoodie", // working name
    price: 180,
    colour: emerald,
    swatch: "#0a5c36",
    frames: [
      {
        src: "/products/v001-hoodie-01.webp",
        alt: "V001 Hoodie, front",
        tone: "sand",
      },
      {
        src: "/products/v001-hoodie-02.webp",
        alt: "V001 Hoodie, back",
        tone: "sand",
      },
      {
        src: "/products/v001-hoodie-03.webp",
        alt: "V001 Hoodie, embossed lettering",
        tone: "sand",
      },
    ],
    sizes: sizes(), // PLACEHOLDER: sizes not confirmed yet
    details: [
      { en: "Cropped fit", de: "Cropped geschnitten", tr: "Crop kesim" },
      {
        en: "Embossed lettering on the chest",
        de: "Geprägter Schriftzug auf der Brust",
        tr: "Göğüste kabartma yazı",
      },
      {
        en: "Material to follow",
        de: "Material folgt",
        tr: "Kumaş bilgisi eklenecek",
      },
    ],
  },
  {
    handle: "chess-jeans",
    types: ["bottoms"],
    gender: ["men", "women"],
    title: "Chess Jeans",
    price: 210, // PLACEHOLDER: price not confirmed yet
    colour: black,
    swatch: "#111110",
    frames: [
      {
        src: "/products/chess-jeans-black-01.webp",
        alt: "Chess Jeans in black, front",
        tone: "sand",
      },
      {
        src: "/products/chess-jeans-black-02.webp",
        alt: "Chess Jeans in black, back",
        tone: "sand",
      },
      {
        src: "/products/chess-jeans-black-03.webp",
        alt: "Chess Jeans in black, embroidered monogram",
        tone: "sand",
      },
    ],
    otherColours: [
      {
        key: "white",
        colour: white,
        swatch: "#eceae4",
        frames: [
          {
            src: "/products/chess-jeans-white-01.webp",
            alt: "Chess Jeans in white, front",
            tone: "sand",
          },
          {
            src: "/products/chess-jeans-white-02.webp",
            alt: "Chess Jeans in white, back",
            tone: "sand",
          },
          {
            src: "/products/chess-jeans-white-03.webp",
            alt: "Chess Jeans in white, embroidered monogram",
            tone: "sand",
          },
        ],
      },
    ],
    sizes: sizes(),
    details: [
      { en: "Wide leg", de: "Weites Bein", tr: "Bol paça" },
      {
        en: "Frayed checkerboard pattern",
        de: "Schachbrettmuster mit Fransen",
        tr: "Saçaklı dama deseni",
      },
      {
        en: "Embroidered monogram",
        de: "Gesticktes Monogramm",
        tr: "İşlemeli monogram",
      },
      {
        en: "Material to follow",
        de: "Material folgt",
        tr: "Kumaş bilgisi eklenecek",
      },
    ],
  },
  {
    handle: "iced-monogram-jacket",
    types: ["jackets"],
    gender: ["men", "women"],
    title: "Iced Monogram Jacket", // working name
    price: 420, // PLACEHOLDER: price not confirmed yet
    colour: black,
    swatch: "#111110",
    frames: [
      {
        src: "/products/iced-monogram-jacket-01.webp",
        alt: "Iced Monogram Jacket, front",
        tone: "sand",
      },
      {
        src: "/products/iced-monogram-jacket-02.webp",
        alt: "Iced Monogram Jacket, back with crystal monogram",
        tone: "sand",
      },
      {
        src: "/products/iced-monogram-jacket-03.webp",
        alt: "Iced Monogram Jacket, crystal monogram detail",
        tone: "sand",
      },
    ],
    sizes: sizes(),
    details: [
      { en: "Faux leather", de: "Kunstleder", tr: "Suni deri" },
      {
        en: "Padded and lined",
        de: "Wattiert und gefüttert",
        tr: "Dolgulu ve astarlı",
      },
      {
        en: "Crystal monogram on the back",
        de: "Monogramm aus Kristallsteinen auf dem Rücken",
        tr: "Sırtta kristal taşlı monogram",
      },
      {
        en: "Two-way zip, zipped pockets",
        de: "Zwei-Wege-Reissverschluss, Taschen mit Reissverschluss",
        tr: "Çift yönlü fermuar, fermuarlı cepler",
      },
    ],
  },
  {
    handle: "essentials-tee",
    types: ["tops"],
    gender: ["men", "women"],
    basic: true,
    title: "Essentials Tee", // working name
    price: 75, // PLACEHOLDER: price not confirmed yet
    colour: black,
    swatch: "#111110",
    frames: [
      {
        src: "/products/essentials-tee-01.webp",
        alt: "Essentials Tee, front",
        tone: "sand",
      },
      {
        src: "/products/essentials-tee-02.webp",
        alt: "Essentials Tee, back",
        tone: "sand",
      },
      {
        src: "/products/essentials-tee-03.webp",
        alt: "Essentials Tee, collar and embroidered monogram",
        tone: "sand",
      },
    ],
    sizes: sizes(), // PLACEHOLDER: sizes not confirmed yet
    details: [
      {
        en: "Oversized fit",
        de: "Oversized geschnitten",
        tr: "Oversize kesim",
      },
      {
        en: "Tonal embroidered monogram on the chest",
        de: "Ton-in-Ton gesticktes Monogramm auf der Brust",
        tr: "Göğüste ton sür ton işlemeli monogram",
      },
      {
        en: "Metal monogram plate at the hem",
        de: "Metallplakette mit Monogramm am Saum",
        tr: "Etekte monogramlı metal plaka",
      },
      {
        en: "Material to follow",
        de: "Material folgt",
        tr: "Kumaş bilgisi eklenecek",
      },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export const inCollection = (key: CollectionKey) =>
  products.filter((p) => p.collection === key);

export const formatPrice = (amount: number) =>
  `CHF ${amount.toFixed(2).replace(/\.00$/, "")}`;
