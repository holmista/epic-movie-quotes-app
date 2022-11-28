<template>
  <div
    id="photo"
    class="h-20 w-32 opacity-80 rounded-xl flex flex-col gap-3 justify-center items-center hover:cursor-pointer"
  >
    <CameraIcon />
    <p>Change photo</p>
  </div>
</template>

<script setup>
import CameraIcon from "@/assets/icons/quote/CameraIcon.vue";
// absolute left-0 right-0 ml-auto mr-auto z-10 mt-36
</script>

<style scoped>
#photo {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
  backdrop-filter: blur(25px);
}
</style>
