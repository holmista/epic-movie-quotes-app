<template>
  <div
    class="h-6 bg-[#6C757D] rounded px-1 py-1 flex justify-center items-center font-bold"
  >
    <p>{{ category.name[localeStore.locale] }}</p>
  </div>
</template>

<script setup>
import { useLocaleStore } from "@/stores/locale";

defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const localeStore = useLocaleStore();
</script>
