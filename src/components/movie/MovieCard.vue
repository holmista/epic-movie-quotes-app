<template>
  <div class="text-2xl text-white font-medium">
    <img
      :src="image"
      alt="movie poster"
      class="h-[370px] rounded-xl object-cover"
      @click="router.push({ name: 'movie', params: { id } })"
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
import { useRouter } from "vue-router";

const router = useRouter();

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
  id: {
    type: Number,
    required: true,
  },
});
</script>
