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

## Wo ändere ich was?

| Was | Datei |
| --- | --- |
| Kollektionen / Kapitel (SM-001 …), Texte, Bilder | `content/chapters.ts` |
| Allgemeine Texte, Navigation, Manifest | `content/site.ts` |
| Platzhalter-Produkte (bis Shopify angebunden ist) | `content/products.ts` |
| Logos | Dateien in `public/logos`, Dateinamen in `lib/brand.ts` |
| Farben, Schrift, Übergänge | `app/globals.css` |

Bilder für das Archiv kommen nach `public/archive/…` und werden in `content/chapters.ts` mit `src: "/archive/…"` eingetragen.
