import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "./Logo";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="grid gap-16 px-5 pt-20 md:grid-cols-2 md:px-10 md:pt-32">
        <div className="max-w-md">
          <p className="label text-stone">{site.newsletter.title}</p>
          <p className="mt-4 text-lg font-light">{site.newsletter.text}</p>
          <div className="mt-8">
            <Newsletter tone="dark" />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:justify-self-end md:gap-24">
          <ul className="space-y-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className="label text-stone">Base</p>
            <p className="mt-4 text-sm font-light leading-relaxed">{site.base.place}</p>
            <p className="coord mt-2 text-stone">{site.base.coordinates}</p>
          </div>
        </nav>
      </div>

      <div className="px-5 pb-8 pt-24 md:px-10 md:pt-40">
        <Wordmark tone="white" className="w-full" />
        <div className="mt-8 flex justify-between text-stone">
          <span className="coord">© Soymonde</span>
          <span className="coord">A world of its own</span>
        </div>
      </div>
    </footer>
  );
}
