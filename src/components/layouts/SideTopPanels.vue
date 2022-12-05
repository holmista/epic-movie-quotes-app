<template>
  <TopPanel :showSearch="showSearch" />
  <div class="flex gap-32 mt-8">
    <SidePanel />
    <slot></slot>
  </div>
</template>

<script setup>
import SidePanel from "@/components/base/SidePanel.vue";
import TopPanel from "@/components/base/TopPanel.vue";

defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
});
</script>
