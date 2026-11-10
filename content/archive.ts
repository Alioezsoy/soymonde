// The archive: a picture journey — process, sketches, the studio.
//
// Photos are read automatically from the folder /public/archive,
// sorted by file name. See /public/archive/README.md for naming.
// As long as that folder holds no photos, tonal placeholders are shown.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type Tone = "ink" | "smoke" | "stone" | "sand";

/** One image: a real photo (src) or a tonal placeholder. */
export type Frame = {
  src?: string;
  alt: string;
  tone: Tone;
  caption?: string;
};

export type ArchiveKind = "process" | "sketch" | "studio";

export type ArchiveEntry = Frame & {
  kind?: ArchiveKind;
  width: number;
  height: number;
};

const KINDS: ArchiveKind[] = ["process", "sketch", "studio"];

const placeholders: ArchiveEntry[] = (
  [
    ["studio", "smoke", 16, 10],
    ["sketch", "sand", 4, 5],
    ["process", "ink", 3, 4],
    ["studio", "stone", 3, 2],
    ["sketch", "sand", 1, 1],
    ["process", "smoke", 4, 5],
    ["studio", "ink", 16, 9],
    ["sketch", "stone", 3, 4],
    ["process", "sand", 4, 5],
    ["studio", "smoke", 3, 2],
    ["process", "ink", 4, 5],
    ["sketch", "stone", 16, 10],
  ] as const
).map(([kind, tone, width, height]) => ({ kind, tone, width, height, alt: `Placeholder, ${kind}` }));

function readPhotos(): ArchiveEntry[] {
  const dir = path.join(process.cwd(), "public", "archive");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  } catch {
    return [];
  }
  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .flatMap((file) => {
      try {
        const size = imageSize(fs.readFileSync(path.join(dir, file)));
        // phone photos are often stored sideways with a rotation note (5–8)
        const turned = (size.orientation ?? 1) >= 5;
        const kind = KINDS.find((k) => file.toLowerCase().includes(k));
        return [
          {
            src: `/archive/${encodeURIComponent(file)}`,
            alt: kind ? `SOYMONDE archive, ${kind}` : "SOYMONDE archive",
            tone: "stone" as const,
            kind,
            width: turned ? size.height : size.width,
            height: turned ? size.width : size.height,
          },
        ];
      } catch {
        return []; // unreadable file: skip it rather than break the page
      }
    });
}

export function getArchive(): ArchiveEntry[] {
  const photos = readPhotos();
  return photos.length > 0 ? photos : placeholders;
}
