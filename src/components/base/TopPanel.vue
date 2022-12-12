<template>
  <BurgerMenu
    v-if="showBurger"
    class="fixed mr-16"
    @closeBurgerMenu="showBurger = false"
  />
  <div class="flex h-[86px] bg-[#24222f] px-16 justify-between text-white">
    <div class="sm:flex hidden items-center">
      <p class="text-[#DDCCAA] font-medium">{{ $t("landing.movie_quotes") }}</p>
    </div>
    <div class="flex items-center sm:hidden">
      <BurgerMenuIcon @click="showBurger = true" />
    </div>
    <div class="flex items-center space-x-4">
      <div id="teleportSearch"></div>
      <div @click="showNotifications = !showNotifications" class="flex">
        <BellIcon class="hover:cursor-pointer hidden sm:block" />
        <SmallBellIcon class="hover:cursor-pointer block sm:hidden" />
        <div
          class="absolute ml-7 flex justify-center hover:cursor-pointer"
          v-if="notificationStore.notifications.some((el) => el.is_read === 0)"
        >
          <p class="z-10 absolute">
            {{
              notificationStore.notifications.filter((el) => el.is_read === 0)
                .length
            }}
          </p>
          <RedBallIcon class="absolute" />
        </div>
      </div>

      <UserNotifications
        v-if="showNotifications"
        class="absolute right-5 sm:left-[1000px] top-20"
      />
      <LanguageDropDown class="hidden sm:block" />
      <BaseButton
        @click="logout"
        :text="$t('common.log_out')"
        class="border-white border w-[109px] h-10 hidden sm:block"
      />
    </div>
  </div>
</template>

<script setup>
import LanguageDropDown from "@/components/base/LanguageDropDown.vue";
import BellIcon from "@/assets/icons/profile/BellIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import UserNotifications from "@/components/notification/UserNotifications.vue";
import RedBallIcon from "@/assets/icons/notification/RedBallIcon.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import useFetch from "@/hooks/useFetch";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
import useNotificationStore from "@/stores/notification";
import BurgerMenuIcon from "@/assets/icons/common/BurgerMenuIcon.vue";
import SmallBellIcon from "@/assets/icons/common/SmallBellIcon.vue";
import BurgerMenu from "@/components/base/BurgerMenu.vue";

defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
});

const showNotifications = ref(false);
const showBurger = ref(false);
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const logout = async () => {
  router.push({ name: "landing" });
  await useFetch({ url: "/signout", method: "get" });
};

const getNotifications = async () => {
  const state = await useFetch({ url: "/notification", method: "get" });
  if (state.status.value === 200) {
    notificationStore.setNotifications(state.response.value.notifications);
  }
};

onMounted(() => {
  getNotifications();
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
      notificationStore.addNotification(e.notification);
    }
  );
});
</script>
