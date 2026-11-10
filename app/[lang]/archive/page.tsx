import type { Metadata } from "next";
import { ArchiveGallery } from "@/components/ArchiveGallery";
import { PageIntro } from "@/components/PageIntro";
import { getArchive } from "@/content/archive";
import { getTexts } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTexts();
  return { title: t.archive.label };
}

// A journey in pictures: process, sketches, the studio. No text needed.
export default async function ArchivePage() {
  const { t } = await getTexts();
  const entries = getArchive();
  return (
    <>
      <PageIntro label={String(entries.length).padStart(2, "0")} title={t.archive.label} />
      <ArchiveGallery entries={entries} t={t.archive} />
      <div className="h-24 md:h-40" />
    </>
  );
}
