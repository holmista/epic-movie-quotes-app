<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-6 hover:cursor-pointer">
      <img
        src="https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
        class="w-[60px] h-[60px] rounded-full object-cover"
        alt=""
      />
      <div class="flex flex-col justify-between">
        <p class="text-2xl">nino tabagari</p>
        <p class="text-base">edit your profile</p>
      </div>
    </div>
    <div class="flex gap-6 items-center hover:cursor-pointer">
      <div class="p-[14px]">
        <HouseIcon />
      </div>
      <p>news feed</p>
    </div>
    <div class="flex gap-6 items-center hover:cursor-pointer">
      <div class="p-[14px]">
        <CameraIcon />
      </div>
      <p>List of movies</p>
    </div>
  </div>
</template>

<script setup>
import HouseIcon from "@/assets/icons/profile/HouseIcon.vue";
import CameraIcon from "@/assets/icons/profile/CameraIcon.vue";
</script>
