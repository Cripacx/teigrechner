import type { Ingredient } from '../data/recipes';

const amountFormatter = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 2,
});

const factorFormatter = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 2,
});

export function formatAmount(value: number, precision?: number): string {
  return new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: precision ?? getPrecision(value),
  }).format(value);
}

export function formatFactor(value: number): string {
  return factorFormatter.format(value);
}

export function formatIngredientAmount(ingredient: Ingredient, factor: number): string {
  return `${formatAmount(ingredient.amount * factor, ingredient.precision)} ${ingredient.unit}`;
}

export function formatDoughCount(value: number): string {
  return amountFormatter.format(value);
}

function getPrecision(value: number): number {
  if (Math.abs(value) < 10) {
    return 2;
  }

  if (Math.abs(value) < 100) {
    return 1;
  }

  return 0;
}
