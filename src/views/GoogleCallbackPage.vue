<template>
  <div
    v-if="success"
    class="absolute bg-[#222030] max-w-[538px] max-h-[375px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-20 gap-3">
      <AccountActivatedCheck />
      <h1 class="text-white text-3xl font-medium mt-10">Thank you!</h1>
      <h4 class="text-[#6C757D] text-center mt-7">
        Your account has been activated.
      </h4>
    </header>
    <RouterLink :to="{ name: 'feed' }">
      <BaseButton
        class="w-96 h-9 bg-[#E31221] mt-8"
        text="Go to my news feed"
      />
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useFetch from "@/hooks/useFetch";
import BaseButton from "@/components/base/BaseButton.vue";
import AccountActivatedCheck from "@/assets/icons/landing/AccountActivatedCheck.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const success = ref(false);
const store = useAuthStore();

onMounted(async () => {
  const queryString = new URLSearchParams(route.query).toString();
  const backUrl = `${
    import.meta.env.VITE_BACK_BASE_URL
  }/auth/callback?${queryString}`;
  const state = await useFetch({ method: "get", url: backUrl });
  if (state.status.value === 200) {
    store.setAuthenticated(true);
    store.setName(state.response.value.name);
    store.setId(state.response.value.id);
    success.value = true;
  } else {
    store.authenticated = false;
    success.value = false;
  }
});
</script>
