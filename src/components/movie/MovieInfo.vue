<template>
  <div>
    <RouterView />
    <MovieDescription
      :movie="movie.value"
      :categories="categories.value"
      v-if="Object.keys(movie.value).length > 0"
    />
    <div class="flex text-white gap-4 mt-11 mb-14 items-center">
      <p class="text-2xl">Quotes(total {{ quotes.value.length }})</p>
      <BigDivideIcon />
      <RouterLink :to="{ name: 'create-quote' }">
        <BaseButton class="text-xl bg-[#E31221]" text="Add quote">
          <AddIcon />
        </BaseButton>
      </RouterLink>
    </div>
    <div v-if="Object.keys(quotes.value).length" class="flex flex-col gap-5">
      <QuoteCard v-for="quote in quotes.value" :quote="quote" :key="quote.id" />
    </div>
  </div>
</template>

<script setup>
import MovieDescription from "@/components/movie/MovieDescription.vue";
import QuoteCard from "@/components/quote/QuoteCard.vue";
import BigDivideIcon from "@/assets/icons/movie/BigDivideIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AddIcon from "@/assets/icons/movie/AddIcon.vue";
import { onMounted, reactive, provide } from "vue";
import { useRoute } from "vue-router";
import useFetch from "@/hooks/useFetch";

const route = useRoute();
const movie = reactive({ value: {} });
const categories = reactive({ value: {} });
const quotes = reactive({ value: [] });

provide("quotes", quotes);

const getCategories = async () => {
  const state = await useFetch({
    url: `/movies/${route.params.id}`,
    method: "get",
  });
  categories.value = state.response.value.movie.categories;
};

onMounted(async () => {
  getCategories();
  const state = await useFetch({
    url: `/movies/${route.params.id}/quotes`,
    method: "get",
  });
  movie.value = state.response.value.movie;
  quotes.value = state.response.value.quotes;
});
</script>
