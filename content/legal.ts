// The legal pages, in all three languages.
// DRAFTS: have these texts checked before the shop opens.
import type { Locale } from "@/lib/i18n";
import { company } from "./company";

export const legalSlugs = ["imprint", "privacy", "terms", "shipping"] as const;
export type LegalSlug = (typeof legalSlugs)[number];
export const isLegalSlug = (s: string): s is LegalSlug => (legalSlugs as readonly string[]).includes(s);

export type LegalSection = { heading: string; body: string[] };

/** `missing` is the text shown for details that are not filled in yet. */
export function getLegal(slug: LegalSlug, lang: Locale, missing: string): LegalSection[] {
  const c = {
    name: company.name,
    owner: company.owner,
    street: company.street || missing,
    city: company.city || missing,
    country: company.country[lang],
    email: company.email || missing,
    days: company.returnDays,
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
          body: [`${c.name}, ${c.owner}, ${c.country}. Questions about your data: ${c.email}`],
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
          body: [`${c.name}, ${c.owner}, ${c.country}. Fragen zu deinen Daten: ${c.email}`],
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
          body: [`${c.name}, ${c.owner}, ${c.country}. Verilerinle ilgili sorular: ${c.email}`],
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
        { heading: "Scope", body: [`These terms apply to all orders placed with ${c.name} through this website.`] },
        {
          heading: "Order and contract",
          body: [
            "The pieces shown are an invitation to order. Your order is a binding offer. The contract is concluded when we confirm the order by email.",
          ],
        },
        {
          heading: "Prices and payment",
          body: [
            "All prices are in Swiss francs (CHF). Shipping costs are shown at checkout before you pay. The payment methods offered are listed at checkout.",
          ],
        },
        { heading: "Delivery", body: ["We ship from Switzerland. The delivery time is shown at checkout."] },
        {
          heading: "Returns",
          body: [`You can return unworn pieces within ${c.days} days of delivery. See Shipping & returns for how.`],
        },
        { heading: "Warranty", body: ["Swiss statutory warranty rights apply."] },
        { heading: "Applicable law", body: ["Swiss law applies. The place of jurisdiction is the seat of the operator."] },
      ],
      de: [
        {
          heading: "Geltungsbereich",
          body: [`Diese Bedingungen gelten für alle Bestellungen, die über diese Website bei ${c.name} aufgegeben werden.`],
        },
        {
          heading: "Bestellung und Vertrag",
          body: [
            "Die gezeigten Pieces sind eine Einladung zur Bestellung. Deine Bestellung ist ein verbindliches Angebot. Der Vertrag kommt zustande, wenn wir die Bestellung per E-Mail bestätigen.",
          ],
        },
        {
          heading: "Preise und Zahlung",
          body: [
            "Alle Preise sind in Schweizer Franken (CHF). Die Versandkosten siehst du im Checkout, bevor du bezahlst. Die angebotenen Zahlungsarten werden im Checkout angezeigt.",
          ],
        },
        { heading: "Lieferung", body: ["Wir versenden aus der Schweiz. Die Lieferzeit siehst du im Checkout."] },
        {
          heading: "Rückgabe",
          body: [
            `Ungetragene Pieces kannst du innerhalb von ${c.days} Tagen nach Erhalt zurücksenden. Wie das geht, steht unter Versand & Rückgabe.`,
          ],
        },
        { heading: "Gewährleistung", body: ["Es gelten die gesetzlichen Gewährleistungsrechte nach Schweizer Recht."] },
        {
          heading: "Anwendbares Recht",
          body: ["Es gilt Schweizer Recht. Gerichtsstand ist der Sitz des Betreibers."],
        },
      ],
      tr: [
        { heading: "Kapsam", body: [`Bu koşullar, bu site üzerinden ${c.name}'ye verilen tüm siparişler için geçerlidir.`] },
        {
          heading: "Sipariş ve sözleşme",
          body: [
            "Gösterilen parçalar sipariş vermeye davettir. Siparişin bağlayıcı bir tekliftir. Sözleşme, siparişi e-posta ile onayladığımızda kurulur.",
          ],
        },
        {
          heading: "Fiyatlar ve ödeme",
          body: [
            "Tüm fiyatlar İsviçre frangı (CHF) cinsindendir. Kargo ücreti, ödeme yapmadan önce ödeme adımında gösterilir. Sunulan ödeme yöntemleri ödeme adımında listelenir.",
          ],
        },
        { heading: "Teslimat", body: ["İsviçre'den gönderim yapıyoruz. Teslimat süresi ödeme adımında gösterilir."] },
        {
          heading: "İade",
          body: [
            `Giyilmemiş parçaları teslimattan sonraki ${c.days} gün içinde iade edebilirsin. Nasıl yapılacağı Kargo & iade sayfasında yazıyor.`,
          ],
        },
        { heading: "Garanti", body: ["İsviçre hukukundaki yasal garanti hakları geçerlidir."] },
        { heading: "Uygulanacak hukuk", body: ["İsviçre hukuku geçerlidir. Yetkili mahkeme, işletmecinin merkezinin bulunduğu yerdir."] },
      ],
    },

    shipping: {
      en: [
        {
          heading: "Shipping",
          body: [
            "We ship from Switzerland. Shipping costs and delivery time are shown at checkout before you pay.",
            "Orders to other countries may be subject to customs duties and import taxes, which the recipient pays.",
          ],
        },
        {
          heading: "Returns",
          body: [
            `You can return a piece within ${c.days} days of delivery. It must be unworn, unwashed and in its original condition.`,
            `Write to us first: ${c.email}. We will send you the return address and confirm the next steps.`,
            "Once the piece has arrived and been checked, we refund the amount to the original payment method.",
          ],
        },
        {
          heading: "Faulty pieces",
          body: [`If something arrives damaged or is not what you ordered, write to us with a photo: ${c.email}`],
        },
      ],
      de: [
        {
          heading: "Versand",
          body: [
            "Wir versenden aus der Schweiz. Versandkosten und Lieferzeit siehst du im Checkout, bevor du bezahlst.",
            "Bei Bestellungen ins Ausland können Zölle und Einfuhrsteuern anfallen. Diese trägt der Empfänger.",
          ],
        },
        {
          heading: "Rückgabe",
          body: [
            `Du kannst ein Piece innerhalb von ${c.days} Tagen nach Erhalt zurücksenden. Es muss ungetragen, ungewaschen und im Originalzustand sein.`,
            `Schreib uns zuerst: ${c.email}. Wir senden dir die Rücksendeadresse und bestätigen die nächsten Schritte.`,
            "Sobald das Piece bei uns angekommen und geprüft ist, erstatten wir den Betrag auf die ursprüngliche Zahlungsart.",
          ],
        },
        {
          heading: "Mangelhafte Pieces",
          body: [`Wenn etwas beschädigt ankommt oder nicht deiner Bestellung entspricht, schreib uns mit einem Foto: ${c.email}`],
        },
      ],
      tr: [
        {
          heading: "Kargo",
          body: [
            "İsviçre'den gönderim yapıyoruz. Kargo ücreti ve teslimat süresi, ödeme yapmadan önce ödeme adımında gösterilir.",
            "Yurt dışı siparişlerinde gümrük vergisi ve ithalat vergileri doğabilir. Bunları alıcı öder.",
          ],
        },
        {
          heading: "İade",
          body: [
            `Bir parçayı teslimattan sonraki ${c.days} gün içinde iade edebilirsin. Giyilmemiş, yıkanmamış ve ilk günkü durumunda olmalıdır.`,
            `Önce bize yaz: ${c.email}. Sana iade adresini gönderir ve sonraki adımları onaylarız.`,
            "Parça bize ulaşıp kontrol edildikten sonra tutarı ilk ödeme yöntemine iade ederiz.",
          ],
        },
        {
          heading: "Kusurlu parçalar",
          body: [`Bir ürün hasarlı gelirse veya siparişine uymuyorsa bize bir fotoğrafla yaz: ${c.email}`],
        },
      ],
    },
  };

  return docs[slug][lang];
}
