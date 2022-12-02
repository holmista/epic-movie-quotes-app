<template>
  <div id="parent" class="h-full">
    <SideTopPanels>
      <MovieInfo />
    </SideTopPanels>
  </div>
</template>

<script setup>
import SideTopPanels from "@/components/layouts/SideTopPanels.vue";
import MovieInfo from "@/components/movie/MovieInfo.vue";
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const overflow = ref(false);

watchEffect(() => {
  if (route.fullPath.includes("quote") || route.fullPath.includes("edit")) {
    console.log("includes quote");
    overflow.value = true;
  } else {
    overflow.value = false;
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
