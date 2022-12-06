<template>
  <div id="parent" class="text-white min-h-screen">
    <SideTopPanels>
      <ProfileInfo v-if="isGoogleUser === false" />
      <GoogleProfileInfo v-else />
    </SideTopPanels>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ProfileInfo from "@/components/profile/ProfileInfo.vue";
import GoogleProfileInfo from "@/components/profile/GoogleProfileInfo.vue";
import useFetch from "@/hooks/useFetch";
import SideTopPanels from "@/components/layouts/SideTopPanels.vue";

const isGoogleUser = ref(false);

onMounted(async () => {
  const state = await useFetch({ url: "/user", method: "get" });
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
