<template>
  <div>
    <QuoteCard v-for="quote in quotes.value" :quote="quote" :key="quote.id" />
  </div>
</template>

<script setup>
import QuoteCard from "@/components/news-feed/QuoteCard.vue";
import { onMounted, reactive } from "vue";
import useFetch from "@/hooks/useFetch";

const quotes = reactive({ value: [] });

onMounted(async () => {
  const state = await useFetch({
    url: "/quote",
    method: "get",
  });
  if (state.status.value === 200) {
    quotes.value = state.response.value.quotes;
    console.log(quotes.value);
  }
});
</script>
