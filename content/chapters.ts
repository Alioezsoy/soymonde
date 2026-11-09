// The archive. Every collection is a chapter with a number and a place.
// PLACEHOLDER content — titles, texts and images are stand-ins.
//
// To add a real image: put the file in /public/archive/... and add
//   src: "/archive/sm-001/01.jpg"
// to the frame. Without src, a tonal placeholder is shown.

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
  | { layout: "text"; text: string };

export type Chapter = {
  number: string; // SM-001
  slug: string;
  title: string;
  place: string;
  country: string;
  coordinates: string;
  longitude: number; // degrees east, used for the map line
  year: string;
  summary: string;
  cover: Frame;
  intro: string[];
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    number: "SM-001",
    slug: "sm-001-origin",
    title: "Origin",
    place: "Rorschacherberg",
    country: "Switzerland",
    coordinates: "47°28′N 9°30′E",
    longitude: 9.5,
    year: "2025",
    summary: "Where it starts. A hill above the lake, a name, a first set of pieces.",
    cover: { alt: "SM-001 cover", tone: "stone", caption: "Cover" },
    intro: [
      "Placeholder text. The first chapter is the starting point of Soymonde: the place the name comes from and the first pieces made without anyone's brief.",
      "Write here what this collection was about — two or three short paragraphs are enough.",
    ],
    blocks: [
      { layout: "full", frames: [{ alt: "Look 01", tone: "sand", caption: "Look 01" }] },
      {
        layout: "pair",
        frames: [
          { alt: "Look 02", tone: "stone", caption: "Look 02" },
          { alt: "Look 03", tone: "smoke", caption: "Look 03" },
        ],
      },
      { layout: "text", text: "A line about the place, the light, the fabric." },
      { layout: "offset-right", frames: [{ alt: "Detail", tone: "ink", caption: "Detail" }] },
    ],
  },
  {
    number: "SM-002",
    slug: "sm-002-two-shores",
    title: "Two Shores",
    place: "Istanbul",
    country: "Türkiye",
    coordinates: "41°00′N 28°58′E",
    longitude: 28.97,
    year: "2025",
    summary: "A city on two continents. Heritage on one side, the next thing on the other.",
    cover: { alt: "SM-002 cover", tone: "smoke", caption: "Cover" },
    intro: [
      "Placeholder text. The second chapter travels east — to the city where two shores face each other.",
      "Write here what this collection was about.",
    ],
    blocks: [
      {
        layout: "pair",
        frames: [
          { alt: "Look 01", tone: "ink", caption: "Look 01" },
          { alt: "Look 02", tone: "sand", caption: "Look 02" },
        ],
      },
      { layout: "full", frames: [{ alt: "Look 03", tone: "stone", caption: "Look 03" }] },
      { layout: "offset-left", frames: [{ alt: "Detail", tone: "smoke", caption: "Detail" }] },
      { layout: "text", text: "A line about the crossing." },
      { layout: "full", frames: [{ alt: "Look 04", tone: "ink", caption: "Look 04" }] },
    ],
  },
  {
    number: "SM-003",
    slug: "sm-003-monde",
    title: "Monde",
    place: "Paris",
    country: "France",
    coordinates: "48°51′N 2°21′E",
    longitude: 2.35,
    year: "2026",
    summary: "The street meets the atelier. The monogram against the clean line.",
    cover: { alt: "SM-003 cover", tone: "ink", caption: "Cover" },
    intro: [
      "Placeholder text. The third chapter is about contrast: the gothic letter and the clean line in the same room.",
      "Write here what this collection was about.",
    ],
    blocks: [
      { layout: "full", frames: [{ alt: "Look 01", tone: "smoke", caption: "Look 01" }] },
      { layout: "offset-left", frames: [{ alt: "Look 02", tone: "sand", caption: "Look 02" }] },
      {
        layout: "pair",
        frames: [
          { alt: "Look 03", tone: "stone", caption: "Look 03" },
          { alt: "Look 04", tone: "ink", caption: "Look 04" },
        ],
      },
      { layout: "text", text: "A line about the contrast." },
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
