<template>
  <div class="text-2xl text-white font-medium">
    <img
      :src="image"
      alt="movie poster"
      class="h-[370px] rounded-xl object-cover"
    />
    <p class="mt-2">
      <span>{{ title }}</span>
      <span>({{ releaseYear }})</span>
    </p>
    <p class="flex gap-3 items-center">{{ quoteAmount }} <QuoteIcon /></p>
  </div>
</template>

<script setup>
import QuoteIcon from "@/assets/icons/movie/QuoteIcon.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quoteAmount: {
    type: Number,
    required: true,
  },
});
</script>
