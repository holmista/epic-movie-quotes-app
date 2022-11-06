<template>
  <div
    class="absolute bg-[#222030] max-w-[538px] max-h-[375px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-20 gap-3">
      <AccountActivatedCheck />
      <h1 class="text-white text-3xl font-medium mt-5">Success!</h1>
      <h4 class="text-[#6C757D] text-center mt-8">
        Your password changed successfully
      </h4>
    </header>
    <BaseButton
      class="max-w-[360px] w-full h-[38px] bg-[#E31221] mt-10"
      text="Go to my news feed"
    />
  </div>
</template>

<script setup>
import AccountActivatedCheck from "@/components/icons/landing-page/AccountActivatedCheck.vue";
import BaseButton from "../components/base/BaseButton.vue";
</script>
