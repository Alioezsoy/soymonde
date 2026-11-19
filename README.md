# SOYMONDE

Website von SOYMONDE: Online-Shop und Archiv. Next.js, später Shopify (Storefront API), Hosting auf Vercel.

## Lokal starten

```bash
npm install
```

```bash
npm run dev
```

Dann im Browser http://localhost:3000 öffnen.

## Sprachen

Die Seite gibt es auf Englisch (`/en`), Deutsch (`/de`) und Türkisch (`/tr`). Wer ohne Sprache ankommt, wird nach der Browser-Sprache weitergeleitet; die Wahl über EN / DE / TR im Menü wird gemerkt. Jeder Text steht dreimal da: `en`, `de`, `tr`.

## Wo ändere ich was?

| Was | Datei |
| --- | --- |
| Archiv-Fotos | Ordner `public/archive` (siehe unten) |
| Allgemeine Texte in allen drei Sprachen (Navigation, Manifest, About …) | `content/dictionaries.ts` |
| Platzhalter-Produkte (bis Shopify angebunden ist) | `content/products.ts` |
| Warenkorb-Logik (später Shopify) | `lib/cart.ts` |
| Logos | Dateien in `public/logos`, Dateinamen in `lib/brand.ts` |
| Farben, Schrift, Übergänge | `app/globals.css` |

## Archiv-Fotos hinzufügen

Fotos in den Ordner `public/archive` legen. Sie erscheinen automatisch auf der Seite, sortiert nach Dateiname. Eine Nummer vorne bestimmt die Reihenfolge; eines der Wörter `process`, `sketch` oder `studio` im Namen setzt die Beschriftung:

    01-studio-desk.jpg
    02-sketch-hoodie.jpg
    03-process-cutting.jpg

Solange der Ordner keine Fotos enthält, zeigt die Seite Platzhalter.

## Rechtliche Seiten, Grössentabelle, Countdown

- **Deine Angaben für Impressum & Co.:** `content/company.ts` (Adresse, E-Mail, Rückgabefrist). Leere Felder zeigen auf der Website «Folgt».
- **Texte der rechtlichen Seiten:** `content/legal.ts`. Das sind Entwürfe – vor dem Shop-Start prüfen lassen.
- **Grössentabelle:** in `content/products.ts` beim Piece `measurements` eintragen (Zentimeter, eine Zahl pro Grösse).
- **Countdown zum Drop:** in `content/collections.ts` bei der Kollektion `dropAt` setzen, z. B. `dropAt: "2027-03-12T18:00:00+01:00"`.

## Pre-order und E-Mail-Anmeldungen

- **Pre-order:** Pieces mit `preorder: true` (in `content/products.ts`) zeigen „Pre-order“ und den Satz „Get yours before it's gone.“ Kaufen geht erst, wenn ein `price` eingetragen ist; ohne Preis steht „Demnächst“ und „Benachrichtige mich“.
- **E-Mail-Felder** (Newsletter, Early Access, Benachrichtige mich) speichern die Adressen in Shopify als Kunden mit Newsletter-Einwilligung und einem Tag (`newsletter`, `early-access`, `notify-<piece>-<grösse>`). Dafür braucht die Website drei Einstellungen in Vercel: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_CLIENT_ID` und `SHOPIFY_CLIENT_SECRET` (aus der App im Shopify Dev Dashboard). Solange sie fehlen, steht „öffnet in Kürze“.

## Checkout

„Zur Kasse“ legt über die Storefront-API (Headless-App in Shopify) einen Warenkorb an und leitet zum Shopify-Checkout weiter. Shop-Adresse und öffentlicher Storefront-Token stehen in `lib/shopify-storefront.ts`. Solange der Shop in Shopify mit einem Passwort gesperrt ist, landet der Checkout auf der Passwortseite.

## Länder und Währungen

Die Website erkennt das Land des Besuchers (auf Vercel über die Verbindung; zum Testen mit dem Cookie `soymonde-country`, z. B. `TR`) und zeigt Preise, Warenkorb und Checkout in der Währung des passenden Shopify-Markts: Schweiz CHF, EU EUR, Türkei TRY. Die Umrechnung macht Shopify (Einstellungen → Märkte). Die Preise in `content/products.ts` sind die CHF-Grundpreise.
