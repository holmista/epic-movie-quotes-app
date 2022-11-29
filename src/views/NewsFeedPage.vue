<template>
  <div id="parent">
    <SideTopPanels>
      <div class="flex flex-col gap-6">
        <SearchPanel />
        <div class="flex flex-col gap-10">
          <QuoteCard
            v-for="quote in newsFeedStore.filteredQuotes"
            :quote="quote"
            :key="quote.id"
          />
        </div>
      </div>
    </SideTopPanels>
  </div>
</template>

<script setup>
import QuoteCard from "@/components/news-feed/QuoteCard.vue";
import SideTopPanels from "@/components/layouts/SideTopPanels.vue";
import SearchPanel from "@/components/news-feed/SearchPanel.vue";
import { onMounted } from "vue";
import useFetch from "@/hooks/useFetch";
import useNewsFeedStore from "@/stores/newsFeed";

const newsFeedStore = useNewsFeedStore();

onMounted(async () => {
  const state = await useFetch({
    url: "/quote",
    method: "get",
  });
  if (state.status.value === 200) {
    newsFeedStore.setQuotes(state.response.value.quotes);
  }
});
</script>

<style>
#parent {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
}
</style>
