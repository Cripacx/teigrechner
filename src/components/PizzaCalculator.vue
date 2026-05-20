<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import CountSelector from './CountSelector.vue';
import RecipeCard from './RecipeCard.vue';
import ThemeToggle from './ThemeToggle.vue';
import { BASE_DOUGH_COUNT, recipeSections } from '../data/recipes';
import { formatAmount, formatFactor } from '../utils/format';

const presets = [6, 12, 18, 24];
const doughCount = ref(BASE_DOUGH_COUNT);
const isDark = ref(false);

const factor = computed(() => doughCount.value / BASE_DOUGH_COUNT);
const factorLabel = computed(() => formatFactor(factor.value));
const flourAmount = computed(() => formatAmount(1000 * factor.value));
const waterAmount = computed(() => formatAmount(650 * factor.value));
const freshYeastAmount = computed(() => formatAmount(1 * factor.value, 2));
const basePath = import.meta.env.BASE_URL;
const logoPath = `${basePath}logo.png`;

function applyTheme(value: boolean): void {
  document.documentElement.classList.toggle('dark', value);
  document.documentElement.style.colorScheme = value ? 'dark' : 'light';
}

function toggleTheme(): void {
  isDark.value = !isDark.value;
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme');
  isDark.value = storedTheme
    ? storedTheme === 'dark'
    : globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(isDark.value);
});

watch(isDark, (value) => {
  applyTheme(value);
  localStorage.setItem('theme', value ? 'dark' : 'light');
});
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-stone-50 text-stone-950 transition-colors duration-500 dark:bg-neutral-950 dark:text-white">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.22),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(239,68,68,0.14),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(248,113,113,0.10),transparent_30%)]" />

    <div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between gap-4 py-3">
        <a class="group inline-flex items-center gap-3" :href="basePath" aria-label="TeigRechner Startseite">
          <img
            class="h-12 w-12 rounded-lg object-cover shadow-lg shadow-stone-300/80 transition duration-300 group-hover:-rotate-3 dark:shadow-black/30"
            :src="logoPath"
            alt="TeigRechner Logo"
            width="48"
            height="48"
          />
          <span class="min-w-0">
            <span class="block text-xl font-black leading-tight tracking-normal text-stone-950 dark:text-white">TeigRechner</span>
            <span class="block text-sm font-medium text-stone-500 dark:text-stone-400">Pizza-Teig & Sauce</span>
          </span>
        </a>

        <ThemeToggle :active="isDark" @toggle="toggleTheme" />
      </header>

      <section class="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
        <div class="space-y-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-300">Basis: 6 Teige</p>
            <h1 class="mt-5 text-5xl font-black leading-[0.95] text-stone-950 dark:text-white sm:text-6xl lg:text-7xl">
              Pizza perfekt skaliert.
            </h1>
            <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-300">
              Teig und Sauce in ruhigen, abgestimmten Mengen für den nächsten Pizzaabend.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3 sm:max-w-xl">
            <div class="rounded-lg border border-stone-200 bg-white/70 p-4 transition duration-300 dark:border-white/10 dark:bg-white/[0.08]">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">Faktor</p>
              <p class="mt-2 text-2xl font-black tabular-nums text-stone-950 dark:text-white">{{ factorLabel }}x</p>
            </div>
            <div class="rounded-lg border border-stone-200 bg-white/70 p-4 transition duration-300 dark:border-white/10 dark:bg-white/[0.08]">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">Mehl</p>
              <p class="mt-2 text-2xl font-black tabular-nums text-stone-950 dark:text-white">{{ flourAmount }} g</p>
            </div>
            <div class="rounded-lg border border-stone-200 bg-white/70 p-4 transition duration-300 dark:border-white/10 dark:bg-white/[0.08]">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">Hefe</p>
              <p class="mt-2 text-2xl font-black tabular-nums text-stone-950 dark:text-white">{{ freshYeastAmount }} g</p>
            </div>
          </div>
        </div>

        <CountSelector v-model="doughCount" :presets="presets" />
      </section>

      <section class="grid gap-5 pb-12 lg:grid-cols-2">
        <RecipeCard v-for="section in recipeSections" :key="section.title" :factor="factor" :section="section" />
      </section>

      <footer class="pb-7 text-center text-sm font-medium text-stone-500 dark:text-stone-500">
        <span>{{ waterAmount }} ml Wasser bei {{ doughCount }} Teigen</span>
      </footer>
    </div>
  </main>
</template>
