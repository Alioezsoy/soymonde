// All general site texts, in English, German and Turkish.
// Edit freely. Texts marked PLACEHOLDER are stand-ins for your own words.
import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    description:
      "SOYMONDE — streetwear and high fashion from Switzerland. Shop and archive of a world of its own.",
  },
  nav: {
    shop: "Shop",
    archive: "Archive",
    about: "About",
    contact: "Contact",
    bag: "Bag",
    menu: "Menu",
    close: "Close",
    language: "Language",
    home: "SOYMONDE — home",
  },
  base: { label: "Base", place: "Rorschacherberg, Switzerland", coordinates: "47°28′N 9°30′E" },
  home: {
    // PLACEHOLDER
    manifesto: "Soy, from Özsoy. Monde, the world. No instructions from anyone — a world of its own.",
    story: "The story",
    latestChapter: "Latest chapter",
    enterChapter: "Enter chapter",
    selectedPieces: "Selected pieces",
    viewShop: "View shop",
    worldSoFar: "The world so far",
    openArchive: "Open archive",
  },
  archive: {
    label: "Archive",
    title: "The World",
    intro: "Every collection is a chapter. Every chapter has a number and a place on the map.",
    chapter: "Chapter",
    place: "Place",
    position: "Position",
    year: "Year",
    nextChapter: "Next chapter",
    west: "West",
    east: "East",
    mapLabel: "Chapters by longitude",
  },
  shop: { label: "Shop", title: "Pieces" },
  cart: { label: "Bag", title: "Your bag is empty", continue: "Continue to shop" },
  about: {
    label: "About",
    title: "A world of its own",
    p1: "Soymonde is streetwear and high fashion from Switzerland, founded and directed by Ali Özsoy.",
    p2: "The name joins two halves: Soy, from the family name Özsoy, and monde, French for world. The gothic monogram carries where it comes from. The clean wordmark carries where it is going.",
    placeholder: "Placeholder text — the full story follows.",
  },
  contact: { label: "Contact", title: "Write to us" },
  newsletter: {
    title: "Letters from the world",
    text: "New chapters and releases, first. Nothing else.",
    email: "Email address",
    subscribe: "Subscribe",
    pending: "Sign-up opens soon — this form is not connected yet.",
  },
  footer: { tagline: "A world of its own" },
  notFound: { title: "Off the map", back: "Back to the start" },
};

export type Dictionary = typeof en;

const de: Dictionary = {
  meta: {
    description:
      "SOYMONDE — Streetwear und High Fashion aus der Schweiz. Shop und Archiv einer eigenen Welt.",
  },
  nav: {
    shop: "Shop",
    archive: "Archiv",
    about: "Über uns",
    contact: "Kontakt",
    bag: "Warenkorb",
    menu: "Menü",
    close: "Schliessen",
    language: "Sprache",
    home: "SOYMONDE — Startseite",
  },
  base: { label: "Basis", place: "Rorschacherberg, Schweiz", coordinates: "47°28′N 9°30′E" },
  home: {
    manifesto: "Soy, aus Özsoy. Monde, die Welt. Keine Vorgaben von anderen — eine eigene Welt.",
    story: "Die Geschichte",
    latestChapter: "Neuestes Kapitel",
    enterChapter: "Kapitel öffnen",
    selectedPieces: "Ausgewählte Stücke",
    viewShop: "Zum Shop",
    worldSoFar: "Die Welt bis jetzt",
    openArchive: "Archiv öffnen",
  },
  archive: {
    label: "Archiv",
    title: "Die Welt",
    intro: "Jede Kollektion ist ein Kapitel. Jedes Kapitel hat eine Nummer und einen Ort auf der Karte.",
    chapter: "Kapitel",
    place: "Ort",
    position: "Position",
    year: "Jahr",
    nextChapter: "Nächstes Kapitel",
    west: "West",
    east: "Ost",
    mapLabel: "Kapitel nach Längengrad",
  },
  shop: { label: "Shop", title: "Stücke" },
  cart: { label: "Warenkorb", title: "Dein Warenkorb ist leer", continue: "Weiter zum Shop" },
  about: {
    label: "Über uns",
    title: "Eine eigene Welt",
    p1: "Soymonde ist Streetwear und High Fashion aus der Schweiz, gegründet und geleitet von Ali Özsoy.",
    p2: "Der Name verbindet zwei Hälften: Soy, aus dem Familiennamen Özsoy, und monde, französisch für Welt. Das gotische Monogramm trägt die Herkunft. Der klare Schriftzug trägt die Richtung.",
    placeholder: "Platzhaltertext — die ganze Geschichte folgt.",
  },
  contact: { label: "Kontakt", title: "Schreib uns" },
  newsletter: {
    title: "Briefe aus der Welt",
    text: "Neue Kapitel und Releases, zuerst. Sonst nichts.",
    email: "E-Mail-Adresse",
    subscribe: "Anmelden",
    pending: "Die Anmeldung öffnet bald — dieses Formular ist noch nicht verbunden.",
  },
  footer: { tagline: "Eine eigene Welt" },
  notFound: { title: "Nicht auf der Karte", back: "Zurück zum Anfang" },
};

const tr: Dictionary = {
  meta: {
    description:
      "SOYMONDE — İsviçre'den streetwear ve high fashion. Kendine ait bir dünyanın mağazası ve arşivi.",
  },
  nav: {
    shop: "Mağaza",
    archive: "Arşiv",
    about: "Hakkında",
    contact: "İletişim",
    bag: "Sepet",
    menu: "Menü",
    close: "Kapat",
    language: "Dil",
    home: "SOYMONDE — ana sayfa",
  },
  base: { label: "Merkez", place: "Rorschacherberg, İsviçre", coordinates: "47°28′N 9°30′E" },
  home: {
    manifesto: "Soy, Özsoy'dan. Monde, dünya. Kimsenin kuralı yok — kendine ait bir dünya.",
    story: "Hikâye",
    latestChapter: "Son bölüm",
    enterChapter: "Bölüme gir",
    selectedPieces: "Seçili parçalar",
    viewShop: "Mağazaya git",
    worldSoFar: "Şimdiye kadarki dünya",
    openArchive: "Arşivi aç",
  },
  archive: {
    label: "Arşiv",
    title: "Dünya",
    intro: "Her koleksiyon bir bölüm. Her bölümün bir numarası ve haritada bir yeri var.",
    chapter: "Bölüm",
    place: "Yer",
    position: "Konum",
    year: "Yıl",
    nextChapter: "Sonraki bölüm",
    west: "Batı",
    east: "Doğu",
    mapLabel: "Boylama göre bölümler",
  },
  shop: { label: "Mağaza", title: "Parçalar" },
  cart: { label: "Sepet", title: "Sepetin boş", continue: "Mağazaya devam et" },
  about: {
    label: "Hakkında",
    title: "Kendine ait bir dünya",
    p1: "Soymonde, İsviçre'den streetwear ve high fashion. Kurucusu ve kreatif direktörü Ali Özsoy.",
    p2: "İsim iki yarımı birleştirir: Özsoy soyadından Soy ve Fransızca dünya anlamına gelen monde. Gotik monogram nereden geldiğini taşır. Sade yazı nereye gittiğini.",
    placeholder: "Geçici metin — hikâyenin tamamı gelecek.",
  },
  contact: { label: "İletişim", title: "Bize yaz" },
  newsletter: {
    title: "Dünyadan mektuplar",
    text: "Yeni bölümler ve çıkışlar, ilk önce. Başka hiçbir şey.",
    email: "E-posta adresi",
    subscribe: "Abone ol",
    pending: "Kayıt yakında açılıyor — bu form henüz bağlı değil.",
  },
  footer: { tagline: "Kendine ait bir dünya" },
  notFound: { title: "Harita dışı", back: "Başa dön" },
};

export const dictionaries: Record<Locale, Dictionary> = { en, de, tr };
