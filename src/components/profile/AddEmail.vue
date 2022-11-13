<template>
  <div
    class="bg-[#11101A] rounded-xl w-[400px] h-[300px] absolute left-[23%] right-0 ml-auto mr-auto z-10 top-72"
  >
    <div class="w-[400px]">
      <p class="text-2xl py-3 pl-5 border-b-2">Add new Email</p>
    </div>
    <VeeForm
      as="div"
      v-slot="{ handleSubmit }"
      class="mt-14 flex items-center flex-col"
    >
      <form @submit="handleSubmit($event, onSubmit)">
        <BaseInput
          name="email"
          label="Email"
          type="text"
          rules="required|email"
          placeholder="Enter new email"
          class="max-w-[360px] w-full"
        />
        <div class="flex mt-8 justify-end max-w-[360px] w-full">
          <RouterLink :to="{ name: 'profile' }">
            <BaseButton type="button" text="Cancel" class="" />
          </RouterLink>
          <BaseButton type="submit" text="Add" class="bg-[#E31221]" />
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

const router = useRouter();
const onSubmit = async (values) => {
  const state = await useFetch({ method: "post", url: "/email", data: values });
  if (state.status.value === 201) {
    router.push({ name: "profile" });
  }
};
</script>
