<template>
  <div id="parent" class="text-white h-screen">
    <TopPanel />
    <div class="flex">
      <SidePanel class="ml-[70px] mt-8" />
      <ProfileInfo v-if="isGoogleUser !== false" />
      <GoogleProfileInfo v-else />
    </div>
  </div>
</template>

<script setup>
import SidePanel from "@/components/profile/SidePanel.vue";
import TopPanel from "@/components/profile/TopPanel.vue";
import { onMounted, ref } from "vue";
import ProfileInfo from "../components/profile/ProfileInfo.vue";
import GoogleProfileInfo from "../components/profile/GoogleProfileInfo.vue";
import useFetch from "@/hooks/useFetch";

const isGoogleUser = ref(false);

onMounted(async () => {
  const state = await useFetch({ url: "/user", method: "get" });
  console.log(state.status.value, state.response.value.google_id);
  if (state.status.value === 200 && state.response.value.google_id) {
    isGoogleUser.value = true;
  }
});
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
