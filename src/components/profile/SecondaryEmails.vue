<template>
  <ProfileInput v-for="email in data" :key="email.id">
    <template #input>
      <input
        class="py-2 px-5 block rounded-md pr-10 text-[#212529] border-[2px] focus:outline-none w-[360px]"
        :value="email.email"
      />
    </template>
    <template #button>
      <div class="flex items-center">
        <BaseButton
          :text="
            email.email_verified_at
              ? $t('profile.make_primary')
              : $t('profile.not_verified')
          "
          type="button"
          class="whitespace-nowrap"
          @click="handleMakePrimary(email.email)"
        />
        <DivideLine />
        <BaseButton
          class="rounded-none"
          :text="$t('profile.remove')"
          type="button"
          @click="handleRemove(email.email)"
        />
      </div>
    </template>
  </ProfileInput>
</template>

<script setup>
import ProfileInput from "@/components/profile/ProfileInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/stores/profile";
import DivideLine from "@/assets/icons/profile/DivideLine.vue";

const store = useProfileStore();

const handleRemove = async (email) => {
  const state = await useFetch({
    method: "delete",
    url: "/email",
    data: { email },
  });
  if (state.status.value === 204) {
    store.removeSecondaryEmail(email);
  }
};

const handleMakePrimary = async (email) => {
  const state = await useFetch({
    method: "post",
    url: "/email/primary",
    data: { email },
  });
  if (state.status.value === 200) {
    store.removeSecondaryEmail(email);
    store.setPrimaryEmail(email);
    store.addSecondaryEmail(state.response.value.new_secondary_email);
  }
};

defineProps({
  data: { type: Array, required: true },
});
</script>
