<template>
  <div
    id="parent"
    class="min-h-screen"
    :class="scroll ? '' : 'h-screen overflow-y-hidden'"
  >
    <RouterView />
    <SideTopPanels :showSearch="true">
      <div class="flex flex-col gap-6">
        <SearchPanel />
        <div class="flex flex-col gap-10" v-if="newsFeedStore.quotes.length">
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
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import useFetch from "@/hooks/useFetch";
import useNewsFeedStore from "@/stores/newsFeed";
import { useRoute } from "vue-router";

const scroll = ref(true);
const route = useRoute();
watchEffect(() => {
  if (route.name === "feed") {
    scroll.value = true;
  } else {
    scroll.value = false;
  }
});

const newsFeedStore = useNewsFeedStore();
const canLoad = ref(true);

const fetchMoreQuotes = async () => {
  const state = await useFetch({
    url: `/quote?page=${newsFeedStore.nextPage}`,
    method: "get",
  });
  if (state.status.value === 200) {
    newsFeedStore.quotes.push(...state.response.value.quotes.data);
    newsFeedStore.setNextPage(state.response.value.quotes.current_page + 1);
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  const state = await useFetch({
    url: "/quote?page=1",
    method: "get",
  });
  if (state.status.value === 200) {
    newsFeedStore.setQuotes(state.response.value.quotes.data);
    newsFeedStore.setNextPage(2);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (
    canLoad.value &&
    window.scrollY + window.innerHeight >= document.body.scrollHeight - 100
  ) {
    canLoad.value = false;
    fetchMoreQuotes()
      .then(() => (canLoad.value = true))
      .catch(() => (canLoad.value = true));
  }
};
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
