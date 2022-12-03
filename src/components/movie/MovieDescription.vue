<template>
  <div class="text-white">
    <h1 class="font-medium text-2xl">Movie description</h1>
    <div class="flex mt-6">
      <img
        :src="movie.avatar"
        alt=""
        class="h-[350px] rounded-xl object-cover"
      />
      <aside class="flex gap-5 flex-col pl-5 w-[576px]">
        <div class="flex justify-between w-full">
          <p class="text-[#DDCCAA] text-2xl font-medium">
            {{ movie.title[localeStore.locale] }} ({{ movie.release_year }})
          </p>
          <div
            class="w-32 h-9 bg-[#24222F] opacity-60 rounded-lg flex justify-evenly items-center"
          >
            <RouterLink
              :to="{ name: 'edit-movie', params: { id: route.params.id } }"
            >
              <PencilIcon class="hover:cursor-pointer" />
            </RouterLink>
            <DividerIcon />
            <TrashIcon class="hover:cursor-pointer" @click="deleteMovie" />
          </div>
        </div>
        <div class="flex gap-1 flex-wrap pl-3">
          <CategoryBox
            v-for="category in categories"
            :key="category.id"
            :category="category"
          />
        </div>
        <p class="pl-3">
          <span class="font-bold">{{ $t("movie.director") }}:</span>
          {{ movie.director[localeStore.locale] }}
        </p>
        <p class="pl-3 font-bold">
          <span class="font-bold">{{ $t("movie.budget") }}:</span> ${{
            movie.budget
          }}
        </p>
        <p class="pl-3">
          {{ movie.description[localeStore.locale] }}
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import CategoryBox from "@/components/movie/CategoryBox.vue";
import PencilIcon from "@/assets/icons/movie/PencilIcon.vue";
import TrashIcon from "@/assets/icons/movie/TrashIcon.vue";
import DividerIcon from "@/assets/icons/movie/DividerIcon.vue";
import { useRoute, useRouter } from "vue-router";
import useFetch from "@/hooks/useFetch";
import { useLocaleStore } from "@/stores/locale";

const route = useRoute();
const router = useRouter();
const localeStore = useLocaleStore();

const deleteMovie = async () => {
  const state = await useFetch({
    url: `movies/${route.params.id}`,
    method: "delete",
  });
  if (state.status.value === 204) {
    router.push({ name: "movies" });
  }
};

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});
</script>
