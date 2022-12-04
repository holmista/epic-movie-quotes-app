<template>
  <div
    class="absolute overflow-x-hidden bg-[#222030] max-w-[601px] min-h-[422px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-28 gap-3">
      <h1 class="text-white text-3xl font-medium w-96 text-center">
        {{ $t("signin.forgot_password") }}
      </h1>
      <h4 class="text-[#6C757D] text-center">
        {{ $t("accountActivity.forgot_password_title") }}
      </h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div" class="max-w-sm w-full">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="w-full flex gap-4 flex-col items-center mt-6"
      >
        <BaseInput
          name="email"
          :label="$t('input.fields.email')"
          type="text"
          rules="required|email"
          :placeholder="$t('input.placeholders.enter_your_email')"
          class="w-full"
        />
        <BaseButton
          :text="$t('accountActivity.send_instructions')"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
      </form>
    </VeeForm>
    <RouterLink :to="{ name: 'login' }">
      <div
        class="flex justify-center items-center text-[#6C757D] gap-3 mt-8 mb-4"
      >
        <BackArrow />
        <p>{{ $t("signin.back_to_log_in") }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import { useRouter } from "vue-router";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BackArrow from "@/assets/icons/landing/BackArrow.vue";
import useFetch from "@/hooks/useFetch";
import { get } from "@/hooks/useCookie";

const router = useRouter();

const onSubmit = async (values) => {
  const backUrl = `${
    import.meta.env.VITE_BACK_BASE_URL
  }/forgot-password?locale=${get("locale") || "en"}`;
  const state = await useFetch({ method: "post", url: backUrl, data: values });
  if (state.response.value.message === "passwords.sent") {
    router.push({ name: "reset-email-sent" });
  }
};
</script>
