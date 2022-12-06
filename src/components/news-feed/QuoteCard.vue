<template>
  <div
    class="px-6 bg-[#11101A] max-w-[800px] text-white flex flex-col gap-5 rounded-xl"
    v-if="quote"
  >
    <div class="flex items-center gap-4 py-2">
      <img
        :src="quote.user.avatar"
        class="h-[52px] w-[52px] rounded-full object-cover"
      />
      <p class="text-xl">{{ quote.user.name }}</p>
    </div>
    <p>
      &ldquo;{{ quote.title[localeStore.locale] }}&rdquo;
      <span class="text-[#DDCCAA] pl-2">{{
        quote.movie.title[localeStore.locale]
      }}</span>
    </p>

    <img :src="quote.avatar" class="h-[370px] w-full rounded-xl object-cover" />
    <CommentLikePanel :quote="quote" />
    <div class="flex max-h-[300px] overflow-y-auto flex-col gap-4">
      <QuoteComment
        v-for="comment in quote.comments"
        :comment="comment"
        :key="comment.id"
      />
    </div>
    <QuoteWriteComment class="w-full" :quoteId="quote.id" />
  </div>
</template>

<script setup>
import CommentLikePanel from "@/components/base/CommentLikePanel.vue";
import QuoteComment from "@/components/base/QuoteComment.vue";
import QuoteWriteComment from "@/components/base/QuoteWriteComment.vue";
import { provide } from "vue";
import { useLocaleStore } from "@/stores/locale";

provide("quote", props.quote);
const localeStore = useLocaleStore();

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
