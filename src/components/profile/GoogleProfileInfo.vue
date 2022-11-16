<template>
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
        ref="avatarRef"
      />
      <Form v-slot="{ meta, handleSubmit }" as="div">
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="flex flex-col gap-6 mt-14 max-w-[998px] h-full px-20 pb-20"
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
                type="email"
                rules="required|min:3|max:15"
                :initialValue="name"
                class="w-[360px]"
              />
            </template>
            <template #button>
              <BaseButton text="edit" class="mt-7" />
            </template>
          </ProfileInput>
          <div class="flex flex-col gap-8">
            <input
              name="email"
              label="Email"
              type="email"
              :value="store.primaryEmail"
              class="w-[360px] border-t-2 border-[#CED4DA] text-black rounded"
              readonly
            />
          </div>

          <div
            v-if="meta.touched || imageInputTouched"
            class="flex justify-end"
          >
            <BaseButton type="button" text="Cancel" />
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
import ProfileInput from "@/components/profile/ProfileInput.vue";
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/stores/profile";

const store = useProfileStore();

const name = ref("");
const email = ref("");

// const secondaryEmails = reactive([]);

const onSubmit = async (values) => {
  const body = {
    name: values.name,
  };
  if (body.name === name.value || body.name === "") {
    return;
  }

  const state = await useFetch({
    url: "/user",
    method: "patch",
    data: body,
  });
};

onMounted(async () => {
  const state = await useFetch({ method: "get", url: "/user" });
  if (state.status.value === 200) {
    name.value = state.response.value.name;
    email.value = state.response.value.email;
    store.primaryEmail = state.response.value.email;
  }
});
</script>
