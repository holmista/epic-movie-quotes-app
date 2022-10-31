<template>
  <transition name="modal-animation">
    <div v-if="active">
      <slot />
    </div>
  </transition>
</template>

<script setup>
defineProps({
  active: { type: Boolean, required: true },
});
</script>
