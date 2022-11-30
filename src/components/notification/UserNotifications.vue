<template>
  <div
    class="bg-black w-[750px] h-[800px] text-white z-30 rounded-xl p-7 overflow-y-scroll"
  >
    <div class="flex justify-between">
      <h1 class="text-3xl">Notifications</h1>
      <p class="underline hover:cursor-pointer" @click="readAll">
        mark all as read
      </p>
    </div>
    <div class="mt-6 flex flex-col gap-4">
      <UserNotification
        v-for="notification in notifications.value"
        :notification="notification"
        :key="notification.id"
      />
    </div>
  </div>
</template>

<script setup>
import UserNotification from "@/components/notification/UserNotification.vue";
import useFetch from "@/hooks/useFetch";
import { onMounted, reactive } from "vue";

const notifications = reactive({ value: [] });

const readAll = async () => {
  const state = await useFetch({
    url: "/notification/read-all",
    method: "patch",
  });
  if (state.status.value === 200) {
    notifications.value = notifications.value.map((notification) => {
      notification.is_read = 1;
      return notification;
    });
  }
};

onMounted(async () => {
  const state = await useFetch({ url: "/notification", method: "get" });
  notifications.value = state.response.value.notifications;
  console.log(state.response.value);
});
</script>
