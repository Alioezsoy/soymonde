// The archive. Every collection is a chapter with a number and a place.
// PLACEHOLDER content — titles, places and images are stand-ins.
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
  | { layout: "offset-left" | "offset-right"; frames: [Frame] };

export type Chapter = {
  number: string; // SM-001
  slug: string;
  title: string; // the same in every language
  place: Localized;
  country: Localized;
  coordinates: string;
  longitude: number; // degrees east, used for the map line
  year: string;
  cover: Frame;
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    number: "SM-001",
    slug: "sm-001-origin",
    title: "Origin",
    place: { en: "Rorschacherberg", de: "Rorschacherberg", tr: "Rorschacherberg" },
    country: { en: "Switzerland", de: "Schweiz", tr: "İsviçre" },
    coordinates: "47°28′N 9°30′E",
    longitude: 9.5,
    year: "2025",
    cover: { alt: "SM-001 Origin", tone: "stone" },
    blocks: [
      { layout: "full", frames: [{ alt: "Look 01", tone: "sand", caption: "Look 01" }] },
      {
        layout: "pair",
        frames: [
          { alt: "Look 02", tone: "stone", caption: "Look 02" },
          { alt: "Look 03", tone: "smoke", caption: "Look 03" },
        ],
      },
      { layout: "offset-right", frames: [{ alt: "Look 04", tone: "ink", caption: "Look 04" }] },
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
    cover: { alt: "SM-002 Two Shores", tone: "sand" },
    blocks: [
      {
        layout: "pair",
        frames: [
          { alt: "Look 01", tone: "ink", caption: "Look 01" },
          { alt: "Look 02", tone: "sand", caption: "Look 02" },
        ],
      },
      { layout: "full", frames: [{ alt: "Look 03", tone: "stone", caption: "Look 03" }] },
      { layout: "offset-left", frames: [{ alt: "Look 04", tone: "smoke", caption: "Look 04" }] },
      { layout: "full", frames: [{ alt: "Look 05", tone: "ink", caption: "Look 05" }] },
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
    cover: { alt: "SM-003 Monde", tone: "smoke" },
    blocks: [
      { layout: "full", frames: [{ alt: "Look 01", tone: "ink", caption: "Look 01" }] },
      { layout: "offset-left", frames: [{ alt: "Look 02", tone: "sand", caption: "Look 02" }] },
      {
        layout: "pair",
        frames: [
          { alt: "Look 03", tone: "stone", caption: "Look 03" },
          { alt: "Look 04", tone: "smoke", caption: "Look 04" },
        ],
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

export function getChapterByNumber(number: string) {
  return chapters.find((c) => c.number === number);
}
