<template>
  <ProfileInput v-for="email in data" :key="email.id">
    <template #input>
      <BaseInput
        name="email"
        label="Email"
        type="email"
        rules="required|min:3|max:15"
        :initialValue="email.email"
        class="w-[360px]"
      />
    </template>
    <template #button>
      <div class="flex divide-x-2 mt-7">
        <BaseButton
          :text="email.email_verified_at ? 'Make this primary' : 'Not verified'"
          type="button"
          class="whitespace-nowrap"
        />
        <BaseButton class="rounded-none" text="Remove" type="button" />
      </div>
    </template>
  </ProfileInput>
</template>

<script setup>
import ProfileInput from "@/components/profile/ProfileInput.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  data: { type: Array, required: true },
});
console.log("secondary emails component", props.data.value);
</script>
