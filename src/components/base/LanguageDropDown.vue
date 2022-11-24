<template>
  <div>
    <div
      @click="setShowLocale"
      class="flex items-center space-x-1 hover:cursor-crosshair w-10"
    >
      <p>{{ upperFirst(currentLocale) }}</p>
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
import i18n from "@/config/i18n/index.js";

const currentLocale = ref("en");
const showLocale = ref(false);

const setShowLocale = () => {
  showLocale.value = !showLocale.value;
};

const setLocale = (locale) => {
  i18n.global.locale = locale;
  currentLocale.value = locale;
  showLocale.value = false;
};

const upperFirst = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
</script>
