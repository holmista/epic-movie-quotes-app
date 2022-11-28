<template>
  <div
    class="px-6 bg-[#11101A] w-[800px] text-white flex flex-col gap-5"
    v-if="quote"
  >
    <div class="flex items-center gap-4 py-2">
      <img
        src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        class="h-[52px] w-[52px] rounded-full object-cover"
      />
      <p class="text-xl">{{ quote.user.name }}</p>
    </div>
    <p>
      &ldquo;{{ quote.title.en }}&rdquo;
      <span class="text-[#DDCCAA] pl-2">{{ quote.movie.title.en }}</span>
    </p>

    <img
      src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      class="h-[370px] w-full rounded-xl object-cover"
    />
    <CommentLikePanel :quote="quote" />
    <div class="flex flex-col gap-4">
      <QuoteComment
        v-for="comment in quote.comments"
        :comment="comment"
        :key="comment.id"
      />
    </div>
    <QuoteWriteComment class="w-full" />
  </div>
</template>

<script setup>
import CommentLikePanel from "@/components/base/CommentLikePanel.vue";
import QuoteComment from "@/components/base/QuoteComment.vue";
import QuoteWriteComment from "@/components/base/QuoteWriteComment.vue";

defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
