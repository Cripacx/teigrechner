<script setup lang="ts">
import { computed } from 'vue';
import { formatDoughCount } from '../utils/format';

const props = defineProps<{
  modelValue: number;
  doughBallWeight: number;
  presets: number[];
  weightPresets: number[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
  'update:doughBallWeight': [value: number];
}>();

const displayValue = computed(() => formatDoughCount(props.modelValue));
const displayWeight = computed(() => formatDoughCount(props.doughBallWeight));

function updateValue(value: number): void {
  const normalizedValue = Math.min(96, Math.max(1, Math.round(value || 1)));
  emit('update:modelValue', normalizedValue);
}

function updateWeight(value: number): void {
  const normalizedValue = Math.min(500, Math.max(120, Math.round(value || 280)));
  emit('update:doughBallWeight', normalizedValue);
}

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  updateValue(Number(target.value));
}

function onWeightInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  updateWeight(Number(target.value));
}
</script>

<template>
  <section class="rounded-lg border border-stone-200 bg-white/85 p-6 shadow-xl shadow-stone-200/70 backdrop-blur transition duration-300 dark:border-white/10 dark:bg-white/[0.08] dark:shadow-black/30 sm:p-8">
    <div class="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
      <div class="min-w-0">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Gewünschte Teige</p>
        <div class="mt-3 flex items-end gap-3">
          <output class="text-7xl font-black leading-none text-stone-950 transition duration-300 dark:text-white sm:text-8xl">
            {{ displayValue }}
          </output>
          <span class="pb-2 text-xl font-semibold text-stone-500 dark:text-stone-400">Stück</span>
        </div>
        <div class="mt-5 flex items-end gap-2 text-stone-600 dark:text-stone-300">
          <output class="text-3xl font-black tabular-nums text-stone-950 dark:text-white">{{ displayWeight }}</output>
          <span class="pb-1 text-sm font-bold uppercase tracking-[0.14em]">g pro Teigling</span>
        </div>
      </div>

      <div class="w-full max-w-xl space-y-6 lg:w-[28rem]">
        <div class="space-y-3">
          <label class="text-sm font-bold text-stone-700 dark:text-stone-200" for="dough-count">Anzahl Teige</label>
          <input
            id="dough-count"
            class="h-14 w-full rounded-lg border border-stone-200 bg-stone-50 px-5 text-lg font-semibold text-stone-950 outline-none transition duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-300/25 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-amber-300 dark:focus:bg-black/30"
            inputmode="numeric"
            max="96"
            min="1"
            step="1"
            type="number"
            :value="modelValue"
            @input="onInput"
          />

          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="preset in presets"
              :key="preset"
              class="h-12 rounded-lg border px-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300/25"
              :class="preset === modelValue
                ? 'border-amber-400 bg-amber-300 text-stone-950 shadow-lg shadow-amber-300/30 dark:border-amber-200 dark:bg-amber-300'
                : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50 dark:border-white/10 dark:bg-white/[0.08] dark:text-stone-100 dark:hover:border-amber-300/70 dark:hover:bg-amber-300/10'"
              type="button"
              @click="updateValue(preset)"
            >
              {{ preset }}
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <label class="text-sm font-bold text-stone-700 dark:text-stone-200" for="dough-weight">Gramm pro Teigling</label>
          <input
            id="dough-weight"
            class="h-14 w-full rounded-lg border border-stone-200 bg-stone-50 px-5 text-lg font-semibold text-stone-950 outline-none transition duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-300/25 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-amber-300 dark:focus:bg-black/30"
            inputmode="numeric"
            max="500"
            min="120"
            step="5"
            type="number"
            :value="doughBallWeight"
            @input="onWeightInput"
          />

          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="preset in weightPresets"
              :key="preset"
              class="h-12 rounded-lg border px-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300/25"
              :class="preset === doughBallWeight
                ? 'border-red-300 bg-red-200 text-stone-950 shadow-lg shadow-red-200/30 dark:border-red-200 dark:bg-red-300'
                : 'border-stone-200 bg-white text-stone-700 hover:border-red-300 hover:bg-red-50 dark:border-white/10 dark:bg-white/[0.08] dark:text-stone-100 dark:hover:border-red-300/70 dark:hover:bg-red-300/10'"
              type="button"
              @click="updateWeight(preset)"
            >
              {{ preset }} g
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
