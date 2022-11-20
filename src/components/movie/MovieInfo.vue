<template>
  <div>
    <div class="text-white flex items-center justify-between mb-14">
      <h1 class="text-2xl font-medium">
        My list of movies (Total {{ movies.length }})
      </h1>
      <div class="flex gap-5">
        <div class="flex items-center max-w-[100px]">
          <SearchIcon />
          <input
            class="text-white bg-transparent border-0 w-full"
            type="text"
            placeholder="Search"
            v-model="search"
          />
        </div>
        <BaseButton class="w-[154px] h-12 bg-[#E31221]" text="Add movie">
          <AddIcon />
        </BaseButton>
      </div>
    </div>
    <div
      v-if="movies.length"
      class="grid grid-cols-1 gap-x-[50px] gap-y-[60px] max-w-[1420px] sm:grid-cols-3"
    >
      <MovieCard
        v-for="movie in filteredMovies.value"
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
import SearchIcon from "@/assets/icons/movie/SearchIcon.vue";
import AddIcon from "@/assets/icons/movie/AddIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import useFetch from "@/hooks/useFetch";
import { onMounted, reactive, ref, watchEffect } from "vue";

const movies = reactive([]);
let filteredMovies = reactive({ value: [] });
const search = ref("");

watchEffect(() => {
  if (search.value) {
    console.log(search.value);
    filteredMovies.value = movies.filter((movie) =>
      movie.title.en.toLowerCase().includes(search.value.toLowerCase())
    );
    console.log(filteredMovies);
  } else {
    filteredMovies.value = movies;
  }
});

// const searchMovies = (e) => {
//   const searchValue = e.target.value;
//   if (searchValue) {
//     console.log("seaarched");
//     filteredMovies = movies.filter((movie) =>
//       movie.title.en.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     console.log(filteredMovies);
//   } else {
//     filteredMovies = movies;
//   }
// };

onMounted(async () => {
  const state = await useFetch({
    url: "/movies",
    method: "get",
  });
  if (state.status.value === 200) {
    movies.push(...state.response.value.movies);
  }
});
</script>
