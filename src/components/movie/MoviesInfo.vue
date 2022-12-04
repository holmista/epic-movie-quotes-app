<template>
  <div :class="blur ? 'opacity-20' : ''" class="w-full pr-20">
    <div class="text-white flex items-center justify-between mb-14 w-full">
      <h1 class="text-2xl font-medium">
        {{ $t("movie.my_movies", { amount: store.movies.length }) }}
      </h1>
      <div class="flex gap-5">
        <div class="flex items-center max-w-[100px]">
          <SearchIcon />
          <input
            class="text-white bg-transparent border-0 w-full"
            type="text"
            :placeholder="$t('common.search')"
            v-model="search"
          />
        </div>
        <RouterLink :to="{ name: 'add-movie' }">
          <BaseButton
            class="w-[154px] h-12 bg-[#E31221]"
            :text="$t('movie.add_movie')"
          >
            <AddIcon />
          </BaseButton>
        </RouterLink>
      </div>
    </div>
    <div
      v-if="store.movies.length"
      class="grid grid-cols-1 gap-x-[50px] gap-y-[60px] max-w-[1420px] sm:grid-cols-3"
    >
      <MovieCard
        v-for="movie in store.filteredMovies"
        :movie="movie"
        :key="movie.id"
      />
    </div>
  </div>
</template>
<script setup>
import MovieCard from "@/components/movie/MovieCard.vue";
import SearchIcon from "@/assets/icons/movie/SearchIcon.vue";
import AddIcon from "@/assets/icons/movie/AddIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import useFetch from "@/hooks/useFetch";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movie";

const store = useMovieStore();
const search = ref("");

watchEffect(() => {
  if (search.value) {
    store.filterMovies(search.value);
  }
});

const route = useRoute();
const blur = ref(false);
watchEffect(() => {
  if (route.fullPath === "/movies") {
    blur.value = false;
  } else {
    blur.value = true;
  }
});

onMounted(async () => {
  const state = await useFetch({
    url: "/movies",
    method: "get",
  });
  if (state.status.value === 200) {
    store.setMovies(state.response.value.movies);
  }
});
</script>
