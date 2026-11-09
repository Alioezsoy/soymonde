import type { Metadata } from "next";
import { Newsletter } from "@/components/Newsletter";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

// Contact details (email, Instagram) are added in a later step.
export default function ContactPage() {
  return (
    <>
      <PageIntro label="Contact" title="Write to us" />
      <section className="grid gap-16 px-5 pb-32 md:grid-cols-2 md:px-10 md:pb-56">
        <div className="max-w-md">
          <p className="label text-stone-deep">{site.newsletter.title}</p>
          <p className="mt-4 text-lg font-light">{site.newsletter.text}</p>
          <div className="mt-8">
            <Newsletter tone="light" />
          </div>
        </div>
        <div>
          <p className="label text-stone-deep">Base</p>
          <p className="mt-4 text-lg font-light">{site.base.place}</p>
          <p className="coord mt-2 text-stone-deep">{site.base.coordinates}</p>
        </div>
      </section>
    </>
  );
}
