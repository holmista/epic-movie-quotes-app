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
        :src="store.avatarSrc"
        class="w-[188px] h-[188px] rounded-full object-cover absolute top-40"
        alt=""
        ref="avatarRef"
      />
      <Form
        v-slot="{ meta, handleSubmit }"
        :initial-values="formValues"
        as="div"
      >
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="flex flex-col gap-6 mt-14 max-w-[998px] h-full px-20"
          :class="
            blur
              ? 'bg-[#0D0B14] opacity-20 overflow-x-hidden overflow-y-hidden'
              : 'bg-[#11101a]'
          "
        >
          <Field
            name="avatar"
            type="file"
            id="actual-btn"
            hidden
            @change="handleImageChange"
            accept="image/*"
          />

          <div class="flex justify-center pt-28">
            <label for="actual-btn" class="hover:cursor-pointer"
              >Upload new photo</label
            >
          </div>
          <ProfileInput class="">
            <template #input>
              <BaseInput
                name="name"
                label="Name"
                type="text"
                rules="required|min:3|max:15|lower"
                :initialValue="store.name"
                class="w-[360px]"
              />
            </template>
            <template #button>
              <BaseButton text="edit" class="mt-7" />
            </template>
          </ProfileInput>
          <div class="flex flex-col gap-8">
            <div class="flex items-center">
              <div class="flex flex-col">
                <label class="text-sm font-medium text-white mb-2"
                  >Email<span class="text-red-600"> *</span></label
                >
                <input
                  name="email"
                  label="Email"
                  type="email"
                  :value="store.primaryEmail"
                  class="w-[360px] border-t-2 border-[#CED4DA] text-black rounded mt-1"
                  readonly
                />
              </div>
              <BaseButton
                text="Primary email"
                class="mt-7 hover:cursor-default"
              />
            </div>
            <SecondaryEmails :data="store.secondaryEmails" />
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
                placeholder="At least 8 & max.15 lower case characters"
                class="w-[360px] border-[#CED4DA] border-t-2 pt-5"
              />
            </template>
            <template #button>
              <BaseButton
                @click="setShowEditPassword(true)"
                text="edit"
                class="mt-12"
                type="button"
              />
            </template>
          </ProfileInput>
          <EditPassword v-if="showEditPassword" />
          <div
            v-if="meta.touched || imageInputTouched"
            class="flex justify-end"
          >
            <BaseButton
              @click="showEditPassword = false"
              text="Cancel"
              type="reset"
            />
            <BaseButton text="Save changes" class="bg-[#E31221]" />
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script setup>
// import { Form, Field } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import EmailAddIcon from "@/assets/icons/profile/EmailAddIcon.vue";
import ProfileInput from "@/components/profile/ProfileInput.vue";
import EditPassword from "@/components/profile/EditPassword.vue";
import SecondaryEmails from "./SecondaryEmails.vue";
import { ref, watchEffect, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { Form, Field } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/stores/profile";

const imageInputTouched = ref(false);
const avatarRef = ref(null);
const avatar = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatar.value = file;
    avatarRef.value.src = URL.createObjectURL(file);
    imageInputTouched.value = true;
  }
};

const store = useProfileStore();
const showEditPassword = ref(false);
const setShowEditPassword = (value) => {
  showEditPassword.value = value;
};

// const secondaryEmails = reactive([]);

const onSubmit = async (values) => {
  const body = {
    name: values.name,
    password: values.password,
    confirmPassword: values.confirmPassword,
    avatar: avatar.value,
  };
  if (body.name === store.name) {
    delete body.name;
  }
  for (let [k, v] of Object.entries(body)) {
    if (!v) {
      delete body[k];
    }
  }
  const form = new FormData();
  body.name && form.append("name", body.name);
  body.password && form.append("password", body.password);
  body.confirmPassword && form.append("confirmPassword", body.confirmPassword);
  body.avatar && form.append("avatar", avatar.value);
  const state = await useFetch({
    url: "/user",
    method: "post",
    data: form,
  });
  if (state.status.value === 200) {
    store.setName(state.response.value.user.name);
    store.setEmail(state.response.value.user.email);
    store.setAvatarSrc(state.response.value.user.avatar);
  }
};

const formValues = reactive({
  name: "",
});

onMounted(async () => {
  const state = await useFetch({ method: "get", url: "/user" });
  if (state.status.value === 200) {
    store.setName(state.response.value.name);
    store.setSecondaryEmails(state.response.value.socondary_emails);
    store.setPrimaryEmail(state.response.value.email);
    store.setAvatarSrc(state.response.value.avatar);
    formValues.name = state.response.value.name;
  }
});

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
