<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[601px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-40 gap-3">
      <h1 class="w-96 text-center text-white text-3xl font-medium">
        Log in to your account
      </h1>
      <h4 class="text-[#6C757D]">Welcome back! Please enter your details.</h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="max-w-sm w-full flex gap-4 flex-col items-center mt-6"
      >
        <BaseInput
          name="email"
          label="Email"
          type="text"
          rules="required"
          placeholder="Enter your email"
          class="max-w-96 w-full"
        />
        <BaseInput
          name="password"
          label="Password"
          type="password"
          rules="required|min:8|max:15|lower"
          placeholder="At least 8 & max.15 lower case characters"
          class="max-w-96 w-full"
        />
        <div class="flex justify-between w-full">
          <div
            class="flex flex-row-reverse items-center text-white gap-2 w-full justify-end"
          >
            <label for="remember-me">Rememer me</label>
            <Field type="checkbox" :value="true" name="remember-me" />
          </div>
          <RouterLink :to="{ name: 'forgot-password' }" class="w-full">
            <p class="w-full text-right text-[#0D6EFD] underline">
              Forgot password
            </p>
          </RouterLink>
        </div>
        <BaseButton
          text="Sign in"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
        <BaseButton
          @click="googleClick"
          type="button"
          text="Sign in with Google"
          class="border-white border w-[384px] h-10 text-white"
          ><GoogleLogo
        /></BaseButton>
      </form>
    </VeeForm>
    <p class="text-[#6C757D] mt-8 mb-4">
      Don't have an account?
      <RouterLink :to="{ name: 'signup' }" class="text-[#0D6EFD] underline"
        >Sign up</RouterLink
      >
    </p>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
// import BaseModal from "@/components/base/BaseModal.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import GoogleLogo from "@/assets/icons/landing/GoogleLogo.vue";
import { Field } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import { set } from "@/hooks/useCookie";
import { useRouter } from "vue-router";

const router = useRouter();

const googleClick = async () => {
  const state = await useFetch({
    method: "get",
    url: `${import.meta.env.VITE_BACK_BASE_URL}/auth/redirect`,
  });
  console.log(state.response.value.url);
  window.open(state.response.value.url, "_blank");
};

const onSubmit = async (values) => {
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/signin`;
  const state = await useFetch({ method: "post", url: backUrl, data: values });
  if (state.status.value === 200) {
    set(
      "access_token",
      state.response.value.access_token,
      state.response.value.expires_in
    );
    router.push({ name: "feed" });
  }
};
</script>
