<template>
  <div
    id="parent"
    class="h-screen text-white flex flex-col justify-center items-center gap-4"
  >
    <GhostIcon />
    <ElipseIcon />
    <h1 class="text-5xl font-bold">{{ $t("error.whoops") }}</h1>
    <p class="text-2xl font-medium">
      {{ $t("error.page_not_found") }}
    </p>
    <RouterLink :to="{ name: 'landing' }">
      <BaseButton
        class="bg-[#E31221] h-12 w-[160px] text-xl mt-6"
        :text="$t('common.return_home')"
      />
    </RouterLink>
  </div>
</template>

<script setup>
import GhostIcon from "@/assets/icons/errors/GhostIcon.vue";
import ElipseIcon from "@/assets/icons/errors/ElipseIcon.vue";
import BaseButton from "../components/base/BaseButton.vue";
</script>

<style scoped>
#parent {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
}
</style>
