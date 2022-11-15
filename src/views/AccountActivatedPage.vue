<template>
  <div
    class="absolute bg-[#222030] max-w-[538px] max-h-[375px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-20 gap-3">
      <AccountActivatedCheck />
      <h1 class="text-white text-3xl font-medium mt-10">Thank you!</h1>
      <h4 class="text-[#6C757D] text-center mt-7">
        Your account has been activated.
      </h4>
    </header>
    <BaseButton class="w-96 h-9 bg-[#E31221] mt-8" text="Go to my news feed" />
  </div>
</template>

<script setup>
import AccountActivatedCheck from "@/assets/icons/landing/AccountActivatedCheck.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import useFetch from "@/hooks/useFetch";

onMounted(async () => {
  const route = useRoute();
  const backUrl = import.meta.env.VITE_BACK_BASE_URL + route.fullPath;
  const state = await useFetch({ method: "get", url: backUrl });
  console.log(state.error.value);
});
</script>
