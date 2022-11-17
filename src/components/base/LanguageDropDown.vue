<template>
  <div>
    <div
      @click="setShowLocale"
      class="flex items-center space-x-1 hover:cursor-crosshair w-10"
    >
      <p>{{ upperFirst(locale) }}</p>
      <DropDown />
    </div>
    <ul v-if="showLocale" class="absolute">
      <li @click="setLocale('en')" class="hover:cursor-default">En</li>
      <li @click="setLocale('ka')" class="hover:cursor-default">Ka</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DropDown from "@/assets/icons/common/DropDown.vue";

const locale = ref("en");
const showLocale = ref(false);

const setShowLocale = () => {
  showLocale.value = !showLocale.value;
};
const setLocale = (value) => {
  locale.value = value;
  setShowLocale();
};

const upperFirst = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
</script>
