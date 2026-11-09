import type { ReactNode } from "react";

/** Standard page opening: small label, large quiet heading. */
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-56">
      <p className="label text-stone-deep">{label}</p>
      <h1 className="display mt-5 text-3xl md:text-6xl">{title}</h1>
      {children ? (
        <div className="mt-8 max-w-xl text-lg font-light leading-relaxed md:mt-10 md:text-xl">
          {children}
        </div>
      ) : null}
    </section>
  );
}
