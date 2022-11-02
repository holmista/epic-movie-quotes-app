<template>
  <div class="flex flex-col">
    <label :for="name" class="block text-sm font-medium text-white mb-2"
      >{{ label }}<span class="text-red-600"> *</span></label
    >
    <div class="relative mt-1 rounded-md shadow-sm">
      <Field
        v-slot="{ field, meta }"
        :name="name"
        :type="type"
        :id="name"
        :rules="rules"
      >
        <input
          v-bind="field"
          :value="field.value"
          class="py-2 px-5 block w-full rounded-md pr-10 text-[#212529] focus:outline-none"
          :placeholder="placeholder"
          :onchange="handleChange"
        />

        <div
          v-if="!meta.valid && meta.dirty"
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <ExclamationMark />
        </div>
        <div
          v-else-if="meta.valid"
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <CheckMark />
        </div>
      </Field>
    </div>

    <div class="flex items-center justify-start">
      <ErrorMessage
        :name="name"
        class="text-[#F15524] text-center font-light"
      />
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import ExclamationMark from "@/components/icons/landing-page/ExclamationMark.vue";
import CheckMark from "@/components/icons/landing-page/CheckMark.vue";

export default {
  components: {
    Field,
    ErrorMessage,
    ExclamationMark,
    CheckMark,
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    rules: { type: String, required: true },
    placeholder: { type: String, required: true },
  },
  setup(props, ctx) {
    const handleChange = (e) => {
      ctx.emit(props.name, e.target.value);
    };
    return { handleChange };
  },
};
</script>
