<template>
  <div class="grid grid-cols-5">
    <p
      class="text-gray-700 block px-4 py-1 text-sm hover:cursor-pointer"
      v-for="item in store.availableCategories"
      :key="item.id"
      @click="store.addToChosenCategories(item)"
    >
      {{ item.name.en }}
    </p>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/stores/movie";
import { onMounted } from "vue";
import useFetch from "@/hooks/useFetch";

const store = useMovieStore();

onMounted(async () => {
  const state = await useFetch({
    url: "/category",
    method: "get",
  });
  if (state.status.value === 200) {
    store.setAvailableCategories(state.response.value.categories);
  }
});
</script>
