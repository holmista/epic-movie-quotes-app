<template>
  <div
    class="absolute bg-[#222030] max-w-[538px] max-h-[414px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-20 gap-3">
      <SendCheck />
      <h1 class="text-white text-3xl font-medium">Thank you!</h1>
      <h4 class="text-[#6C757D] text-center">
        Please check your email and follow the instructions to activate your
        account.
      </h4>
    </header>
  </div>
</template>

<script setup>
import SendCheck from "@/assets/icons/landing/SendCheck.vue";
</script>
