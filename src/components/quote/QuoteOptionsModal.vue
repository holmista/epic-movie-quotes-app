<template>
  <div
    class="h-40 w-52 bg-[#24222F] absolute rounded-xl flex flex-col p-7 justify-between"
  >
    <div class="flex gap-2 items-center hover:cursor-pointer">
      <ModalEyeIcon />
      <p @click="router.push(`/movie/${route.params.id}/quote/${id}`)">
        View Quote
      </p>
    </div>
    <div class="flex gap-2 items-center hover:cursor-pointer">
      <ModalPencilIcon />
      <p @click="router.push(`/movie/${route.params.id}/quote/${id}/edit`)">
        Edit
      </p>
    </div>
    <div class="flex gap-2 items-center hover:cursor-pointer">
      <ModalTrashIcon />
      <p @click="handleDelete">Delete</p>
    </div>
  </div>
</template>
<script setup>
import ModalEyeIcon from "@/assets/icons/quote/ModalEyeIcon.vue";
import ModalPencilIcon from "@/assets/icons/quote/ModalPencilIcon.vue";
import ModalTrashIcon from "@/assets/icons/quote/ModalTrashIcon.vue";
import { useRouter, useRoute } from "vue-router";
import { inject } from "vue";
import useFetch from "@/hooks/useFetch";

const router = useRouter();
const route = useRoute();
const quotes = inject("quotes");

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const handleDelete = async () => {
  const state = await useFetch({
    url: `/quote/${props.id}`,
    method: "delete",
  });
  if (state.status.value === 204) {
    quotes.value = quotes.value.filter((quote) => quote.id !== props.id);
  }
};
</script>
