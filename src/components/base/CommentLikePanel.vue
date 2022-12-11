<template>
  <div
    class="flex gap-5 items-center text-xl"
    v-if="Object.keys(quote).length > 0"
  >
    <div class="flex gap-2">
      <p>{{ quote.comments.length }}</p>
      <CommentIcon class="hover:cursor-pointer" />
    </div>
    <div class="flex gap-2">
      <p>{{ quote.likes.length }}</p>
      <RedLikeIcon
        v-if="quote.likes.some((like) => like.user_id === authStore.id)"
        @click="handleDeleteLike"
        class="hover:cursor-pointer"
      />
      <LikeIcon v-else class="hover:cursor-pointer" @click="handleCreateLike" />
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "@/assets/icons/common/CommentIcon.vue";
import LikeIcon from "@/assets/icons/common/LikeIcon.vue";
import RedLikeIcon from "@/assets/icons/common/RedLikeIcon.vue";
import { useAuthStore } from "@/stores/auth";
import useFetch from "@/hooks/useFetch";
import { inject } from "vue";

const authStore = useAuthStore();

const quote = inject("quote");

const handleCreateLike = async () => {
  const state = await useFetch({
    url: `/like`,
    method: "post",
    data: {
      quote_id: quote.id,
    },
  });
  if (state.status.value === 201) {
    quote.likes.push(state.response.value.like);
  }
};

const handleDeleteLike = async () => {
  const state = await useFetch({
    url: `/like/${
      quote.likes.find((like) => like.user_id === authStore.id).id
    }`,
    method: "delete",
  });
  if (state.status.value === 204) {
    quote.likes = quote.likes.filter((like) => like.user_id !== authStore.id);
  }
};
</script>
