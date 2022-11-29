<template>
  <div class="w-[800px] text-white flex items-center gap-6">
    <RouterLink
      :to="{ name: 'add-quote' }"
      class="h-[52px] w-full bg-[#24222F] opacity-60 rounded-xl grid grid-cols-8 items-center pl-4"
    >
      <PencilSquareIcon />
      <p class="col-span-7">Write new quote</p>
    </RouterLink>
    <div class="flex items-center">
      <SearchIcon />
      <input
        class="text-white bg-transparent border-0"
        type="text"
        :placeholder="
          focused
            ? 'Enter @ to search movies, Enter # to search quotes '
            : 'Search by'
        "
        @focus="focused = true"
        @blur="focused = false"
        :class="focused ? 'w-[500px]' : 'w-[100px]'"
        v-model="searchValue"
      />
    </div>
  </div>
</template>

<script setup>
import PencilSquareIcon from "@/assets/icons/news-feed/PencilSquareIcon.vue";
import SearchIcon from "@/assets/icons/movie/SearchIcon.vue";
import { ref, watchEffect } from "vue";
import useNewsFeedStore from "@/stores/newsFeed";

const newsFeedStore = useNewsFeedStore();
const searchValue = ref("");

watchEffect(() => {
  if (searchValue.value[0] === "@") {
    newsFeedStore.filterByMovieTitle(searchValue.value.slice(1));
  }
  if (searchValue.value[0] === "#") {
    newsFeedStore.filterByQuoteTitle(searchValue.value.slice(1));
  }
});

const focused = ref(false);
</script>

<style scoped>
* {
  transition: all 0.3s ease;
}
</style>
