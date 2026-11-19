// The legal pages, in all three languages.
// Have changes to these texts checked by a lawyer.
import type { Locale } from "@/lib/i18n";
import { company } from "./company";

export const legalSlugs = ["imprint", "privacy", "terms", "shipping"] as const;
export type LegalSlug = (typeof legalSlugs)[number];
export const isLegalSlug = (s: string): s is LegalSlug =>
  (legalSlugs as readonly string[]).includes(s);

export type LegalSection = { heading: string; body: string[] };

/** `missing` is the text shown for details that are not filled in yet. */
export function getLegal(
  slug: LegalSlug,
  lang: Locale,
  missing: string,
): LegalSection[] {
  const c = {
    name: company.name,
    owner: company.owner,
    street: company.street || missing,
    city: company.city || missing,
    country: company.country[lang],
    email: company.email || missing,
    days: company.returnDays,
    preorder: company.preorderShipping[lang],
  };
  const address = [`${c.name}, ${c.owner}`, c.street, c.city, c.country];

  const docs: Record<LegalSlug, Record<Locale, LegalSection[]>> = {
    imprint: {
      en: [
        { heading: "Operator", body: address },
        { heading: "Contact", body: [c.email] },
        { heading: "Responsible for the content", body: [c.owner] },
      ],
      de: [
        { heading: "Betreiber", body: address },
        { heading: "Kontakt", body: [c.email] },
        { heading: "Verantwortlich für den Inhalt", body: [c.owner] },
      ],
      tr: [
        { heading: "İşletmeci", body: address },
        { heading: "İletişim", body: [c.email] },
        { heading: "İçerikten sorumlu", body: [c.owner] },
      ],
    },

    privacy: {
      en: [
        {
          heading: "Who is responsible",
          body: [
            `${c.name}, ${c.owner}, ${c.country}. Questions about your data: ${c.email}`,
          ],
        },
        {
          heading: "What this site stores",
          body: [
            "This site uses no advertising or tracking tools.",
            "Your language choice is kept in a cookie. Your bag is kept in your own browser and is not sent to us until you order.",
            "Our hosting provider records technical access data, such as the IP address and the time of a visit, to keep the site running and secure.",
          ],
        },
        {
          heading: "Email addresses",
          body: [
            "If you sign up for the newsletter, early access or a notification for a piece, we use your email address for that purpose only. You can unsubscribe at any time.",
          ],
        },
        {
          heading: "Orders",
          body: [
            "To deliver an order we need your name, address, email address and payment details. Orders and payments are handled by our shop and payment providers. The details are added here before the shop opens.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can ask what we hold about you and have it corrected or deleted. Write to the address above. Swiss data protection law (FADP) applies.",
          ],
        },
      ],
      de: [
        {
          heading: "Verantwortlich",
          body: [
            `${c.name}, ${c.owner}, ${c.country}. Fragen zu deinen Daten: ${c.email}`,
          ],
        },
        {
          heading: "Was diese Website speichert",
          body: [
            "Diese Website verwendet keine Werbe- oder Tracking-Tools.",
            "Deine Sprachwahl wird in einem Cookie gespeichert. Dein Warenkorb liegt in deinem eigenen Browser und wird erst mit einer Bestellung an uns übermittelt.",
            "Unser Hosting-Anbieter erfasst technische Zugriffsdaten wie IP-Adresse und Zeitpunkt des Besuchs, damit die Website stabil und sicher läuft.",
          ],
        },
        {
          heading: "E-Mail-Adressen",
          body: [
            "Wenn du dich für den Newsletter, Early Access oder eine Benachrichtigung zu einem Piece einträgst, verwenden wir deine E-Mail-Adresse nur dafür. Du kannst dich jederzeit abmelden.",
          ],
        },
        {
          heading: "Bestellungen",
          body: [
            "Für die Lieferung brauchen wir Name, Adresse, E-Mail-Adresse und Zahlungsangaben. Bestellungen und Zahlungen laufen über unsere Shop- und Zahlungsanbieter. Die Einzelheiten ergänzen wir hier, bevor der Shop öffnet.",
          ],
        },
        {
          heading: "Deine Rechte",
          body: [
            "Du kannst Auskunft über deine Daten verlangen und sie berichtigen oder löschen lassen. Schreib uns an die Adresse oben. Es gilt das Schweizer Datenschutzgesetz (DSG).",
          ],
        },
      ],
      tr: [
        {
          heading: "Sorumlu",
          body: [
            `${c.name}, ${c.owner}, ${c.country}. Verilerinle ilgili sorular: ${c.email}`,
          ],
        },
        {
          heading: "Bu site neleri saklar",
          body: [
            "Bu site reklam veya izleme araçları kullanmaz.",
            "Dil seçimin bir çerezde saklanır. Sepetin kendi tarayıcında durur ve sipariş verene kadar bize iletilmez.",
            "Barındırma sağlayıcımız, sitenin sorunsuz ve güvenli çalışması için IP adresi ve ziyaret zamanı gibi teknik erişim verilerini kaydeder.",
          ],
        },
        {
          heading: "E-posta adresleri",
          body: [
            "Newsletter, early access veya bir parça için bildirim kaydı yaptığında e-posta adresini yalnızca bu amaçla kullanırız. İstediğin zaman çıkabilirsin.",
          ],
        },
        {
          heading: "Siparişler",
          body: [
            "Teslimat için adına, adresine, e-posta adresine ve ödeme bilgilerine ihtiyacımız var. Siparişler ve ödemeler mağaza ve ödeme sağlayıcılarımız üzerinden yürütülür. Ayrıntılar mağaza açılmadan önce buraya eklenecek.",
          ],
        },
        {
          heading: "Hakların",
          body: [
            "Hakkında hangi verileri tuttuğumuzu sorabilir, bunların düzeltilmesini veya silinmesini isteyebilirsin. Yukarıdaki adrese yaz. İsviçre veri koruma yasası (FADP) geçerlidir.",
          ],
        },
      ],
    },

    terms: {
      en: [
        {
          heading: "Scope",
          body: [
            `These terms apply to all orders placed with ${c.name}, ${c.owner}, through this website, for delivery to Switzerland, the EU and Türkiye.`,
          ],
        },
        {
          heading: "Order and contract",
          body: [
            "The pieces shown are an invitation to order. By completing the checkout you make a binding offer. The contract is concluded when we confirm the order by email.",
          ],
        },
        {
          heading: "Pre-orders",
          body: [
            "Pieces marked “Pre-order” are produced after the order. Payment is due when you order.",
            `Pre-orders ship ${c.preorder} after the order, once production is finished. If there is a delay, we tell you by email; you can withdraw at any time before the piece ships (see below).`,
          ],
        },
        {
          heading: "Prices and payment",
          body: [
            "Prices are shown in the currency of your country (CHF, EUR or TRY) and include VAT where it applies. Shipping costs are shown at checkout before you pay. The payment methods offered are listed at checkout.",
          ],
        },
        {
          heading: "Right of withdrawal",
          body: [
            `You can withdraw from your order without giving reasons within ${c.days} days of receiving the goods. You can also withdraw before the goods are delivered, including during production. This applies to every order, whichever country you order from.`,
            `To withdraw, send us a clear statement by email: ${c.email}. You can use the model form on the Shipping & returns page, but you do not have to. Sending your statement before the period ends is enough.`,
            `If you withdraw, we refund all payments received from you, including standard delivery costs, within ${c.days} days of receiving your statement, using the original payment method. For goods already shipped, we may wait until we have received them back or you have shown proof of return. There are no fees and no forced vouchers.`,
            `Please send the goods back within ${c.days} days of your withdrawal. You bear the direct cost of returning them. You are only liable for a loss in value caused by handling the goods beyond what is needed to check their nature, characteristics and fit.`,
          ],
        },
        {
          heading: "Defects",
          body: [
            "Statutory warranty rights apply. If something arrives damaged or faulty, write to us with a photo.",
          ],
        },
        {
          heading: "Applicable law",
          body: [
            "Swiss law applies. If you are a consumer in the EU or Türkiye, the mandatory consumer protection rules of your country remain unaffected.",
          ],
        },
      ],
      de: [
        {
          heading: "Geltungsbereich",
          body: [
            `Diese Bedingungen gelten für alle Bestellungen bei ${c.name}, ${c.owner}, über diese Website, mit Lieferung in die Schweiz, die EU und die Türkei.`,
          ],
        },
        {
          heading: "Bestellung und Vertrag",
          body: [
            "Die gezeigten Pieces sind eine Einladung zur Bestellung. Mit dem Abschluss des Checkouts gibst du ein verbindliches Angebot ab. Der Vertrag kommt zustande, wenn wir die Bestellung per E-Mail bestätigen.",
          ],
        },
        {
          heading: "Pre-orders",
          body: [
            "Pieces mit der Kennzeichnung „Pre-order“ werden nach der Bestellung produziert. Bezahlt wird bei der Bestellung.",
            `Pre-orders werden ${c.preorder} nach der Bestellung verschickt, sobald die Produktion abgeschlossen ist. Bei einer Verzögerung informieren wir dich per E-Mail; du kannst jederzeit vor dem Versand widerrufen (siehe unten).`,
          ],
        },
        {
          heading: "Preise und Zahlung",
          body: [
            "Die Preise werden in der Währung deines Landes angezeigt (CHF, EUR oder TRY) und enthalten die Mehrwertsteuer, wo sie anfällt. Die Versandkosten siehst du im Checkout, bevor du bezahlst. Die angebotenen Zahlungsarten werden im Checkout angezeigt.",
          ],
        },
        {
          heading: "Widerrufsrecht",
          body: [
            `Du kannst deine Bestellung innerhalb von ${c.days} Tagen nach Erhalt der Ware ohne Angabe von Gründen widerrufen. Auch vor der Lieferung, also während der Produktion, ist ein Widerruf möglich. Das gilt für jede Bestellung, egal aus welchem Land.`,
            `Für den Widerruf genügt eine eindeutige Erklärung per E-Mail an ${c.email}. Du kannst dafür das Muster-Formular auf der Seite Versand & Rückgabe verwenden, musst aber nicht. Es reicht, wenn du die Erklärung vor Ablauf der Frist absendest.`,
            `Nach einem Widerruf erstatten wir dir alle Zahlungen, einschliesslich der Standard-Versandkosten, innerhalb von ${c.days} Tagen nach Eingang deiner Erklärung, über die ursprüngliche Zahlungsart. Ist die Ware schon verschickt, dürfen wir mit der Erstattung warten, bis sie wieder bei uns ist oder du die Rücksendung nachgewiesen hast. Es fallen keine Gebühren an, und es gibt keine erzwungenen Gutscheine.`,
            `Bitte sende die Ware innerhalb von ${c.days} Tagen nach deinem Widerruf zurück. Die direkten Kosten der Rücksendung trägst du. Für einen Wertverlust haftest du nur, wenn er auf einen Umgang mit der Ware zurückgeht, der über das Prüfen von Beschaffenheit, Eigenschaften und Passform hinausgeht.`,
          ],
        },
        {
          heading: "Mängel",
          body: [
            "Es gelten die gesetzlichen Gewährleistungsrechte. Wenn etwas beschädigt oder fehlerhaft ankommt, schreib uns mit einem Foto.",
          ],
        },
        {
          heading: "Anwendbares Recht",
          body: [
            "Es gilt Schweizer Recht. Bist du Verbraucher in der EU oder in der Türkei, bleiben die zwingenden Verbraucherschutzregeln deines Landes unberührt.",
          ],
        },
      ],
      tr: [
        {
          heading: "Kapsam",
          body: [
            `Bu koşullar, bu site üzerinden ${c.name}, ${c.owner}'a verilen ve İsviçre, AB ve Türkiye'ye teslim edilen tüm siparişler için geçerlidir.`,
          ],
        },
        {
          heading: "Sipariş ve sözleşme",
          body: [
            "Gösterilen parçalar sipariş vermeye davettir. Ödeme adımını tamamladığında bağlayıcı bir teklif vermiş olursun. Sözleşme, siparişi e-posta ile onayladığımızda kurulur.",
          ],
        },
        {
          heading: "PRE-ORDER",
          body: [
            "“PRE-ORDER” işaretli parçalar sipariş sonrasında üretilir. Ödeme sipariş sırasında alınır.",
            `PRE-ORDER siparişleri, üretim tamamlandıktan sonra, siparişten ${c.preorder} sonra gönderilir. Bir gecikme olursa sana e-posta ile haber veririz; parça gönderilmeden önce istediğin zaman cayabilirsin (aşağıya bak).`,
          ],
        },
        {
          heading: "Fiyatlar ve ödeme",
          body: [
            "Fiyatlar ülkenin para biriminde (CHF, EUR veya TRY) gösterilir ve geçerli olduğu yerlerde KDV dahildir. Kargo ücreti, ödeme yapmadan önce ödeme adımında gösterilir. Sunulan ödeme yöntemleri ödeme adımında listelenir.",
          ],
        },
        {
          heading: "Cayma hakkı",
          body: [
            `Siparişinden, ürünü teslim aldıktan sonraki ${c.days} gün içinde gerekçe göstermeden cayabilirsin. Teslimattan önce, yani üretim sırasında da cayabilirsin. Bu, hangi ülkeden sipariş verirsen ver her sipariş için geçerlidir.`,
            `Cayma için ${c.email} adresine açık bir e-posta göndermen yeterlidir. Kargo & iade sayfasındaki örnek formu kullanabilirsin, ama zorunlu değildir. Bildirimini süre bitmeden göndermen yeterlidir.`,
            `Cayarsan, standart kargo ücreti dahil senden aldığımız tüm ödemeleri, bildiriminin bize ulaşmasından sonraki ${c.days} gün içinde ilk ödeme yönteminle iade ederiz. Ürün gönderilmişse, ürün bize geri ulaşana veya iade gönderimini belgeleyene kadar beklemeye hakkımız vardır. Hiçbir ücret alınmaz ve zorunlu hediye çeki verilmez.`,
            `Lütfen ürünü caymandan sonraki ${c.days} gün içinde geri gönder. İadenin doğrudan masrafı sana aittir. Yalnızca ürünün niteliğini, özelliklerini ve bedenini kontrol etmenin ötesindeki kullanımdan doğan değer kaybından sorumlusun.`,
          ],
        },
        {
          heading: "Ayıplı ürünler",
          body: [
            "Yasal garanti hakları geçerlidir. Bir ürün hasarlı veya kusurlu gelirse bize bir fotoğrafla yaz.",
          ],
        },
        {
          heading: "Uygulanacak hukuk",
          body: [
            "İsviçre hukuku geçerlidir. AB'de veya Türkiye'de tüketiciysen, ülkenin zorunlu tüketici koruma kuralları saklıdır.",
          ],
        },
      ],
    },

    shipping: {
      en: [
        {
          heading: "Shipping",
          body: [
            "We ship from Switzerland to Switzerland, the EU and Türkiye. Shipping costs are shown at checkout before you pay.",
            `Pre-orders ship ${c.preorder} after your order, once production is finished.`,
          ],
        },
        {
          heading: "Customs (EU and Türkiye)",
          body: [
            "Orders outside Switzerland may be subject to customs duties and import taxes in the destination country. Since February 2026, Türkiye charges duties and taxes on every parcel from abroad, with no tax-free amount. These are paid by the recipient on delivery.",
          ],
        },
        {
          heading: "Withdrawal and returns",
          body: [
            `You can withdraw within ${c.days} days of delivery, or at any time before your order ships. Write to us: ${c.email}.`,
            `Send the goods back within ${c.days} days of your withdrawal. You pay the return shipping. We refund the price and the standard delivery costs within ${c.days} days; for goods already shipped, once they are back with us or you have shown proof of return.`,
            "Full details are in the Terms.",
          ],
        },
        {
          heading: "Model withdrawal form",
          body: [
            `(Fill in and send this form only if you want to withdraw.) To: ${c.name}, ${c.owner}, ${c.street}, ${c.city}, ${c.country}, ${c.email}`,
            "I/We hereby withdraw from the contract for the purchase of the following goods: ____ · Ordered on ____ / received on ____ · Order number ____ · Name ____ · Address ____ · Date ____ · Signature (only on paper)",
          ],
        },
        {
          heading: "Faulty pieces",
          body: [
            `If something arrives damaged or is not what you ordered, write to us with a photo: ${c.email}`,
          ],
        },
      ],
      de: [
        {
          heading: "Versand",
          body: [
            "Wir versenden aus der Schweiz in die Schweiz, die EU und die Türkei. Die Versandkosten siehst du im Checkout, bevor du bezahlst.",
            `Pre-orders werden ${c.preorder} nach deiner Bestellung verschickt, sobald die Produktion abgeschlossen ist.`,
          ],
        },
        {
          heading: "Zoll (EU und Türkei)",
          body: [
            "Bei Bestellungen ausserhalb der Schweiz können im Empfängerland Zölle und Einfuhrsteuern anfallen. Die Türkei erhebt seit Februar 2026 auf jedes Paket aus dem Ausland Zoll und Steuern, ohne Freigrenze. Diese bezahlt der Empfänger bei der Zustellung.",
          ],
        },
        {
          heading: "Widerruf und Rückgabe",
          body: [
            `Du kannst innerhalb von ${c.days} Tagen nach Erhalt widerrufen, oder jederzeit, bevor deine Bestellung verschickt wird. Schreib uns: ${c.email}.`,
            `Sende die Ware innerhalb von ${c.days} Tagen nach deinem Widerruf zurück. Die Rücksendekosten trägst du. Wir erstatten den Preis und die Standard-Versandkosten innerhalb von ${c.days} Tagen; bei bereits verschickter Ware, sobald sie wieder bei uns ist oder du die Rücksendung nachgewiesen hast.`,
            "Alle Einzelheiten stehen in den AGB.",
          ],
        },
        {
          heading: "Muster-Widerrufsformular",
          body: [
            `(Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus und sende es zurück.) An: ${c.name}, ${c.owner}, ${c.street}, ${c.city}, ${c.country}, ${c.email}`,
            "Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren: ____ · Bestellt am ____ / erhalten am ____ · Bestellnummer ____ · Name ____ · Anschrift ____ · Datum ____ · Unterschrift (nur auf Papier)",
          ],
        },
        {
          heading: "Mangelhafte Pieces",
          body: [
            `Wenn etwas beschädigt ankommt oder nicht deiner Bestellung entspricht, schreib uns mit einem Foto: ${c.email}`,
          ],
        },
      ],
      tr: [
        {
          heading: "Kargo",
          body: [
            "İsviçre'den İsviçre'ye, AB'ye ve Türkiye'ye gönderim yapıyoruz. Kargo ücreti, ödeme yapmadan önce ödeme adımında gösterilir.",
            `PRE-ORDER siparişleri, üretim tamamlandıktan sonra, siparişinden ${c.preorder} sonra gönderilir.`,
          ],
        },
        {
          heading: "Gümrük (AB ve Türkiye)",
          body: [
            "İsviçre dışındaki siparişlerde alıcı ülkede gümrük vergisi ve ithalat vergileri doğabilir. Türkiye, Şubat 2026'dan beri yurt dışından gelen her pakete muafiyet sınırı olmadan gümrük vergisi ve vergi uygulamaktadır. Bunları alıcı teslimatta öder.",
          ],
        },
        {
          heading: "Cayma ve iade",
          body: [
            `Teslimattan sonraki ${c.days} gün içinde veya siparişin gönderilmeden önce istediğin zaman cayabilirsin. Bize yaz: ${c.email}.`,
            `Ürünü caymandan sonraki ${c.days} gün içinde geri gönder. İade kargo ücreti sana aittir. Ürün bedelini ve standart kargo ücretini ${c.days} gün içinde iade ederiz; gönderilmiş ürünlerde, ürün bize geri ulaştığında veya iade gönderimini belgelediğinde.`,
            "Tüm ayrıntılar Koşullar sayfasındadır.",
          ],
        },
        {
          heading: "Örnek cayma formu",
          body: [
            `(Sözleşmeden caymak istiyorsan bu formu doldurup gönder.) Alıcı: ${c.name}, ${c.owner}, ${c.street}, ${c.city}, ${c.country}, ${c.email}`,
            "Aşağıdaki ürünlerin satın alınmasına ilişkin sözleşmeden cayıyorum/cayıyoruz: ____ · Sipariş tarihi ____ / teslim tarihi ____ · Sipariş numarası ____ · Ad soyad ____ · Adres ____ · Tarih ____ · İmza (yalnızca kâğıt üzerinde)",
          ],
        },
        {
          heading: "Kusurlu parçalar",
          body: [
            `Bir ürün hasarlı gelirse veya siparişine uymuyorsa bize bir fotoğrafla yaz: ${c.email}`,
          ],
        },
      ],
    },
  };

  return docs[slug][lang];
}
