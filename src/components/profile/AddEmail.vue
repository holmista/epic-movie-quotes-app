<template>
  <div
    class="bg-[#11101A] rounded-xl w-[400px] h-[300px] absolute left-[23%] right-0 ml-auto mr-auto z-10 top-72"
  >
    <div class="w-[400px]">
      <p class="text-2xl py-3 pl-5 border-b-2">Add new Email</p>
    </div>
    <Form class="mt-14 flex items-center flex-col">
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
          <BaseButton text="Cancel" class="" />
        </RouterLink>
        <BaseButton text="Add" class="bg-[#E31221]" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
</script>
