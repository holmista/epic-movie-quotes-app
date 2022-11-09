<template>
  <div id="parent" class="text-white h-screen">
    <TopPanel />
    <SidePanel />
  </div>
</template>

<script setup>
import SidePanel from "@/components/profile/SidePanel.vue";
import TopPanel from "@/components/profile/TopPanel.vue";
</script>

<style scoped>
#parent {
  background: linear-gradient(#11101a 100%, #08080d 100%, #000000 0%);
}
</style>
