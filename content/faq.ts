// Questions and answers for the FAQ page, in all three languages.
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
      en: "The Ghost Collection is open for pre-order now. Your pieces ship once production is finished, about one month after your order.",
      de: "Die Ghost Collection kannst du jetzt vorbestellen. Deine Pieces werden verschickt, sobald die Produktion abgeschlossen ist, rund einen Monat nach deiner Bestellung.",
      tr: "Ghost Collection şu anda PRE-ORDER ile satışta. Parçaların, üretim tamamlandığında, siparişinden yaklaşık bir ay sonra gönderilir.",
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
      en: `We ship from Switzerland to Switzerland, the EU and Türkiye. Pre-orders ship ${company.preorderShipping.en} after your order, once production is finished. Shipping costs are shown at checkout.`,
      de: `Wir versenden aus der Schweiz in die Schweiz, die EU und die Türkei. Pre-orders werden ${company.preorderShipping.de} nach deiner Bestellung verschickt, sobald die Produktion abgeschlossen ist. Die Versandkosten siehst du im Checkout.`,
      tr: `İsviçre'den İsviçre'ye, AB'ye ve Türkiye'ye gönderiyoruz. PRE-ORDER siparişleri, üretim tamamlandıktan sonra, siparişinden ${company.preorderShipping.tr} sonra gönderilir. Kargo ücreti ödeme adımında gösterilir.`,
    },
  },
  {
    q: {
      en: "Can I return a piece?",
      de: "Kann ich ein Piece zurückgeben?",
      tr: "Bir parçayı iade edebilir miyim?",
    },
    a: {
      en: `Yes. You can withdraw within ${company.returnDays} days of delivery, or at any time before your order ships, without giving reasons. You pay the return shipping; we refund the price and standard delivery costs. The steps are on the Shipping & returns page.`,
      de: `Ja. Du kannst innerhalb von ${company.returnDays} Tagen nach Erhalt widerrufen, oder jederzeit, bevor deine Bestellung verschickt wird, ohne Angabe von Gründen. Die Rücksendung bezahlst du, wir erstatten den Preis und die Standard-Versandkosten. Die Schritte stehen auf der Seite Versand & Rückgabe.`,
      tr: `Evet. Teslimattan sonraki ${company.returnDays} gün içinde veya siparişin gönderilmeden önce istediğin zaman, gerekçe göstermeden cayabilirsin. İade kargo ücreti sana aittir; ürün bedelini ve standart kargo ücretini iade ederiz. Adımlar Kargo & iade sayfasında yazıyor.`,
    },
  },
  {
    q: {
      en: "Do I pay customs?",
      de: "Muss ich Zoll bezahlen?",
      tr: "Gümrük ödeyecek miyim?",
    },
    a: {
      en: "Within Switzerland, no. For the EU and Türkiye, customs duties and import taxes may apply in your country and are paid on delivery. Since February 2026, Türkiye charges them on every parcel from abroad.",
      de: "Innerhalb der Schweiz nicht. In der EU und in der Türkei können Zölle und Einfuhrsteuern anfallen, die bei der Zustellung bezahlt werden. Die Türkei erhebt sie seit Februar 2026 auf jedes Paket aus dem Ausland.",
      tr: "İsviçre içinde hayır. AB'de ve Türkiye'de gümrük vergisi ve ithalat vergileri doğabilir; bunlar teslimatta ödenir. Türkiye, Şubat 2026'dan beri yurt dışından gelen her pakete bunları uygulamaktadır.",
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
