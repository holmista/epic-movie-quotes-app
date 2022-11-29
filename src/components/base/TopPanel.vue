<template>
  <div class="flex h-[86px] bg-[#24222f] px-16 justify-between text-white">
    <div class="flex items-center">
      <p class="text-[#DDCCAA] font-medium">MOVIE QUOTES</p>
    </div>
    <div class="flex items-center space-x-4">
      <BellIcon
        @click="showNotifications = !showNotifications"
        class="hover:cursor-pointer"
      />
      <UserNotifications
        v-if="showNotifications"
        class="absolute left-[1000px] top-20"
      />
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
import UserNotifications from "@/components/news-feed/UserNotifications.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";

const showNotifications = ref(false);

const router = useRouter();
const logout = async () => {
  const state = await useFetch({ url: "/signout", method: "get" });
  if (state.status.value === 200) {
    router.push({ name: "landing" });
  }
};
</script>
