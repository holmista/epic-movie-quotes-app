<template>
  <div>
    <div class="border border-white p-6 max-w-[360px]">
      <p>{{ $t("input.placeholders.passwords_should_contain") }}</p>
      <ul class="list-disc list-inside">
        <li>{{ $t("input.placeholders.min_8_characters") }}</li>
        <li>{{ $t("input.placeholders.15_lower_characters") }}</li>
      </ul>
    </div>
    <BaseInput
      name="password"
      :label="$t('input.fields.new_password')"
      type="password"
      rules="required|min:8|max:15|lower"
      class="w-[360px] mt-8"
      @password="setPassword"
    />
    <BaseInput
      name="confirmPassword"
      :label="$t('input.fields.confirm_new_password')"
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
