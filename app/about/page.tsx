import type { Metadata } from "next";
import { Monogram, Wordmark } from "@/components/Logo";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

// PLACEHOLDER story — to be written properly in a later step.
export default function AboutPage() {
  return (
    <>
      <PageIntro label="About" title="A world of its own">
        <p>{site.manifesto}</p>
      </PageIntro>

      <section className="grid items-center gap-16 px-5 pb-32 md:grid-cols-2 md:gap-10 md:px-10 md:pb-56">
        <Reveal className="flex flex-col items-center gap-10 bg-ink px-8 py-24 md:py-40">
          <Monogram tone="white" className="h-32 w-auto md:h-48" />
          <Wordmark tone="white" className="w-40 md:w-56" />
        </Reveal>
        <Reveal className="max-w-md space-y-6 text-lg font-light leading-relaxed md:justify-self-center">
          <p>
            Soymonde is streetwear and high fashion from Switzerland, founded and directed by Ali
            Özsoy.
          </p>
          <p className="text-stone-deep">
            The name joins two halves: Soy, from the family name Özsoy, and monde, French for
            world. The gothic monogram carries where it comes from. The clean wordmark carries
            where it is going.
          </p>
          <p className="text-stone-deep">Placeholder text — the full story follows.</p>
        </Reveal>
      </section>
    </>
  );
}
