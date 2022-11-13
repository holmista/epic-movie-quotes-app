<template>
  <router-view />
  <div
    class="ml-24 mt-8"
    :class="
      blur ? 'bg-[#0D0B14] opacity-20 overflow-x-hidden overflow-y-hidden ' : ''
    "
  >
    <h1 class="text-2xl">My profile</h1>
    <div class="flex flex-col items-center mt-10">
      <img
        src="https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
        class="w-[188px] h-[188px] rounded-full object-cover absolute top-40"
        alt=""
      />
      <div
        class="flex flex-col gap-6 mt-14 max-w-[998px] max-h-[800px] h-full px-20"
        :class="
          blur
            ? 'bg-[#0D0B14] opacity-20 overflow-x-hidden overflow-y-hidden'
            : 'bg-[#11101a]'
        "
      >
        <ProfileInput class="mt-40">
          <template #input>
            <BaseInput
              name="name"
              label="Name"
              type="email"
              rules="required|min:3|max:15"
              initialValue="a@gmail.com"
              class="w-[360px]"
            />
          </template>
          <template #button>
            <BaseButton text="edit" class="mt-7" />
          </template>
        </ProfileInput>
        <div class="flex flex-col gap-8">
          <ProfileInput>
            <template #input>
              <BaseInput
                name="email"
                label="Email"
                type="email"
                rules="email|required"
                initialValue="a@gmail.com"
                class="w-[360px] border-t-2 border-[#CED4DA] pt-5"
              />
            </template>
            <template #button>
              <p class="w-[150px] mt-12 px-4 py-2">Primary Email</p>
            </template>
          </ProfileInput>
          <RouterLink :to="{ name: 'add-email' }">
            <BaseButton text="Add new email" class="border-white border w-44"
              ><EmailAddIcon
            /></BaseButton>
          </RouterLink>
        </div>
        <ProfileInput class="pb-10">
          <template #input>
            <BaseInput
              name="password"
              label="Password"
              type="password"
              rules="required|min:8|max:15|lower"
              placeholder="At least 8 & max.15 lower case characters"
              class="w-[360px] border-[#CED4DA] border-t-2 pt-5"
              @password="setPassword"
            />
          </template>
          <template #button>
            <BaseButton text="edit" class="mt-12" />
          </template>
        </ProfileInput>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Form, Field } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import EmailAddIcon from "@/assets/icons/profile/EmailAddIcon.vue";
import ProfileInput from "@/components/profile/ProfileInput.vue";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const blur = ref(false);
watchEffect(() => {
  if (route.fullPath === "/profile") {
    blur.value = false;
  } else {
    blur.value = true;
  }
});
</script>
