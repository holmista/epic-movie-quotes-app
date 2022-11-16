<template>
  <div class="flex h-[86px] bg-[#24222f] px-16 justify-between">
    <div class="flex items-center">
      <p class="text-[#DDCCAA] font-medium">MOVIE QUOTES</p>
    </div>
    <div class="flex items-center space-x-4">
      <BellIcon />
      <LanguageDropDown />
      <BaseButton
        @click="logout"
        text="Log out"
        class="border-white border w-[109px] h-10"
      />
    </div>
  </div>
</template>

<script setup>
import LanguageDropDown from "@/components/base/LanguageDropDown.vue";
import BellIcon from "@/assets/icons/profile/BellIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { remove } from "@/hooks/useCookie";
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  remove("access_token");
  router.push({ name: "landing" });
};
</script>
