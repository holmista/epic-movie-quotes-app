<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import i18n from "@/config/i18n/index.js";
import { get } from "@/hooks/useCookie";

i18n.global.locale = get("locale") || "en";
</script>
