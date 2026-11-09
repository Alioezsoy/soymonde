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
| Kollektionen / Kapitel (SM-001 …), Texte, Bilder | `content/chapters.ts` |
| Allgemeine Texte in allen drei Sprachen (Navigation, Manifest, About …) | `content/dictionaries.ts` |
| Platzhalter-Produkte (bis Shopify angebunden ist) | `content/products.ts` |
| Warenkorb-Logik (später Shopify) | `lib/cart.ts` |
| Logos | Dateien in `public/logos`, Dateinamen in `lib/brand.ts` |
| Farben, Schrift, Übergänge | `app/globals.css` |

Bilder für das Archiv kommen nach `public/archive/…` und werden in `content/chapters.ts` mit `src: "/archive/…"` eingetragen.
