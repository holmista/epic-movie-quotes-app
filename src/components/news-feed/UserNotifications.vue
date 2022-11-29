<template>
  <div
    class="bg-black w-[750px] h-[800px] text-white z-30 rounded-xl p-7 overflow-y-scroll"
  >
    <div class="flex justify-between">
      <h1 class="text-3xl">Notifications</h1>
      <p class="underline">mark all as read</p>
    </div>
    <div class="mt-6 flex flex-col gap-4">
      <UserNotification />
      <UserNotification />
      <UserNotification />
      <UserNotification />
    </div>
  </div>
</template>

<script setup>
import UserNotification from "./UserNotification.vue";
</script>
