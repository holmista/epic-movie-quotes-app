<template>
  <BaseModal
    :active="active"
    class="absolute bg-[#222030] max-w-[601px] max-h-[704px] w-full h-full flex flex-col items-center"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-40 gap-3">
      <h1 class="text-white text-3xl font-medium">Create an account</h1>
      <h4 class="text-[#6C757D]">Start your journey!</h4>
    </header>
    <VeeForm
      class="max-w-sm w-full flex gap-4 flex-col rounded-lg items-center"
    >
      <BaseInput
        name="name"
        type="text"
        rules="required|min:3|max:15|lower"
        placeholder="At least 3 & max.15 lower case characters"
        class="max-w-96 w-full"
      />
      <BaseInput
        name="email"
        type="text"
        rules="required|email"
        placeholder="Enter your email"
        class="max-w-96 w-full"
      />
      <BaseInput
        name="password"
        type="password"
        rules="required|min:8|max:15|lower"
        placeholder="At least 8 & max.15 lower case characters"
        class="max-w-96 w-full"
        @password="setPassword"
      />
      <BaseInput
        name="repeat-password"
        type="text"
        :rules="`required|same:${password}`"
        placeholder="Confirm password"
        class="max-w-96 w-full"
      />
    </VeeForm>
  </BaseModal>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseInput from "../components/base/BaseInput.vue";
import { ref } from "vue";

const active = ref(true);
const password = ref("");
const setPassword = (val) => {
  password.value = val;
};
</script>
