<template>
  <RouterView />
  <div id="parent" class="min-h-screen">
    <SideTopPanels class="hidden">
      <MoviesInfo />
    </SideTopPanels>
  </div>
</template>

<script setup>
import MoviesInfo from "@/components/movie/MoviesInfo.vue";
import SideTopPanels from "@/components/layouts/SideTopPanels.vue";
</script>

<style scoped>
#parent {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
}
</style>
