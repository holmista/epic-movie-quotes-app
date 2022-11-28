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
      <p>Edit</p>
    </div>
    <div class="flex gap-2 items-center hover:cursor-pointer">
      <ModalTrashIcon />
      <p>Delete</p>
    </div>
  </div>
</template>
<script setup>
import ModalEyeIcon from "@/assets/icons/quote/ModalEyeIcon.vue";
import ModalPencilIcon from "@/assets/icons/quote/ModalPencilIcon.vue";
import ModalTrashIcon from "@/assets/icons/quote/ModalTrashIcon.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

defineProps({
  id: {
    type: Number,
    required: true,
  },
});
</script>
