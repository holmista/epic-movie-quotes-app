<template>
  <div
    id="parent"
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center overflow-y-scroll w-full h-full z-50"
    v-if="Object.keys(quote.value).length"
  >
    <div
      class="min-h-[850px] w-[428px] bg-[#11101A] text-white sm:w-[650px] top-28 absolute"
    >
      <div
        class="flex justify-between border-b-[1px] border-[#EFEFEF] h-20 items-center"
      >
        <div class="w-20 h-9 flex justify-between items-center ml-8"></div>
        <h1 class="text-2xl">{{ $t("quote.view_quote") }}</h1>
        <RouterLink :to="{ name: 'feed' }">
          <div class="mr-8">
            <CrossIcon />
          </div>
        </RouterLink>
      </div>
      <div class="flex items-center gap-4 text-xl px-8 py-2">
        <img
          src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          class="h-[60px] w-[60px] rounded-full object-cover"
        />
        <p>{{ quote.value.user.name }}</p>
      </div>
      <div class="px-8 flex flex-col gap-3">
        <FormInput
          type="text"
          name="title_en"
          language="Eng"
          :placeholder="'&#8220;' + quote.value.title.en + '&#8221;'"
          rules="required"
          :readonly="true"
        />
        <FormInput
          type="text"
          name="title_en"
          language="ქარ"
          :placeholder="'&#8220;' + quote.value.title.en + '&#8221;'"
          rules="required"
          :readonly="true"
        />
      </div>
      <div class="px-8 mt-6">
        <img
          :src="quote.value.avatar"
          class="h-[370px] w-full rounded-xl object-cover"
        />
        <!-- <CommentLikePanel :quote="quote.value" class="mt-6" /> -->
      </div>
      <div class="flex flex-col gap-4 px-8 mt-6">
        <QuoteComment
          v-for="comment in quote.value.comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
      <QuoteWriteComment :quoteId="quote.value.id" class="px-8 mt-6 w-full" />
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/assets/icons/quote/CrossIcon.vue";
import FormInput from "@/components/movie/FormInput.vue";
// import CommentLikePanel from "@/components/base/CommentLikePanel.vue";
import QuoteComment from "@/components/base/QuoteComment.vue";
import QuoteWriteComment from "@/components/base/QuoteWriteComment.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, provide } from "vue";
import useFetch from "@/hooks/useFetch";
import useNotificationStore from "@/stores/notification";

const route = useRoute();
const notificationStore = useNotificationStore();
const quote = reactive({ value: {} });
provide("quote", quote);

onMounted(async () => {
  const state = await useFetch({ url: `/quote/${route.params.id}` });
  quote.value = state.response.value.quote;
  const notificationToUpdate = notificationStore.notifications.find(
    (notification) => notification.id == route.query.notificationId
  );
  console.log(notificationToUpdate);
  notificationToUpdate.is_read = 1;
  const newNotifications = [];
  for (let i of notificationStore.notifications) {
    if (i.id == notificationToUpdate.id) {
      newNotifications.push(notificationToUpdate);
    } else {
      newNotifications.push(i);
    }
  }
  notificationStore.setNotifications(newNotifications);
});
</script>

<style scoped>
#parent {
  background: rgba(0, 0, 0, 0.4);
}
</style>
