export const BASE_DOUGH_COUNT = 6;

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  note?: string;
  precision?: number;
};

export type RecipeSection = {
  title: string;
  eyebrow: string;
  description: string;
  tone: 'amber' | 'tomato';
  ingredients: Ingredient[];
};

export const recipeSections: RecipeSection[] = [
  {
    title: 'Teig',
    eyebrow: 'Basisrezept',
    description: 'Luftiger Pizzateig mit 65 % Hydration.',
    tone: 'amber',
    ingredients: [
      { name: 'Mehl', amount: 1000, unit: 'g' },
      { name: 'Feines Meersalz', amount: 25, unit: 'g', precision: 1 },
      { name: 'Wasser', amount: 650, unit: 'ml' },
      { name: 'Frische Hefe', amount: 1, unit: 'g', precision: 2 },
      { name: 'Trockenhefe', amount: 0.33, unit: 'g', note: 'Alternative', precision: 2 },
    ],
  },
  {
    title: 'Sauce',
    eyebrow: 'Tomatensauce',
    description: 'Würzige Sauce passend zur gewählten Teigmenge.',
    tone: 'tomato',
    ingredients: [
      { name: 'Knoblauchzehe', amount: 1, unit: 'Stk.', precision: 2 },
      { name: 'Zwiebel', amount: 1, unit: 'Stk.', precision: 2 },
      { name: 'Olivenöl', amount: 15, unit: 'g', precision: 1 },
      { name: 'Passierte Tomaten', amount: 400, unit: 'g' },
      { name: 'Tomatenmark', amount: 30, unit: 'g', note: '3-fach konzentriert', precision: 1 },
      { name: 'Salz', amount: 1, unit: 'TL', precision: 2 },
      { name: 'Zucker', amount: 1, unit: 'TL', precision: 2 },
      { name: 'Pizzagewürz', amount: 1, unit: 'EL', precision: 2 },
    ],
  },
];
