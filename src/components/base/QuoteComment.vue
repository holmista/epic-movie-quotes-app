<template>
  <div
    class="grid grid-cols-4 gap-x-4 border-b-[1px] border-[#EFEFEF] pb-3 sm:grid-cols-8"
  >
    <img
      src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      class="h-[60px] w-[60px] rounded-full object-cover"
    />
    <div class="flex items-center col-span-7">
      <p class="">{{ comment.user.name }}</p>
    </div>
    <p class="col-start-2 col-span-7">{{ comment.body }}</p>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
