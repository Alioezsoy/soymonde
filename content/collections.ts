// Collections (drops). A product joins one with `collection: "ghost"`.
// Their names are the same in every language.

type Collection = {
  key: string;
  slug: string;
  title: string;
  upcoming: boolean;
  /** Date and time of the drop, Swiss time, e.g. "2027-03-12T18:00:00+01:00".
      While it is set and in the future, the collection page counts down to it.
      Leave it out while the date is not fixed. */
  dropAt?: string;
};

export const collections = [
  {
    key: "ghost",
    slug: "ghost",
    title: "Ghost Collection",
    upcoming: true, // not released yet: pieces show "Coming soon" and "Notify me"
  },
] as const satisfies readonly Collection[];

export type CollectionKey = (typeof collections)[number]["key"];

export const getCollection = (slug: string): (Collection & { key: CollectionKey }) | undefined => collections.find((c) => c.slug === slug);
