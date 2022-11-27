<template>
  <div class="bg-[#11101A] max-w-[525px] h-[268px] rounded-xl p-6 text-white">
    <div class="flex gap-4 items-start h-4/6 border-b-2 border-[#EFEFEF]">
      <img :src="quote.avatar" class="h-[120px] object-cover" />
      <div class="flex h-full justify-center items-center">
        <p>"{{ quote.title.en }}"</p>
      </div>
      <div class="flex justify-end h-full w-full">
        <ThreeDotsIcon
          @blur="showQuoteOptionsModal = false"
          class="hover:cursor-pointer"
          @click="showQuoteOptionsModal = !showQuoteOptionsModal"
        />
        <QuoteOptionsModal class="mt-6" v-if="showQuoteOptionsModal" />
      </div>
    </div>
    <div class="flex gap-5 items-center h-2/6 mt-3 text-xl">
      <div class="flex gap-2">
        <p>{{ quote.comments_count }}</p>
        <CommentIcon class="hover:cursor-pointer" />
      </div>
      <div class="flex gap-2">
        <p>{{ quote.likes_count }}</p>
        <LikeIcon class="hover:cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ThreeDotsIcon from "@/assets/icons/quote/ThreeDotsIcon.vue";
import CommentIcon from "@/assets/icons/common/CommentIcon.vue";
import LikeIcon from "@/assets/icons/common/LikeIcon.vue";
import QuoteOptionsModal from "@/components/quote/QuoteOptionsModal.vue";
import { ref } from "vue";
defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
const showQuoteOptionsModal = ref(false);
</script>
