<template>
  <div
    class="bg-[#1d1c25] flex flex-col gap-10 py-10 text-white w-[300px] h-full pl-4 z-30"
  >
    <CrossIcon class="pl-14px" @click="$emit('closeBurgerMenu')" />
    <RouterLink :to="{ name: 'profile' }">
      <div class="flex gap-6 hover:cursor-pointer">
        <img
          :src="store.avatarSrc"
          class="w-[60px] h-[60px] rounded-full object-cover"
          alt=""
        />

        <div class="flex flex-col justify-between">
          <p class="text-2xl">{{ store.name }}</p>
          <p class="text-base">{{ $t("sidePanel.edit_your_profile") }}</p>
        </div>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'feed' }">
      <div class="flex gap-6 items-center hover:cursor-pointer">
        <HouseIcon />
        <p>{{ $t("sidePanel.news_feed") }}</p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'movies' }">
      <div class="flex gap-6 items-center hover:cursor-pointer">
        <CameraIcon />
        <p>{{ $t("sidePanel.list_of_movies") }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import HouseIcon from "@/assets/icons/profile/HouseIcon.vue";
import CameraIcon from "@/assets/icons/profile/CameraIcon.vue";
import { useProfileStore } from "@/stores/profile";
import CrossIcon from "@/assets/icons/quote/CrossIcon.vue";

const store = useProfileStore();
</script>
