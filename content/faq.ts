// Questions and answers for the FAQ page, in all three languages.
// PLACEHOLDER: adjust once shipping, payment and returns are fixed.
import type { Localized } from "@/lib/i18n";
import { company } from "./company";

export const faq: { q: Localized; a: Localized }[] = [
  {
    q: {
      en: "When does the Ghost Collection drop?",
      de: "Wann erscheint die Ghost Collection?",
      tr: "Ghost Collection ne zaman çıkıyor?",
    },
    a: {
      en: "The date will be announced on the collection page. Sign up for early access there to get the link before the drop opens.",
      de: "Das Datum wird auf der Seite der Kollektion bekannt gegeben. Trag dich dort für Early Access ein und erhalte den Link, bevor der Drop öffnet.",
      tr: "Tarih koleksiyon sayfasında duyurulacak. Orada early access için kaydol ve drop açılmadan önce bağlantıyı al.",
    },
  },
  {
    q: {
      en: "Which size should I choose?",
      de: "Welche Grösse soll ich wählen?",
      tr: "Hangi bedeni seçmeliyim?",
    },
    a: {
      en: "Each piece has its own size guide on the product page, with measurements in centimetres. Compare them with a piece you already own.",
      de: "Jedes Piece hat auf der Produktseite eine eigene Grössentabelle mit Massen in Zentimetern. Vergleiche sie mit einem Teil, das du schon besitzt.",
      tr: "Her parçanın ürün sayfasında santimetre ölçüleriyle kendi beden tablosu var. Ölçüleri, elindeki bir parçayla karşılaştır.",
    },
  },
  {
    q: {
      en: "My size is not available. What can I do?",
      de: "Meine Grösse ist nicht verfügbar. Was kann ich tun?",
      tr: "Bedenim mevcut değil. Ne yapabilirim?",
    },
    a: {
      en: "Choose your size and tap “Notify me”. We will write to you once, as soon as it is back.",
      de: "Wähle deine Grösse und tippe auf «Benachrichtige mich». Wir schreiben dir einmal, sobald sie wieder da ist.",
      tr: "Bedenini seç ve “Bana haber ver”e dokun. Tekrar geldiğinde sana bir kez yazarız.",
    },
  },
  {
    q: {
      en: "Where do you ship from, and how long does it take?",
      de: "Von wo versendet ihr, und wie lange dauert es?",
      tr: "Nereden gönderiyorsunuz ve ne kadar sürüyor?",
    },
    a: {
      en: "We ship from Switzerland. Shipping costs and delivery time are shown at checkout before you pay.",
      de: "Wir versenden aus der Schweiz. Versandkosten und Lieferzeit siehst du im Checkout, bevor du bezahlst.",
      tr: "İsviçre'den gönderiyoruz. Kargo ücreti ve teslimat süresi, ödeme yapmadan önce ödeme adımında gösterilir.",
    },
  },
  {
    q: {
      en: "Can I return a piece?",
      de: "Kann ich ein Piece zurückgeben?",
      tr: "Bir parçayı iade edebilir miyim?",
    },
    a: {
      en: `Yes, within ${company.returnDays} days of delivery, unworn and in its original condition. The steps are on the Shipping & returns page.`,
      de: `Ja, innerhalb von ${company.returnDays} Tagen nach Erhalt, ungetragen und im Originalzustand. Die Schritte stehen auf der Seite Versand & Rückgabe.`,
      tr: `Evet, teslimattan sonraki ${company.returnDays} gün içinde, giyilmemiş ve ilk günkü durumunda. Adımlar Kargo & iade sayfasında yazıyor.`,
    },
  },
  {
    q: {
      en: "How can I pay?",
      de: "Wie kann ich bezahlen?",
      tr: "Nasıl ödeyebilirim?",
    },
    a: {
      en: "The payment methods are shown at checkout. The checkout opens with the first drop.",
      de: "Die Zahlungsarten siehst du im Checkout. Der Checkout öffnet mit dem ersten Drop.",
      tr: "Ödeme yöntemleri ödeme adımında gösterilir. Ödeme, ilk drop ile birlikte açılır.",
    },
  },
];
