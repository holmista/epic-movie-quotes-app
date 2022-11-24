<template>
  <div class="grid grid-cols-5">
    <p
      class="text-gray-700 block px-4 py-1 text-sm hover:cursor-pointer"
      v-for="item in movieStore.availableCategories"
      :key="item.id"
      @click="movieStore.addToChosenCategories(item)"
    >
      {{ item.name[localeStore.locale] }}
    </p>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/stores/movie";
import { useLocaleStore } from "../../stores/locale";
import { onMounted } from "vue";
import useFetch from "@/hooks/useFetch";

const movieStore = useMovieStore();
const localeStore = useLocaleStore();

onMounted(async () => {
  const state = await useFetch({
    url: "/category",
    method: "get",
  });
  if (state.status.value === 200) {
    movieStore.setAvailableCategories(state.response.value.categories);
  }
});
</script>
