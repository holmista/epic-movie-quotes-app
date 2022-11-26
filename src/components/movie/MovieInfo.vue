<template>
  <div>
    <MovieDescription :movie="movie" />
  </div>
</template>

<script setup>
import MovieDescription from "@/components/movie/MovieDescription.vue";

const movie = {
  id: 1,
  title: {
    en: "The Shawshank Redemption",
  },
  release_year: 1994,
  director: {
    en: "Frank Darabont",
  },
  budget: 25000000,
  categories: [
    {
      id: 1,
      name: {
        en: "Action",
      },
    },
    {
      id: 2,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 3,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 4,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 5,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 6,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 7,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 8,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 9,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 10,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 11,
      name: {
        en: "Comedy",
      },
    },
    {
      id: 12,
      name: {
        en: "Comedy",
      },
    },
  ],
  description: {
    en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus augue nisi, viverra non dictum ut, lobortis eu nibh. Praesent finibus lacus dolor, et lobortis purus consequat gravida. Sed non sem vestibulum, interdum justo sit amet, semper sem. Cras elementum ex in urna volutpat maximus. Nullam molestie urna quis lobortis facilisis.",
  },
};
</script>
