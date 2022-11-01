<template>
  <button
    class="py-2 px-4 text-white rounded flex items-center flex-row-reverse justify-center gap-2"
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
