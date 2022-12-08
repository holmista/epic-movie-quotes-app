<template>
  <div
    class="grid grid-cols-4 gap-x-4 border-b-[1px] border-[#EFEFEF] pb-3 sm:grid-cols-8"
  >
    <img
      :src="comment.user.avatar"
      class="h-[60px] w-[60px] rounded-full object-cover"
    />
    <div class="flex items-center col-span-7">
      <p class="">{{ comment.user.name }}</p>
    </div>
    <p class="col-start-2 col-span-7">{{ comment.body }}</p>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
