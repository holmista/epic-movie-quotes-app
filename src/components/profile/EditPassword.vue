<template>
  <div>
    <div class="border border-white p-6 max-w-[360px]">
      <p>Passwords should contain:</p>
      <ul class="list-disc list-inside">
        <li>8 or more characters</li>
        <li>15 lowercase character</li>
      </ul>
    </div>
    <BaseInput
      name="password"
      label="New password"
      type="password"
      rules="required|min:8|max:15|lower"
      class="w-[360px] mt-8"
      @password="setPassword"
    />
    <BaseInput
      name="confirmPassword"
      label="Confirm new password"
      type="text"
      :rules="`required|same:${password}`"
      class="w-[360px] mt-8"
    />
  </div>
</template>

<script setup>
import BaseInput from "../base/BaseInput.vue";
import { ref } from "vue";
const password = ref("");
const setPassword = (val) => {
  password.value = val;
};
</script>
