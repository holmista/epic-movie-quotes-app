<template>
  <div>
    <div
      @click="setShowLocale"
      class="flex items-center space-x-1 hover:cursor-crosshair w-10"
    >
      <p>
        {{
          i18n.global.locale === "en" ? $t("language.en") : $t("language.ka")
        }}
      </p>
      <DropDown />
    </div>
    <ul v-if="showLocale" class="absolute">
      <li @click="setLocale('en')" class="hover:cursor-default">
        {{ $t("language.en") }}
      </li>
      <li @click="setLocale('ka')" class="hover:cursor-default">
        {{ $t("language.ka") }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DropDown from "@/assets/icons/common/DropDown.vue";
import i18n from "@/config/i18n/index.js";
import { set } from "@/hooks/useCookie";
import { useLocaleStore } from "../../stores/locale";

const showLocale = ref(false);
const store = useLocaleStore();

const setShowLocale = () => {
  showLocale.value = !showLocale.value;
};

const setLocale = (locale) => {
  i18n.global.locale = locale;
  store.setLocale(locale);
  set("locale", locale, 604800);
  showLocale.value = false;
};
</script>
