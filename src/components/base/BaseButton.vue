<template>
  <button class="py-2 px-4 w-32 h-12 text-white rounded">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
});
</script>
