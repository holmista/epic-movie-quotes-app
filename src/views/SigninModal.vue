<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[601px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-40 gap-3">
      <h1 class="w-96 text-center text-white text-3xl font-medium">
        {{ $t("signin.log_in_to_your_account") }}
      </h1>
      <h4 class="text-[#6C757D]">
        {{ $t("signin.welcome_back_please_enter_your_details") }}
      </h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="max-w-sm w-full flex gap-4 flex-col items-center mt-6"
      >
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
        />
        <div class="flex justify-between w-full">
          <div
            class="flex flex-row-reverse items-center text-white gap-2 w-full justify-end"
          >
            <label for="remember-me">{{ $t("signin.remember_me") }}</label>
            <Field type="checkbox" :value="true" name="remember-me" />
          </div>
          <RouterLink :to="{ name: 'forgot-password' }" class="w-full">
            <p class="w-full text-right text-[#0D6EFD] underline">
              {{ $t("signin.forgot_password") }}
            </p>
          </RouterLink>
        </div>
        <BaseButton
          :text="$t('signin.sign_in')"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
        <BaseButton
          @click="googleClick"
          type="button"
          :text="$t('signin.sign_in_with_google')"
          class="border-white border w-[384px] h-10 text-white"
          ><GoogleLogo
        /></BaseButton>
      </form>
    </VeeForm>
    <p class="text-[#6C757D] mt-8 mb-4">
      {{ $t("signin.dont_have_an_account") }}
      <RouterLink :to="{ name: 'signup' }" class="text-[#0D6EFD] underline">{{
        $t("landing.sign_up")
      }}</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import GoogleLogo from "@/assets/icons/landing/GoogleLogo.vue";
import { Field } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const router = useRouter();
const store = useAuthStore();

const googleClick = async () => {
  const state = await useFetch({
    method: "get",
    url: `${import.meta.env.VITE_BACK_BASE_URL}/auth/redirect`,
  });
  window.open(state.response.value.url, "_blank");
};

const onSubmit = async (values, actions) => {
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/signin`;
  try {
    const res = await axios.post(backUrl, values, {
      withCredentials: true,
    });
    store.setAuthenticated(true);
    store.setName(res.data.name);
    store.setId(res.data.id);
    router.push({ name: "feed" });
  } catch (error) {
    if (error.response.status === 401) {
      actions.setErrors({
        email: {
          en: "Invalid email or password",
          ka: "იმეილი ან პაროლი არასწორია",
        },
      });
    } else if (error.response.status === 422) {
      actions.setErrors({
        email: { en: "email not verified", ka: "იმეილი არაა ვერიფიცირებული" },
      });
    }
  }
};
</script>
