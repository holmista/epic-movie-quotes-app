<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[780px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-40 gap-3">
      <h1 class="text-white text-3xl font-medium">Create an account</h1>
      <h4 class="text-[#6C757D]">Start your journey!</h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="max-w-sm w-full flex gap-4 flex-col items-center"
      >
        <BaseInput
          name="name"
          label="Name"
          type="text"
          rules="required|min:3|max:15|lower"
          placeholder="At least 3 & max.15 lower case characters"
          class="max-w-96 w-full"
        />
        <BaseInput
          name="email"
          label="Email"
          type="text"
          rules="required|email"
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
          @password="setPassword"
        />
        <BaseInput
          name="confirmPassword"
          label="Repeat password"
          type="text"
          :rules="`required|same:${password}`"
          placeholder="Confirm password"
          class="max-w-96 w-full"
        />
        <BaseButton
          text="Get started"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
        <BaseButton
          @click="googleClick"
          type="button"
          text="Sign up with Google"
          class="border-white border w-[384px] h-10 text-white"
          ><GoogleLogo
        /></BaseButton>
      </form>
    </VeeForm>
    <p class="text-[#6C757D] mt-8 mb-4">
      Already have an account?
      <RouterLink to="/login" class="text-[#0D6EFD] underline"
        >Log in</RouterLink
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";

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
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/signup`;
  const state = await useFetch({ method: "post", url: backUrl, data: values });
  if (state.status.value == 201) {
    router.push("/activation-email-sent");
  }
  console.log(state.error.value);
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
