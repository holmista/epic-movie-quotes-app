<template>
  <div class="flex flex-col gap-5 text-white ml-8">
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
        <div class="p-[14px]">
          <HouseIcon />
        </div>
        <p>{{ $t("sidePanel.news_feed") }}</p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'movies' }">
      <div class="flex gap-6 items-center hover:cursor-pointer">
        <div class="p-[14px]">
          <CameraIcon />
        </div>
        <p>{{ $t("sidePanel.list_of_movies") }}</p>
      </div>
    </RouterLink>
  </div>
  <!-- </div> -->
</template>

<script setup>
import HouseIcon from "@/assets/icons/profile/HouseIcon.vue";
import CameraIcon from "@/assets/icons/profile/CameraIcon.vue";
import { useProfileStore } from "@/stores/profile";
const store = useProfileStore();
</script>
