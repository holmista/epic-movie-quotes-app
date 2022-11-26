<template>
  <div>
    <MovieDescription
      :movie="movie.value"
      v-if="Object.keys(movie.value).length > 0"
    />
    <div class="flex text-white gap-4 mt-11 mb-14 items-center">
      <p class="text-2xl">Quotes(total {{ quotes.value.length }})</p>
      <BigDivideIcon />
      <BaseButton class="text-xl bg-[#E31221]" text="Add quote">
        <AddIcon />
      </BaseButton>
    </div>
    <div v-if="Object.keys(quotes.value).length">
      <QuoteCard v-for="quote in quotes" :quote="quote" :key="quote.id" />
    </div>
  </div>
</template>

<script setup>
import MovieDescription from "@/components/movie/MovieDescription.vue";
import QuoteCard from "@/components/quote/QuoteCard.vue";
import BigDivideIcon from "@/assets/icons/movie/BigDivideIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AddIcon from "@/assets/icons/movie/AddIcon.vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import useFetch from "@/hooks/useFetch";

const route = useRoute();
const movie = reactive({ value: {} });
const quotes = reactive({ value: [] });
console.log(Object.keys(movie.value).length);

onMounted(async () => {
  const state = await useFetch({
    url: `/movies/${route.params.id}/quotes`,
    method: "get",
  });
  movie.value = state.response.value.movie;
  quotes.value = state.response.value.quotes;
});

const quote = {
  id: 1,
  title: { en: "I'm gonna make him an offer he can't refuse." },
  likes: 7,
  comments: 3,
};

const movie1 = {
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
