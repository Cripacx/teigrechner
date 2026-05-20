<script setup lang="ts">
defineProps<{
  active: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    class="group inline-flex h-11 items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/60 transition duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-amber-300/30 dark:border-white/10 dark:bg-white/[0.08] dark:text-stone-100 dark:shadow-black/20 dark:hover:border-white/20"
    type="button"
    :aria-pressed="active"
    aria-label="Dark Mode umschalten"
    @click="emit('toggle')"
  >
    <span class="relative h-6 w-11 rounded-full bg-stone-200 transition duration-300 dark:bg-stone-700">
      <span
        class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition duration-300 dark:translate-x-5 dark:bg-amber-300"
      />
    </span>
    <span>{{ active ? 'Dunkel' : 'Hell' }}</span>
  </button>
</template>
