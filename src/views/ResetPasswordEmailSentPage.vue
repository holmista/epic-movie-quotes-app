<template>
  <div
    class="absolute bg-[#222030] max-w-[538px] max-h-[448px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-20 gap-3">
      <SendCheck />
      <h1 class="text-white text-3xl font-medium mt-5">
        {{ $t("accountActivity.check_email") }}
      </h1>
      <h4 class="text-[#6C757D] text-center mt-8">
        {{ $t("accountActivity.password_recovery_instructions") }}
      </h4>
    </header>
    <BaseButton
      @click="handleClick"
      class="max-w-[360px] w-full h-[38px] bg-[#E31221] mt-10"
      :text="$t('accountActivity.go_to_my_email')"
    />
    <p class="text-[#6C757D] mt-10" @click="handleClick">
      {{ $t("accountActivity.confirm_later") }}
    </p>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import SendCheck from "@/assets/icons/landing/SendCheck.vue";
import BaseButton from "../components/base/BaseButton.vue";
const blur = inject("blur");

const router = useRouter();
const handleClick = () => {
  blur.value = false;
  router.push({ name: "landing" });
};
</script>
