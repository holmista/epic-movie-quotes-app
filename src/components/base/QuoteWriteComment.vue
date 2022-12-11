<template>
  <div class="flex items-center gap-4 pb-8">
    <img
      :src="authStore.avatar"
      class="h-[60px] w-[60px] rounded-full object-cover"
    />
    <form class="w-full" @submit.prevent="printToConsole">
      <input
        type="text"
        class="w-full h-12 rounded-xl bg-[#24222F] opacity-60 py-2 px-4 text-white"
        placeholder="Write a comment"
        v-model="comment"
      />
    </form>
  </div>
</template>

<script setup>
import useFetch from "@/hooks/useFetch";
import { inject, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
});
const authStore = useAuthStore();
const quote = inject("quote");
const comment = ref("");

const printToConsole = async (e) => {
  if (!e.target[0].value) return;
  const state = await useFetch({
    url: "/comment",
    method: "post",
    data: {
      body: e.target[0].value,
      quote_id: props.quoteId,
    },
  });
  if (state.status.value === 201) {
    comment.value = "";
    try {
      quote.comments.push(state.response.value.comment);
    } catch {
      quote.value.comments.push(state.response.value.comment);
    }
  }
};
</script>
