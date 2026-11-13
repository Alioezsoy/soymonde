// Collections (drops). A product joins one with `collection: "ghost"`.
// Their names are the same in every language.

export const collections = [
  {
    key: "ghost",
    slug: "ghost",
    title: "Ghost Collection",
    upcoming: true, // not released yet: pieces show "Coming soon" and "Notify me"
  },
] as const;

export type CollectionKey = (typeof collections)[number]["key"];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
