<template>
  <div class="text-white">
    <h1 class="font-medium text-2xl">Movie description</h1>
    <div class="flex mt-6">
      <img
        src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
        class="h-[350px] rounded-xl object-cover"
      />
      <aside class="flex gap-5 flex-col pl-5 max-w-xl">
        <div class="flex justify-between">
          <p class="text-[#DDCCAA] text-2xl font-medium">
            {{ movie.title.en }} {{ movie.release_year }}
          </p>
          <div
            class="w-32 h-9 bg-[#24222F] opacity-60 rounded-lg flex justify-evenly items-center"
          >
            <PencilIcon class="hover:cursor-pointer" />
            <DividerIcon />
            <TrashIcon class="hover:cursor-pointer" />
          </div>
        </div>
        <div class="flex gap-1 flex-wrap pl-3">
          <CategoryBox
            v-for="category in movie.categories"
            :key="category.id"
            :category="category"
          />
        </div>
        <p class="pl-3">
          <span class="font-bold">Director:</span> {{ movie.director.en }}
        </p>
        <p class="pl-3 font-bold">
          <span class="font-bold">Budget: </span> ${{ movie.budget }}
        </p>
        <p class="pl-3">
          {{ movie.description.en }}
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

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
console.log(props.movie.categories);
</script>
