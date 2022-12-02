<template>
  <div
    class="h-6 bg-[#6C757D] rounded px-1 py-1 flex justify-center items-center font-bold"
  >
    <p>{{ category.name.en }}</p>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>
