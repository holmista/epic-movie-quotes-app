<template>
  <div
    class="bg-[#11101A] rounded-xl w-[400px] h-[300px] absolute left-0 right-0 ml-auto mr-auto z-10 top-72"
  >
    <div class="w-[400px]">
      <p class="text-2xl py-3 pl-5 border-b-2">{{ $t("profile.add_email") }}</p>
    </div>
    <VeeForm
      as="div"
      v-slot="{ handleSubmit }"
      class="mt-14 flex items-center flex-col"
    >
      <form @submit="handleSubmit($event, onSubmit)">
        <BaseInput
          name="email"
          :label="$t('input.fields.email')"
          type="text"
          rules="required|email"
          :placeholder="$t('input.placeholders.enter_new_email')"
          class="max-w-[360px] w-full"
        />
        <div class="flex mt-8 justify-end max-w-[360px] w-full">
          <RouterLink :to="{ name: 'profile' }">
            <BaseButton type="button" :text="$t('common.cancel')" class="" />
          </RouterLink>
          <BaseButton
            type="submit"
            :text="$t('common.add')"
            class="bg-[#E31221]"
          />
        </div>
      </form>
    </VeeForm>
  </div>
</template>

<script setup>
import { Form as VeeForm } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile";

const store = useProfileStore();
const router = useRouter();
const onSubmit = async (values, actions) => {
  const state = await useFetch({ method: "post", url: "/email", data: values });
  if (state.status.value === 201) {
    store.addSecondaryEmail(state.response.value.email);
    router.push({ name: "profile" });
  }
  if (state.error.value.response.data.message) {
    actions.setFieldError("email", {
      en: state.error.value.response.data.message,
      ka: "იმეილი დაკავებულია",
    });
  }
};
</script>
