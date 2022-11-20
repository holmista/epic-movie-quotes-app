<template>
  <div>
    <div v-if="movies.length > 0">
      <MovieCard
        v-for="movie in movies"
        :title="movie.title.en"
        :releaseYear="movie.release_year"
        :image="movie.avatar"
        :quoteAmount="movie.quotes.length"
        :key="movie.id"
      />
    </div>
  </div>
</template>
<script setup>
import MovieCard from "@/components/movie/MovieCard.vue";
import useFetch from "@/hooks/useFetch";
import { onMounted, reactive } from "vue";

const movies = reactive([]);

onMounted(async () => {
  const state = await useFetch({
    url: "/movies",
    method: "get",
  });
  if (state.status.value === 200) {
    movies.push(...state.response.value.movies);
  }
  //   console.log(state.response.value);
});
</script>
