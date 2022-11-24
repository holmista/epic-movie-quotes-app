<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[486px] w-full h-full flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-28 gap-3">
      <h1 class="text-white text-3xl font-medium">
        {{ $t("accountActivity.create_new_password") }}
      </h1>
      <h4 class="text-[#6C757D] text-center">
        {{ $t("accountActivity.different_password") }}
      </h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div" class="max-w-sm w-full">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="w-full flex gap-4 flex-col items-center mt-6"
      >
        <BaseInput
          name="password"
          :label="$t('input.fields.password')"
          type="password"
          rules="required|min:8|max:15|lower"
          :placeholder="$t('input.fields.min_8_max_15_lower')"
          class="max-w-96 w-full"
          @password="setPassword"
        />
        <BaseInput
          name="confirmPassword"
          :label="$t('input.fields.repeat_password')"
          type="text"
          :rules="`required|same:${password}`"
          :placeholder="$t('input.placeholders.confirm_password')"
          class="max-w-96 w-full"
        />
        <BaseButton
          text="Reset password"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
      </form>
    </VeeForm>
    <RouterLink :to="{ name: 'login' }">
      <div class="flex justify-center items-center text-[#6C757D] gap-3 mt-8">
        <BackArrow />
        <p>{{ $t("signin.back_to_log_in") }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Form as VeeForm } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BackArrow from "@/assets/icons/landing/BackArrow.vue";

const route = useRoute();

const router = useRouter();
const password = ref("");
const setPassword = (val) => {
  password.value = val;
};
const onSubmit = async (values) => {
  const { token } = route.params;
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/reset-password`;
  const state = await useFetch({
    method: "post",
    url: backUrl,
    data: { ...values, token, email: route.query.email },
  });
  if (state.response.value.message === "passwords.reset") {
    router.push("/reset-password-success");
  }
};
</script>
