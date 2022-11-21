<template>
  <div class="text-white">
    <label :for="name" class="hidden">{{ name }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <Field
        v-slot="{ field }"
        :name="name"
        :placeholder="placeholder"
        :rules="rules"
        :id="name"
      >
        <textarea
          v-bind="field"
          :value="field.value"
          class="block w-full rounded-md border border-gray-500 pl-7 pr-12 bg-transparent h-[64px]"
          :placeholder="placeholder"
        ></textarea>
      </Field>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <span class="text-gray-500">{{ language }}</span>
      </div>
    </div>
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
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>
