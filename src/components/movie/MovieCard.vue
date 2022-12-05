<template>
  <div class="text-2xl text-white font-medium flex flex-col justify-center">
    <img
      :src="movie.avatar"
      alt="movie poster"
      class="h-[370px] rounded-xl object-cover hover:cursor-pointer"
      @click="router.push({ name: 'movie', params: { id: movie.id } })"
    />
    <p class="mt-2">
      <span>{{ movie.title[localeStore.locale] }}</span>
      <span>({{ movie.release_year }})</span>
    </p>
    <p class="flex gap-3 items-center">
      {{ movie.quotes?.length || 0 }} <QuoteIcon />
    </p>
  </div>
</template>

<script setup>
import QuoteIcon from "@/assets/icons/movie/QuoteIcon.vue";
import { useRouter } from "vue-router";
import { useLocaleStore } from "@/stores/locale";

const router = useRouter();
const localeStore = useLocaleStore();

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>
