// The archive. Every collection is a chapter with a number and a place.
// PLACEHOLDER content — titles, texts and images are stand-ins.
// Texts exist in three languages: en (English), de (Deutsch), tr (Türkçe).
//
// To add a real image: put the file in /public/archive/... and add
//   src: "/archive/sm-001/01.jpg"
// to the frame. Without src, a tonal placeholder is shown.

import type { Localized } from "@/lib/i18n";

export type Tone = "ink" | "smoke" | "stone" | "sand";

export type Frame = {
  src?: string;
  alt: string;
  tone: Tone;
  caption?: string;
};

export type Block =
  | { layout: "full"; frames: [Frame] }
  | { layout: "pair"; frames: [Frame, Frame] }
  | { layout: "offset-left" | "offset-right"; frames: [Frame] }
  | { layout: "text"; text: Localized };

export type Chapter = {
  number: string; // SM-001
  slug: string;
  title: string;
  place: Localized;
  country: Localized;
  coordinates: string;
  longitude: number; // degrees east, used for the map line
  year: string;
  summary: Localized;
  cover: Frame;
  intro: Localized[];
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    number: "SM-001",
    slug: "sm-001-origin",
    title: "Origin",
    place: {
      en: "Rorschacherberg",
      de: "Rorschacherberg",
      tr: "Rorschacherberg",
    },
    country: { en: "Switzerland", de: "Schweiz", tr: "İsviçre" },
    coordinates: "47°28′N 9°30′E",
    longitude: 9.5,
    year: "2025",
    summary: {
      en: "Where it starts. A hill above the lake, a name, a first set of pieces.",
      de: "Wo es beginnt. Ein Hügel über dem See, ein Name, die ersten Stücke.",
      tr: "Başladığı yer. Gölün üstünde bir tepe, bir isim, ilk parçalar.",
    },
    cover: { alt: "SM-001 cover", tone: "stone", caption: "Cover" },
    intro: [
      {
        en: "Placeholder text. The first chapter is the starting point of Soymonde: the place the name comes from and the first pieces made without anyone's brief.",
        de: "Platzhaltertext. Das erste Kapitel ist der Ausgangspunkt von Soymonde: der Ort, von dem der Name kommt, und die ersten Stücke, die ohne Vorgaben entstanden sind.",
        tr: "Geçici metin. İlk bölüm Soymonde'un başlangıç noktası: ismin geldiği yer ve kimsenin talimatı olmadan yapılan ilk parçalar.",
      },
      {
        en: "Write here what this collection was about — two or three short paragraphs are enough.",
        de: "Schreib hier, worum es in dieser Kollektion ging — zwei oder drei kurze Absätze reichen.",
        tr: "Bu koleksiyonun ne hakkında olduğunu buraya yaz — iki üç kısa paragraf yeter.",
      },
    ],
    blocks: [
      {
        layout: "full",
        frames: [{ alt: "Look 01", tone: "sand", caption: "Look 01" }],
      },
      {
        layout: "pair",
        frames: [
          { alt: "Look 02", tone: "stone", caption: "Look 02" },
          { alt: "Look 03", tone: "smoke", caption: "Look 03" },
        ],
      },
      {
        layout: "text",
        text: {
          en: "A line about the place, the light, the fabric.",
          de: "Eine Zeile über den Ort, das Licht, den Stoff.",
          tr: "Yer, ışık ve kumaş hakkında bir satır.",
        },
      },
      {
        layout: "offset-right",
        frames: [{ alt: "Detail", tone: "ink", caption: "Detail" }],
      },
    ],
  },
  {
    number: "SM-002",
    slug: "sm-002-two-shores",
    title: "Two Shores",
    place: { en: "Istanbul", de: "Istanbul", tr: "İstanbul" },
    country: { en: "Türkiye", de: "Türkei", tr: "Türkiye" },
    coordinates: "41°00′N 28°58′E",
    longitude: 28.97,
    year: "2025",
    summary: {
      en: "A city on two continents. Heritage on one side, the next thing on the other.",
      de: "Eine Stadt auf zwei Kontinenten. Herkunft auf der einen Seite, das Nächste auf der anderen.",
      tr: "İki kıtada bir şehir. Bir yanda miras, diğer yanda sıradaki şey.",
    },
    cover: { alt: "SM-002 cover", tone: "smoke", caption: "Cover" },
    intro: [
      {
        en: "Placeholder text. The second chapter travels east — to the city where two shores face each other.",
        de: "Platzhaltertext. Das zweite Kapitel reist nach Osten — in die Stadt, in der sich zwei Ufer gegenüberliegen.",
        tr: "Geçici metin. İkinci bölüm doğuya gidiyor — iki yakanın birbirine baktığı şehre.",
      },
      {
        en: "Write here what this collection was about.",
        de: "Schreib hier, worum es in dieser Kollektion ging.",
        tr: "Bu koleksiyonun ne hakkında olduğunu buraya yaz.",
      },
    ],
    blocks: [
      {
        layout: "pair",
        frames: [
          { alt: "Look 01", tone: "ink", caption: "Look 01" },
          { alt: "Look 02", tone: "sand", caption: "Look 02" },
        ],
      },
      {
        layout: "full",
        frames: [{ alt: "Look 03", tone: "stone", caption: "Look 03" }],
      },
      {
        layout: "offset-left",
        frames: [{ alt: "Detail", tone: "smoke", caption: "Detail" }],
      },
      {
        layout: "text",
        text: {
          en: "A line about the crossing.",
          de: "Eine Zeile über die Überfahrt.",
          tr: "Karşıya geçiş hakkında bir satır.",
        },
      },
      {
        layout: "full",
        frames: [{ alt: "Look 04", tone: "ink", caption: "Look 04" }],
      },
    ],
  },
  {
    number: "SM-003",
    slug: "sm-003-monde",
    title: "Monde",
    place: { en: "Paris", de: "Paris", tr: "Paris" },
    country: { en: "France", de: "Frankreich", tr: "Fransa" },
    coordinates: "48°51′N 2°21′E",
    longitude: 2.35,
    year: "2026",
    summary: {
      en: "The street meets the atelier. The monogram against the clean line.",
      de: "Die Strasse trifft das Atelier. Das Monogramm gegen die klare Linie.",
      tr: "Sokak atölyeyle buluşuyor. Monogram, sade çizgiye karşı.",
    },
    cover: { alt: "SM-003 cover", tone: "ink", caption: "Cover" },
    intro: [
      {
        en: "Placeholder text. The third chapter is about contrast: the gothic letter and the clean line in the same room.",
        de: "Platzhaltertext. Im dritten Kapitel geht es um Kontrast: der gotische Buchstabe und die klare Linie im selben Raum.",
        tr: "Geçici metin. Üçüncü bölüm kontrast hakkında: gotik harf ve sade çizgi aynı odada.",
      },
      {
        en: "Write here what this collection was about.",
        de: "Schreib hier, worum es in dieser Kollektion ging.",
        tr: "Bu koleksiyonun ne hakkında olduğunu buraya yaz.",
      },
    ],
    blocks: [
      {
        layout: "full",
        frames: [{ alt: "Look 01", tone: "smoke", caption: "Look 01" }],
      },
      {
        layout: "offset-left",
        frames: [{ alt: "Look 02", tone: "sand", caption: "Look 02" }],
      },
      {
        layout: "pair",
        frames: [
          { alt: "Look 03", tone: "stone", caption: "Look 03" },
          { alt: "Look 04", tone: "ink", caption: "Look 04" },
        ],
      },
      {
        layout: "text",
        text: {
          en: "A line about the contrast.",
          de: "Eine Zeile über den Kontrast.",
          tr: "Kontrast hakkında bir satır.",
        },
      },
    ],
  },
];

/** Newest chapter first. */
export const chaptersNewestFirst = [...chapters].sort((a, b) =>
  b.number.localeCompare(a.number),
);

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}
