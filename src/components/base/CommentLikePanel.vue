<template>
  <div class="flex gap-5 items-center text-xl">
    <div class="flex gap-2">
      <p>{{ quote.comments.length }}</p>
      <CommentIcon class="hover:cursor-pointer" />
    </div>
    <div class="flex gap-2">
      <p>{{ quote.likes }}</p>
      <LikeIcon class="hover:cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "@/assets/icons/common/CommentIcon.vue";
import LikeIcon from "@/assets/icons/common/LikeIcon.vue";

defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
