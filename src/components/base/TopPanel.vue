<template>
  <div class="flex h-[86px] bg-[#24222f] px-16 justify-between text-white">
    <div class="flex items-center">
      <p class="text-[#DDCCAA] font-medium">{{ $t("landing.movie_quotes") }}</p>
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
        :text="$t('common.log_out')"
        class="border-white border w-[109px] h-10"
      />
    </div>
  </div>
</template>

<script setup>
import LanguageDropDown from "@/components/base/LanguageDropDown.vue";
import BellIcon from "@/assets/icons/profile/BellIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import UserNotifications from "@/components/notification/UserNotifications.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import useFetch from "@/hooks/useFetch";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";

const showNotifications = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const logout = async () => {
  const state = await useFetch({ url: "/signout", method: "get" });
  if (state.status.value === 200) {
    router.push({ name: "landing" });
  }
};

onMounted(() => {
  // pusher
  Pusher.Runtime.createXHR = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };
  window.Pusher = Pusher;
  // echo
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${import.meta.env.VITE_BACK_BASE_URL}/broadcasting/auth`,
  });
  window.Echo.connector.pusher.connection.bind("connected", function () {
    axios.defaults.headers.common["X-Socket-Id"] = window.Echo.socketId();
  });
  window.Echo.private("notifications." + authStore.id).listen(
    "NotificationCreated",
    (e) => {
      console.log(e);
    }
  );
});
</script>
