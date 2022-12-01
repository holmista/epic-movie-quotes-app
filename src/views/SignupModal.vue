<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[780px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-40 gap-3">
      <h1 class="text-white text-3xl font-medium">
        {{ $t("signup.create_an_account") }}
      </h1>
      <h4 class="text-[#6C757D]">{{ $t("signup.start_your_journey") }}</h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="max-w-sm w-full flex gap-4 flex-col items-center"
      >
        <BaseInput
          name="name"
          :label="$t('input.fields.name')"
          type="text"
          rules="required|min:3|max:15|lower"
          :placeholder="$t('input.placeholders.min_3_max_15_lower')"
          class="max-w-96 w-full"
        />
        <BaseInput
          name="email"
          :label="$t('input.fields.email')"
          type="text"
          rules="required|email"
          :placeholder="$t('input.placeholders.enter_your_email')"
          class="max-w-96 w-full"
        />
        <BaseInput
          name="password"
          :label="$t('input.fields.password')"
          type="password"
          rules="required|min:8|max:15|lower"
          :placeholder="$t('input.placeholders.min_8_max_15_lower')"
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
          :text="$t('common.get_started')"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
        <BaseButton
          @click="googleClick"
          type="button"
          :text="$t('signup.sign_up_with_google')"
          class="border-white border w-[384px] h-10 text-white"
          ><GoogleLogo
        /></BaseButton>
      </form>
    </VeeForm>
    <p class="text-[#6C757D] mt-8 mb-4">
      {{ $t("signup.already_have_an_account") }}
      <RouterLink to="/login" class="text-[#0D6EFD] underline">{{
        $t("landing.log_in")
      }}</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import GoogleLogo from "@/assets/icons/landing/GoogleLogo.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";
import { get } from "@/hooks/useCookie";

const googleClick = async () => {
  const state = await useFetch({
    method: "get",
    url: `${import.meta.env.VITE_BACK_BASE_URL}/auth/redirect`,
  });
  window.open(state.response.value.url, "_blank");
};

const router = useRouter();
const password = ref("");
const setPassword = (val) => {
  password.value = val;
};
const onSubmit = async (values, actions) => {
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/signup?locale=${
    get("locale") || "en"
  }`;
  const state = await useFetch({ method: "post", url: backUrl, data: values });
  if (state.status.value == 201) {
    router.push("/activation-email-sent");
  }
  if (state.status.value == 422) {
    if (state.error.value.response.data.errors.name) {
      actions.setFieldError("name", state.error.value.response.data.message);
    }
    if (state.error.value.response.data.errors.email) {
      actions.setFieldError("email", state.error.value.response.data.message);
    }
  }
};
</script>
