<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import i18n from "@/config/i18n/index.js";
import { get } from "@/hooks/useCookie";
import { useLocaleStore } from "@/stores/locale";
import { onMounted } from "vue";
import { setLocale as veeSetLocale } from "@vee-validate/i18n";

onMounted(() => {
  const store = useLocaleStore();
  const locale = get("locale") || "en";
  veeSetLocale(locale);
  i18n.global.locale = locale;
  store.setLocale(locale);
});
</script>
