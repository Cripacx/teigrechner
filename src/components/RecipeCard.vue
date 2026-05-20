<script setup lang="ts">
import { computed } from 'vue';
import type { RecipeSection } from '../data/recipes';
import { formatIngredientAmount } from '../utils/format';

const props = defineProps<{
  factor: number;
  section: RecipeSection;
}>();

const toneClasses = computed(() => {
  if (props.section.tone === 'tomato') {
    return {
      badge: 'bg-red-100 text-red-700 dark:bg-red-400/15 dark:text-red-200',
      ring: 'from-red-400/35 via-orange-300/20 to-transparent',
      accent: 'bg-red-500',
    };
  }

  return {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-300/15 dark:text-amber-200',
    ring: 'from-amber-400/35 via-yellow-300/20 to-transparent',
    accent: 'bg-amber-500',
  };
});

const ingredients = computed(() =>
  props.section.ingredients.map((ingredient) => ({
    ...ingredient,
    formattedAmount: formatIngredientAmount(ingredient, props.factor),
  })),
);
</script>

<template>
  <article class="relative overflow-hidden rounded-lg border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.08] dark:shadow-black/25 sm:p-7">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b" :class="toneClasses.ring" />

    <div class="relative flex items-start justify-between gap-4">
      <div>
        <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]" :class="toneClasses.badge">
          {{ section.eyebrow }}
        </span>
        <h2 class="mt-4 text-3xl font-black text-stone-950 dark:text-white">{{ section.title }}</h2>
        <p class="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-300">{{ section.description }}</p>
      </div>
      <span class="mt-2 h-12 w-1.5 rounded-full" :class="toneClasses.accent" />
    </div>

    <dl class="relative mt-8 divide-y divide-stone-100 dark:divide-white/10">
      <div v-for="ingredient in ingredients" :key="ingredient.name" class="grid grid-cols-[1fr_auto] gap-4 py-4 first:pt-0 last:pb-0">
        <dt class="min-w-0">
          <span class="block text-base font-semibold text-stone-800 dark:text-stone-100">{{ ingredient.name }}</span>
          <span v-if="ingredient.note" class="mt-1 block text-xs font-medium uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500">
            {{ ingredient.note }}
          </span>
        </dt>
        <dd class="self-center whitespace-nowrap text-right text-lg font-black tabular-nums text-stone-950 dark:text-white">
          {{ ingredient.formattedAmount }}
        </dd>
      </div>
    </dl>
  </article>
</template>
