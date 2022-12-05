<template>
  <button
    class="sm:py-2 py-1 sm:px-4 px-2 text-white rounded flex items-center flex-row-reverse justify-center gap-2"
  >
    {{ text }}
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
});
</script>
