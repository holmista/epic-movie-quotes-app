<template>
  <div
    class="bg-black w-[400px] sm:w-[750px] h-64 sm:h-[800px] text-white z-30 rounded-xl p-7 overflow-auto"
  >
    <div class="flex justify-between">
      <h1 class="text-xl sm:text-3xl">{{ $t("quote.notifications") }}</h1>

      <p class="underline hover:cursor-pointer" @click="readAll">
        {{ $t("quote.mark_read") }}
      </p>
    </div>
    <div
      class="mt-6 flex flex-col gap-4"
      v-if="notificationStore.notifications.length > 0"
    >
      <UserNotification
        v-for="notification in notificationStore.notifications"
        :notification="notification"
        :key="notification.id"
      />
    </div>
  </div>
</template>

<script setup>
import UserNotification from "@/components/notification/UserNotification.vue";
import useFetch from "@/hooks/useFetch";
import useNotificationStore from "@/stores/notification";

const notificationStore = useNotificationStore();

const readAll = async () => {
  const state = await useFetch({
    url: "/notification/read-all",
    method: "patch",
  });
  if (state.status.value === 200) {
    const updatedNotifications = notificationStore.notifications.map(
      (notification) => {
        notification.is_read = 1;
        return notification;
      }
    );
    notificationStore.setNotifications(updatedNotifications);
  }
};
</script>
