<template>
  <div class="max-w-[800px] text-white flex items-center gap-6">
    <RouterLink
      :to="{ name: 'add-quote' }"
      class="h-[52px] sm:w-full w-[428px] bg-[#24222F] opacity-60 sm:rounded-xl rounded-none grid grid-cols-8 items-center pl-4"
    >
      <PencilSquareIcon />
      <p class="col-span-7">{{ $t("quote.write_new_quote") }}</p>
    </RouterLink>
    <Teleport to="#teleportSearch" v-if="isMounted">
      <div class="sm:hidden items-center flex px-3">
        <SearchIcon />
        <input
          class="text-white bg-transparent border-0"
          type="text"
          :placeholder="
            focused
              ? $t('common.search_instructions_one') +
                ' @ ' +
                $t('common.search_instructions_two')
              : $t('common.search')
          "
          @focus="focused = true"
          @blur="focused = false"
          :class="focused ? 'w-full' : 'w-[100px]'"
          v-model="searchValue"
        />
      </div>
    </Teleport>
    <div class="sm:flex hidden items-center">
      <SearchIcon />
      <input
        class="text-white bg-transparent border-0"
        type="text"
        :placeholder="
          focused
            ? $t('common.search_instructions_one') +
              ' @ ' +
              $t('common.search_instructions_two')
            : $t('common.search')
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
import { onMounted, ref, watchEffect } from "vue";
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

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const focused = ref(false);
</script>

<style scoped>
* {
  transition: all 0.3s ease;
}
</style>
