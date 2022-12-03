<template>
  <div
    class="border border-[#6C757D] p-6 h-24 flex items-center justify-between hover:cursor-pointer"
    @click="handleClick"
  >
    <div class="flex items-center gap-5">
      <img
        class="w-[60px] h-[60px] rounded-full object-cover"
        :src="notification.trigerer.avatar"
      />
      <div class="flex flex-col justify-between py-3">
        <p>{{ notification.trigerer.name }}</p>
        <p>
          {{
            notification.type === 0
              ? $t("quote.commented_on_quote")
              : $t("quote.liked_your_quote")
          }}
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-between py-3">
      <p>{{ timeDiff(notification.created_at, localeStore.locale) }}</p>
      <p class="text-right text-[#198754]" v-if="notification.is_read === 0">
        New
      </p>
    </div>
  </div>
</template>

<script setup>
import timeDiff from "time-diff-for-humans";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "vue-router";
import { useLocaleStore } from "@/stores/locale";

const router = useRouter();
const localeStore = useLocaleStore();

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

const handleClick = () => {
  if (props.notification.is_read === 0) {
    useFetch({
      url: `/notification/${props.notification.id}`,
      method: "patch",
    });
  }
  router.push({
    name: "feed-view-quote",
    params: { id: props.notification.quote_id },
    query: { notificationId: props.notification.id },
  });
};
</script>
