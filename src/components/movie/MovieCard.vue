<template>
  <div>
    <img
      :src="image"
      alt="movie poster"
      class="w-[440px] h-[370px] rounded-xl object-cover"
    />
    <p>
      <span>{{ title }}</span>
      <span>({{ releaseYear }})</span>
    </p>
    <p>{{ quoteAmount }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quoteAmount: {
    type: Number,
    required: true,
  },
});
</script>
