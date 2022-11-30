<template>
  <div class="flex items-center gap-4 pb-8">
    <img
      src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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

const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
});

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
// console.log(quote);
</script>
