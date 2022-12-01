<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import i18n from "@/config/i18n/index.js";
import { get } from "@/hooks/useCookie";
import { useLocaleStore } from "@/stores/locale";
import { onMounted } from "vue";

onMounted(() => {
  const store = useLocaleStore();

  i18n.global.locale = get("locale") || "en";
  store.setLocale(get("locale") || "en");
});
</script>
