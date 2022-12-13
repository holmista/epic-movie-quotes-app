<template>
  <div
    :class="`bg-no-repeat  bg-cover 
    w-full h-full bg-[100%] text-white font-bold text-5xl font-montserrat flex items-center`"
    :style="{
      'background-image': `url(images/landing/${image}.png)`,
    }"
  >
    <div class="flex gap-3 ml-10 sm:ml-40 max-w-[800px]">
      <p class="leading-[75px]">&#8212;</p>
      <div>
        <p class="leading-[30px] sm:leading-[75px] text-xl sm:text-[50px]">
          {{ quote }}
        </p>
        <p class="text-xl sm:text-3xl mt-6">{{ movie }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true },
  height: { type: String, required: false, default: "600" },
});
</script>

<style scoped>
#film {
  background: linear-gradient(#11101a 100%, #08080d 100%, #000000 0%);
}
</style>
