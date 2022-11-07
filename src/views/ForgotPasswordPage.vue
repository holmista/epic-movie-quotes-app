<template>
  <div
    class="absolute bg-[#222030] max-w-[601px] max-h-[422px] w-full h-auto flex flex-col items-center rounded-lg left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  >
    <header class="flex justify-center items-center flex-col pt-14 px-28 gap-3">
      <h1 class="text-white text-3xl font-medium">Forgot password?</h1>
      <h4 class="text-[#6C757D] text-center">
        Enter the email and we'll send an email with instructions to reset your
        password
      </h4>
    </header>
    <VeeForm v-slot="{ handleSubmit }" as="div" class="max-w-sm w-full">
      <form
        @submit="handleSubmit($event, onSubmit)"
        class="w-full flex gap-4 flex-col items-center mt-6"
      >
        <BaseInput
          name="email"
          label="Email"
          type="text"
          rules="required|email"
          placeholder="Enter your email"
          class="w-full"
        />
        <BaseButton
          text="Send instructions"
          class="bg-[#E31221] border-[#E31221] border w-full h-10 text-white mt-4"
        />
      </form>
    </VeeForm>
    <RouterLink :to="{ name: 'login' }">
      <div
        class="flex justify-center items-center text-[#6C757D] gap-3 mt-8 mb-4"
      >
        <BackArrow />
        <p>Back to log in</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import { useRouter } from "vue-router";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BackArrow from "@/components/icons/landing-page/BackArrow.vue";
import useFetch from "@/hooks/useFetch";

const router = useRouter();

const onSubmit = async (values) => {
  const backUrl = `${import.meta.env.VITE_BACK_BASE_URL}/forgot-password`;
  const state = await useFetch({ method: "post", url: backUrl, data: values });
  console.log(state.response.value.message);
  if (state.response.value.message === "passwords.sent") {
    router.push({ name: "reset-email-sent" });
  }
};
</script>
