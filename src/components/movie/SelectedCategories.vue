<template>
  <div>
    <div
      @click="showDropDown = !showDropDown"
      class="flex justify-start items-center flex-wrap min-h-[48px] h-full border w-full border-gray-500 rounded-md pl-7 pr-12 bg-transparent gap-x-1 hover:cursor-pointer"
    >
      <p class="text-gray-500" v-if="movieStore.chosenCategories.length === 0">
        {{ $t("input.placeholders.genres") }}
      </p>
      <div
        v-for="category in movieStore.chosenCategories"
        :key="category.id"
        class="bg-[#6C757D] h-2/3 flex justify-center px-1 items-center text-xs"
      >
        <p>
          {{ category.name[localeStore.locale] }}
        </p>
        <CategoryCrossIcon
          @click="(e) => removeCategory(e, category)"
          class="hover:cursor-pointer"
        />
      </div>
    </div>
    <div v-if="movieStore.categoriesError">
      <p class="text-[#F15524] font-light">
        {{
          localeStore.locale === "en"
            ? "genres field is required"
            : "ჟანრები აუცილებელია"
        }}
      </p>
    </div>
    <DropDown v-if="showDropDown" class="mt-1" />
  </div>
</template>

<script setup>
import CategoryCrossIcon from "@/assets/icons/movie/CategoryCrossIcon.vue";
import { useMovieStore } from "@/stores/movie.js";
import { useLocaleStore } from "@/stores/locale.js";
import { watchEffect, ref } from "vue";
import DropDown from "./AvailableCategories.vue";

const movieStore = useMovieStore();
const localeStore = useLocaleStore();
const showDropDown = ref(false);

const removeCategory = (e, category) => {
  e.stopPropagation();
  movieStore.removeFromChosenCategories(category);
};

watchEffect(() => {
  if (movieStore.chosenCategories.length > 0) {
    movieStore.categoriesError = false;
  }
});
</script>
