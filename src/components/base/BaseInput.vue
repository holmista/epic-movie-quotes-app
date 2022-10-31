<template>
  <div class="flex flex-col">
    <label :for="name" class="mb-2 text-white"
      >{{ name }}<span class="text-red-600"> *</span></label
    >
    <Field
      :name="name"
      :type="type"
      :rules="rules"
      class="border-kuro border-solid border-[1px] py-2 px-5 h-12 text-lg text-kuro mb-1 font-light focus:outline-none rounded"
      :placeholder="placeholder"
    />
    <div class="flex items-center justify-start">
      <ErrorMessage
        :name="name"
        class="text-[#F15524] text-center font-light"
      />
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rules: { type: String, required: true },
  placeholder: { type: String, required: true },
});
</script>
