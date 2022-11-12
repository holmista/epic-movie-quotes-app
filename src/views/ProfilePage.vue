<template>
  <div id="parent" class="text-white h-screen">
    <TopPanel />
    <div class="flex">
      <SidePanel class="ml-[70px] mt-8" />
      <ProfileInfo />
    </div>
  </div>
</template>

<script setup>
import SidePanel from "@/components/profile/SidePanel.vue";
import TopPanel from "@/components/profile/TopPanel.vue";
import ProfileInfo from "../components/profile/ProfileInfo.vue";
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
