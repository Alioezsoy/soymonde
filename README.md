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
