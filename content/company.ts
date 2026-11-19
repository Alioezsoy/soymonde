// Who runs the shop. These details appear on the legal pages
// (Imprint, Privacy, Terms, Shipping & returns).
// An empty field shows "To follow" on the site.
export const company = {
  name: "SOYMONDE",
  owner: "Ali Özsoy",
  street: "Risegg 1",
  city: "9422 Staad SG",
  country: { en: "Switzerland", de: "Schweiz", tr: "İsviçre" },
  email: "", // PLACEHOLDER: contact address for customers, e.g. hello@soymonde.com
  // Withdrawal period in days, counted from delivery (the same for every country).
  returnDays: 14,
  // Pre-orders ship about this long after the order, once production is done.
  preorderShipping: { en: "about one month", de: "rund einen Monat", tr: "yaklaşık bir ay" },
};

export const social = [
  { label: "Instagram", handle: "@soymonde", url: "https://www.instagram.com/soymonde" },
  { label: "TikTok", handle: "@soymondeclo", url: "https://www.tiktok.com/@soymondeclo" },
];
