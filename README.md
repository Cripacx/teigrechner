# TeigRechner

Moderner Pizza-Teig- und Sauce-Rechner für GitHub Pages. Die App läuft komplett statisch: alle Mengen werden lokal im Browser anhand der gewünschten Teiganzahl skaliert.

## Stack

- Astro
- Vue 3 Composition API
- TypeScript
- Tailwind CSS
- GitHub Pages

## Features

- Skalierung aller Zutaten auf Basis von 6 Teigen
- Einstellbares Gewicht pro Teigling, standardmäßig 280 g
- Kartenlayout für Teig und Sauce
- Presets fuer 6, 12, 18 und 24 Teige
- Sauber formatierte Zahlen mit deutschen Trennzeichen
- Responsive App-UI mit Dark Mode
- Keine Backend-Abhängigkeit

## Projektstruktur

```text
.
├── .github/workflows/deploy.yml
├── public/
├── src/
│   ├── components/
│   │   ├── CountSelector.vue
│   │   ├── PizzaCalculator.vue
│   │   ├── RecipeCard.vue
│   │   └── ThemeToggle.vue
│   ├── data/
│   │   └── recipes.ts
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── format.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Berechnung

Alle Zutaten basieren auf dem Rezept für 6 Teige à 280 g.

```ts
factor = (gewünschteTeige * grammProTeigling) / (6 * 280);
skalierteMenge = basisMenge * factor;
```

Beispiele:

- 12 Teige à 280 g: Faktor 2
- 3 Teige à 280 g: Faktor 0,5
- 6 Teige à 300 g: Faktor 1,07

## Lokal starten

```sh
pnpm install
pnpm dev
```

Der Entwicklungsserver läuft standardmäßig unter `http://localhost:4321`.

## Build prüfen

```sh
pnpm build
pnpm preview
```

Der statische Build landet in `dist/`.

## Deployment auf GitHub Pages

Das Repository enthaelt bereits den Workflow `.github/workflows/deploy.yml`.

1. Code in ein GitHub-Repository pushen, idealerweise auf den Branch `main`.
2. In GitHub unter `Settings` > `Pages` als Source `GitHub Actions` auswählen.
3. Den Workflow `Deploy to GitHub Pages` ausführen lassen oder manuell über `Actions` starten.
4. Nach erfolgreichem Deploy ist die Website unter der Pages-URL verfuegbar.

Die Astro-Konfiguration erkennt GitHub Actions automatisch und setzt den korrekten `base`-Pfad für Projektseiten, z. B. `/TeigRechner`.

## Rezeptbasis

Teig für 6 Teige à 280 g:

- 1000 g Mehl
- 25 g feines Meersalz
- 650 ml Wasser
- 1 g frische Hefe
- 0,33 g Trockenhefe als Alternative

Sauce für 6 Teige à 280 g:

- 1 Knoblauchzehe
- 1 Zwiebel
- 15 g Olivenöl
- 400 g passierte Tomaten
- 30 g Tomatenmark, 3-fach konzentriert
- 1 TL Salz
- 1 TL Zucker
- 1 EL Pizzagewürz
