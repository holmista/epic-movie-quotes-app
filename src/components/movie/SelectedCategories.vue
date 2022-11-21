<template>
  <div>
    <div
      class="flex justify-start items-center flex-wrap min-h-[48px] h-full border w-full border-gray-500 rounded-md pl-7 pr-12 bg-transparent gap-x-1"
    >
      <p class="text-gray-500" v-if="store.chosenCategories.length === 0">
        Genres
      </p>
      <div
        v-for="category in store.chosenCategories"
        :key="category.id"
        class="bg-[#6C757D] h-2/3 flex justify-center px-1 items-center text-xs"
      >
        <p>
          {{ category.name.en }}
        </p>
        <CategoryCrossIcon
          @click="store.removeFromChosenCategories(category)"
          class="hover:cursor-pointer"
        />
      </div>
    </div>
    <div v-if="store.categoriesError">
      <p class="text-[#F15524] font-light">genres field is required</p>
    </div>
  </div>
</template>

<script setup>
import CategoryCrossIcon from "@/assets/icons/movie/CategoryCrossIcon.vue";
import { useMovieStore } from "@/stores/movie.js";
import { watchEffect } from "vue";

const store = useMovieStore();

watchEffect(() => {
  if (store.chosenCategories.length > 0) {
    store.categoriesError = false;
  }
});
</script>
