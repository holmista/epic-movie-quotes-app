<template>
  <div
    class="flex flex-col justify-center items-center divide-y-2 divide-gray-600 bg-slate-600 rounded"
  >
    <p
      class="text-white block px-4 py-1 text-lg hover:cursor-pointer hover:bg-slate-300 hover:text-black w-full"
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
